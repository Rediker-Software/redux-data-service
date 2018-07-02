import { Store } from "redux";
import { IModel, IModelData } from "Model";
import { IAction, IModuleMap, IService } from "Services";
export interface IModelDataCreatorMap {
    [name: string]: (overrideValues?: any) => IModel<any>;
}
export declare function initializeTestServices(modules: IModuleMap, shouldStubActionCreators?: boolean): Store<any>;
export declare function initializeMockDataCreators(modules: any): void;
export declare function stubActionCreators(modules: any): void;
export declare function stubXHR(): void;
export declare function getFakeXHR(): any;
export declare function getFakedXHRHistory(): any[];
export declare function getActionStubMap(): any;
export declare function restoreActionStubs(): void;
export declare function seedService<T extends IModelData>(serviceName: string, overrideValues?: Partial<T>): IModel<T>;
export declare function seedServiceList<T extends IModelData>(serviceName: string, count?: number, overrideValues?: Partial<T>): IModel<T>[];
export declare function seedServices(serviceNames?: string[]): {};
export declare function createMockServiceState<T>(service: IService<T>, actions?: IAction[]): {
    [x: string]: T;
};
