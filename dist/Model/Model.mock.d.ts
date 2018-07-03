import { IModel, IModelData } from "./IModel";
import { Model } from "./Model";
export declare class FakeModel extends Model<IFakeModelData> implements IFakeModel {
    serviceName: string;
    fullText: string;
    getData(): Partial<IFakeModelData>;
}
export interface IFakeModel extends IModel<IFakeModelData>, IFakeModelData {
}
export interface IFakeModelData extends IModelData {
    fullText: string;
}
export declare function createMockFakeModelData(id?: string): IFakeModelData;
export declare function createMockFakeModel(overrideValues?: IFakeModelData): FakeModel;
export declare function createMockFakeModelArray(numItems?: number): IFakeModelData[];
export declare function createMockFakeModels(numItems?: number): FakeModel[];
