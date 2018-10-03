import { Observable } from "rxjs/Observable";
import { of as of$ } from "rxjs/observable/of";

import { seedService, seedServiceList } from "../TestUtils";

import { IModelData } from "../Model";
import { IAdapter } from "./IAdapter";

/**
 * An in-memory IAdapter implementation which returns fake data when it is requested.
 * This is useful for testing and local development. Not to be used in production.
 */
export class MemoryAdapter implements IAdapter<Partial<IModelData>> {
  public readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  public fetchAll(requestParams: any = {}): Observable<{ items: IModelData[] }> {
    const items = seedServiceList(this.serviceName, 20, requestParams) as any;
    return of$({ items: items.map(item => item.modelData) });
  }

  public fetchItem(id: string): Observable<IModelData> {
    const model = seedService(this.serviceName, { id }) as any;
    return of$(model.modelData);
  }

  public createItem(item: IModelData): Observable<IModelData> {
    const model = seedService(this.serviceName, item) as any;
    return of$(model.modelData);
  }

  public updateItem(id, item: IModelData): Observable<IModelData> {
    return of$({ ...item, id });
  }

  public patchItem(id, item: IModelData): Observable<IModelData> {
    return of$({ ...item, id });
  }

  public deleteItem(id): Observable<Partial<IModelData>> {
    return of$({ id, dateDeleted: new Date() });
  }

}
