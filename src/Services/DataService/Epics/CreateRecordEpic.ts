import { Store } from "redux";
import { of as of$ } from "rxjs/observable/of";
import { Observable, Subject } from "rxjs";

import { IObservableAction } from "../../IService";

import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { IModelId } from "../DataService";
import { IContext } from "../Interfaces/IContext";

export const createRecordEpic = ({ actions, adapter, mapper, serializer, types }: IContext): any => {

  const observableCache = {};

  const createCancelSubject = (id): Observable<any> => {
    observableCache[id] = new Subject();
    return observableCache[id];
  };

  const removeCancelSubject = (id) => () => {
    delete observableCache[id];
  };

  const cancelRequest = (id) => () => {
    if (id in observableCache) {
      observableCache[id].next(true);
    }

    removeCancelSubject(id);
  };

  return (action$: IObservableAction<IModelId>, store: Store<IDataServiceStateRecord<any>>) => {
    return action$
      .ofType(types.CREATE_RECORD)
      .mergeMap(action =>
        of$(store.getState().items.get(action.payload.id))
          .mergeMap(async model => await this.mapper.transform(model))
          .mergeMap(async mappedModel => await this.serializer.serialize(mappedModel))
          .mergeMap(serializedModel =>
            this.adapter.createItem(serializedModel)
              .takeUntil(createCancelSubject(action.payload.id)),
          )
          .do(removeCancelSubject(action.payload.id), removeCancelSubject(action.payload.id))
          .mergeMap(async response => await serializer.deserialize(response))
          .mergeMap(async normalizedResponse => await mapper.normalize(normalizedResponse))
          .do(action.meta.onSuccess, action.meta.onError)
          .map(actions.pushRecord)
          .concat(of$(actions.unloadRecord(action.payload)))
          .catch((e) => of$(
            actions.setMetaField({ id: action.payload.id, errors: e.xhr.response || e }),
          )),
      );
  };
};
