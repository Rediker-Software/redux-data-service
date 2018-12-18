// tslint:disable no-unused-expression

import { stub, spy } from "sinon";
import { lorem, random } from "faker";

import {} from "./StubService";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("StubService", () => {


  beforeEach(() => {

  });

  it("needs a test", () => {
    expect(false).to.be.true;
  });

});
