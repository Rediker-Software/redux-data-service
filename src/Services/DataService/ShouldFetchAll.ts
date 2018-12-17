import { IAction } from "../IService";
import { IDataServiceStateRecord } from "./DataServiceStateRecord";
import { IQueryBuilder } from "../../Query/QueryBuilder";
import { IPostActionHandlers } from "./IPostActionHandlers";
import { IForceReload } from "./IForceReload";

export type FetchAllAction = IAction<IQueryBuilder, IPostActionHandlers & IForceReload>;

/**
 * Determines if the given FetchAllAction should fire based on whether or not we already have
 * an existing request cache associated to the action's query params.
 */
export function shouldFetchAll(state: IDataServiceStateRecord<any>, action: FetchAllAction) {
  const hasQuery = state.requestCache.has(action.payload.getHashCode());
  const shouldForceReload = action.meta != null && action.meta.forceReload;

  return !hasQuery || shouldForceReload;
}
