import { IFakeModelData, IModelFactory } from "../../Model";
import { IAdapterFactory } from "../../Adapters";
import { IMapperFactory } from "../../Mapper";
import { ISerializerFactory } from "../../Serializers";
import { DataService } from "./DataService";
export declare class FakeModelService extends DataService<IFakeModelData> {
    readonly name = "fakeModel";
    readonly ModelClass: IModelFactory<IFakeModelData>;
    protected readonly AdapterClass: IAdapterFactory<any>;
    protected readonly SerializerClass: ISerializerFactory<any, any>;
    protected readonly MapperClass: IMapperFactory<any>;
}
