// tslint:disable no-unused-expression
import { omit } from "lodash";

import { fakeModelModule, initializeTestServices, seedService } from "../TestUtils";

import { FakeModel } from "../Model/Model.mock";
import { MemorySerializer } from "./MemorySerializer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("MemorySerializer", () => {
  let serializer;

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
    serializer = new MemorySerializer(FakeModel);
  });

  it("serialize() returns the raw model data", () => {
    const fakeModel = seedService("fakeModel") as any;
    expect(serializer.serialize(fakeModel))
      .to.deep.contain(omit(fakeModel.modelData, ["id", "dateUpdated", "dateDeleted"]));
  });

  it("deserialize() returns the model when given raw data", () => {
    const fakeModel = seedService("fakeModel") as any;
    expect(serializer.deserialize(fakeModel.modelData))
      .to.deep.equal(fakeModel);
  });

});
