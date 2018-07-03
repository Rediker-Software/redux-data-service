import { Record, List } from "immutable";

import { BaseService } from "./BaseService";
import { FakeModel } from "../Model";
import {
  IAction,
  IActionCreators,
  IActionEpic,
  IActionTypes,
  ISelectors,
  IObserveableAction,
} from "./IService";
import { IAdapter, MockAdapter } from "../Adapters";

export interface IMockTestServiceState {
  items: List<FakeModel>;
}

export type MockTestServiceRecordState = Record<IMockTestServiceState>;

export class MockTestService extends BaseService<MockTestServiceRecordState> {
  public readonly name = "mockTestService";

  protected _adapter: IAdapter<any>;

  public get adapter() {
    if (!this._adapter) {
      this._adapter = new MockAdapter();
    }

    return this._adapter;
  }

  public getDefaultState() {
    return Record<IMockTestServiceState>(
      { items: List<FakeModel>() },
    )();
  }

  public createTypes(): IActionTypes {
    return {
      ...(super.createTypes()),
      BAKE_BAGUETTES: this.makeActionType("BAKE_BAGUETTES"),
      EAT_BAGUETTES: this.makeActionType("EAT_BAGUETTES"),
    };
  }

  public createActions(): IActionCreators {
    return {
      ...(super.createActions()),
      bakeBaguettes: this.makeActionCreator(this.types.BAKE_BAGUETTES),
      eatBaguettes: this.makeActionCreator(this.types.EAT_BAGUETTES),
    };
  }

  public createSelectors(): ISelectors {
    const baseSelectors = super.createSelectors();
    const { getServiceState } = baseSelectors;

    return {
      ...baseSelectors,
      eatBaguettes: (state, baguetteFilter) => {
        return getServiceState(state).items.filter(baguetteFilter);
      },
    };
  }

  public createReducers() {
    return {
      ...(super.createReducers()),
      [this.types.BAKE_BAGUETTES]: this.bakeBaguettesReducer,
      [this.types.EAT_BAGUETTES]: this.eatBaguettesReducer,
    };
  }

  public bakeBaguettesReducer(state: MockTestServiceRecordState, action: IAction<any>) {
    state.update("items", (items) => {
      return items.push(action.payload.item);
    });
  }

  public eatBaguettesReducer(state: MockTestServiceRecordState) {
    state.update("items", (items) => {
      return items.pop();
    });
  }

  public createEpics(): IActionEpic[] {
    return [
      ...(super.createEpics()),
      this.bakeBaguettesEpic.bind(this),
      this.eatBaguettesEpic.bind(this),
    ];
  }

  public bakeBaguettesEpic(action$: IObserveableAction): any {
    return action$.ofType(this.types.BAKE_BAGUETTES)
      .mergeMap((action) =>
        this.adapter.createItem("")
          .do(action.meta.onSuccess, action.meta.onError)
          .map((item) => this.actions.pushRecord(item)),
      );
  }

  public eatBaguettesEpic(action$: IObserveableAction): any {
    return action$.ofType(this.types.EAT_BAGUETTES)
      .mergeMap((action) =>
        this.adapter.deleteItem("0")
          .do(action.meta.onSuccess, action.meta.onError)
          .map((item) => this.actions.pushRecord(item)),
      );
  }
}

export function createMockTestService() {
  return new MockTestService();
}
