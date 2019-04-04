import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { ISetField } from "../ISetField";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
export declare function setFieldReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<ISetField<T>>): IDataServiceStateRecord<T>;
