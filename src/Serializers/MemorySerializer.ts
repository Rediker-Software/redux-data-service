import { IModel, IModelData } from "../Model";
import { IQueryParams } from "../Query";
import { BaseSerializer } from "./BaseSerializer";

/**
 * An in-memory ISerializer implementation for testing and local development purposes.
 */
export class MemorySerializer<T extends IModelData, R = T> extends BaseSerializer<Partial<R>, T, R> {

  public async serialize(model: IModel<T> | Partial<T>): Promise<Partial<R>> {
    return await this.transform(model);
  }

  public async deserialize(data: Partial<R>): Promise<IModel<T>> {
    return await this.normalize(data);
  }

  public async serializeQueryParams(queryParams: IQueryParams): Promise<IQueryParams> {
    return queryParams;
  }
}
