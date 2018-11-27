import { FakeModel } from "../Model/Model.mock";
import { IQueryParams } from "../Query";
import { BaseSerializer } from "./BaseSerializer";
export declare class MockSerializer extends BaseSerializer<any, any> {
    serialize(): Promise<string>;
    deserialize(): Promise<FakeModel>;
    serializeQueryParams(queryParams: IQueryParams): Promise<IQueryParams>;
}
