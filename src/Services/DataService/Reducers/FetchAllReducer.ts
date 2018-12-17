import { QueryCacheRecord } from "../../../Query/QueryCacheRecord";
import { IModelData } from "../../../Model/IModel";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { FetchAllAction, shouldFetchAll } from "../ShouldFetchAll";

/**
 * Sets isLoading = true on the cached request associated to the given IQueryBuilder in the action's payload
 * if it appears we will perform the request.
 */
export function fetchAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: FetchAllAction) {
  if (!shouldFetchAll(state, action)) {
    return state;
  }

  return state.update("requestCache", (requestCache) => (
    requestCache.update(action.payload.getHashCode(), (queryCacheRecord) => (
      queryCacheRecord
        ? queryCacheRecord.set("isLoading", true)
        : new QueryCacheRecord({ isLoading: true, query: action.payload })
    ))
  ));
}
