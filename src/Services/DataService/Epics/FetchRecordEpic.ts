import "rxjs/add/operator/bufferTime";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/take";

import { of as of$ } from "rxjs/observable/of";
import { empty as empty$ } from "rxjs/observable/empty";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { IAction, IActionEpic, IObservableAction } from "../../IService";
import { Store } from "redux";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { getConfiguration } from "../../../Configure";
import { QueryBuilder } from "../../../Query";
import { IContext } from "../Interfaces/IContext";
import { shouldFetchItem } from "../ShouldFetchItem";

export const BUFFER_TIME = 100;

export const loadRecord = ({ actions, serializer, mapper, adapter }) => (id: string): Observable<IAction<any>> =>
  adapter.fetchItem(id)
    .mergeMap(async response => await serializer.deserialize(response))
    .mergeMap(async normalizedResponse => await mapper.normalize(normalizedResponse))
    .map(actions.pushRecord)
    .catch((e) => of$(
      actions.setMetaField({ id, errors: e.xhr.response }),
    ));

export const createBufferObservable = (context: IContext) => new Subject()
  .bufferTime(BUFFER_TIME)
  .mergeMap((ids: string[]) => ids.length > 1
    ? of$(
      context.actions.fetchAll(
        new QueryBuilder(context.name, { ids }),
      ),
    )
    : loadRecord(context)(ids[0]),
  );

const bufferedObservableCache = {};

export const performBufferedRequest = (context: IContext) => (id: string) => {
  let bufferedObservable = bufferedObservableCache[context.name];

  if (!bufferedObservable) {
    bufferedObservable = createBufferObservable(context);
    bufferedObservableCache[context.name] = bufferedObservable;

    bufferedObservable
      .take(1)
      .do(() => delete bufferedObservableCache[context.name]);

    bufferedObservable.next(id);

    return bufferedObservable;
  } else {
    bufferedObservable.next(id);
    return empty$();
  }
};

/**
 * Requests an individual item using the given api adapter.
 * - the item is then deserialized with the given serializer
 * - and normalized into the proper IModel instance with the given mapper.
 *
 * Finally, a `PUSH_RECORD` action is emitted to add the `IModel` instance to its redux store.
 *
 * Note that the item will not be reloaded if it already exists in its redux store,
 * unless `action.meta.forceReload` is `true`.
 *
 * If the library configuration setting `coalesceFindRequests` is `true`,
 * it will accumulate these requests for 100ms before dispatching a `FETCH_ALL` action
 * with the requested `ids` as query params if more than one item is requested during that period.
 */
export const fetchRecordEpic = (context: IContext): any =>
  (action$: any, store: Store<IDataServiceStateRecord<any>>): Observable<IAction<any>> => {
    return action$.ofType(context.types.FETCH_RECORD)
      .filter(action => shouldFetchItem(store.getState(), action))
      .map(action => action.payload.id as string)
      .mergeMap(
        getConfiguration().coalesceFindRequests
          ? performBufferedRequest(context)
          : loadRecord(context),
      );
  };
