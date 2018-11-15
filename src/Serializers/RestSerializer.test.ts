// tslint:disable:no-unused-expression
import { spy, stub } from "sinon";
import { RestSerializer } from "./RestSerializer";
import { FakeModel } from "../Model/Model.mock";

import faker from "faker";
import { SortDirection } from "../Query/QueryBuilder";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("RestSerializer", () => {

  describe("serialize", () => {

    it("first transforms the model before serializing it", async () => {
      const fakeModel = new FakeModel({ id: faker.random.number().toString() });
      const restSerializer = new RestSerializer(FakeModel);
      const stubTransform = stub(restSerializer, "transform");

      await restSerializer.serialize(fakeModel);

      expect(stubTransform.firstCall.args[0]).to.equal(fakeModel);
    });

    it("converts the model into a JSON string", async () => {
      const fullText = faker.lorem.word().toString();

      const fakeModel = new FakeModel({
        id: faker.random.number().toString(),
        fullText,
      });

      const restSerializer = new RestSerializer(FakeModel);
      const serializedModel = await restSerializer.serialize(fakeModel);

      expect(serializedModel).to.equal(JSON.stringify({ fullText }));
    });

  });

  describe("deserialize", () => {

    it("converts the deserialized raw data into a Model by normalizing it", async () => {
      const fakeModelData = {
        id: faker.random.number().toString(),
        fullText: faker.lorem.word().toString(),
      };

      const serializedModel = JSON.stringify(fakeModelData);
      const restSerializer = new RestSerializer(FakeModel);
      const stubNormalize = stub(restSerializer, "normalize");

      await restSerializer.deserialize(serializedModel);

      expect(stubNormalize.firstCall.args[0]).to.deep.equal(fakeModelData);
    });

    it("converts the JSON string into a model", async () => {
      const fakeModelData = {
        id: faker.random.number().toString(),
        fullText: faker.lorem.word().toString(),
      };
      const fakeModel = new FakeModel(fakeModelData);
      const serializedModel = JSON.stringify(fakeModelData);
      const restSerializer = new RestSerializer(FakeModel);

      const deserializedModel = await restSerializer.deserialize(serializedModel);

      expect(deserializedModel).to.deep.equal(fakeModel);
    });

  });

  describe("serializeQueryParams", () => {

    it("convert the given IQueryParams object into a url-encoded string", async () => {
      const fakeQueryParamData = {
        page: 1,
        pageSize: 2,
        grade: 4,
        current: true,
        name: "alice",
        values: ["bob", "eve"],
        sort: [
          {key: "firstName", direction: "asc" as SortDirection},
          {key: "lastName", direction: "desc" as SortDirection},
        ],
      };

      const restSerializer = new RestSerializer(FakeModel);
      const urlEncodedString = await restSerializer.serializeQueryParams(fakeQueryParamData);

      expect(urlEncodedString).to.equal(
        "page=1&pageSize=2&grade=4&current=true&name=alice&values=bob,jill&sort=firstName,lastName%3Adesc",
      );
    });

  });

});
