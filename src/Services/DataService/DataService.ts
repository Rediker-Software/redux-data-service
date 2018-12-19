import "rxjs/add/operator/auditTime";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/shareReplay";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";

import { Observable } from "rxjs/Observable";
import { of as of$ } from "rxjs/observable/of";
import { combineLatest as combineLatest$ } from "rxjs/observable/combineLatest";

import { uniqueId } from "lodash";
import * as hash from "object-hash";
import { Store } from "redux";
import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";

import { getConfiguration } from "../../Configure";
import { IModel, IModelData, IModelFactory } from "../../Model/IModel";
import { ISerializer, ISerializerFactory } from "../../Serializers/ISerializer";
import { IAdapter, IAdapterFactory } from "../../Adapters/IAdapter";
import { IMapperFactory, IMapper } from "../../Mapper/IMapper";

import { IQueryBuilder } from "../../Query/QueryBuilder";
import { IQueryCache } from "../../Query/IQueryCache";
import { IRawQueryResponse } from "../../Query";

import { BaseService } from "../BaseService";
import { IAction, IActionCreators, IActionTypes, IObservableAction, ISelectors, IActionEpic } from "../IService";

import {
  fetchAllReducer,
  ISetMetaField,
  pushAllReducer,
  pushRecordReducer,
  setFieldReducer, 
  setMetaFieldReducer, 
  setQueryResponseReducer, 
  setRelationshipReducer,
  unloadAllReducer,
  unloadRecordReducer,
} from "./Reducers";

import { DataServiceStateRecord, IDataServiceStateRecord } from "./DataServiceStateRecord";
import { shouldFetchAll } from "./ShouldFetchAll";

import { IForceReload } from "./IForceReload";
import { IPostActionHandlers } from "./IPostActionHandlers";
import { ISetField } from "./ISetField";

export interface IModelId {
  id: string;
}

/**
 * `DataService` is an `IService` for marshalling data (by default, with an external service such as a REST end point).
 * To use this class, extend it and set the `name` and `ModelClass` fields in the child class.
 *
 * The default `IAdapter` for this class is a `RestAdapter`.
 * It uses the Service's `name` to determine the name of the corresponding API end-point.
 * `env.process.API_URL` as the API root url.
 * To override this default functionality, the `_adapter` property should be set on the child class.
 *
 * The default `ISerializer` for this class is a `RestSerializer`.
 * The `_serializer` property should be set on the child class if you want to:
 *  - Change how the model is serialized or which values should be omitted
 *  - Change how the incoming data is transformed when the model is created
 *
 * @abstract
 * @class
 */
export abstract class DataService<T extends IModelData, R = T> extends BaseService<IDataServiceStateRecord<T>> {
  public abstract readonly ModelClass: IModelFactory<T>;
  protected readonly AdapterClass: IAdapterFactory<any>;
  protected readonly MapperClass: IMapperFactory<any>;
  protected readonly SerializerClass: ISerializerFactory<any, R>;

  protected _adapter: IAdapter<any>;
  protected _mapper: IMapper<any>;
  protected _serializer: ISerializer<any, R>;

  protected shadowObject: IModel<T> = null;
  protected observablesByIdCache: { [id: string]: Observable<IModel<T>> } = {};
  protected observablesByIdsCache: { [id: string]: Observable<IModel<T>[]> } = {};
  protected observablesByQueryCache: { [id: string]: Observable<IModel<T>[]> } = {};

  public get adapter() {
    if (!this._adapter) {
      const AdapterClass = this.AdapterClass || getConfiguration().adapter;
      this._adapter = new AdapterClass(this.name);
    }

    return this._adapter;
  }

  public get mapper() {
    if (!this._mapper) {
      const MapperClass = this.MapperClass || getConfiguration().mapper;
      this._mapper = new MapperClass(this.ModelClass);
    }

    return this._mapper;
  }

  public get serializer() {
    if (!this._serializer) {
      const SerializerClass = this.SerializerClass || getConfiguration().serializer;
      this._serializer = new SerializerClass(this.ModelClass);
    }

    return this._serializer;
  }

  public getDefaultState(): IDataServiceStateRecord<T> {
    return DataServiceStateRecord();
  }

