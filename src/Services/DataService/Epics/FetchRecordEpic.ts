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
import { ActionsObservable } from "redux-observable";

export interface IEpic {
  execute(action$: ActionsObservable<any>, store: Store<IDataServiceStateRecord<any>>): Observable<IAction<any>>;
}

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
 * it will accumulate these requests for `coalesceBufferTime` (default 50ms) before dispatching a `FETCH_ALL` action
 * with the requested `ids` as query params if more than one item is requested during that period.
 */
export class FetchRecordEpic implements IEpic {
  protected context: IContext;
  protected bufferedObservable: any;

  public constructor(context: IContext) {
    this.context = context;
  }

  /**
   * Helper method that fetches, deserializes, and normalizes the item from the API
   */
  public loadRecord(id: string): Observable<IAction<any>> {
    const { actions, serializer, mapper, adapter } = this.context;
    return adapter.fetchItem(id)
      .mergeMap(async response => await serializer.deserialize(response))
      .mergeMap(async normalizedResponse => await mapper.normalize(normalizedResponse))
      .map(actions.pushRecord)
      .catch((e) => of$(
        actions.setMetaField({ id, errors: e.xhr.response }),
      ));
  }

  /**
   * This method creates the buffer Observable for use in the `performBufferRequest` function.  There is an N 
   * millisecond period over which results are coalesced if the `coalesceBufferTime` constant is specified
   * in the configuration (its default is 100 ms).  If there is only one item, the standard `loadRecord` function
   * is called. 
   */
  public createBufferObservable(id: string): Observable<any> {
    return new BehaviorSubject(id)
      .bufferTime(getConfiguration().coalesceBufferTime)
      .mergeMap((ids: string[]) => ids.length > 1
        ? of$(
          this.context.actions.fetchAll(
            new QueryBuilder(this.context.name, { ids }),
          ),
        )
        : this.loadRecord(ids[0]),
      );
  }

  /**
   * Checks the cache for a buffered Observable that matches the context.  If the buffer doesn't exist,
   * it is created, and prepared to be disposed of at the end of its lifetime.  Either the buffered Observable
   * is returned or the current id is added to the given buffered Observable and the Observable is completed 
   */
  public performBufferedRequest(id: string): Observable<any> {
    if (!this.bufferedObservable) {
      this.bufferedObservable = this.createBufferObservable(id)
        .take(1)
        .do(() => this.bufferedObservable = null);

      return this.bufferedObservable;
    } else {
      this.bufferedObservable.next(id);
      return empty$();
    }
  }

  public execute(action$: ActionsObservable<any>, store: Store<IDataServiceStateRecord<any>>): Observable<IAction<any>> {
    return action$.ofType(this.context.types.FETCH_RECORD)
      .filter(action => shouldFetchItem(store.getState(), action))
      .map(action => action.payload.id as string)
      .mergeMap(
        getConfiguration().coalesceFindRequests
          ? this.performBufferedRequest.bind(this)
          : this.loadRecord.bind(this),
      );
  }

}
