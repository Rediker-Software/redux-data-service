import { Store } from "redux";
import { defaults } from "lodash";

import { configure, IConfiguration } from "../Configure";
import { MemoryAdapter } from "../Adapters";
import { MemorySerializer } from "../Serializers";
import { IModuleMap } from "../Services";

import { stubXHR } from "./StubXhr";
import { initializeMockDataCreators } from "./Mock/MockDataCreators";
import { fakeModelModule } from "./FakeModelModule";

/**
 * Registers the services, short circuits their XHR epics and returns a Redux store.
 * Will use a MemoryAdapter and MemorySerializer by default.
 */
export function initializeTestServices(modules: IModuleMap = {}, configOptions: Partial<IConfiguration> = {}): Store<any> {
  modules = {
    ...fakeModelModule,
    ...modules,
  };

  const store = configure(defaults({}, configOptions, {
    modules,
    adapter: MemoryAdapter,
    serializer: MemorySerializer,
  }));

  initializeMockDataCreators(modules);
  stubXHR();

  return store;
}
