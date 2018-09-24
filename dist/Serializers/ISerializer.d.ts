import { IModel, IModelData, IModelFactory } from "../Model";
export interface ISerializer<S, T extends IModelData, R = T> {
    serialize: (modelData: IModel<T> | Partial<T>) => S;
    deserialize: (data: R) => IModel<T>;
    transform: (model: IModel<T>) => Partial<R>;
    normalize: (data: Partial<R>) => IModel<T>;
}
export interface ISerializerFactory<S, T extends IModelData, R = T> {
    new (ModelClass: IModelFactory<T>): ISerializer<S, T, R>;
}
