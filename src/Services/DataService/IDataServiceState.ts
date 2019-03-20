import { Map, Set } from "immutable";
import { Subject } from "rxjs";

import { IModel, IModelData } from "../../Model/IModel";
import { IQueryCacheRecord } from "../../Query";

export interface IDataServiceState<T extends IModelData> {
  items: Map<string, IModel<T>>;
  requestCache: Map<string, IQueryCacheRecord>;
  cancelableRequests?: Map<string, Subject<any>>;
}
