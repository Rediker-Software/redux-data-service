import { Observable } from "rxjs/Observable";
import { IAdapter } from "./IAdapter";
export interface IRestAdapterOptions {
    apiUrl?: string;
}
export declare class RestAdapter implements IAdapter<string> {
    readonly pathName: string;
    readonly apiUrl: string;
    constructor(pathName: string, options?: IRestAdapterOptions);
    getRestURL(): string;
    fetchAll(requestParams?: any): Observable<{
        items: string[];
    }>;
    fetchItem(id: string): Observable<string>;
    createItem(item: string): Observable<string>;
    updateItem(id: any, item: string): Observable<string>;
    patchItem(id: any, item: string): Observable<string>;
    deleteItem(id: any): Observable<string>;
    protected makeAjaxRequest(method: string, url: string, payload?: string, headers?: any): Observable<any>;
    protected buildHeaders(headers: any): any;
    protected buildQueryParams(payload: any): string;
}
