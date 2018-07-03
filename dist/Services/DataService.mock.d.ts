import { DataService } from "./DataService";
import { IFakeModelData, IModelFactory } from "../Model";
export declare class FakeModelService extends DataService<IFakeModelData> {
    readonly name: string;
    readonly ModelClass: IModelFactory<IFakeModelData>;
}
