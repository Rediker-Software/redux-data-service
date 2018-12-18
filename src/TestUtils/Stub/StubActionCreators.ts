import { stubService } from "./StubService";

let actionStubMap: any = {};

/** Stub all actions in each service */
export function stubActionCreators(modules) {
  resetActionStubMap();
  Object.keys(modules).forEach((moduleName) => {
    const stubMapEntry = stubService(moduleName);
    if (stubMapEntry) { // if it had any stubbed actions
      actionStubMap[moduleName] = stubMapEntry;
    }
  });
}

/**
 * Restores all stubs in the action stub map
 */
export function restoreActionStubs() {
  Object.keys(actionStubMap).forEach((moduleName) => {
    Object.keys(actionStubMap[moduleName]).forEach((actionName) => {
      actionStubMap[moduleName][actionName].base.restore();
    });
  });
  actionStubMap = {};
}

export function getActionStubMap() {
  return actionStubMap;
}

export function resetActionStubMap() {
  actionStubMap = {};
}
