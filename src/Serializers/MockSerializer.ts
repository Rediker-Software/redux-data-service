import { FakeModel } from "../Model";
import { IQueryParams } from "../Query";
import { ISerializer } from "./ISerializer";

export class MockSerializer implements ISerializer<any, any> {
  public async serialize() {
    return "";
  }

  public async deserialize() {
    return new FakeModel({ id: "123" });
  }

  public async serializeQueryParams(queryParams: IQueryParams): Promise<IQueryParams> {
    return queryParams;
  }
}
