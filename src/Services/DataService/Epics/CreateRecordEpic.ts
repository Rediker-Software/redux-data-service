import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/skipUntil";
import "rxjs/add/operator/take";

import { Store } from "redux";
import { of as of$ } from "rxjs/observable/of";
import { race as race$ } from "rxjs/observable/race";

import { IObservableAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { IModelId } from "../DataService";
import { IContext } from "../Interfaces/IContext";

export const createRecordEpic = ({ actions, adapter, mapper, serializer, types }: IContext): any => {
  return (action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<any>>) =>
    action$.ofType(types.CREATE_RECORD)
      .mergeMap(action =>
        of$(store.getState().items.get(action.payload.id))
          .mergeMap(async model => await mapper.transform(model))
          .mergeMap(async mappedModel => await serializer.serialize(mappedModel))
          .mergeMap(serializedModel => (
            race$(
              adapter.createItem(serializedModel),
              action$.ofType(types.CANCEL_REQUEST)
                .filter(filteredAction => filteredAction.payload.id === action.payload.id)
                .mapTo(null),
            ).take(1).filter(response => response != null)
          ))
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
