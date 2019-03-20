import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IModelId } from "../DataService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
/**
 * Removes id of model being sent in cancelable request from
 * set of cancelable requests.
 */
export function removeCancelableRequestReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModelId>) {
  return state.update("cancelableRequests", (cancelableRequests) => (
    cancelableRequests.delete(action.payload.id)
  ));
}
