import { forEach, mapValues, upperFirst } from "lodash";

import { IActionEpic, IReducers, IService, IServiceFactory } from "./IService";
import { DataService } from "./DataService";

import { IModelData, IModelFactory } from "../Model/IModel";
import { isApplicationInitialized } from "../Initialize";
import { ISerializerFactory } from "../Serializers";
import { IAdapterFactory } from "../Adapters";

export interface IServiceMap {
  [name: string]: IService<any>;
}

export interface IModuleMap {
  [module: string]: {
    [name: string]: IModelFactory<any> | IServiceFactory | ISerializerFactory<any, any> | IAdapterFactory<any> | { (data: any): any } | any;
  };
}

let serviceMap: IServiceMap = {};

/**
 * Behaves as a dependency injection service to facilitate injecting service instances
 * based on their name and module. This is useful for testing so services can be replaced with mocks.
 *
 * @param name
 * @returns {IService<any>}
 */
export function getService<T>(name): IService<T> {
  if (name in serviceMap) {
    return serviceMap[name];
  } else if (process.env.NODE_ENV !== "production" && isApplicationInitialized()) {
    throw new ReferenceError(`Requested service "${name}" was not found. Did you forget to register it?`);
  }
}

/**
 * Get the requested DataService using getService.
 *
 * @param {string} name
 * @returns {DataService<T extends IModelData>}
 */
export function getDataService<T extends IModelData = any>(name: string): DataService<T> {
  return getService(name) as DataService<T>;
}

/**
 * Initialize the map of services to enable dependency injection.
 *
 * We assume each module exports a class which follows the naming convention: "<moduleName>Service"
 * For example: the "country" module should export a CountryService
 *
 * Note: This is called when the application boots up, pulling in the map from the "fakeModelModule" directory to
 * automagically register all fakeModelModule. Eventually, it would be nice to register services as they are requested
 * and dynamically update the redux store as they are needed. This would be especially ideal for code splitting.
 *
 * You should not need to call this method directly unless it is needed for testing.
 *
 * @param {IModuleMap} modules
 */
export function initializeServices(modules: IModuleMap) {
  serviceMap = {};

  // We assume each module exports a class which follows the naming convention: "<module>Service"
  // For example: the "country" module should export a CountryService
  forEach(modules, (moduleObj, moduleName) => {
    const serviceName = `${upperFirst(moduleName)}Service`;
    if (serviceName in moduleObj) {
      try {
        const ServiceClass = moduleObj[serviceName] as IServiceFactory;
        registerService(new ServiceClass());
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`Failed to register service "${serviceName}"`, moduleObj[serviceName], e); // tslint:disable-line
        }
        throw e;
      }
    }
  });
}

/**
 * Enables service dependency injection by registering services
 * so they can later be retrieved (injected) as needed.
 *
 * Note: Until we can support dynamically updating the redux store, you should not need to call this method
 * except as a convenience for testing purposes.
 *
 * @param {IService<any>} service
 */
export function registerService(service: IService<any>) {
  const { name } = service;
  serviceMap[name] = service;
}

/**
 * Creates the root reducer to be added to the Redux store.
 * Note: This method is called on startup. You should not need to call it directly except for testing purposes.
 */
export function getReducers(): IReducers<any> {
  return mapValues(serviceMap, (service) => service.reducer);
}

/**
 * Creates the root epic which will be added to the redux-observable epic middleware
 *
 * Note: This method is called on startup. You should not need to call it directly except for testing purposes.
 */
export function getEpics(): IActionEpic[] {
  let epics: IActionEpic[] = [];

  forEach(serviceMap, (service: IService<any>) => {
    epics = epics.concat(service.epics);
  });

  return epics;
}
