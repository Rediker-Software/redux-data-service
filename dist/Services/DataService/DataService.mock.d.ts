import { IModelFactory } from "../../Model/IModel";
import { IFakeModelData } from "../../Model/Model.mock";
import { MockAdapter } from "../../Adapters";
import { MockMapper } from "../../Mapper";
import { MockSerializer } from "../../Serializers";
import { DataService } from "./DataService";
export declare class FakeModelService extends DataService<IFakeModelData> {
    readonly name: string;
    readonly ModelClass: IModelFactory<IFakeModelData>;
    protected readonly AdapterClass: typeof MockAdapter;
    protected readonly SerializerClass: typeof MockSerializer;
    protected readonly MapperClass: typeof MockMapper;
}
