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

/**
 * Manages the data associated with a query.
 * Holds immutable readonly fields for an IQueryBuilder, an array of IModel item results, an IQueryResponse, and an IQueryManagerMeta
 * Each QueryManager instance should be treated as an immutable object, a new instance should be created when query data changes.
 */
export class QueryManager<T extends IModelData> implements IQueryManager<T> {
  public readonly query: IQueryBuilder;
  public readonly items: IModel<T>[];
  public readonly response: IQueryResponse;
  protected readonly meta: IQueryManagerMeta;

  public constructor(query: IQueryBuilder, items?: IModel<T>[], response?: IQueryResponse, meta?: IQueryManagerMeta) {
    this.query = query;
    this.items = items;
    this.response = response;
    this.meta = meta;
  }

  public get isLoading(): boolean {
    if (this.meta && "isLoading" in this.meta) {
      return this.meta.isLoading;
    } else {
      return this.response == null;
    }
  }

  public get errors(): any {
    return this.meta.errors;
  }

  public hasNextPage(): boolean {
    return this.response && this.response.nextPage > 0;
  }

  public hasPreviousPage(): boolean {
    return this.response && this.response.previousPage > 0;
  }

  public getNextPage(): IQueryBuilder {
    return this.hasNextPage()
      ? this.query.page(this.response.nextPage)
      : null;
  }

  public getPreviousPage(): IQueryBuilder {
    return this.hasPreviousPage()
      ? this.query.page(this.response.previousPage)
      : null;
  }
}
