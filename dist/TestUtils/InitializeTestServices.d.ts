import { Store } from "redux";
import { IConfiguration } from "../Configure";
import { IModuleMap } from "../Services";
export declare function initializeTestServices(modules?: IModuleMap, configOptions?: Partial<IConfiguration>): Store<any>;
