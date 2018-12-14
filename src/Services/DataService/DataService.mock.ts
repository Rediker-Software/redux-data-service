// tslint:disable:max-classes-per-file
import { DataService } from "./";
import { IModelFactory } from "../../Model";
import { FakeModel, IFakeModelData } from "../../Model/Model.mock";
// import { MockAdapter } from "../../Adapters";
// import { MockMapper } from "../../Mapper";
// import { MockSerializer } from "../../Serializers";

export class FakeModelService extends DataService<IFakeModelData> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<IFakeModelData> = FakeModel;
  // protected readonly AdapterClass = MockAdapter;
  // protected readonly SerializerClass = MockSerializer;
  // protected readonly MapperClass = MockMapper;
}
