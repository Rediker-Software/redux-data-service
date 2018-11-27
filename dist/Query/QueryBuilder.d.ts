export declare type SortDirection = "asc" | "desc";
export interface ISort {
    key: string;
    direction?: SortDirection;
}
export declare type FilterValue = string | number | boolean;
export interface IQueryBuilder {
    readonly serviceName: string;
    readonly queryParams: IQueryParams;
    sort: (key: string, direction?: SortDirection, position?: number) => IQueryBuilder;
    removeSort: (key: string) => IQueryBuilder;
    filter: (key: string, value: FilterValue | FilterValue[]) => IQueryBuilder;
    removeFilter: (key: string) => IQueryBuilder;
    page: (pageNumber: number) => IQueryBuilder;
    pageSize: (pageSize: number) => IQueryBuilder;
    getHashCode: () => string;
    invoke: () => void;
}
export interface IQueryParams {
    sort?: ISort[];
    page?: number;
    pageSize?: number;
    [key: string]: FilterValue | FilterValue[] | ISort[];
}
export declare class QueryBuilder implements IQueryBuilder {
    readonly serviceName: string;
    readonly queryParams: IQueryParams;
    private hashCode;
    constructor(serviceName: string, queryParams?: IQueryParams);
    filter(key: string, value: (FilterValue | FilterValue[])): IQueryBuilder;
    removeFilter(key: string): IQueryBuilder;
    page(pageNumber: number): IQueryBuilder;
    pageSize(pageSize: number): IQueryBuilder;
    sort(key: string, direction?: SortDirection, position?: number): IQueryBuilder;
    removeSort(key: string): IQueryBuilder;
    invoke(): void;
    getHashCode(): string;
}
