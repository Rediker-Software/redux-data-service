import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";

export interface IAdapter<T> {
  fetchAll: (requestParams?: any, progressSubscriber?: Subscriber<any>) => Observable<{items: T[]}>;
  fetchItem: (id: string, progressSubscriber?: Subscriber<any>) => Observable<T>;
  createItem: (item: T, progressSubscriber?: Subscriber<any>) => Observable<T>;
  updateItem: (id: string, item: T, progressSubscriber?: Subscriber<any>) => Observable<T>;
  patchItem: (id: string, item: T, progressSubscriber?: Subscriber<any>) => Observable<T>;
  deleteItem: (id: string, progressSubscriber?: Subscriber<any>) => Observable<T>;
}

export interface IAdapterFactory<T> {
  new(pathName: string, options?: any): IAdapter<T>;
}
