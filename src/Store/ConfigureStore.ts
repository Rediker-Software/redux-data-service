import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { IActionEpic, IReducers } from "../Services/IService";
import { loggerMiddleware } from "./Middleware/Logger";

export type IConfigureStore = (reducers: IReducers<any>, epics: IActionEpic[]) => Store<any>;

export const configureStore: IConfigureStore = (reducers: IReducers<any>, epics: IActionEpic[]) => {
  const rootEpic = combineEpics(...epics);

  let middleware = applyMiddleware(loggerMiddleware, createEpicMiddleware(rootEpic));

  if (process.env.NODE_ENV === "development") {
    middleware = composeWithDevTools(middleware);
  }

  return createStore(combineReducers(reducers), middleware);
};
