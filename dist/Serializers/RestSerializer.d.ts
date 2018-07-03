import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";
export declare class RestSerializer<T extends IModelData> extends BaseSerializer<T, string> {
    serialize(model: IModel<T> | Partial<T>): string;
    deserialize(data: any): IModel<T>;
}
