import { Map, Record } from "immutable";
import { Subject } from "rxjs";

import { IModel, IModelData } from "../../Model/IModel";
import { IQueryCacheRecord } from "../../Query/QueryCacheRecord";
import { IDataServiceState } from "./IDataServiceState";

export type IDataServiceStateRecord<T extends IModelData> = Record<IDataServiceState<T>> & Readonly<IDataServiceState<T>>;

/** The state used for a DataService implementation */
export const DataServiceStateRecord = Record<IDataServiceState<any>>({
  items: Map<string, IModel<any>>(),
  requestCache: Map<string, IQueryCacheRecord>(),
  cancelableRequests: Map<string, Subject<any>>(),
});
