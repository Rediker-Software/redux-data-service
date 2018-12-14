import { Map, Record } from "immutable";

import { IModel, IModelData } from "../../Model/IModel";
import { IQueryCacheRecord } from "../../Query/QueryCacheRecord";
import { IDataServiceState } from "./IDataServiceState";

export type IDataServiceStateRecord<T extends IModelData> = Record<IDataServiceState<T>> & Readonly<IDataServiceState<T>>;

export const DataServiceStateRecord = Record<IDataServiceState<any>>({
  items: Map<string, IModel<any>>(),
  requestCache: Map<string, IQueryCacheRecord>(),
});
