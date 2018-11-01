import { Observable } from "rxjs/Observable";
import { IModelData } from "../Model";
import { IAdapter } from "./IAdapter";
export declare class MemoryAdapter implements IAdapter<Partial<IModelData>> {
    readonly serviceName: string;
    constructor(serviceName: string);
    fetchAll(requestParams?: any): Observable<{
        items: IModelData[];
    }>;
    fetchItem(id: string): Observable<IModelData>;
    createItem(item: IModelData): Observable<IModelData>;
    updateItem(id: any, item: IModelData): Observable<IModelData>;
    patchItem(id: any, item: IModelData): Observable<IModelData>;
    deleteItem(id: any): Observable<Partial<IModelData>>;
}
