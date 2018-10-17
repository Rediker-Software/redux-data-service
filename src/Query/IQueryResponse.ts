export interface IQueryResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  nextPage: number;
  previousPage: number;
  ids: string[];
  errors?: string[];
}
