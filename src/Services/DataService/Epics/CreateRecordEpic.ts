import { Store } from "redux";
import { of as of$ } from "rxjs/observable/of";

import { IObservableAction } from "../../IService";

import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { IModelId } from "../DataService";
import { IContext } from "../Interfaces/IContext";

export const createRecordEpic = ({ actions, adapter, mapper, serializer, types }: IContext): any => {
  return (action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<any>>)  => {
    return action$.ofType(types.CREATE_RECORD)
      .mergeMap(action =>
        of$(store.getState().get("items", null).get(action.payload.id))
          .mergeMap(async model => await mapper.transform(model))
          .mergeMap(async mappedModel => await serializer.serialize(mappedModel))
          .do(() =>  actions.addCancelableRequest(action.payload).invoke())
          .mergeMap(serializedModel => (adapter.createItem(serializedModel)
              .takeUntil(store.getState().get("cancelableRequests", null).get(action.payload.id))
          ))
          .do(
            () => actions.removeCancelableRequest(action.payload).invoke(),
            () => actions.removeCancelableRequest(action.payload).invoke(),
          )
          .mergeMap(async response => await serializer.deserialize(response))
          .mergeMap(async normalizedResponse => await mapper.normalize(normalizedResponse))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(actions.pushRecord)
          .concat(of$(actions.unloadRecord(action.payload)))
          .catch((e) => of$(
            actions.setMetaField({ id: action.payload.id, errors: e }), // e.xhr.response || e }),
          )),
      );
  };
};
