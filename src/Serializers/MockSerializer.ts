import { FakeModel } from "../Model/Model.mock";
import { BaseSerializer } from "./BaseSerializer";

export class MockSerializer extends BaseSerializer<any, any> {
  public async serialize() {
    return "";
  }

  public async deserialize() {
    return new FakeModel({ id: "123" });
  }
}
