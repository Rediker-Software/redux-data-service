import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";
export declare class RestSerializer<T extends IModelData, R = T> extends BaseSerializer<string, T, R> {
    serialize(model: IModel<T> | Partial<T>): Promise<string>;
    deserialize(data: any): Promise<IModel<T>>;
}
