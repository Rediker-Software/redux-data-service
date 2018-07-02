/* tslint:disable: no-unused-expression */

import { spy } from "sinon";
import { makeInitializeValidateJS } from "./InitializeValidateJS";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("initializeValidateJS", () => {
  let fakeValidateJS;
  let mockInitializers;
  let initialize;

  beforeEach(() => {
    fakeValidateJS = spy();
    mockInitializers = {
      initializeSomeValidator: spy(),
      initializeSomeOtherValidator: spy(),
      fakeOtherThing: spy(),
    };
    initialize = makeInitializeValidateJS(fakeValidateJS, mockInitializers);
  });

  it(`runs every function whose name starts with "initialize"`, () => {
    initialize();
    expect(mockInitializers.initializeSomeValidator).to.have.property("callCount").to.equal(1);
    expect(mockInitializers.initializeSomeOtherValidator).to.have.property("callCount").to.equal(1);
  });

  it(`passes the validateJS object into the validator initializer`, () => {
    initialize();
    expect(mockInitializers.initializeSomeValidator.firstCall.args[0]).to.equal(fakeValidateJS);
  });

  it(`does not run functions which do not start with "initialize"`, () => {
    initialize();
    expect(mockInitializers.fakeOtherThing).to.have.property("callCount").to.equal(0);
  });

});
