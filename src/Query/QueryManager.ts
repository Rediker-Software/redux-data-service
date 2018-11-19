import { IQueryBuilder } from "./QueryBuilder";
import { IQueryResponse } from "./IQueryResponse";
import { IModel, IModelData } from "..";

export interface IQueryManager<T extends IModelData> {
  readonly query: IQueryBuilder;
  readonly response: IQueryResponse;
  readonly isLoading: boolean;
  readonly errors: any;
  readonly length: number;
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

  public get length(): number {
    return this.response
      ? this.response.ids.length
      : 0;
  }

  public get isLoading(): boolean {
    if ("isLoading" in this.meta) {
      return this.meta.isLoading;
    } else {
      return this.response === null;
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
    return this.query.page(
      this.response.nextPage,
    );
  }

  public getPreviousPage(): IQueryBuilder {
    return this.query.page(
      this.response.previousPage,
    );
  }
}
