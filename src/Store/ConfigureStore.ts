import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { IActionEpic, IReducers } from "../Services";
import { loggerMiddleware } from "./Middleware";

export type IConfigureStore = (reducers: IReducers<any>, epics: IActionEpic[]) => Store<any>;

export const configureStore: IConfigureStore = (reducers: IReducers<any>, epics: IActionEpic[]) => {
  const rootEpic = (action$, store, d) =>
    combineEpics(...epics)(action$, store, d)
      .takeUntil(action$.ofType("DESTROY_ALL").do(() => { store.dispatch({ type: "CLEAR_STORE" }); }));

  let middleware = applyMiddleware(loggerMiddleware, createEpicMiddleware(rootEpic));

  if (process.env.NODE_ENV === "development") {
    middleware = composeWithDevTools(middleware);
  }

  const rootReducer = (state, action) => {
    if (action.type === "CLEAR_STORE") {
      return undefined;
    }

    return combineReducers(reducers)(state, action);
  };

  return createStore(rootReducer, middleware);
};
