import { IAction } from "../../IService";
import { IQueryCache, QueryCacheRecord } from "../../../Query";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

/** Sets the given `IQueryCache` to the `requestCache`, using its `query.getHashCode()` as a key */
export function setQueryResponseReducer(state: IDataServiceStateRecord<any>, action: IAction<IQueryCache>) {
  const queryCache: IQueryCache = action.payload;

  return state.update("requestCache", (requestCache) => requestCache.update(
    queryCache.query.getHashCode(),
    (existingQueryCache) => {
      if (existingQueryCache) {
        return existingQueryCache.merge(queryCache);
      } else {
        return QueryCacheRecord(queryCache);
      }
    },
  ));
}
