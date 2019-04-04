import { Record } from "immutable";
import { IModelData } from "../../Model/IModel";
import { IDataServiceState } from "./IDataServiceState";
export declare type IDataServiceStateRecord<T extends IModelData> = Record<IDataServiceState<T>> & Readonly<IDataServiceState<T>>;
export declare const DataServiceStateRecord: Record.Factory<IDataServiceState<any>>;
