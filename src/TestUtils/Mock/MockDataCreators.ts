import { forEach, upperFirst } from "lodash";
import { IModel } from "../../Model";

export interface IModelDataCreatorMap {
  [name: string]: (overrideValues?: any) => IModel<any>;
}

let _modelDataCreatorMap: IModelDataCreatorMap = {};

/** Build a modelDataCreatorMap for later use in the seedService* functions */
export function initializeMockDataCreators(modules) {
  _modelDataCreatorMap = {};
  
  forEach(modules, (moduleItem, moduleName) => {
    const mockDataCreatorName = `createMock${upperFirst(moduleName)}`;
    if (mockDataCreatorName in moduleItem) {
      _modelDataCreatorMap[moduleName] = moduleItem[mockDataCreatorName];
    }
  });
}

export function getModelDataCreatorMap() {
  return _modelDataCreatorMap;
}
