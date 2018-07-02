// tslint:disable:max-classes-per-file
import { DataService } from "./DataService";
import { FakeModel, IFakeModelData, IModelFactory } from "Model";

export class FakeModelService extends DataService<IFakeModelData> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<IFakeModelData> = FakeModel;
}
