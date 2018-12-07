export interface IQueryResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  nextPage: number;
  previousPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  ids: string[];
  errors?: string[];
}
