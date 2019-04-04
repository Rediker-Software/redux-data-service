import { IAction } from "../../IService";
import { IModelData, IModelMeta } from "../../../Model/IModel";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
export interface ISetMetaField<T extends IModelData> {
    id: string;
    fieldName: keyof IModelMeta<T>;
    value: any;
}
export declare function setMetaFieldReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<ISetMetaField<T>>): IDataServiceStateRecord<T>;
