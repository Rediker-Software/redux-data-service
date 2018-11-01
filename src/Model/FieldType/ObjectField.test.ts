/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { ObjectField } from "./ObjectField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: ObjectField", () => {
  it("has correct default value", () => {
    expect(ObjectField).to.have.property("defaultValue").to.deep.equal(null);
  });

  it("provides default form validation rules which require the value to be an object", () => {
    const value = { hello: "world" };
    expect(validate({ student: value }, { student: ObjectField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-null non-object types", () => {
    const value = 7;
    expect(validate({ student: value }, { student: ObjectField.defaultValidationRules })).to.deep.equal({
      student: ["Student must be of type object"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(ObjectField.isValidType(value)).to.be.true;
  });

  it("considers an object instance to be a valid type", () => {
    const value = { hello: "world" };
    expect(ObjectField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-object instance to be a valid type", () => {
    const value = 7;
    expect(ObjectField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(ObjectField.serialize).to.be.true;
  });

  it("declares it's type", () =>
    expect(ObjectField.type).to.eq("object"),
  );
});
