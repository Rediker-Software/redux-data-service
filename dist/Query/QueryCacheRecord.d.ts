import { Record } from "immutable";
import { IQueryCache } from "./IQueryCache";
export declare type IQueryCacheRecord = Record<IQueryCache> & Readonly<IQueryCache>;
export declare const QueryCacheRecord: Record.Factory<IQueryCache>;
