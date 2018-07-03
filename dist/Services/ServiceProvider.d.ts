import { IActionEpic, IReducers, IService, IServiceFactory } from "./IService";
import { DataService } from "./DataService";
import { IModelData, IModelFactory } from "../Model";
import { ISerializerFactory } from "../Serializers";
import { IAdapterFactory } from "../Adapters";
export interface IServiceMap {
    [name: string]: IService<any>;
}
export interface IModuleMap {
    [module: string]: {
        [name: string]: IModelFactory<any> | IServiceFactory | ISerializerFactory<any> | IAdapterFactory<any> | {
            (data: any): any;
        };
    };
}
export declare function getService<T>(name: any): IService<T>;
export declare function getDataService<T extends IModelData = any>(name: string): DataService<T>;
export declare function initializeServices(modules: IModuleMap): void;
export declare function registerService(service: IService<any>): void;
export declare function getReducers(): IReducers<any>;
export declare function getEpics(): IActionEpic[];
