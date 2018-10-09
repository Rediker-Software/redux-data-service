import { IModel, IModelData } from "../Model";
import { BaseSerializer } from "./BaseSerializer";
export declare class MemorySerializer<T extends IModelData, R = T> extends BaseSerializer<Partial<R>, T, R> {
    serialize(model: IModel<T> | Partial<T>): Partial<R>;
    deserialize(data: Partial<R>): IModel<T>;
}
