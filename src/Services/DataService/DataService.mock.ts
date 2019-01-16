import { FakeModel, IFakeModelData, IModelFactory } from "../../Model";
import { IAdapterFactory, MockAdapter } from "../../Adapters";
import { IMapperFactory, MockMapper } from "../../Mapper";
import { ISerializerFactory, MockSerializer } from "../../Serializers";

import { DataService } from "./DataService";

export class FakeModelService extends DataService<IFakeModelData> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<IFakeModelData> = FakeModel;
  protected readonly AdapterClass: IAdapterFactory<any> = MockAdapter;
  protected readonly SerializerClass: ISerializerFactory<any, any> = MockSerializer;
  protected readonly MapperClass: IMapperFactory<any> = MockMapper;
}
