import { Subject } from "rxjs";

import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IModelId } from "../DataService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

/**
 * Adds id of model being sent in cancelable request to
 * set of cancelable requests.
 */
export function addCancelableRequestReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModelId>) {
  return state.update("cancelableRequests", (cancelableRequests) => (
    cancelableRequests.set(action.payload.id, new Subject())
  ));
}
