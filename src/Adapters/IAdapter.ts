import { Observable } from "rxjs/Observable";

export interface IAdapter<T> {
  fetchAll: (requestParams?: any) => Observable<{items: T[]}>;
  fetchItem: (id: string) => Observable<T>;
  createItem: (item: T) => Observable<T>;
  updateItem: (id: string, item: T) => Observable<T>;
  patchItem: (id: string, item: T) => Observable<T>;
  deleteItem: (id: string) => Observable<T>;
}

export interface IAdapterFactory<T> {
  new(data: any): IAdapter<T>;
}
