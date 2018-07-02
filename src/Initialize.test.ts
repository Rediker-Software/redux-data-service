/* tslint:disable: no-unused-expression */

import { spy } from "sinon";
import { isApplicationInitialized, makeInitialize, resetInitializationStatus } from "./Initialize";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("initialize", () => {
  let mockInitializers;
  let initialize;

  beforeEach(() => {
    mockInitializers = {
      initializeSomething: spy(),
      fakeOtherThing: spy(),
    };
    initialize = makeInitialize(mockInitializers);
  });

  it("initialization status is set to false before the application initializes", () => {
    resetInitializationStatus();
    expect(isApplicationInitialized()).to.be.false;
  });

  it("initialization status is set to true after the application initializes", () => {
    resetInitializationStatus();
    initialize();
    expect(isApplicationInitialized()).to.be.true;
  });

  it(`runs every function whose name starts with "initialize"`, () => {
    initialize();
    expect(mockInitializers.initializeSomething).to.have.property("callCount").to.equal(1);
  });

  it(`does not run functions which do not start with "initialize"`, () => {
    initialize();
    expect(mockInitializers.fakeOtherThing).to.have.property("callCount").to.equal(0);
  });

});
