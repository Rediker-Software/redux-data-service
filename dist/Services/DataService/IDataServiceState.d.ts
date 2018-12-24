import { Map } from "immutable";
import { IModel, IModelData } from "../../Model/IModel";
import { IQueryCacheRecord } from "../../Query/QueryCacheRecord";
export interface IDataServiceState<T extends IModelData> {
    items: Map<string, IModel<T>>;
    requestCache: Map<string, IQueryCacheRecord>;
}
