import { FakeModel } from "../Model";
import { BaseSerializer } from "./BaseSerializer";

export class MockSerializer extends BaseSerializer<any, any> {
  public serialize() {
    return "";
  }

  public deserialize() {
    return new FakeModel({ id: "123" });
  }
}
