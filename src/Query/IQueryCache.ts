import { IQueryBuilder } from "./QueryBuilder";
import { IQueryResponse } from "./IQueryResponse";

/**
 * Holds information about a query, including the query's response and metadata.
 */
export interface IQueryCache {
  query: IQueryBuilder;
  response?: IQueryResponse;
  isLoading?: boolean;
  errors?: any;
}
