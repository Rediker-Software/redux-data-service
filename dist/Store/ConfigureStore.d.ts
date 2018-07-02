import { Store } from "redux";
import { IActionEpic, IReducers } from "Services";
export declare type IConfigureStore = (reducers: IReducers<any>, epics: IActionEpic[]) => Store<any>;
export declare const configureStore: IConfigureStore;
