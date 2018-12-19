import { FakeModel, IFakeModelData, IModelFactory } from "../../Model";
import { MockAdapter } from "../../Adapters";
import { MockMapper } from "../../Mapper";
import { MockSerializer } from "../../Serializers";

import { DataService } from "./DataService";

export class FakeModelService extends DataService<IFakeModelData> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<IFakeModelData> = FakeModel;
  protected readonly AdapterClass = MockAdapter;
  protected readonly SerializerClass = MockSerializer;
  protected readonly MapperClass = MockMapper;
}
