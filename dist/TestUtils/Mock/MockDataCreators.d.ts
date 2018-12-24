import { IModel } from "../../Model";
export interface IModelDataCreatorMap {
    [name: string]: (overrideValues?: any) => IModel<any>;
}
export declare function initializeMockDataCreators(modules: any): void;
export declare function getModelDataCreatorMap(): IModelDataCreatorMap;
