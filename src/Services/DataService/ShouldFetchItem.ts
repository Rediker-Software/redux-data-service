import { IDataServiceStateRecord } from "./DataServiceStateRecord";
import { IAction } from "../IService";
import { IForceReload } from "./IForceReload";

export type FetchItemAction = IAction<{ id: string }, IForceReload>;

/**
 * Determines if the given FetchItemAction should fire based on whether or not we already have
 * the requested item based on its id, or if we should force reload it.
 */
export function shouldFetchItem(state: IDataServiceStateRecord<any>, action: FetchItemAction) {
  const item = state.items && state.items.get(action.payload.id);
  const shouldForceReload = action.meta != null && action.meta.forceReload;

  return !item || shouldForceReload;
}
