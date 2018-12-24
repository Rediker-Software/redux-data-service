import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
export declare function unloadAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<null>): IDataServiceStateRecord<any>;
