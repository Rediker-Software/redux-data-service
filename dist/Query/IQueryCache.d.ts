import { IQueryBuilder } from "./QueryBuilder";
import { IQueryResponse } from "./IQueryResponse";
export interface IQueryCache {
    query: IQueryBuilder;
    response?: IQueryResponse;
    isLoading?: boolean;
    errors?: any;
}
