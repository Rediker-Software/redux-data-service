// tslint:disable:max-classes-per-file
import { IModelFactory } from "../../Model/IModel";
import { FakeModel, IFakeModelData } from "../../Model/Model.mock";

import { MockAdapter } from "../../Adapters/MockAdapter";
import { MockMapper } from "../../Mapper/MockMapper";
import { MockSerializer } from "../../Serializers/MockSerializer";

import { DataService } from "./DataService";

export class FakeModelService extends DataService<IFakeModelData> {
  public readonly name = "fakeModel";
  public readonly ModelClass: IModelFactory<IFakeModelData> = FakeModel;
  protected readonly AdapterClass = MockAdapter;
  protected readonly SerializerClass = MockSerializer;
  protected readonly MapperClass = MockMapper;
}
