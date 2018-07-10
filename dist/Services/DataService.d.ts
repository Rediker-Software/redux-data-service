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
import { List, Map, Record } from "immutable";
import { Store } from "redux";
import { IModel, IModelData, IModelMeta, IModelFactory } from "../Model";
import { ISerializer } from "../Serializers";
import { IAdapter } from "../Adapters";
import { BaseService } from "./BaseService";
import { IAction, IActionCreators, IActionTypes, IObserveableAction, ISelectors } from "./IService";
export declare type IRequestCacheKey = string;
export interface IRequestCache {
    isLoading: boolean;
    errors: string[] | string | any | null;
    ids: List<string>;
}
export declare type IRequestCacheRecord = Record<IRequestCache> & Readonly<IRequestCache>;
export interface IDataServiceState<T extends IModelData> {
    items: Map<string, IModel<T>>;
    requestCache: Map<IRequestCacheKey, IRequestCacheRecord>;
}
export interface IPostActionHandlers {
    onSuccess?: (data: any) => void;
    onError?: (errors: any) => void;
}
export declare type DataServiceStateRecord<T extends IModelData> = Record<IDataServiceState<T>> & Readonly<IDataServiceState<T>>;
export declare const RequestCacheRecord: Record.Factory<IRequestCache>;
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
export declare abstract class DataService<T extends IModelData> extends BaseService<DataServiceStateRecord<T>> {
    abstract readonly ModelClass: IModelFactory<T>;
    protected _serializer: ISerializer<T, any>;
    protected _adapter: IAdapter<any>;
    protected shadowObject: IModel<T>;
    protected observablesByIdCache: {
        [id: string]: Observable<IModel<T>>;
    };
    protected observablesByIdsCache: {
        [id: string]: Observable<IModel<T>[]>;
    };
    protected observablesByQueryCache: {
        [id: string]: Observable<IModel<T>[]>;
    };
    private readonly DataServiceStateRecord;
    readonly adapter: IAdapter<any>;
    readonly serializer: ISerializer<T, any>;
    getDefaultState(): DataServiceStateRecord<T>;
    getShadowObject(): IModel<T>;
    createNew(initialData?: Partial<T>): IModel<T>;
    getById(id: string): Observable<IModel<T>>;
    getByIds(ids: string[]): Observable<IModel<T>[]>;
    getByQuery(queryParams: any): Observable<IModel<T>[]>;
    getAll(): Observable<IModel<T>[]>;
    getDefaultQueryParams(): Observable<any>;
    createTypes(): IActionTypes;
    createActions(): IActionCreators;
    createSelectors(): ISelectors;
    createReducers(): {};
    fetchAllReducer: (state: DataServiceStateRecord<T>, action: IAction<any, any>) => DataServiceStateRecord<T>;
    pushAllReducer: (state: DataServiceStateRecord<T>, action: IAction<IPushAll<T>, any>) => DataServiceStateRecord<T>;
    pushRecordReducer: (state: DataServiceStateRecord<T>, action: IAction<IModel<T>, any>) => DataServiceStateRecord<T>;
    unloadAllReducer: (state: DataServiceStateRecord<T>) => DataServiceStateRecord<T>;
    unloadRecordReducer: (state: DataServiceStateRecord<T>, action: IAction<IModelId, any>) => DataServiceStateRecord<T>;
    setErrorsReducer: (state: DataServiceStateRecord<T>, action: IAction<any, any>) => DataServiceStateRecord<T>;
    setFieldReducer: (state: DataServiceStateRecord<T>, action: IAction<ISetField<T>, any>) => DataServiceStateRecord<T>;
    setMetaFieldReducer: (state: DataServiceStateRecord<T>, action: IAction<ISetMetaField<T>, any>) => DataServiceStateRecord<T>;
    setRelationshipReducer: (state: DataServiceStateRecord<T>, action: IAction<ISetField<T>, any>) => DataServiceStateRecord<T>;
    createEpics(): import("../../../../../../Users/jmadson/projects/redux-data-service/node_modules/redux-observable").Epic<IObserveableAction<any>, {}, any>[];
    fetchAllEpic(action$: IObserveableAction, store: Store<DataServiceStateRecord<T>>): Observable<IAction<any, any>>;
    fetchRecordEpic(action$: IObserveableAction, store: Store<DataServiceStateRecord<T>>): Observable<IAction<T>>;
    createRecordEpic(action$: IObserveableAction<IModelId>, store: Store<DataServiceStateRecord<T>>): Observable<IAction<any, any>>;
    updateRecordEpic(action$: IObserveableAction<IModelId>, store: Store<DataServiceStateRecord<T>>): Observable<IAction<any, any>>;
    patchRecordEpic(action$: IObserveableAction<Partial<T>>): Observable<IAction<any, any>>;
    deleteRecordEpic(action$: IObserveableAction<IModelId>): Observable<IAction<any, any>>;
    protected shouldFetchAll(action: any, state: any): any;
    private shouldFetchItem;
}
