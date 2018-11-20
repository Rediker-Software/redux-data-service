import { IModel, IModelData, IModelFactory } from "../Model";

export interface IMapper<T extends IModelData, R = T> {
  transform: (model: IModel<T> | Partial<T>) => Promise<Partial<R>>;
  normalize: (data: Partial<R>) => Promise<IModel<T>>;
}

export interface IMapperFactory<T extends IModelData, R = T> {
  new(ModelClass: IModelFactory<T>): IMapper<T, R>;
}
