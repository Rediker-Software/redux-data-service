// tslint:disable:max-classes-per-file
import { DataService } from "..";
import { IModelFactory } from "../Model";
import { FakeModel, IFakeModelData } from "../Model/Model.mock";

debugger;

export class FakeModelService extends DataService<IFakeModelData> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<IFakeModelData> = FakeModel;
}
