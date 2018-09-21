import { IModel, IModelData, IModelFactory } from "../Model";

export interface ISerializer<S, T extends IModelData, R = T> {
  serialize: (modelData: IModel<T> | Partial<T>) => S;
  deserialize: (data: S) => IModel<T>;
  transform: (model: IModel<T>) => Partial<R>;
  normalize: (data: Partial<R>) => IModel<T>;
}

export interface ISerializerFactory<T extends IModelData> {
  new(ModelClass: IModelFactory<T>): ISerializer<T, any>;
}
