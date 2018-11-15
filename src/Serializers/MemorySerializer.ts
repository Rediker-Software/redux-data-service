import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";

/**
 * An in-memory ISerializer implementation for testing and local development purposes.
 */
export class MemorySerializer<T extends IModelData, R = T> extends BaseSerializer<Partial<R>, T, R> {

  public async serialize(model: IModel<T> | Partial<T>): Promise<Partial<R>> {
    return await model as R; 
  }

  public async deserialize(data: Partial<R>): Promise<IModel<T>> {
    return await data as any;
  }
}
