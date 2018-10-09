import { merge } from "lodash";
import { IModelAPIData } from "../Model";

export type SortDirection = "asc" | "desc";

export interface ISort {
  [key: string]: SortDirection;
}

export type FilterValue = string | number | boolean | ISort;

export interface IQueryBuilder {
  sort: (key: string, direction?: SortDirection) => IQueryBuilder;
  removeSort: (key: string) => IQueryBuilder;
  filter: (key: string, value: FilterValue | FilterValue[]) => IQueryBuilder;
  removeFilter: (key: string) => IQueryBuilder;
  page: (pageNumber: number) => IQueryBuilder;
  pageSize: (pageSize: number) => IQueryBuilder;
  getHashCode: () => string;
  invoke: () => void;
}

export interface IQueryParams<T extends IModelAPIData> {
  sort?: ISort[];
  page?: number;
  pageSize?: number;
  filters?: {[P in keyof T]?: T[P]};
}

/**
 * Uses the builder pattern for building up a query to the data source (such as a query to a REST API).
 *
 * Example usage:
 *
 * ```
 * const queryBuilder = new QueryBuilder("student");
 *
 * student
 *   .filter("firstName", "Bob")
 *   .filter("state", "MA")
 *   .sort("lastName")
 *   .sort("age", "desc")
 *   .page(2)
 *   .pageSize(100)
 *   .invoke();
 * ```
 *
 * Calling `invoke` will dispatch the query to the associated Redux data service, which will use a
 * QueryMapper to transform the query to the correct format for its data source.
 *
 * For example, if using a RestQueryMapper, it would return a string as query params in the following format:
 * ```
 * ?firstName=Bob&state=MA&page=2&pageSize=100&sort=lastName,age:desc
 * ```
 *
 * Extend the QueryMapper as needed for your data source / API.
 */
export class QueryBuilder<T extends IModelAPIData> implements IQueryBuilder {
  public readonly serviceName: string;
  public readonly queryParams: IQueryParams<T>;

  public constructor(serviceName: string, queryParams: IQueryParams<T> = {}) {
    this.serviceName = serviceName;
    this.queryParams = queryParams;
  }

  public filter(key: string, value: (FilterValue | FilterValue[])): IQueryBuilder {
    const queryParams = merge({}, this.queryParams, {
      filters: {
        [key]: value,
      },
    });

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public page(pageNumber: number): IQueryBuilder {
    const queryParams = {
      ...this.queryParams,
      page: pageNumber,
    };

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public page: (pageNumber: number) => IQueryBuilder;
  public pageSize: (pageSize: number) => IQueryBuilder;
  public removeFilter: (key: string) => IQueryBuilder;
  public removeSort: (key: string) => IQueryBuilder;
  public sort: (key: string, direction?: SortDirection) => IQueryBuilder;

  public invoke: () => void;
  public getHashCode: () => string;

}
