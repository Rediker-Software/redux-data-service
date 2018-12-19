import { random } from "faker";

import { IQueryResponse } from "./IQueryResponse";

/** Creates a mock IQueryResponse object */
export function createMockQueryResponse(overrideValues?: Partial<IQueryResponse>): IQueryResponse {
  return {
    currentPage: random.number(),
    totalPages: random.number(),
    pageSize: random.number(),
    totalCount: random.number(),
    nextPage: random.number(),
    previousPage: random.number(),
    hasPrevious: random.boolean(),
    hasNext: random.boolean(),
    ids: [
      random.uuid(),
      random.uuid(),
    ],
    ...overrideValues,
  };
}
