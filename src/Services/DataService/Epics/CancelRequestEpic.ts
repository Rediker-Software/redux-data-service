import { Store } from "redux";

import { IObservableAction } from "../../IService";

import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { IModelId } from "../DataService";
import { IContext } from "../Interfaces/IContext";

export const cancelRequestEpic = ({ types }: IContext): any => {
  return (action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<any>>) => {
    return action$.ofType(types.CANCEL_REQUEST)
      .do(action => {
        const cancelableRequests = store.getState().get("cancelableRequests", null);
        const subject = cancelableRequests && cancelableRequests.get(action.payload.id, null);
        if (subject) {
          subject.next(true);
        }
      });
  };
};
