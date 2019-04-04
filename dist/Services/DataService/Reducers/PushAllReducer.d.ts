import { IModel, IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
export interface IPushAll<T extends IModelData> {
    items: IModel<T>[];
}
export declare function pushAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IPushAll<T>>): IDataServiceStateRecord<T>;
