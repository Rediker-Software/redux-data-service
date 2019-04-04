import { IModel, IModelData } from "../../Model";
export declare function seedService<T extends IModelData>(serviceName: string, overrideValues?: Partial<T>): IModel<T>;
