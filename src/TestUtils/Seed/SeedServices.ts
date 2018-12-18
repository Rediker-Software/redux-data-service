import { getModelDataCreatorMap } from "../Mock";
import { seedServiceList } from "./SeedServiceList";

/**
 * Add multiple seeds for each of the initialized services
 *
 * @param serviceNames services to seed, defaults to all services initialized in initializeTestServices()
 */
export function seedServices(serviceNames?: string[]): {} {
  const modelDataCreatorMap = getModelDataCreatorMap();

  if (!serviceNames) {
    serviceNames = Object.keys(modelDataCreatorMap); // anything in the creator map can be seeded
  }

  return serviceNames.reduce((seededData, serviceName) => {
    seededData[serviceName] = seedServiceList(serviceName);
    return seededData;
  }, {});
}
