import { IQueryBuilder } from "./QueryBuilder";
import { IQueryResponse } from "./IQueryResponse";
import { IModel, IModelData } from "../Model";
export interface IQueryManager<T extends IModelData> {
    readonly query: IQueryBuilder;
    readonly response: IQueryResponse;
    readonly isLoading: boolean;
    readonly errors: any;
    readonly items: IModel<T>[];
    hasNextPage: () => boolean;
    hasPreviousPage: () => boolean;
    getNextPage: () => IQueryBuilder;
    getPreviousPage: () => IQueryBuilder;
}
export interface IQueryManagerMeta {
    isLoading?: boolean;
    errors?: any;
}
export declare class QueryManager<T extends IModelData> implements IQueryManager<T> {
    readonly query: IQueryBuilder;
    readonly items: IModel<T>[];
    readonly response: IQueryResponse;
    protected readonly meta: IQueryManagerMeta;
    constructor(query: IQueryBuilder, items?: IModel<T>[], response?: IQueryResponse, meta?: IQueryManagerMeta);
    readonly isLoading: boolean;
    readonly errors: any;
    hasNextPage(): boolean;
    hasPreviousPage(): boolean;
    getNextPage(): IQueryBuilder;
    getPreviousPage(): IQueryBuilder;
}
