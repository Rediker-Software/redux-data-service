import { IModelData } from "../Model";
import { IQueryParams } from "../Query";
import { ISerializer } from "./ISerializer";
export declare class RestSerializer<T extends IModelData> implements ISerializer<T, string> {
    serialize(modelData: Partial<T>): Promise<string>;
    deserialize(data: T | string): Promise<T>;
    serializeQueryParams({ sort, ...params }: IQueryParams): string;
}
