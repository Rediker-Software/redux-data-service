import { FakeModel } from "../Model";
import { IQueryParams } from "../Query";
import { ISerializer } from "./ISerializer";
export declare class MockSerializer implements ISerializer<any, any> {
    serialize(): Promise<string>;
    deserialize(): Promise<FakeModel>;
    serializeQueryParams(queryParams: IQueryParams): IQueryParams;
}
