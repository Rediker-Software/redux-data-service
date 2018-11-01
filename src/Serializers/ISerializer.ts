import { IModel, IModelData, IModelFactory } from "../Model";

export interface ISerializer<S, T extends IModelData, R = T> {
  serialize: (modelData: IModel<T> | Partial<T>) => Promise<S>;
  deserialize: (data: R) => Promise<IModel<T>>;
  transform: (model: IModel<T>) => Promise<Partial<R>>;
  normalize: (data: Partial<R>) => Promise<IModel<T>>;
}

export interface ISerializerFactory<S, T extends IModelData, R = T> {
  new(ModelClass: IModelFactory<T>): ISerializer<S, T, R>;
}
