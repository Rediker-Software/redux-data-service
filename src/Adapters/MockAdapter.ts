import { stub } from "sinon";
import { of as of$ } from "rxjs/observable/of";
import faker from "faker";
import { IAdapter } from "./IAdapter";

export class MockAdapter implements IAdapter<any> {
  public createItem = stub().callsFake((item) => of$({
    ...item,
    id: faker.random.number().toString(),
  }));

  public deleteItem = stub().callsFake((id: string) => of$({
    id,
    dateDeleted: new Date().toISOString(),
  }));

  public fetchAll = stub().callsFake(() => of$({ items: [] }));
  public fetchItem = stub().callsFake((id: string) => of$({ id }));
  public patchItem = stub().callsFake((id: string, item) => of$({ ...item, id }));
  public updateItem = stub().callsFake((id: string, item) => of$({ ...item, id }));
}
