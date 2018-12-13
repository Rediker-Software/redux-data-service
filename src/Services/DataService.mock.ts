// tslint:disable:max-classes-per-file
import { DataService } from "./DataService";
import { IModelFactory } from "../Model/IModel";
import { FakeModel, IFakeModelData } from "../Model/Model.mock";

export class FakeModelService extends DataService<IFakeModelData> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<IFakeModelData> = FakeModel;
}
