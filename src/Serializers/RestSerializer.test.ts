// tslint:disable:no-unused-expression
import { spy, stub } from "sinon";
import { RestSerializer } from "./RestSerializer";
import { FakeModel } from "../Model/Model.mock";

import { lorem, random } from "faker";
import { SortDirection } from "../Query/QueryBuilder";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("RestSerializer", () => {

  describe("serialize", () => {

    it("first transforms the model before serializing it", async () => {
      const fakeModel = new FakeModel({ id: random.number().toString() });
      const restSerializer = new RestSerializer(FakeModel);
      const stubTransform = stub(restSerializer, "transform");

      await restSerializer.serialize(fakeModel);

      expect(stubTransform.firstCall.args[0]).to.equal(fakeModel);
    });

    it("converts the model into a JSON string", async () => {
      const fullText = lorem.word().toString();

      const fakeModel = new FakeModel({
        id: random.number().toString(),
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
        id: random.number().toString(),
        fullText: lorem.word().toString(),
      };

      const serializedModel = JSON.stringify(fakeModelData);
      const restSerializer = new RestSerializer(FakeModel);
      const stubNormalize = stub(restSerializer, "normalize");

      await restSerializer.deserialize(serializedModel);

      expect(stubNormalize.firstCall.args[0]).to.deep.equal(fakeModelData);
    });

    it("converts the JSON string into a model", async () => {
      const fakeModelData = {
        id: random.number().toString(),
        fullText: lorem.word().toString(),
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
        page: random.number().toString(),
        pageSize: random.number().toString(),
        grade: random.number().toString(),
        current: random.boolean().toString(),
        values: [lorem.word().toString(), lorem.word().toString()],
        sort: [
          {key: lorem.word().toString(), direction: "asc" as SortDirection},
          {key: lorem.word().toString(), direction: "desc" as SortDirection},
        ],        
      };

      const restSerializer = new RestSerializer(FakeModel);
      const urlEncodedString = await restSerializer.serializeQueryParams(fakeQueryParamData);

      expect(urlEncodedString).to.equal("page=" + fakeQueryParamData.page + "&pageSize="
       + fakeQueryParamData.pageSize + "&grade=" + fakeQueryParamData.grade + "&current=" + fakeQueryParamData.current +
        "&values=" + fakeQueryParamData.values[0] + "," + fakeQueryParamData.values[1] +
        "&sort=" + fakeQueryParamData.sort[0].key + "," + fakeQueryParamData.sort[1].key + encodeURIComponent(":") + "desc");
    });
    
  });

});
