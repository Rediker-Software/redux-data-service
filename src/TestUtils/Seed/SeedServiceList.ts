import { IModel, IModelData } from "../../Model";
import { getDataService } from "../../Services";

import {
  createMockQueryResponse,
  IQueryParams,
  IQueryResponse,
  QueryBuilder,
} from "../../Query";

import { seedService } from "./SeedService";

/**
 * Adds the given number of seeds to the redux store for a single specified service.
 * If `overrideValues` are provided, they will be passed to each item.
 *
 * The given `options` param may be used to set the query params or the shape of the response envelope.
 * If `options.queryParams` are not given, the `overrideValues` will be used by default.
 */
export function seedServiceList<T extends IModelData>(
  serviceName: string,
  count: number = 5,
  overrideValues: Partial<T> = {},
  options: Partial<{ queryParams: IQueryParams } & IQueryResponse> = {},
): IModel<T>[] {
  const seededData: IModel<T>[] = [];

  for (let i = 0; i < count; i++) {
    seededData.push(seedService<T>(serviceName, overrideValues));
  }

  const service = getDataService(serviceName);
  const { queryParams, ...response} = options;

  service
    .actions
    .setQueryResponse({
      query: new QueryBuilder(serviceName, queryParams || overrideValues as any),
      response: createMockQueryResponse({
        ids: seededData.map(x => x.id),
        ...response,
      }),
    })
    .invoke();

  return seededData;
}
