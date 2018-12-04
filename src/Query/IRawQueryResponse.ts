export interface IRawQueryResponse<R> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    nextPage: number;
    previousPage: number;
    hasPrevious: boolean;
    hasNext: number;
    items: R[];
}
