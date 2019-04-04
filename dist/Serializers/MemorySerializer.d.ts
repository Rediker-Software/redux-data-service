import { IQueryParams } from "../Query";
import { ISerializer } from "./ISerializer";
export declare class MemorySerializer<T = any, S = any> implements ISerializer<T, S> {
    serialize(model: T): Promise<S>;
    deserialize(data: S | T): Promise<T>;
    serializeQueryParams(queryParams: IQueryParams): IQueryParams;
}
