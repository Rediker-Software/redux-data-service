import "rxjs/add/operator/bufferTime";
import "rxjs/add/operator/mergeMap";

import { of as of$ } from "rxjs/observable/of";
import { empty as empty$ } from "rxjs/observable/empty";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { IAction, IObservableAction } from "../../IService";
import { Store } from "redux";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { getConfiguration } from "../../../Configure";
import { QueryBuilder } from "../../../Query";

export const BUFFER_TIME = 100;

let bufferObservable;

export const loadRecord = ({ actions, serializer, mapper, adapter }) => action =>
  adapter.fetchItem(action.payload.id)
    .mergeMap(async response => await serializer.deserialize(response))
    .mergeMap(async normalizedResponse => await mapper.normalize(normalizedResponse))
    .do(action.meta.onSuccess, action.meta.onError)
    .map(actions.pushRecord)
    .catch((e) => of$(
      actions.setMetaField({ id: action.payload.id, errors: e.xhr.response }),
    ));

export const createBufferObservable = (service) => new Subject()
  .mergeMap(action$ => action$)
  .bufferTime(BUFFER_TIME)
  .do(() => bufferObservable = undefined)
  .mergeMap(actions => {
    if (actions && actions.length > 1) {
      const queryBuilder = new QueryBuilder(service.name, { ids: actions.map((a) => a.payload.id) });
      return of$(service.actions.fetchAll(queryBuilder));
    } else {
      return of$(actions[0]).mergeMap(loadRecord(service));
    }
  });

export const fetchRecordEpic = (service) =>
  (action$: IObservableAction, store: Store<IDataServiceStateRecord<T>>): Observable<IAction<T>> => {
    const coalesceFindRequests = getConfiguration().coalesceFindRequests;

    const observable = action$.ofType(service.types.FETCH_RECORD)
      .filter(action => service.shouldFetchItem(action, store.getState()));

    if (coalesceFindRequests) {
      if (!bufferObservable) {
        bufferObservable = createBufferObservable(service);
        bufferObservable.next(observable);
        return bufferObservable.next(observable);
      } else {
        bufferObservable.next(observable);
        return empty$();
      }
    } else {
      observable.mergeMap(loadRecord);
    }

    return observable;
  };
