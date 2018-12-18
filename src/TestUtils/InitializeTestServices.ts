import { Store } from "redux";
import { defaults } from "lodash";

import { configure, IConfiguration } from "../Configure";
import { MemoryAdapter } from "../Adapters";
import { MemorySerializer } from "../Serializers";
import { IModuleMap } from "../Services";

import { initializeMockDataCreators } from "./Mock/MockDataCreators";
import { resetActionStubMap, stubActionCreators, stubXHR } from "../TestUtils/Stub";

/**
 * Registers the services, short circuits their XHR epics and returns a Redux store.
 * Will use a MemoryAdapter and MemorySerializer by default.
 */
export function initializeTestServices(modules: IModuleMap, shouldStubActionCreators = true, configOptions: Partial<IConfiguration> = {}): Store<any> {
  const store = configure(defaults({}, configOptions, {
    modules,
    adapter: MemoryAdapter,
    serializer: MemorySerializer,
  }));

  initializeMockDataCreators(modules);
  stubXHR();

  if (shouldStubActionCreators) {
    stubActionCreators(modules);
  } else {
    resetActionStubMap();
  }
  return store;
}
