import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";
import { IQueryParams } from "../Query/QueryBuilder";
export declare class RestSerializer<T extends IModelData, R = T> extends BaseSerializer<string, T, R> {
    serialize(model: IModel<T> | Partial<T>): Promise<string>;
    deserialize(data: any): Promise<IModel<T>>;
    serializeQueryParams({ sort, ...params }: IQueryParams): Promise<string>;
}
