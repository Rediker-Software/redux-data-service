import "rxjs/add/operator/bufferTime";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/shareReplay";
import "rxjs/add/operator/take";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { Store } from "redux";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { IContext } from "../Interfaces/IContext";
import { ActionsObservable } from "redux-observable";
export interface IEpic {
    execute(action$: ActionsObservable<any>, store: Store<IDataServiceStateRecord<any>>): Observable<IAction<any>>;
}
export declare class FetchRecordEpic implements IEpic {
    protected context: IContext;
    protected bufferedObservable: any;
    constructor(context: IContext);
    loadRecord(id: string, progressSubscriber?: Subscriber<any>): Observable<IAction<any>>;
    createBufferObservable(id: string): Observable<any>;
    performBufferedRequest(id: string): Observable<any>;
    execute(action$: ActionsObservable<any>, store: Store<IDataServiceStateRecord<any>>): Observable<IAction<any>>;
}
