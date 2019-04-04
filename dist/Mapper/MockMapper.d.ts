import { IMapper } from "./IMapper";
export declare class MockMapper implements IMapper<any> {
    transform(model: any): Promise<any>;
    transformList(models: any): Promise<any>;
    transformPatch(model: any): Promise<{
        op: string;
        path: string;
        value: string;
    }[]>;
    normalize(data: any): Promise<any>;
    normalizeQueryResponse(data: any): Promise<any>;
}
