import { forEach, isEmpty, upperFirst } from "lodash";
import { Store } from "redux";
import { spy, stub, useFakeXMLHttpRequest } from "sinon";

import { IModel, IModelData } from "Model";
import { getDataService, IAction, IModuleMap, IService } from "Services";
import { configure } from "Configure";

export interface IModelDataCreatorMap {
  [name: string]: (overrideValues?: any) => IModel<any>;
}

let modelDataCreatorMap: IModelDataCreatorMap = {};
/**
 * Looks like
 * {
 *    [moduleName] : {
 *      [actionName] : {
 *        base: main stub on action
 *        invokeSpy: A Sinon Spy
 *      }
 *    }
 * }
 *
 */
let actionStubMap: any = {};
let _FakedXHRHistory = [];
let _FakeXHR;

/**
 * Registers the services, short circuits their XHR epics and returns a Redux store
 */
export function initializeTestServices(modules: IModuleMap, shouldStubActionCreators = true): Store<any> {
  const store = configure({ modules });

  initializeMockDataCreators(modules);
  stubXHR();

  if (shouldStubActionCreators) {
    stubActionCreators(modules);
  } else {
    actionStubMap = {};
  }

  return store;
}

/** Build a modelDataCreatorMap for later use in the seedService* functions */
export function initializeMockDataCreators(modules) {
  modelDataCreatorMap = {};
  forEach(modules, (moduleItem, moduleName) => {
    const mockDataCreatorName = `createMock${upperFirst(moduleName)}`;
    if (mockDataCreatorName in moduleItem) {
      modelDataCreatorMap[moduleName] = moduleItem[mockDataCreatorName];
    }
  });
}

/** Stub all actions in each service */
export function stubActionCreators(modules) {
  actionStubMap = {};
  Object.keys(modules).forEach((moduleName) => {
    const stubMapEntry = stubService(moduleName);
    if (stubMapEntry) { // if it had any stubbed actions
      actionStubMap[moduleName] = stubMapEntry;
    }
  });
}

/** Stub all XHR requests via Sinon */
export function stubXHR() {
  _FakeXHR = useFakeXMLHttpRequest();
  _FakedXHRHistory = [];
  _FakeXHR.onCreate = (xhr) => {
    _FakedXHRHistory.push(xhr);
  };
}

export function getFakeXHR() {
  return _FakeXHR;
}

export function getFakedXHRHistory() {
  return _FakedXHRHistory;
}

/**
 * Attempts to stub a service
 *
 * @param moduleName name of module which will have its service stubbed
 * @returns stubMapEntry or undefined if nothing stubbed
 */
function stubService(moduleName: string) {
  const service = getDataService(moduleName);
  const actionsToStub = ["fetchAll", "fetchRecord", "createRecord", "updateRecord", "patchRecord", "deleteRecord"];

  const stubActions = actionsToStub.reduce((actionStubMapEntry, fnNameToStub) => {
    const stubAction = tryStubAction(moduleName, service.actions, fnNameToStub);
    if (stubAction) { // if it successfully stubbed
      actionStubMapEntry[fnNameToStub] = stubAction;
    }
    return actionStubMapEntry;
  }, {});

  return isEmpty(stubActions) ? undefined : stubActions;
}

/**
 * Attempts to stub a method on an object if that method exists, stub returns a valid IAction
 *
 * @param moduleName Name of module this stub is acting on
 * @param obj Object to stub
 * @param methodName method in object to stub
 * @returns Sinon stub if methodName in obj otherwise undefined
 */
function tryStubAction(moduleName: string, obj: any, methodName: string) {
  if (methodName in obj) {
    const invokeSpy = spy();
    const mainStub = stub(obj, methodName).callsFake((payload, meta) => {
      return ({
        invoke: invokeSpy,
        type: `${moduleName}/${methodName}`,
        payload,
        meta,
      } as IAction);
    });
    return { base: mainStub, invokeSpy };
  }
}

export function getActionStubMap() {
  return actionStubMap;
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

/**
 * Adds seed data to the redux store for a single specific service
 *
 * @param serviceName service to seed
 * @param overrideValues values to override in seed
 */
export function seedService<T extends IModelData>(serviceName: string, overrideValues: Partial<T> = {}): IModel<T> {
  if (serviceName in modelDataCreatorMap) {
    const model = modelDataCreatorMap[serviceName](overrideValues);
    const service = getDataService(serviceName);

    service.actions.pushRecord(model).invoke();
    return model;
  } else {
    throw new ReferenceError(`ModelDataCreator for "${serviceName}" not registered!`);
  }
}

/**
 * Adds multiple seeds to the redux store for a single specified service.
 * If `overrideValues` are provided, they will be added to the service's requestCache as queryParams.
 *
 * @param serviceName service to seed
 * @param count number of seeds
 * @param overrideValues values to override in seeds
 */
export function seedServiceList<T extends IModelData>(serviceName: string, count: number = 5, overrideValues: Partial<T> = {}): IModel<T>[] {
  const seededData: IModel<T>[] = [];

  for (let i = 0; i < count; i++) {
    seededData.push(seedService<T>(serviceName, overrideValues));
  }

  const service = getDataService(serviceName);
  service.actions.pushAll({ items: seededData }, { queryParams: overrideValues }).invoke();

  return seededData;
}

/**
 * Add multiple seeds for each of the initialized services
 *
 * @param serviceNames services to seed, defaults to all services initialized in initializeTestServices()
 */
export function seedServices(serviceNames?: string[]): {} {
  if (!serviceNames) {
    serviceNames = Object.keys(modelDataCreatorMap); // anything in the creator map can be seeded
  }

  return serviceNames.reduce((seededData, serviceName) => {
    seededData[serviceName] = seedServiceList(serviceName);
    return seededData;
  }, {});
}

/**
 * Creates a mock state object for the given service to plug it into a mock Redux store
 *
 * @see redux-test-utils/createMockStore
 *
 * @param {IService<T>} service
 * @param {IAction[]} actions
 * @returns any
 */
export function createMockServiceState<T>(service: IService<T>, actions: IAction[] = []) {
  let state = service.getDefaultState();

  actions.forEach((action) => {
    state = service.reducer(state, action);
  });

  return {
    [service.name]: state,
  };
}
