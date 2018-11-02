/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { createEnumField } from "./EnumField";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

enum TestEnum { hello, world }

describe("FieldType: EnumField", () => {
  let EnumField;

  beforeEach(() => {
    EnumField = createEnumField(TestEnum);
  });

  it("has correct default value", () => {
    expect(EnumField).to.have.property("defaultValue").to.be.null;
  });

  it("provides default form validation rules which require the value to be one of the given enum members", () => {
    const value = TestEnum.hello;
    const validation = validate({ testField: value }, { testField: EnumField.defaultValidationRules });

    expect(validation).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-null non-enum types", () => {
    const value = 7;
    const validation = validate({ testField: value }, { testField: EnumField.defaultValidationRules });

    expect(validation).to.deep.equal({
      testField: ["Selected value is not a valid choice"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(EnumField.isValidType(value)).to.be.true;
  });

  it("considers a member of the given enum to be a valid type", () => {
    const value = TestEnum.world;
    expect(EnumField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-enum member to be a valid type", () => {
    const value = 7;
    expect(EnumField.isValidType(value)).to.be.false;
  });

  it("should not be serialized", () => {
    expect(EnumField.serialize).to.be.false;
  });

  it("declares its type", () =>
    expect(EnumField.type).to.eq("enum"),
  );

  it("normalizes a value by returning the given value if it exists in the enum", async () => {
    expect(await EnumField.normalize("world")).to.equal(TestEnum.world);
  });

  it("normalizes a value which does not exist in the enum by returning null", async () => {
    expect(await EnumField.normalize("asdf")).to.be.null;
  });
});
