import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";

/**
 * An ISerializer implementation which will convert a given Model to or from JSON.
 */
export class RestSerializer<T extends IModelData, R = T> extends BaseSerializer<string, T, R> {

  /**
   * Converts the given IModel into a JSON string.
   *
   * @param {IModel<T extends IModelData> | Partial<T extends IModelData>} model
   * @returns {Promise<S>}
   */
  public async serialize(model: IModel<T> | Partial<T>): Promise<string> {
    const modelData = await this.transform(model);
    return JSON.stringify(modelData);
  }

  /**
   * Converts the given JSON string into an IModel.
   *
   * @param {IModel<T extends IModelData>} data
   * @param data
   * @returns {Promise<IModel<T extends IModelData>>}
   */
  public async deserialize(data: any): Promise<IModel<T>> {
    data = (typeof data === "string") ? JSON.parse(data) : data;
    return await this.normalize(data);
  }
}
