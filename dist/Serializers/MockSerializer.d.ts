import { FakeModel } from "../Model/Model.mock";
import { BaseSerializer } from "./BaseSerializer";
export declare class MockSerializer extends BaseSerializer<any, any> {
    serialize(): string;
    deserialize(): FakeModel;
}
