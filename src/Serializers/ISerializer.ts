import { IQueryParams } from "../Query/QueryBuilder";

export interface ISerializer<S, R = any> {
  serialize: (modelData: R) => Promise<S>;
  deserialize: (data: S) => Promise<R>;
  serializeQueryParams: (params: IQueryParams) => Promise<any>;
}

export interface ISerializerFactory<S, R> {
  new(ModelClass: S): ISerializer<S, R>;
}
