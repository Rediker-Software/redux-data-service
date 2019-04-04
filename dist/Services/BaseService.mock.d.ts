import { Record, List } from "immutable";
import { IAdapter } from "../Adapters";
import { FakeModel } from "../Model/Model.mock";
import { IAction, IActionCreators, IActionEpic, IActionTypes, ISelectors, IObservableAction } from "./IService";
import { BaseService } from "./BaseService";
export interface IMockTestServiceState {
    items: List<FakeModel>;
}
export declare type MockTestServiceRecordState = Record<IMockTestServiceState>;
export declare class MockTestService extends BaseService<MockTestServiceRecordState> {
    readonly name = "mockTestService";
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
    bakeBaguettesEpic(action$: IObservableAction): any;
    eatBaguettesEpic(action$: IObservableAction): any;
}
export declare function createMockTestService(): MockTestService;
