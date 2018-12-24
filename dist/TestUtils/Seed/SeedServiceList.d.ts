import { IModel, IModelData } from "../../Model";
import { IQueryParams, IQueryResponse } from "../../Query";
export declare function seedServiceList<T extends IModelData>(serviceName: string, count?: number, overrideValues?: Partial<T>, options?: Partial<{
    queryParams: IQueryParams;
} & IQueryResponse>): IModel<T>[];
