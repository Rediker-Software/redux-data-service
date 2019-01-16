import "rxjs/add/operator/bufferTime";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/shareReplay";
import "rxjs/add/operator/take";

import { of as of$ } from "rxjs/observable/of";
import { empty as empty$ } from "rxjs/observable/empty";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Store } from "redux";

import { getConfiguration } from "../../../Configure";
import { IAction } from "../../IService";
import { QueryBuilder } from "../../../Query";

import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { IContext } from "../Interfaces/IContext";
import { shouldFetchItem } from "../ShouldFetchItem";

/**
 * Helper method that fetches, deserializes, and normalizes the item from the API
 */
export const loadRecord = ({ actions, serializer, mapper, adapter }) => (id: string): Observable<IAction<any>> =>
  adapter.fetchItem(id)
    .mergeMap(async response => await serializer.deserialize(response))
    .mergeMap(async normalizedResponse => await mapper.normalize(normalizedResponse))
    .map(actions.pushRecord)
    .catch((e) => of$(
      actions.setMetaField({ id, errors: e.xhr.response }),
    ));

/**
 * This method creates the buffer Observable for use in the `performBufferRequest` function.  There is an N 
 * millisecond period over which results are coalesced if the `coalesceBufferTime` constant is specified
 * in the configuration (its default is 100 ms).  If there is only one item, the standard `loadRecord` function
 * is called. 
 */
export const createBufferObservable = (context: IContext): any => (id: string) => new BehaviorSubject(id)
  .bufferTime(getConfiguration().coalesceBufferTime)
  .mergeMap((ids: string[]) => ids.length > 1
    ? of$(
      context.actions.fetchAll(
        new QueryBuilder(context.name, { ids }),
      ),
    )
    : loadRecord(context)(ids[0]),
  );

const bufferedObservableCache = {};

/**
 * Checks the cache for a buffered Observable that matches the context.  If the buffer doesn't exist,
 * it is created, and prepared to be disposed of at the end of its lifetime.  Either the buffered Observable
 * is returned or the current id is added to the given buffered Observable and the Observable is completed 
 */
export const performBufferedRequest = (context: IContext) => (id: string) => {
  const bufferedObservable = bufferedObservableCache[context.name];

  if (!bufferedObservable) {
    bufferedObservableCache[context.name] = createBufferObservable(context)(id)
      .take(1)
      .do(() => delete bufferedObservableCache[context.name] );

    return bufferedObservableCache[context.name];
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
