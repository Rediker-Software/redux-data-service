import { IQueryBuilder } from "./QueryBuilder";
import { IQueryResponse } from "./IQueryResponse";
import {getDataService} from "../Services";

export interface IQueryManager<T> extends Iterable<T> {
  readonly query: IQueryBuilder;
  readonly response: IQueryResponse;
  readonly isLoading: boolean;
  readonly errors: any;
  readonly length: number;
  hasNextPage: () => boolean;
  hasPreviousPage: () => boolean;
  getNextPage: () => IQueryBuilder;
  getPreviousPage: () => IQueryBuilder;
}

export interface IQueryManagerMeta {
  isLoading?: boolean;
  errors?: any;
}

export class QueryManager<T> implements IQueryManager<T> {
  public readonly query: IQueryBuilder;
  public readonly response: IQueryResponse;
  protected readonly meta: IQueryManagerMeta;

  public constructor(query: IQueryBuilder, response?: IQueryResponse, meta?: IQueryManagerMeta) {
    this.query = query;
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
      return this.response != null;
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

  public *[Symbol.iterator](): Iterator<T> {
    let items = [];

    getDataService(this.query.serviceName)
      .getByIds(this.response.ids)
      .take(1)
      .subscribe(models => items = models);

    return items.forEach(item => yield item);
  }

}
