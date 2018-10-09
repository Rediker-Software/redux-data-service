import { Record, List } from "immutable";
import { BaseService } from "./BaseService";
import { FakeModel } from "../Model/Model.mock";
import { IAction, IActionCreators, IActionEpic, IActionTypes, ISelectors, IObserveableAction } from "./IService";
import { IAdapter } from "../Adapters/IAdapter";
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
    bakeBaguettesEpic(action$: IObserveableAction): any;
    eatBaguettesEpic(action$: IObserveableAction): any;
}
export declare function createMockTestService(): MockTestService;
