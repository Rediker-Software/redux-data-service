/* tslint:disable: no-unused-expression */

import { validate } from "validate.js";
import { random } from "faker";

import { ArrayField } from "./ArrayField";

declare var intern;
const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("FieldType: ArrayField", () => {
  it("has correct default value", () => {
    expect(ArrayField).to.have.property("defaultValue").to.deep.equal([]);
  });

  it("provides default form validation rules which require the value to be an array", () => {
    const value = [];
    expect(validate({students: value}, {students: ArrayField.defaultValidationRules})).to.be.undefined;
  });

  it("provides default form validation rules which do not allow non-null non-array types", () => {
    const value = 7;
    expect(validate({students: value}, {students: ArrayField.defaultValidationRules})).to.deep.equal({
      students: ["Students must be of type array"],
    });
  });

  it("considers null to be a valid type", () => {
    const value = null;
    expect(ArrayField.isValidType(value)).to.be.true;
  });

  it("considers an array instance to be a valid type", () => {
    const value = [];
    expect(ArrayField.isValidType(value)).to.be.true;
  });

  it("does not consider a non-null non-array instance to be a valid type", () => {
    const value = 7;
    expect(ArrayField.isValidType(value)).to.be.false;
  });

  it("should be serialized", () => {
    expect(ArrayField.serialize).to.be.true;
  });

  it("declares its type", () =>
    expect(ArrayField.type).to.eq("array"),
  );

  it("normalizes an array by returning the given value", async () => {
    const randomArray = [
      random.number(),
    ];

    const normalizedValue = await ArrayField.normalize(randomArray);
    expect(normalizedValue).to.equal(randomArray);
  });
});