  public getShadowObject(): IModel<T> {
    if (!this.shadowObject) {
      this.shadowObject = new this.ModelClass({}, { isLoading: true, isShadow: true });
    }

    return this.shadowObject;
  }

  /**
   * Create a new instance of the Model which has not been committed to the API yet.
   *
   * @returns {service.ModelClass}
   */
  public createNew(initialData: Partial<T> = {}) {
    const data = "id" in initialData ? initialData : { id: uniqueId("new-"), ...(initialData as any) };
    const model = new this.ModelClass(data as Partial<T>);

    this.actions.pushRecord(model).invoke();

    model.initializeNewModel();

    return model;
  }

  public getById(id: string): Observable<IModel<T>> {

    if (id in this.observablesByIdCache) {
      return this.observablesByIdCache[id];
    }

    const observable = BaseService
      .getStateObservable()
      .map((state) => this.selectors.getItem(state, id) || this.getShadowObject())
      .distinctUntilChanged()
      .shareReplay(1);

    observable
      .take(1)
      .filter((item) => item.isShadow)
      .subscribe(() => this.actions.fetchRecord({ id }).invoke());

    this.observablesByIdCache[id] = observable;
    return observable;
  }

  public getByIds(ids: string[]): Observable<IModel<T>[]> {
    const cacheKey = JSON.stringify(ids.sort());

    if (cacheKey in this.observablesByIdsCache) {
      return this.observablesByIdsCache[cacheKey];
    }

    const itemObservables = ids.map(id => this.getById(id));

    const observable = combineLatest$(...itemObservables)
      .auditTime(25)
      .startWith([]);

    this.observablesByIdsCache[cacheKey] = observable;
    return observable;
  }

  public getByQuery(queryParams): Observable<IModel<T>[]> {
    const hashParams = hash(queryParams || {});
    if (hashParams in this.observablesByQueryCache) {
      return this.observablesByQueryCache[hashParams];
    }

    this.actions.fetchAll(queryParams).invoke();

    const observable = BaseService
      .getStateObservable()
      .map((state) => this.selectors.getItems(state, queryParams))
      .distinctUntilChanged()
      .map(items => (items != null && "toJS" in items) ? items.toJS() : items)
      .shareReplay(1);

    this.observablesByQueryCache[hashParams] = observable;

    return observable;
  }

  public getAll(): Observable<IModel<T>[]> {
    const observable = BaseService
      .getStateObservable()
      .map((state) => this.selectors.getAllItems(state).valueSeq())
      .distinctUntilChanged()
      .shareReplay(1);

    observable
      .take(1)
      .subscribe(() => this.actions.fetchAll());

    return observable;
  }

  /**
   * Get the default query params object to use when querying for the Model associated to this DataService.
   *
   * @returns any
   */
  public getDefaultQueryParams(): Observable<any> {
    return of$({});
  }

  // --------------------
  //        TYPES
  // --------------------

  public createTypes(): IActionTypes {
    const types = super.createTypes();
    return {
      ...types,
      CREATE_RECORD: this.makeActionType("CREATE_RECORD"),
      DELETE_RECORD: this.makeActionType("DELETE_RECORD"),
      FETCH_ALL: this.makeActionType("FETCH_ALL"),
      FETCH_RECORD: this.makeActionType("FETCH_RECORD"),
      PATCH_RECORD: this.makeActionType("PATCH_RECORD"),
      PUSH_ALL: this.makeActionType("PUSH_ALL"),
      PUSH_RECORD: this.makeActionType("PUSH_RECORD"),
      UNLOAD_ALL: this.makeActionType("UNLOAD_ALL"),
      UNLOAD_RECORD: this.makeActionType("UNLOAD_RECORD"),
      UPDATE_RECORD: this.makeActionType("UPDATE_RECORD"),
      SET_FIELD: this.makeActionType("SET_FIELD"),
      SET_META_FIELD: this.makeActionType("SET_META_FIELD"),
      SET_RELATIONSHIP: this.makeActionType("SET_RELATIONSHIP"),
      SET_QUERY_RESPONSE: this.makeActionType("SET_QUERY_RESPONSE"),
    };
  }

  // --------------------
  //      ACTIONS
  // --------------------

