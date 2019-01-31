import { IQueryParams } from "../Query/QueryBuilder";

export interface ISerializer<T, S = any> {
  serialize: (modelData: T) => Promise<S>;
  deserialize: (data: S | T) => Promise<T>;
  serializeQueryParams: (params: IQueryParams) => Promise<any>;
}

export interface ISerializerFactory<S, R> {
  new(ModelClass: S): ISerializer<S, R>;
}
