import { FakeModel } from "../Model";
import { BaseSerializer } from "./BaseSerializer";
export declare class MockSerializer extends BaseSerializer<any, any> {
    serialize(): string;
    deserialize(): FakeModel;
}
