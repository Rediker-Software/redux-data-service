import { IModel, IModelData, IModelFactory } from "../Model";
import { IQueryResponse, IRawQueryResponse } from "../Query";

export interface IMapper<T extends IModelData, R = T> {
  transform: (model: IModel<T> | Partial<T>) => Promise<Partial<R>>;
  normalize: (data: Partial<R>) => Promise<IModel<T>>;
  normalizeQueryResponse: (data: IRawQueryResponse<R>) => Promise<IQueryResponse>;
}

export interface IMapperFactory<T extends IModelData, R = T> {
  new(ModelClass: IModelFactory<T>): IMapper<T, R>;
}
