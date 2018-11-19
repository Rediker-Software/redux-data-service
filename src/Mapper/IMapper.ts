import { IModel, IModelData, IModelFactory } from "../Model";

export interface IMapper<M, T extends IModelData, R = T> {
  transform: (model: IModel<T>) => Promise<Partial<R>>;
  normalize: (data: Partial<R>) => Promise<IModel<T>>;
}

export interface IMapperFactory<M, T extends IModelData, R = T> {
  new(ModelClass: IModelFactory<T>): IMapper<M, T, R>;
}
