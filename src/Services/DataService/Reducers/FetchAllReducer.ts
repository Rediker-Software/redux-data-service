import { QueryCacheRecord } from "../../../Query";
import { IModelData } from "../../../Model";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { FetchAllAction, shouldFetchAll } from "../ShouldFetchAll";

export function fetchAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: FetchAllAction) {
  return state.update("requestCache", (requestCache) => (
    requestCache.update(action.payload.getHashCode(), (queryCacheRecord) => (
      queryCacheRecord
        ? (
          shouldFetchAll(state, action)
            ? queryCacheRecord.set("isLoading", true)
            : queryCacheRecord
        )
        : new QueryCacheRecord({ isLoading: true, query: action.payload })
    ))
  ));
}
