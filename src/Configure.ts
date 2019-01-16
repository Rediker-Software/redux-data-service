import { Store } from "redux";
import { from as from$ } from "rxjs/observable/from";

import { initialize } from "./Initialize";
import { configureStore as defaultConfigureStore, IConfigureStore } from "./Store/ConfigureStore";

import { IAdapterFactory } from "./Adapters/IAdapter";
import { RestAdapter } from "./Adapters/RestAdapter";

import { ISerializerFactory } from "./Serializers/ISerializer";
import { RestSerializer } from "./Serializers/RestSerializer";

import { IMapperFactory } from "./Mapper/IMapper";
import { Mapper } from "./Mapper/Mapper";

import { getEpics, getReducers, IModuleMap, initializeServices } from "./Services/ServiceProvider";
import { BaseService } from "./Services/BaseService";

export interface IConfiguration {
  modules: IModuleMap;
  adapter?: IAdapterFactory<any>;
  serializer?: ISerializerFactory<any, any>;
  mapper?: IMapperFactory<any>;
  preferPatchOverPut?: boolean;
  coalesceFindRequests?: boolean;
  coalesceBufferTime?: number;
}

export const DEFAULT_COALESCE_BUFFER_TIME = 100;

const defaultConfiguration: Partial<IConfiguration> = {
  adapter: RestAdapter,
  serializer: RestSerializer,
  mapper: Mapper,
  preferPatchOverPut: false,
  coalesceFindRequests: false,
  coalesceBufferTime: DEFAULT_COALESCE_BUFFER_TIME,
};

let configuration: IConfiguration = {} as IConfiguration;

export function getConfiguration() {
  return configuration;
}

export function configure(config: IConfiguration, configureStore: IConfigureStore = defaultConfigureStore): Store<any> {
  configuration = { ...defaultConfiguration, ...config };
  initialize();
  initializeServices(config.modules);

  const store = configureStore(getReducers(), getEpics());

  BaseService.setStateObservable(from$(store as any));
  BaseService.registerDispatch(store.dispatch);

  return store;
}
