import { Record } from "immutable";
import { IQueryCache } from "./IQueryCache";

export type IQueryCacheRecord = Record<IQueryCache> & Readonly<IQueryCache>;

/**
 * Creates an ImmutableJS Record of IQueryCache
 */
export const QueryCacheRecord = Record<IQueryCache>({
  query: undefined,
  response: undefined,
  isLoading: false,
  errors: undefined,
});
