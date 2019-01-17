import {
  IAction,
  IActionCreator,
  IActionCreators,
  IActionEpic,
  IActionTypes,
  IReducer,
  IReducers,
  ISelectors,
  IService,
} from "./IService";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/shareReplay";

/**
 * `IService` takes an Object-Oriented approach to
 * following the [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux/) proposal.
 * This enables us to organize `actions`, `selectors`, and `epics` together with their related `reducer`.
 * The goal is to create a cleaner project structure that is hopefully more extensible and DRY.
 *
 * Children classes should extend `createTypes`, `createActions`, `createSelectors`, `createEpics` and `createReducers`
 * as needed to add functionality. The output from these methods will be lazy loaded and used to export the
 * `types`, `actions`, `selectors`, `epics` and `reducer`, respectively, as public readonly fields on the service.
 * As such, when overriding those methods you will likely want to build upon and return what was outputted from the
 * parent method.
 *
 * The `reducers` should map an `ActionType` to a "micro" reducer. A single, final `reducer` that is exported will
 * fire the "micro" reducer associated to the given action type, in lieu of creating one large hairy switch statement.
 *
 * `IActionTypes` are namespaced to the given service `name` provided to the constructor. This is
 * to avoid naming collisions with other `IService`s.
 *
 * @abstract
 * @class BaseService
 * @implements IService
 */
export abstract class BaseService<S> implements IService<S> {
  public abstract readonly name: string;

  protected static dispatch: (action: IAction) => void;
  protected static state$: any;
  protected internalReducers?: IReducers<S>;
  protected internalEpics?: IActionEpic[];
  protected internalActions?: IActionCreators;
  protected internalSelectors?: ISelectors;
  protected internalTypes: IActionTypes;

  /**
   * The default Redux state of the IService
   *
   * @abstract
   * @returns {S}
   */
  public abstract getDefaultState(): S;

  /**
   * Returns a namespaced IAction type in the form `<name>/<type>`.
   * For example: `student/FETCH_ALL`
   *
   * @param {string} type
   * @returns {string}
   */
  public makeActionType(type: string): string {
    return [this.name, type].join("/");
  }

  /**
   * Registers the dispatch function that is passed in from the middleware.
   *
   * @param dispatch
   * @returns void
   */
  public static registerDispatch(dispatch) {
    BaseService.dispatch = dispatch;
  }

  public static setStateObservable(state$: Observable<any>): void {
    BaseService.state$ = state$;
  }

  public static getStateObservable(): Observable<any> {
    return BaseService
      .state$
      .shareReplay(1);
  }

  /**
   * Creates an IActionCreator function for triggering an IAction with the given type.
   *
   * @param {string} type
   * @param {any} defaultMeta
   * @returns {IActionCreator}
   */
  public makeActionCreator<T extends object = any, M = any>(type: string, defaultMeta?: any): IActionCreator {
    return (payload?: T, meta?: M): IAction<T, M> => {
      const action = {type, payload, meta: Object.assign({}, defaultMeta, meta), invoke: null};
      action.invoke = () => BaseService.dispatch(action);
      return action;
    };
  }

  /**
   * Children classes should extend this method to create new IActionTypes
   *
   * @protected
   * @returns {IActionTypes}
   */
  protected createTypes(): IActionTypes {
    return {};
  }

  /**
   * Children classes should extend this method to dispatch new Actions
   *
   * @protected
   * @returns {IActionCreators}
   */
  protected createActions(): IActionCreators {
    return {};
  }

  /**
   * Children classes should extend this method to handle new IAction types in the reducer.
   */
  protected createReducers(): IReducers<S> {
    return {};
  }

  /**
   * Children classes should extend this method to perform
   * new side effects (such as loading data) in response to a given IAction.
   */
  protected createEpics(): IActionEpic[] {
    return [];
  }

  /**
   * Children classes should extend this method to efficiently
   * slice data from the Redux state in a composable manner.
   */
  protected createSelectors(): ISelectors {
    return {
      getServiceState: (rootState) => rootState[this.name] || rootState,
    };
  }

  /**
   * Return a map of functions which are triggered by the IReducer for a given ActionType.
   * They are used to update the Redux state in response to a given IAction.
   *
   * Like a reducer, they are given the Redux `state` object and the `action` that was triggered and should
   * return a new copy of the immutable state. However, these are not individually added to Redux, but rather
   * through the single reducer function returned for this IService.
   */
  protected get reducers(): IReducers<S> {
    if (!this.internalReducers) {
      this.internalReducers = this.createReducers();
    }

    return this.internalReducers;
  }

  /**
   * Returns a single IReducer function which triggers the methods
   * mapped in the internal `reducers` object to the given IAction type.
   *
   * This is the function that is actually injected into and later triggered by Redux.
   */
  get reducer(): IReducer<S> {
    const reducers = this.reducers;
    const defaultState = this.getDefaultState();

    return (state: S = defaultState, action: IAction) => {
      const {type} = action;

      if (type in reducers && reducers.hasOwnProperty(type)) {
        return reducers[type](state, action);
      }

      return state;
    };
  }

  /**
   * Returns a map of IActionTypes, which are string "constants" that represent the type of an IAction.
   * When an IAction is dispatched to Redux via an IActionCreator, one or many reducers or epics may act on that IAction
   *
   * @returns {IActionTypes}
   */
  get types(): IActionTypes {
    if (!this.internalTypes) {
      this.internalTypes = this.createTypes();
    }

    return this.internalTypes;
  }

  /**
   * Returns a map of IActionCreators, which when dispatched to Redux,
   * one or many Reducers or epics may act on that IAction.
   *
   * @returns {IActionCreators}
   */
  get actions(): IActionCreators {
    if (!this.internalActions) {
      this.internalActions = this.createActions();
    }

    return this.internalActions;
  }

  /**
   * Returns an object of selectors using Reselect.
   * ISelectors are useful for efficiently filtering data from the Redux state.
   *
   * ISelectors are composable: a selector may be built from other selectors
   *
   * ISelectors are memoized: the output from each selector is cached,
   * so future requests will not require a recompute unless its inputs change
   *
   * @returns {ISelectors}
   */
  get selectors(): ISelectors {
    if (!this.internalSelectors) {
      this.internalSelectors = this.createSelectors();
    }

    return this.internalSelectors;
  }

  /**
   * Returns an array of RxJS Observeable Epics from redux-observable, which are observers that are always listening
   * for a given ActionType. They are useful for triggering side effects (such as loading data asynchronously)
   * in response to an IAction via chainable, asynchronous "streams".
   *
   * They will usually emit one or many Actions
   * to pass data into Redux (via a IReducer) or to trigger other Epics. Not only can they be daisy-chained in this
   * manner, RxJS also supports a variety of other common use-cases such as throttling/debouncing and retrying failed
   * promises.
   *
   * Notes:
   *  - When an IAction is dispatched to Redux, it hits the reducers BEFORE the epics.
   *  - Before you can use something from RxJS (such as an operator), you must import it first.
   *
   * @returns {IActionEpic[]}
   */
  get epics(): IActionEpic[] {
    if (!this.internalEpics) {
      this.internalEpics = this.createEpics();
    }

    return this.internalEpics;
  }

}
