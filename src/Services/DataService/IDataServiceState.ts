import { Map } from "immutable";

import { IModel, IModelData } from "../../Model";
import { IQueryCacheRecord } from "../../Query";

export interface IDataServiceState<T extends IModelData> {
  items: Map<string, IModel<T>>;
  requestCache: Map<string, IQueryCacheRecord>;
}
