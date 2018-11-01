import { DataService } from "./DataService";
import { IModelFactory } from "../Model";
import { IFakeModelData } from "../Model/Model.mock";
export declare class FakeModelService extends DataService<IFakeModelData> {
    readonly name: string;
    readonly ModelClass: IModelFactory<IFakeModelData>;
}
