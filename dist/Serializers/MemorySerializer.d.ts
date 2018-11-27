import { IModel, IModelData } from "../Model";
import { IQueryParams } from "../Query";
import { BaseSerializer } from "./BaseSerializer";
export declare class MemorySerializer<T extends IModelData, R = T> extends BaseSerializer<Partial<R>, T, R> {
    serialize(model: IModel<T> | Partial<T>): Promise<Partial<R>>;
    deserialize(data: Partial<R>): Promise<IModel<T>>;
    serializeQueryParams(queryParams: IQueryParams): Promise<IQueryParams>;
}
