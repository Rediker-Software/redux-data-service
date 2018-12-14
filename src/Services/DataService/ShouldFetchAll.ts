import { IAction } from "../IService";
import { IDataServiceStateRecord } from "./DataServiceStateRecord";
import { IQueryBuilder } from "../../Query";
import { IPostActionHandlers } from "./IPostActionHandlers";
import { IForceReload } from "./IForceReload";

export type FetchAllAction = IAction<IQueryBuilder, IPostActionHandlers & IForceReload>;

/**
 * Determines if the given FetchAllAction should fire based on whether or not we already have
 * an existing request cache associated to the action's query params.
 */
export function shouldFetchAll(state: IDataServiceStateRecord<any>, action: FetchAllAction) {
  return state.requestCache
    .has(action.payload.getHashCode()) || (action.meta && action.meta.forceReload);
}
