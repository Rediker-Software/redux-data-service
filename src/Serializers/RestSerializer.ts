import { IModel, IModelData } from "../Model";
import { IQueryParams } from "../Query/QueryBuilder";
import { ISerializer } from "../Serializers";

/**
 * An ISerializer implementation which will convert a given Model to or from JSON.
 */
export class RestSerializer<T extends IModelData, R = T> implements ISerializer<string, R> {

  /**
   * Converts the given IModel into a JSON string.
   *
   * @param {IModel<T extends IModelData> | Partial<T extends IModelData>} model
   * @returns {Promise<string>}
   */
  public async serialize(model: IModel<T> | Partial<T>): Promise<string> {
    const modelData = (model as any).modelData;
    return JSON.stringify(modelData);
  }

  /**
   * Converts the given JSON string into an IModel.
   *
   * @param {any} data
   * @param data
   * @returns {Promise<R>>}
   */
  public async deserialize(data: any): Promise<R> {
    return (typeof data === "string") ? JSON.parse(data) as R : data as R;
  }

  /**
   * Converts the given IQueryParams object into a url-encoded string.
   *
   * @param {IQueryParams} params
   * @returns {Promise<string>}
   */
  public async serializeQueryParams({ sort, ...params }: IQueryParams): Promise<string> {
    if (sort && sort.length > 0) {
      params.sort = sort.map(s => (s.direction === "desc" ? `${s.key}:${s.direction}` : s.key));
    }

    return Object.keys(params)
      .map((key) => {
        const value = params[key];
        const encodedValue = (value instanceof Array)
          ? (value as any[]).map(v => encodeURIComponent(v)).join(",")
          : encodeURIComponent(String(value));

        return `${encodeURIComponent(key)}=${encodedValue}`;
      })
      .join("&");
  }

}
