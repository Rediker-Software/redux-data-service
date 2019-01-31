import { IQueryParams } from "../Query";
import { ISerializer } from "./ISerializer";

/**
 * An in-memory ISerializer implementation for testing and local development purposes.
 */
export class MemorySerializer<T = any, S = any> implements ISerializer<T, S> {

  public async serialize(model: T): Promise<S> {
    return model as any;
  }

  public async deserialize(data: S | T): Promise<T> {
    return data as any;
  }

  public async serializeQueryParams(queryParams: IQueryParams): Promise<IQueryParams> {
    return queryParams;
  }
}
