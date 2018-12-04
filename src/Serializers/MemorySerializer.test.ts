// tslint:disable no-unused-expression
import { omit } from "lodash";

import { fakeModelModule, initializeTestServices, seedService } from "../TestUtils";

import { MemorySerializer } from "./MemorySerializer";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("MemorySerializer", () => {
  let serializer;

  beforeEach(() => {
    initializeTestServices(fakeModelModule);
    serializer = new MemorySerializer();
  });

  it("serialize() returns the same model data", async () => {
    const fakeModel = seedService("fakeModel") as any;
    expect(await serializer.serialize(fakeModel))
      .to.deep.equal(fakeModel);
  });

  it("deserialize() returns the same data", async () => {
    const fakeModel = seedService("fakeModel") as any;
    expect(await serializer.deserialize(fakeModel.modelData))
      .to.deep.equal(fakeModel.modelData);
  });

});
