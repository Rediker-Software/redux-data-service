import { Store } from "redux";
import { IConfigureStore } from "./Store/ConfigureStore";
import { IAdapterFactory } from "./Adapters/IAdapter";
import { ISerializerFactory } from "./Serializers/ISerializer";
import { IMapperFactory } from "./Mapper/IMapper";
import { IModuleMap } from "./Services/ServiceProvider";
export interface IConfiguration {
    modules: IModuleMap;
    adapter?: IAdapterFactory<any>;
    serializer?: ISerializerFactory<any, any>;
    mapper?: IMapperFactory<any>;
    preferPatchOverPut?: boolean;
    coalesceFindRequests?: boolean;
    coalesceBufferTime?: number;
}
export declare const DEFAULT_COALESCE_BUFFER_TIME = 50;
export declare function getConfiguration(): IConfiguration;
export declare function configure(config: IConfiguration, configureStore?: IConfigureStore): Store<any>;
