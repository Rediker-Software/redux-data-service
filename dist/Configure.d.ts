import { Store } from "redux";
import { IModuleMap } from "./Services";
import { IConfigureStore } from "./Store";
import { ISerializerFactory } from "./Serializers";
import { IAdapterFactory } from "./Adapters";
export interface IConfiguration {
    modules: IModuleMap;
    adapter?: IAdapterFactory<any>;
    serializer?: ISerializerFactory<any, any, any>;
}
export declare function getConfiguration(): IConfiguration;
export declare function configure(config: IConfiguration, configureStore?: IConfigureStore): Store<any>;
