import { IQueryParams } from "../Query";
import { ISerializer } from ".";

/**
 * An in-memory ISerializer implementation for testing and local development purposes.
 */
export class MemorySerializer<S = any, R = any> implements ISerializer<S, R> {

  public async serialize(model: R): Promise<S> {
    return model as any;
  }

  public async deserialize(data: S): Promise<R> {
    return data as any;
  }

  public async serializeQueryParams(queryParams: IQueryParams): Promise<IQueryParams> {
    return queryParams;
  }
}
