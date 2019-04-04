import { IModel, IModelData, IModelFactory } from "../Model/IModel";
import { IRawQueryResponse } from "../Query/IRawQueryResponse";
import { IQueryResponse } from "../Query/IQueryResponse";
export interface IMapper<T extends IModelData, R = T> {
    transform: (model: IModel<T> | Partial<T>) => Promise<Partial<R>>;
    transformPatch: (model: IModel<T> | Partial<T>) => any;
    transformList: (models: IModel<T>[]) => Promise<R[]>;
    normalize: (data: Partial<R>) => Promise<IModel<T>>;
    normalizeQueryResponse: (data: IRawQueryResponse<R>) => Promise<IQueryResponse & {
        items: IModel<T>[];
    }>;
}
export interface IMapperFactory<T extends IModelData, R = T> {
    new (ModelClass: IModelFactory<T>): IMapper<T, R>;
}
