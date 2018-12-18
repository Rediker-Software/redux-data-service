import { initializeMockDataCreators } from "./MockDataCreators";
import { MemorySerializer } from "Serializers";
import { configure } from "Configure";
import { defaults } from "lodash";

/**
 * Registers the services, short circuits their XHR epics and returns a Redux store.
 * Will use a MemoryAdapter and MemorySerializer by default.
 */
export function initializeTestServices(modules: IModuleMap, shouldStubActionCreators = true, configOptions: Partial<IConfiguration> = {}): Store<any> {
  const store = configure(defaults({}, configOptions, {
    modules,
    // adapter: MemoryAdapter,
    serializer: MemorySerializer,
  }));

  initializeMockDataCreators(modules);
  stubXHR();

  if (shouldStubActionCreators) {
    stubActionCreators(modules);
  } else {
    actionStubMap = {};
  }

  return store;
}