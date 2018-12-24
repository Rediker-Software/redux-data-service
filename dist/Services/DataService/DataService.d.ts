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
import { Store } from "redux";
import { IModel, IModelData, IModelFactory } from "../../Model/IModel";
import { ISerializer, ISerializerFactory } from "../../Serializers/ISerializer";
import { IAdapter, IAdapterFactory } from "../../Adapters/IAdapter";
import { IMapperFactory, IMapper } from "../../Mapper/IMapper";
import { IQueryBuilder } from "../../Query/QueryBuilder";
import { BaseService } from "../BaseService";
import { IAction, IActionCreators, IActionTypes, IObservableAction, ISelectors, IActionEpic } from "../IService";
import { IDataServiceStateRecord } from "./DataServiceStateRecord";
import { IForceReload } from "./IForceReload";
import { IPostActionHandlers } from "./IPostActionHandlers";
export interface IModelId {
    id: string;
}
export declare abstract class DataService<T extends IModelData, R = T> extends BaseService<IDataServiceStateRecord<T>> {
    abstract readonly ModelClass: IModelFactory<T>;
    protected readonly AdapterClass: IAdapterFactory<any>;
    protected readonly MapperClass: IMapperFactory<any>;
    protected readonly SerializerClass: ISerializerFactory<any, R>;
    protected _adapter: IAdapter<any>;
    protected _mapper: IMapper<any>;
    protected _serializer: ISerializer<any, R>;
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
    readonly adapter: IAdapter<any>;
    readonly mapper: IMapper<any, any>;
    readonly serializer: ISerializer<any, R>;
    getDefaultState(): IDataServiceStateRecord<T>;
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
    createEpics(): IActionEpic[];
    fetchAllEpic(action$: IObservableAction<IQueryBuilder, IPostActionHandlers & IForceReload>, store: Store<IDataServiceStateRecord<T>>): Observable<{} | IAction<any, any>>;
    fetchRecordEpic(action$: IObservableAction, store: Store<IDataServiceStateRecord<T>>): Observable<IAction<T>>;
    createRecordEpic(action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<T>>): Observable<IAction<any, any>>;
    updateRecordEpic(action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<T>>): Observable<IAction<any, any>>;
    patchRecordEpic(action$: IObservableAction<Partial<T>>): Observable<IAction<any, any>>;
    deleteRecordEpic(action$: IObservableAction<IModelId>): Observable<IAction<any, any>>;
    private shouldFetchItem;
}
