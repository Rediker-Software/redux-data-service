import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { IAdapter } from "./IAdapter";
export interface IRestAdapterOptions {
    apiUrl?: string;
}
export declare class RestAdapter implements IAdapter<string> {
    readonly pathName: string;
    readonly apiUrl: string;
    constructor(pathName: string, options?: IRestAdapterOptions);
    getRestURL(id?: string): string;
    fetchAll(requestParams?: any, progressSubscriber?: Subscriber<any>): Observable<{
        items: string[];
    }>;
    fetchItem(id: string, progressSubscriber?: Subscriber<any>): Observable<string>;
    createItem(item: string, progressSubscriber?: Subscriber<any>): Observable<string>;
    updateItem(id: any, item: string, progressSubscriber?: Subscriber<any>): Observable<string>;
    patchItem(id: any, item: string, progressSubscriber?: Subscriber<any>): Observable<string>;
    deleteItem(id: any, progressSubscriber?: Subscriber<any>): Observable<string>;
    protected makeAjaxRequest(method: string, url: string, payload?: string, progressSubscriber?: Subscriber<any>, headers?: any): Observable<any>;
    protected buildHeaders(headers: any): any;
}
