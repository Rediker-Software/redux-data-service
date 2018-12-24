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

import { List, Map, Record } from "immutable";
import { uniqueId } from "lodash";
import * as hash from "object-hash";
import { Store } from "redux";
import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";

import { getConfiguration } from "../Configure";
import { IModel, IModelData, IModelMeta, IModelFactory } from "../Model";
import { ISerializer, ISerializerFactory } from "../Serializers";
import { IAdapter, IAdapterFactory } from "../Adapters/IAdapter";

import { BaseService } from "./BaseService";
import { IAction, IActionCreators, IActionTypes, IObserveableAction, ISelectors, IActionEpic } from "./IService";
import { IMapperFactory, IMapper } from "../Mapper";

export type IRequestCacheKey = string;

export interface IRequestCache {
  isLoading: boolean;
  errors: string[] | string | any | null;
  ids: List<string>;
}

export type IRequestCacheRecord = Record<IRequestCache> & Readonly<IRequestCache>;

export interface IDataServiceState<T extends IModelData> {
  items: Map<string, IModel<T>>;
  requestCache: Map<IRequestCacheKey, IRequestCacheRecord>;
}

export interface IPostActionHandlers {
  onSuccess?: (data: any) => void;
  onError?: (errors: any) => void;
}

export type DataServiceStateRecord<T extends IModelData> =
  Record<IDataServiceState<T>>
  & Readonly<IDataServiceState<T>>;

export const RequestCacheRecord = Record<IRequestCache>({
  isLoading: false,
  errors: null,
  ids: List(),
});

export interface IPushAll<T extends IModelData> {
  items: IModel<T>[];
}

export interface ISetField<T extends IModelData> {
  id: string;
  fieldName: keyof T;
  value: any;
}

export interface ISetMetaField<T extends IModelData> {
  id: string;
  fieldName: keyof IModelMeta<T>;
  value: any;
}

export interface IModelId {
  id: string;
}

export interface IForceReload {
  forceReload: boolean;
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
export abstract class DataService<T extends IModelData, R = T> extends BaseService<DataServiceStateRecord<T>> {
  public abstract readonly ModelClass: IModelFactory<T>;
  protected readonly AdapterClass: IAdapterFactory<any>;
  protected readonly MapperClass: IMapperFactory<any>;
  protected readonly SerializerClass: ISerializerFactory<any, T, R>;

  protected _adapter: IAdapter<any>;
  protected _mapper: IMapper<any>;
  protected _serializer: ISerializer<any, T, R>;
  
  protected shadowObject: IModel<T> = null;
  protected observablesByIdCache: { [id: string]: Observable<IModel<T>> } = {};
  protected observablesByIdsCache: { [id: string]: Observable<IModel<T>[]> } = {};
  protected observablesByQueryCache: { [id: string]: Observable<IModel<T>[]> } = {};

  private readonly DataServiceStateRecord = Record<IDataServiceState<T>>({
    items: Map<string, IModel<T>>(),
    requestCache: Map<IRequestCacheKey, IRequestCacheRecord>(),
  });

  public get adapter() {
    if (!this._adapter) {
      const Adapter = this.AdapterClass || getConfiguration().adapter;
      this._adapter = new Adapter(this.name);
    }

    return this._adapter;
  }

  public get mapper() {
    if (!this._mapper) {
      const Mapper = this.MapperClass || getConfiguration().mapper;
      this._mapper = new Mapper(this.ModelClass);
    }

    return this._mapper;
  }

  public get serializer() {
    if (!this._serializer) {
      const Serializer = this.SerializerClass || getConfiguration().serializer;
      this._serializer = new Serializer(this.ModelClass);
    }

    return this._serializer;
  }

  public getDefaultState(): DataServiceStateRecord<T> {
    return new this.DataServiceStateRecord();
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
      .map((state) => this.selectors.getItem(state, id))
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
      SET_ERRORS: this.makeActionType("SET_ERRORS"),
      UNLOAD_ALL: this.makeActionType("UNLOAD_ALL"),
      UNLOAD_RECORD: this.makeActionType("UNLOAD_RECORD"),
      UPDATE_RECORD: this.makeActionType("UPDATE_RECORD"),
      SET_FIELD: this.makeActionType("SET_FIELD"),
      SET_META_FIELD: this.makeActionType("SET_META_FIELD"),
      SET_RELATIONSHIP: this.makeActionType("SET_RELATIONSHIP"),
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
      fetchAll: this.makeActionCreator<any, IPostActionHandlers & IForceReload>(this.types.FETCH_ALL),
      fetchRecord: this.makeActionCreator<IModelId, IPostActionHandlers & IForceReload>(this.types.FETCH_RECORD),
      patchRecord: this.makeActionCreator<Partial<T>, IPostActionHandlers>(this.types.PATCH_RECORD),
      pushAll: this.makeActionCreator(this.types.PUSH_ALL),
      pushRecord: this.makeActionCreator<IModel<T>>(this.types.PUSH_RECORD),
      setErrors: this.makeActionCreator(this.types.SET_ERRORS),
      unloadAll: this.makeActionCreator<undefined>(this.types.UNLOAD_ALL),
      unloadRecord: this.makeActionCreator<IModelId>(this.types.UNLOAD_RECORD),
      updateRecord: this.makeActionCreator<IModelId, IPostActionHandlers>(this.types.UPDATE_RECORD),
      setField: this.makeActionCreator<ISetField<T>>(this.types.SET_FIELD),
      setMetaField: this.makeActionCreator<ISetMetaField<T>>(this.types.SET_META_FIELD),
      setRelationship: this.makeActionCreator<ISetMetaField<T>>(this.types.SET_RELATIONSHIP),
    };
  }

