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
import { Subscriber } from "rxjs/Subscriber";
import { Store } from "redux";
import { IModel, IModelData, IModelFactory } from "../../Model/IModel";
import { ISerializer, ISerializerFactory } from "../../Serializers/ISerializer";
import { IAdapter, IAdapterFactory } from "../../Adapters/IAdapter";
import { IMapperFactory, IMapper } from "../../Mapper/IMapper";
import { IQueryBuilder, IQueryManager } from "../../Query";
import { BaseService } from "../BaseService";
import { IActionCreators, IActionEpic, IActionTypes, IObservableAction, ISelectors } from "../IService";
import { IDataServiceStateRecord } from "./DataServiceStateRecord";
import { IForceReload } from "./IForceReload";
import { IPostActionHandlers } from "./IPostActionHandlers";
export interface IModelId {
    id: string;
    progressSubscriber?: Subscriber<any>;
}
export declare abstract class DataService<T extends IModelData, R = T> extends BaseService<IDataServiceStateRecord<T>> {
    abstract readonly ModelClass: IModelFactory<T>;
    protected readonly AdapterClass: IAdapterFactory<any>;
    protected readonly MapperClass: IMapperFactory<T, R>;
    protected readonly SerializerClass: ISerializerFactory<T, any>;
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
        [id: string]: Observable<IQueryManager<T>>;
    };
    readonly adapter: IAdapter<any>;
    readonly mapper: IMapper<any, any>;
    readonly serializer: ISerializer<any, R>;
    getDefaultState(): IDataServiceStateRecord<T>;
    getShadowObject(): IModel<T>;
    createNew(initialData?: Partial<T>): IModel<T>;
    getById(id: string): Observable<IModel<T>>;
    getByIds(ids: string[]): Observable<IModel<T>[]>;
    getByQuery(queryBuilder: IQueryBuilder): Observable<IQueryManager<T>>;
    getAll(): Observable<IModel<T>[]>;
    getDefaultQueryParams(): Observable<any>;
    createTypes(): IActionTypes;
    createActions(): IActionCreators;
    createSelectors(): ISelectors;
    createReducers(): {};
    createEpics(): IActionEpic[];
    fetchAllEpic(action$: IObservableAction<IQueryBuilder, IPostActionHandlers & IForceReload>, store: Store<IDataServiceStateRecord<T>>): Observable<import("../IService").IAction<any, any>>;
    updateRecordEpic(action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<T>>): Observable<import("../IService").IAction<any, any>>;
    patchRecordEpic(action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<T>>): Observable<import("../IService").IAction<any, any>>;
    deleteRecordEpic(action$: IObservableAction<IModelId>): Observable<import("../IService").IAction<any, any>>;
}
