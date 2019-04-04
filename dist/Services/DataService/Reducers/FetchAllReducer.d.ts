import { IModelData } from "../../../Model/IModel";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { FetchAllAction } from "../ShouldFetchAll";
export declare function fetchAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: FetchAllAction): IDataServiceStateRecord<T>;