  public createActions(): IActionCreators {
    const actions = super.createActions();

    return {
      ...actions,
      createRecord: this.makeActionCreator<IModelId, IPostActionHandlers>(this.types.CREATE_RECORD),
      deleteRecord: this.makeActionCreator<IModelId, IPostActionHandlers>(this.types.DELETE_RECORD),
      fetchAll: this.makeActionCreator<IQueryBuilder, IPostActionHandlers & IForceReload>(this.types.FETCH_ALL),
      fetchRecord: this.makeActionCreator<IModelId, IPostActionHandlers & IForceReload>(this.types.FETCH_RECORD),
      patchRecord: this.makeActionCreator<Partial<T>, IPostActionHandlers>(this.types.PATCH_RECORD),
      pushAll: this.makeActionCreator(this.types.PUSH_ALL),
      pushRecord: this.makeActionCreator<IModel<T>>(this.types.PUSH_RECORD),
      unloadAll: this.makeActionCreator<undefined>(this.types.UNLOAD_ALL),
      unloadRecord: this.makeActionCreator<IModelId>(this.types.UNLOAD_RECORD),
      updateRecord: this.makeActionCreator<IModelId, IPostActionHandlers>(this.types.UPDATE_RECORD),
      setField: this.makeActionCreator<ISetField<T>>(this.types.SET_FIELD),
      setMetaField: this.makeActionCreator<ISetMetaField<T>>(this.types.SET_META_FIELD),
      setRelationship: this.makeActionCreator<ISetField<T>>(this.types.SET_RELATIONSHIP),
      setQueryResponse: this.makeActionCreator<IQueryCache>(this.types.SET_QUERY_RESPONSE),
    };
  }

  // ---------------------
  //       SELECTORS
  // ---------------------

  public createSelectors(): ISelectors {
    const selectors = super.createSelectors();
    const { getServiceState } = selectors;

    const getAllItems = createSelector(getServiceState, (store: IDataServiceStateRecord<T>) => store.items);

    const getRequestCache = createCachedSelector(
      getServiceState,
      (state, query: IQueryBuilder) => query,
      (store, query: IQueryBuilder) => store.requestCache.get(query.getHashCode()),
    )((state, query: IQueryBuilder) => query.getHashCode());

    const getItems = createCachedSelector(
      getAllItems,
      (state, query: IQueryBuilder) => getRequestCache(state, query),
      (items, requestCache: IQueryCache) => requestCache ? requestCache.response.ids.map(id => items.get(id)) : null,
    )((state, query: IQueryBuilder) => query.getHashCode());

    const getItemsByIds = createCachedSelector(
      (state, ids) => ids,
      getAllItems,
      (ids, items) =>
        ids
          .map((id) => items.get(id))
          .filter((item) => item != null)
      ,
    )((state, ids) => JSON.stringify(ids.sort()));

    const getItem = createCachedSelector(
      getAllItems,
      (state, id) => id,
      (items, id) => items.get(id),
    )((state, id) => id);

    return {
      ...selectors,
      getAllItems,
      getItem,
      getItems,
      getItemsByIds,
      getRequestCache,
    };
  }

  // ---------------------
  //       REDUCERS
  // ---------------------

  public createReducers() {
    const reducers = super.createReducers();

    return {
      ...reducers,
      [this.types.FETCH_ALL]: fetchAllReducer,
      [this.types.PUSH_ALL]: pushAllReducer,
      [this.types.PUSH_RECORD]: pushRecordReducer,
      [this.types.UNLOAD_ALL]: unloadAllReducer,
      [this.types.UNLOAD_RECORD]: unloadRecordReducer,
      [this.types.SET_FIELD]: setFieldReducer,
      [this.types.SET_META_FIELD]: setMetaFieldReducer,
      [this.types.SET_RELATIONSHIP]: setRelationshipReducer,
      [this.types.SET_QUERY_RESPONSE]: setQueryResponseReducer,
    };
  }

  // ---------------------
  //        EPICS
  // ---------------------

