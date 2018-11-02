/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { BelongsToField } from "./BelongsToField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: BelongsToField", () => {
  it("has correct default value", () => {
    expect(BelongsToField).to.have.property("defaultValue").to.deep.equal(null);
  });

  it("provides default form validation rules which require the value to be an object", () => {
    const value = { hello: "world" };
    expect(validate({ student: value }, { student: BelongsToField.defaultValidationRules })).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-null non-object types", () => {
    const value = 7;
    expect(validate({ student: value }, { student: BelongsToField.defaultValidationRules })).to.deep.equal({
      student: ["Student must be of type object"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(BelongsToField.isValidType(value)).to.be.true;
  });

  it("considers an object instance to be a valid type", () => {
    const value = { hello: "world" };
    expect(BelongsToField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-object instance to be a valid type", () => {
    const value = 7;
    expect(BelongsToField.isValidType(value)).to.be.false;
  });

  it("should not be serialized", () => {
    expect(BelongsToField.serialize).to.be.false;
  });

  it("declares its type", () =>
    expect(BelongsToField.type).to.eq("belongsTo"),
  );
});
