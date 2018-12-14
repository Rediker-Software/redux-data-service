import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { IQueryCache } from "../../../Query/IQueryCache";
import { QueryCacheRecord } from "../../../Query/QueryCacheRecord";

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
