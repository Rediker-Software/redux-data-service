import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";

/**
 * An ISerializer implementation which will convert a given Model to or from JSON.
 */
export class RestSerializer<T extends IModelData> extends BaseSerializer<T, string> {

  /**
   * Converts the given IModel into a JSON string.
   *
   * @param {IModel<T extends IModelData> | Partial<T extends IModelData>} model
   * @returns {any}
   */
  public serialize(model: IModel<T> | Partial<T>): string {
    const modelData = this.transform(model);
    return JSON.stringify(modelData);
  }

  /**
   * Converts the given JSON string into an IModel.
   *
   * @param {IModel<T extends IModelData>} data
   * @param data
   * @returns {IModel<T extends IModelData>}
   */
  public deserialize(data: any): IModel<T> {
    data = (typeof data === "string") ? JSON.parse(data) : data;
    return this.normalize(data);
  }
}