  // ---------------------
  //       SELECTORS
  // ---------------------

  public createSelectors(): ISelectors {
    const selectors = super.createSelectors();
    const { getServiceState } = selectors;

    const getAllItems = createSelector(getServiceState, (store: DataServiceStateRecord<T>) => store.items);

    const getRequestCache = createCachedSelector(
      getServiceState,
      (state, queryParams) => queryParams,
      (store, queryParams) => store.requestCache.get(hash(queryParams || {})),
    )((state, queryParams) => hash(queryParams || {}));

    const getItems = createCachedSelector(
      getAllItems,
      (state, queryParams) => getRequestCache(state, queryParams),
      (items, requestCache: IRequestCache) => requestCache ? requestCache.ids.map(id => items.get(id)).valueSeq() : null,
    )((state, queryParams) => hash(queryParams || {}));

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
      [this.types.FETCH_ALL]: this.fetchAllReducer,
      [this.types.PUSH_ALL]: this.pushAllReducer,
      [this.types.PUSH_RECORD]: this.pushRecordReducer,
      [this.types.UNLOAD_ALL]: this.unloadAllReducer,
      [this.types.UNLOAD_RECORD]: this.unloadRecordReducer,
      [this.types.SET_FIELD]: this.setFieldReducer,
      [this.types.SET_META_FIELD]: this.setMetaFieldReducer,
      [this.types.SET_RELATIONSHIP]: this.setRelationshipReducer,
    };
  }

  public fetchAllReducer = (state: DataServiceStateRecord<T>, action: IAction<any>) =>
    state.update("requestCache", (requestCache) => (
      requestCache.update(JSON.stringify(action.payload), (requestCacheRecord) => (
        requestCacheRecord
          ? (
            this.shouldFetchAll(action, state)
              ? requestCacheRecord.set("isLoading", true)
              : requestCacheRecord
          )
          : new RequestCacheRecord({ isLoading: true })
      ))
    ))

  public pushAllReducer = (state: DataServiceStateRecord<T>, action: IAction<IPushAll<T>>) => state.withMutations((record) => {
    const ids = [];
    record.update("items", (items) => items.withMutations((itemsMap) => {
      action.payload.items.forEach((item) => {
        itemsMap.update(item.id, () => item);
        ids.push(item.id);
      });
    }));
    record.update("requestCache", (requestCache) =>
      requestCache.set(hash(action.meta.queryParams || {}), new RequestCacheRecord({ ids: List(ids) })),
    );
  })

  public pushRecordReducer = (state: DataServiceStateRecord<T>, action: IAction<IModel<T>>) => state.withMutations((record) => {
    const item = action.payload;
    record.set("items", record.items.update(item.id, () => item));
  })

  public unloadAllReducer = (state: DataServiceStateRecord<T>) => {
    state.items.forEach((oldModel) => {
      oldModel.markForDestruction();
    });
    return this.getDefaultState();
  }

  public unloadRecordReducer = (state: DataServiceStateRecord<T>, action: IAction<IModelId>) =>
    state.withMutations((record) => {
      const { id } = action.payload;
      const oldModel = record.items.get(id);
      if (oldModel) {
        oldModel.markForDestruction();
      }
      record.set("items", record.items.delete(id));
    })

  public setErrorsReducer = (state: DataServiceStateRecord<T>, action: IAction) =>
    state.withMutations((record) =>
      record.update("requestCache", (requestCache) =>
        requestCache.update(hash(action.meta.queryParams || {}), (requestCacheRecord) =>
          requestCacheRecord && requestCacheRecord.set("errors", action.payload.errors),
        ),
      ),
    )

  public setFieldReducer = (state: DataServiceStateRecord<T>, action: IAction<ISetField<T>>) =>
    state.withMutations((record) => {
      const { id, fieldName, value } = action.payload;
      if (record.items.has(id)) {
        record.update("items", (items) => items.update(id, (item: IModel<T>) => {
          return item.applyUpdates({ [fieldName]: value } as Partial<T>);
        }));
      } else if (process.env.NODE_ENV !== "production") {
        // tslint:disable-next-line
        console.warn(`${this.name}: setFieldReducer - attempted to set "${value}" on field "${fieldName}" for unknown id "${id}"`);
      }
    })

  public setMetaFieldReducer = (state: DataServiceStateRecord<T>, action: IAction<ISetMetaField<T>>) =>
    state.withMutations((record) => {
      const { id, fieldName, value } = action.payload;
      if (record.items.has(id)) {
        record.update("items", (items) => items.update(id, (item: IModel<T>) => {
          return item.applyUpdates(null, { [fieldName]: value });
        }));
      }
    })

  public setRelationshipReducer = (state: DataServiceStateRecord<T>, action: IAction<ISetField<T>>) =>
    state.withMutations((record) => {
      const { id, fieldName, value } = action.payload;
      if (record.items.has(id)) {
        record.update("items", (items) => items.update(id, (item: IModel<T>) => {
          return item.applyUpdates(undefined, undefined, { [fieldName]: value });
        }));
      } else if (process.env.NODE_ENV !== "production") {
        // tslint:disable-next-line
        console.warn(`${this.name}: setRelationshipReducer - attempted to set "${value}" on field "${fieldName}" for unknown id "${id}"`);
      }
    })

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

  public fetchAllEpic(action$: IObserveableAction, store: Store<DataServiceStateRecord<T>>) {
    return action$.ofType(this.types.FETCH_ALL)
      .filter((action) => this.shouldFetchAll(action, store.getState()))
      .mergeMap((action) =>
        this.adapter.fetchAll(action.payload)
          .mergeMap(async ({ items, ...other }) => {
            const promises = items.map(item => this.serializer.deserialize(item));
            return {
              ...other,
              items: await Promise.all(promises),
            };
          })
          .do(action.meta.onSuccess, action.meta.onError)
          .map(data => this.actions.pushAll(data, { queryParams: action.payload }))
          .catch((e) => of$(
            this.actions.setErrors({ errors: e.xhr.response }, { queryParams: action.payload }),
          )),
      );
  }

  public fetchRecordEpic(action$: IObserveableAction, store: Store<DataServiceStateRecord<T>>): Observable<IAction<T>> {
    return action$.ofType(this.types.FETCH_RECORD)
      .filter(action => this.shouldFetchItem(action, store.getState()))
      .mergeMap(action =>
        this.adapter.fetchItem(action.payload.id)
          .mergeMap(async response => await this.serializer.deserialize(response))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          )),
      );
  }

  public createRecordEpic(action$: IObserveableAction<IModelId>, store: Store<DataServiceStateRecord<T>>) {
    return action$.ofType(this.types.CREATE_RECORD)
      .mergeMap(action =>
        of$(this.selectors.getItem(store.getState(), action.payload.id))
          .mergeMap(async model => await this.serializer.serialize(model))
          .mergeMap(serializedModel => this.adapter.createItem(serializedModel))
          .mergeMap(async response => await this.serializer.deserialize(response))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .concat(of$(this.actions.unloadRecord(action.payload)))
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response || e }),
          )),
      );
  }

  public updateRecordEpic(action$: IObserveableAction<IModelId>, store: Store<DataServiceStateRecord<T>>) {
    return action$.ofType(this.types.UPDATE_RECORD)
      .mergeMap((action) =>
        of$(this.selectors.getItem(store.getState(), action.payload.id))
          .mergeMap(async model => await this.serializer.serialize(model))
          .mergeMap(model => this.adapter.updateItem(action.payload.id, model))
          .mergeMap(async response => await this.serializer.deserialize(response))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          )),
      );
  }

  public patchRecordEpic(action$: IObserveableAction<Partial<T>>) {
    return action$.ofType(this.types.PATCH_RECORD)
      .mergeMap(action =>
        of$(action.payload)
          .mergeMap(async model => await this.serializer.serialize(model))
          .mergeMap(serializedModel => this.adapter.patchItem(action.payload.id, serializedModel))
          .mergeMap(async (response) => await this.serializer.deserialize(response))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          )),
      );
  }

  public deleteRecordEpic(action$: IObserveableAction<IModelId>) {
    return action$.ofType(this.types.DELETE_RECORD)
      .mergeMap((action) => (
        this.adapter.deleteItem(action.payload.id)
          .mergeMap(async (response) => await this.serializer.deserialize(response))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(this.actions.pushRecord)
          .catch((e) => of$(
            this.actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
          ))
      ));
  }

  protected shouldFetchAll(action, state) {
    const requestCache = this.selectors.getRequestCache(state, action.payload);
    return requestCache == null || requestCache.ids.isEmpty() || (action.meta && action.meta.forceReload);
  }

  private shouldFetchItem = (action, state) =>
    this.selectors.getItem(state, action.payload.id) == null
    || (action.meta && action.meta.forceReload)
}
