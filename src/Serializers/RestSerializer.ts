import { IModelData } from "../Model";
import { IQueryParams } from "../Query";

import { ISerializer } from "./ISerializer";

/**
 * An ISerializer implementation which will convert a given Model to or from JSON.
 */
export class RestSerializer<T extends IModelData> implements ISerializer<T, string> {

  /**
   * Converts the given object into a JSON string.
   */
  public async serialize(modelData: Partial<T>): Promise<string> {
    return JSON.stringify(modelData);
  }

  /**
   * Converts the given JSON string into an object.
   */
  public async deserialize(data: T | string): Promise<T> {
    return (typeof data === "string")
      ? JSON.parse(data) as T
      : data;
  }

  /**
   * Converts the given IQueryParams object into a url-encoded string.
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
