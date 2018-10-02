import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";

/**
 * An in-memory ISerializer implementation for testing and local development purposes.
 */
export class MemorySerializer<T extends IModelData, R = T> extends BaseSerializer<Partial<R>, T, R> {

  public serialize(model: IModel<T> | Partial<T>): Partial<R> {
    return this.transform(model);
  }

  public deserialize(data: Partial<R>): IModel<T> {
    return this.normalize(data);
  }
}
