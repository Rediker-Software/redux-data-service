import { IModelData, IModel } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
export declare function pushRecordReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModel<T>>): IDataServiceStateRecord<T>;
