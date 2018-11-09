import * as hash from "object-hash";
import { isEmpty, merge } from "lodash";

import { getDataService } from "../Services";

export type SortDirection = "asc" | "desc";

export interface ISort {
  [key: string]: SortDirection;
}

export type FilterValue = string | number | boolean;

export interface IQueryBuilder {
  /** The name of the Redux data service being queried */
  readonly serviceName: string;

  /** The current set of query params. DO NOT MUTATE THIS OBJECT DIRECTLY! */
  readonly queryParams: IQueryParams;

  /** Add the given sorting param to the query. Default SortDirection is "asc". */
  sort: (key: string, direction?: SortDirection) => IQueryBuilder;

  /** Remove the given sorting param from the query. */
  removeSort: (key: string) => IQueryBuilder;

  /** Add the given filtering criteria to the query. */
  filter: (key: string, value: FilterValue | FilterValue[]) => IQueryBuilder;

  /** Remove the given filtering criteria from the query. */
  removeFilter: (key: string) => IQueryBuilder;

  /** Set which page number to use in the query. */
  page: (pageNumber: number) => IQueryBuilder;

  /** Set the query's page size. */
  pageSize: (pageSize: number) => IQueryBuilder;

  /** Get a unique hashcode specific to the current queryParams */
  getHashCode: () => string;

  /** Trigger the query by dispatching an action to the Redux data service. */
  invoke: () => void;
}

export interface IQueryParams {
  sort?: ISort;
  page?: number;
  pageSize?: number;

  [key: string]: FilterValue | FilterValue[] | ISort;
}

/**
 * Uses the builder pattern for building up a query to the data source (such as a query to a REST API).
 *
 * Example usage:
 *
 * ```
 * const queryBuilder = new QueryBuilder("student");
 *
 * queryBuilder
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
 * For example, if using a UrlQueryMapper, it would return a string as query params in the following format:
 * ```
 * ?firstName=Bob&state=MA&page=2&pageSize=100&sort=lastName,age:desc
 * ```
 *
 * Extend the QueryMapper as needed for your data source / API to change how the query built from
 * QueryBuilder is transformed.
 *
 * Note that QueryBuilder is immutable. Each of the builder methods will return a new QueryBuilder instance.
 */
export class QueryBuilder implements IQueryBuilder {
  public readonly serviceName: string;
  public readonly queryParams: IQueryParams;
  private hashCode: string;

  public constructor(serviceName: string, queryParams: IQueryParams = {}) {
    this.serviceName = serviceName;
    this.queryParams = queryParams;
  }

  public filter(key: string, value: (FilterValue | FilterValue[])): IQueryBuilder {
    const queryParams = {
      ...this.queryParams,
      [key]: value,
    };

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public removeFilter(key: string): IQueryBuilder {
    const queryParams = {
      ...this.queryParams,
    };

    delete queryParams[key];

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public page(pageNumber: number): IQueryBuilder {
    const queryParams = {
      ...this.queryParams,
      page: pageNumber,
    };

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public pageSize(pageSize: number): IQueryBuilder {
    const queryParams = {
      ...this.queryParams,
      pageSize,
    };

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public sort(key: string, direction: SortDirection = "asc"): IQueryBuilder {
    const queryParams = merge({}, this.queryParams, {
      sort: {
        [key]: direction,
      },
    });

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public removeSort(key: string): IQueryBuilder {
    const queryParams = {
      ...this.queryParams,
    };

    if ("sort" in queryParams) {
      delete queryParams.sort[key];
      if (isEmpty(queryParams.sort)) {
        delete queryParams.sort;
      }
    }

    return new QueryBuilder(this.serviceName, queryParams);
  }

  public invoke(): void {
    getDataService(this.serviceName)
      .actions
      .fetchAll(this)
      .invoke();
  }

  public getHashCode(): string {
    if (!this.hashCode) {
      this.hashCode = hash(this.queryParams);
    }

    return this.hashCode;
  }

}
