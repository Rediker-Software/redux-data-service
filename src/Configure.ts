import { Store } from "redux";
import { from as from$ } from "rxjs/observable/from";

import { initialize } from "./Initialize";
import { BaseService, getEpics, getReducers, IModuleMap, initializeServices } from "./Services";
import { configureStore as defaultConfigureStore, IConfigureStore } from "./Store";
import { ISerializerFactory, RestSerializer } from "./Serializers";
import { IAdapterFactory } from "./Adapters/IAdapter";
import { RestAdapter } from "./Adapters";
import { IMapperFactory, Mapper } from "./Mapper";

export interface IConfiguration {
  modules: IModuleMap;
  adapter?: IAdapterFactory<any>;
  serializer?: ISerializerFactory<any, any>;
  mapper?: IMapperFactory<any>;
}

const defaultConfiguration: Partial<IConfiguration> = {
  adapter: RestAdapter,
  serializer: RestSerializer,
  mapper: Mapper,
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
