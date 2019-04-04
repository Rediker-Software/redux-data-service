import { IDataServiceStateRecord } from "./DataServiceStateRecord";
import { IAction } from "../IService";
import { IForceReload } from "./IForceReload";
export declare type FetchItemAction = IAction<{
    id: string;
}, IForceReload>;
export declare function shouldFetchItem(state: IDataServiceStateRecord<any>, action: FetchItemAction): boolean;
