import { IAction } from "../../IService";
import { IQueryBuilder, QueryCacheRecord } from "../../../Query";
import { IModelData } from "../../../Model";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export function fetchAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IQueryBuilder>) {
  return state.update("requestCache", (requestCache) => (
    requestCache.update(action.payload.getHashCode(), (queryCacheRecord) => (
      queryCacheRecord
        ? (
          this.shouldFetchAll(action, state)
            ? queryCacheRecord.set("isLoading", true)
            : queryCacheRecord
        )
        : new QueryCacheRecord({ isLoading: true, query: action.payload })
    ))
  ));
}
