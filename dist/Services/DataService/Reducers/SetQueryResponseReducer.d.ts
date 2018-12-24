import { IAction } from "../../IService";
import { IQueryCache } from "../../../Query";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
export declare function setQueryResponseReducer(state: IDataServiceStateRecord<any>, action: IAction<IQueryCache>): IDataServiceStateRecord<any>;
