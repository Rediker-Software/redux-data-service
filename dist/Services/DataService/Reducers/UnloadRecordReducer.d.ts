import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IModelId } from "../DataService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
export declare function unloadRecordReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModelId>): IDataServiceStateRecord<T>;
