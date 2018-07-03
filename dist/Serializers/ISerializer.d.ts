import { IModel, IModelData, IModelFactory } from "../Model";
export interface ISerializer<T extends IModelData, S> {
    serialize: (modelData: IModel<T> | Partial<T>) => S;
    deserialize: (data: S) => IModel<T>;
    transform: (model: IModel<T>) => Partial<T>;
    normalize: (data: Partial<T>) => IModel<T>;
}
export interface ISerializerFactory<T extends IModelData> {
    new (ModelClass: IModelFactory<T>): ISerializer<T, any>;
}
