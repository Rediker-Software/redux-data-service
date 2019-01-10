// tslint:disable no-unused-expression

import { stub, spy } from "sinon";
import { lorem, random } from "faker";

import { shouldFetchItem } from "./ShouldFetchItem";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("ShouldFetchItem", () => {

  beforeEach(() => {
    // ...
  });

  it("needs a test", () => {
    expect(false).to.be.true;
  });

});
