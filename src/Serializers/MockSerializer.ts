import { FakeModel } from "../Model/Model.mock";
import { IQueryParams } from "../Query";
import { BaseSerializer } from "./BaseSerializer";

export class MockSerializer extends BaseSerializer<any, any> {
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
