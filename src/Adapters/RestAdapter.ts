import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { ajax } from "rxjs/observable/dom/ajax";

import { isEmpty } from "lodash";

import { IAdapter } from "./IAdapter";

export interface IRestAdapterOptions {
  apiUrl?: string;
}

/**
 * An IAdapter implementation for connecting to a REST end point.
 *
 * Outgoing item data should be serialized to a json string.
 * The incoming data will be converted into an object by the underlying ajax library.
 *
 */
export class RestAdapter implements IAdapter<string> {
  public readonly pathName: string;
  public readonly apiUrl: string;

  constructor(pathName: string, options: IRestAdapterOptions = {}) {
    this.pathName = pathName;
    this.apiUrl = options.apiUrl || process.env.API_URL;
  }

  /**
   * Get the route to the REST endpoint.
   *
   * @returns {string}
   */
  public getRestURL(id?: string) {
    let url = `${this.apiUrl}/${this.pathName}`;
    if (id) {
      url += `/${id}`;
    }
    return url;
  }

  /**
   * Perform a GET request to the REST endpoint, which should return an array of T items.
   * Optionally pass in `requestParams` to define query params to send to the API for filtering the results.
   *
   * @param requestParams
   * @returns {Observable<T[]>}
   */
  public fetchAll(requestParams?: any): Observable<{items: string[]}> {
    return this.makeAjaxRequest("GET", this.getRestURL(), requestParams);
  }

  /**
   * Perform a GET request to load a single T item from the API based on the given id.
   *
   * @param {string} id
   * @returns {Observable<T>}
   */
  public fetchItem(id: string): Observable<string> {
    return this.makeAjaxRequest("GET", this.getRestURL(id));
  }

  /**
   * Perform a POST request to the API to create the given T item
   *
   * @param {T} item
   * @returns {Observable<T>}
   */
  public createItem(item: string): Observable<string> {
    return this.makeAjaxRequest("POST", this.getRestURL(), item);
  }

  /**
   * Perform a PUT request to the API to update the given T item based on the given id.
   *
   * @param id
   * @param {T} item
   * @returns {Observable<T>}
   */
  public updateItem(id, item: string): Observable<string> {
    return this.makeAjaxRequest("PUT", this.getRestURL(id), item);
  }

  /**
   * Perform a PATCH request to the API to update the given T item based on the given id.
   *
   * @param id
   * @param {T} item
   * @returns {Observable<T>}
   */
  public patchItem(id, item: string): Observable<string> {
    return this.makeAjaxRequest("PATCH", `${this.getRestURL()}/${id}`, item);
  }

  /**
   * Perform a DELETE request to the API to update the given T item based on the given id.
   *
   * @param id
   * @returns {Observable<T>}
   */
  public deleteItem(id): Observable<string> {
    return this.makeAjaxRequest("DELETE", this.getRestURL(id));
  }

  /**
   * Perform an ajax request to the given url, using the given http method.
   *
   * If payload is provided: it is used as query params when performing a GET request,
   *   otherwise it is provided in the body of the request.
   *
   * If headers are provided, they are merged with the default application headers.
   *
   * @param {string} method
   * @param {string} url
   * @param {any | T} payload
   * @param headers
   * @returns {any}
   */
  protected makeAjaxRequest(method: string, url: string, payload?: string, headers: any = {}) {
    return ajax({
      body: method !== "GET" ? payload : undefined,
      headers: this.buildHeaders(headers),
      method,
      responseType: "json",
      url: (method !== "GET" || isEmpty(payload) ? url : `${url}?${payload}`),
    }).map((x) => x.response);
  }

  /**
   * Create the list of headers to use when performing ajax requests.
   *
   * @param headers
   * @returns {{"Content-Type": string}}
   */
  protected buildHeaders(headers) {
    return {
      ...headers,
      "Content-Type": "application/json",
    };
  }
  
}
