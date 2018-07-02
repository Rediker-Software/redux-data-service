import { Store } from "redux";
import { IModuleMap } from "Services";
import { IConfigureStore } from "Store";
export interface IConfiguration {
    modules: IModuleMap;
}
export declare function getConfiguration(): IConfiguration;
export declare function configure(config: IConfiguration, configureStore?: IConfigureStore): Store<any>;
