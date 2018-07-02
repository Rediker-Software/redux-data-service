import { Record, List } from "immutable";
import { BaseService } from "./BaseService";
import { FakeModel } from "../Model";
import { IAction, IActionCreators, IActionEpic, IActionTypes, ISelectors, IObserveableAction } from "./IService";
import { IAdapter } from "../Adapters";
export interface IMockTestServiceState {
    items: List<FakeModel>;
}
export declare type MockTestServiceRecordState = Record<IMockTestServiceState>;
export declare class MockTestService extends BaseService<MockTestServiceRecordState> {
    readonly name: string;
    protected _adapter: IAdapter<any>;
    readonly adapter: IAdapter<any>;
    getDefaultState(): Record<IMockTestServiceState> & Readonly<IMockTestServiceState>;
    createTypes(): IActionTypes;
    createActions(): IActionCreators;
    createSelectors(): ISelectors;
    createReducers(): {};
    bakeBaguettesReducer(state: MockTestServiceRecordState, action: IAction<any>): void;
    eatBaguettesReducer(state: MockTestServiceRecordState): void;
    createEpics(): IActionEpic[];
    bakeBaguettesEpic(action$: IObserveableAction): import("../../../../../../Users/jmadson/projects/redux-data-service/node_modules/rxjs/Observable").Observable<IAction<any, any>>;
    eatBaguettesEpic(action$: IObserveableAction): import("../../../../../../Users/jmadson/projects/redux-data-service/node_modules/rxjs/Observable").Observable<IAction<any, any>>;
}
export declare function createMockTestService(): MockTestService;