  public createEpics(): IActionEpic[] {
    const epics = super.createEpics();

    epics.push(
      this.fetchAllEpic.bind(this),
      this.fetchRecordEpic.bind(this),
      this.createRecordEpic.bind(this),
      this.updateRecordEpic.bind(this),
      this.patchRecordEpic.bind(this),
      this.deleteRecordEpic.bind(this),
    );

    return epics;
  }

  public fetchAllEpic(action$: IObservableAction<IQueryBuilder, IPostActionHandlers & IForceReload>, store: Store<IDataServiceStateRecord<T>>) {
    return action$.ofType(this.types.FETCH_ALL)
      .filter((action) => shouldFetchAll(this.selectors.getServiceState(store.getState()), action))
      .mergeMap((action) =>
        this.adapter.fetchAll(this.serializer.serializeQueryParams(action.payload.queryParams))
          .mergeMap(async (response: IRawQueryResponse<any> ) => await this.mapper.normalizeQueryResponse(response))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(({ items }) => this.actions.pushAll({ items }))
          .concat(({items, ...response}) => of$(this.actions.setQueryResponse({ query: action.payload, response })))
          .catch((e) => of$(
            this.actions.setErrors({ errors: e.xhr.response }, { queryParams: action.payload }),
          )),
      );
  }

  public fetchRecordEpic(action$: IObservableAction, store: Store<IDataServiceStateRecord<T>>): Observable<IAction<T>> {
    return action$.ofType(this.types.FETCH_RECORD)
      .filter(action => this.shouldFetchItem(action, store.getState()))
      .mergeMap(action =>
        this.adapter.fetchItem(action.payload.id)
          .mergeMap(async response => await this.serializer.deserialize(response))
          .mergeMap(async normalizedResponse => await this.mapper.normalize(normalizedResponse))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          )),
      );
  }

  public createRecordEpic(action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<T>>) {
    return action$.ofType(this.types.CREATE_RECORD)
      .mergeMap(action =>
        of$(this.selectors.getItem(store.getState(), action.payload.id))
          .mergeMap(async model => await this.mapper.transform(model))
          .mergeMap(async mappedModel => await this.serializer.serialize(mappedModel as R))
          .mergeMap(serializedModel => this.adapter.createItem(serializedModel))
          .mergeMap(async response => await this.serializer.deserialize(response))
          .mergeMap(async normalizedResponse => await this.mapper.normalize(normalizedResponse))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .concat(of$(this.actions.unloadRecord(action.payload)))
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response || e }),
          )),
      );
  }

  public updateRecordEpic(action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<T>>) {
    return action$.ofType(this.types.UPDATE_RECORD)
      .mergeMap((action) =>
        of$(this.selectors.getItem(store.getState(), action.payload.id))
          .mergeMap(async model => await this.mapper.transform(model))
          .mergeMap(async mappedModel => await this.serializer.serialize(mappedModel as R))
          .mergeMap(model => this.adapter.updateItem(action.payload.id, model))
          .mergeMap(async response => await this.serializer.deserialize(response))
          .mergeMap(async normalizedResponse => await this.mapper.normalize(normalizedResponse))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          )),
      );
  }

  public patchRecordEpic(action$: IObservableAction<Partial<T>>) {
    return action$.ofType(this.types.PATCH_RECORD)
      .mergeMap(action =>
        of$(action.payload)
          .mergeMap(async model => await this.mapper.transform(model))
          .mergeMap(async mappedModel => await this.serializer.serialize(mappedModel as R))
          .mergeMap(serializedModel => this.adapter.patchItem(action.payload.id, serializedModel))
          .mergeMap(async (response) => await this.serializer.deserialize(response))
          .mergeMap(async normalizedResponse => await this.mapper.normalize(normalizedResponse))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          )),
      );
  }

  public deleteRecordEpic(action$: IObservableAction<IModelId>) {
    return action$.ofType(this.types.DELETE_RECORD)
      .mergeMap((action) => (
        this.adapter.deleteItem(action.payload.id)
          .mergeMap(async (response) => await this.serializer.deserialize(response))
          .mergeMap(async normalizedResponse => await this.mapper.normalize(normalizedResponse))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          ))
      ));
  }

  private shouldFetchItem = (action, state) =>
    this.selectors.getItem(state, action.payload.id) == null
    || (action.meta && action.meta.forceReload)
}
