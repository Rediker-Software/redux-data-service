import { IModel, IModelData } from "../../Model";
import { getDataService } from "../../Services";
import { getModelDataCreatorMap } from "../Mock";

/**
 * Adds seed data to the redux store for a single specific service
 *
 * @param serviceName service to seed
 * @param overrideValues values to override in seed
 */
export function seedService<T extends IModelData>(serviceName: string, overrideValues: Partial<T> = {}): IModel<T> {
  const modelDataCreatorMap = getModelDataCreatorMap();

  if (serviceName in modelDataCreatorMap) {
    const model = modelDataCreatorMap[serviceName](overrideValues);
    const service = getDataService(serviceName);

    service.actions.pushRecord(model).invoke();
    
    return model;
  } else {
    throw new ReferenceError(`ModelDataCreator for "${serviceName}" not registered!`);
  }
}
