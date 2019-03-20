import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IModelId } from "../DataService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export function cancelRequestReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModelId>) {
  const cancelableRequests = state.get("cancelableRequests", null);
  const subject = cancelableRequests && cancelableRequests.get(action.payload.id, null);
  if (subject) {
    subject.next(true);
  }
  return state;
}
