import { IDataServiceStateRecord } from "./DataServiceStateRecord";
import { IAction } from "../IService";
import { IQueryBuilder } from "../../Query";
import { IPostActionHandlers } from "./IPostActionHandlers";
import { IForceReload } from "./IForceReload";
export declare type FetchAllAction = IAction<IQueryBuilder, IPostActionHandlers & IForceReload>;
export declare function shouldFetchAll(state: IDataServiceStateRecord<any>, action: FetchAllAction): boolean;
