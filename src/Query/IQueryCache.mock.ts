import { random } from "faker";

import { IQueryResponse } from "./IQueryResponse";

/** Creates a mock IQueryResponse object */
export function createMockQueryResponse(overrideValues?: Partial<IQueryResponse>): IQueryResponse {
  return {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 10,
    nextPage: null,
    previousPage: null,
    hasPrevious: false,
    hasNext: false,
    ids: [
      random.uuid(),
      random.uuid(),
    ],
    ...overrideValues,
  };
}
