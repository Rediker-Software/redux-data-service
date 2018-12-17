// tslint:disable:no-unused-expression
import { RestSerializer } from "./RestSerializer";
import { IModelData } from "../Model/IModel";
import { FakeModel } from "../Model/Model.mock";
import { MockMapper } from "../Mapper/MockMapper";

import { lorem, random, name } from "faker";
import { SortDirection } from "../Query/QueryBuilder";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("RestSerializer", () => {
  const mapper = new MockMapper();
  describe("serialize", () => {

    it("converts the model into a JSON string", async () => {
      const fullText = lorem.word().toString();
      const id = random.number().toString();

      const fakeModel = new FakeModel({
        id,
        fullText,
      });

      const mapped = await mapper.transform(fakeModel);
      const restSerializer = new RestSerializer();
      const serializedModel = await restSerializer.serialize(mapped as Partial<IModelData>);

      expect(serializedModel).to.equal(JSON.stringify({ id, fullText }));
    });

  });

  describe("deserialize", () => {

    it("converts the JSON string into a model", async () => {
      const fakeModelData = {
        id: random.number().toString(),
        fullText: lorem.word().toString(),
      };

      const serializedModel = JSON.stringify(fakeModelData);
      const restSerializer = new RestSerializer();

      const deserializedModel = await restSerializer.deserialize(serializedModel);

      expect(deserializedModel).to.deep.equal(fakeModelData);
    });

  });

  describe("serializeQueryParams", () => {

    it("convert the given IQueryParams object into a url-encoded string", async () => {
      const fakeQueryParamData = {
        page: random.number().toString(),
        pageSize: random.number().toString(),
        grade: random.number().toString(),
        current: random.boolean().toString(),
        values: [name.firstName(), name.firstName()],
        sort: [
          {key: name.firstName(), direction: "asc" as SortDirection},
          {key: name.firstName(), direction: "desc" as SortDirection},
        ],
      };

      const restSerializer = new RestSerializer();
      const urlEncodedString = await restSerializer.serializeQueryParams(fakeQueryParamData);

      // tslint:disable-next-line:max-line-length (with the backslash \ line continuation it seems to put in an extra space)
      expect(urlEncodedString).to.equal(`page=${fakeQueryParamData.page}&pageSize=${fakeQueryParamData.pageSize}&grade=${fakeQueryParamData.grade}&current=${fakeQueryParamData.current}&values=${fakeQueryParamData.values[0]},${fakeQueryParamData.values[1]}&sort=${fakeQueryParamData.sort[0].key},${fakeQueryParamData.sort[1].key}${encodeURIComponent(":")}desc`);
    });

    it("convert the given IQueryParams object into a url-encoded string with special characters in names", async () => {
      const name1 = `${name.firstName()}%`;
      const name2 =  `${name.firstName()},o`;

      const fakeQueryParamData = {
        page: random.number(),
        pageSize: random.number(),
        grade: random.number(),
        current: random.boolean(),
        values: [name.firstName(), name.firstName()],
        sort: [
          {key: `${name1}`, direction: "asc" as SortDirection},
          {key: `${name2}`, direction: "desc" as SortDirection},
        ],
      };

      const restSerializer = new RestSerializer();
      const urlEncodedString = await restSerializer.serializeQueryParams(fakeQueryParamData);

      // tslint:disable-next-line:max-line-length (with the backslash \ line continuation it seems to put in an extra space)
      expect(urlEncodedString).to.equal(`page=${fakeQueryParamData.page}&pageSize=${fakeQueryParamData.pageSize}&grade=${fakeQueryParamData.grade}&current=${fakeQueryParamData.current}&values=${fakeQueryParamData.values[0]},${fakeQueryParamData.values[1]}&sort=${encodeURIComponent(name1)},${encodeURIComponent(name2)}${encodeURIComponent(":")}desc`);
    });

  });

});
