/* tslint:disable: max-classes-per-file */

import { stub } from "sinon";

import { IRelationship, RelationshipType } from "./Relationship";
import { ArrayField, HasManyField } from "../FieldType";
import { hasMany } from "./HasMany";
import { attr } from "./Attr";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

interface IFakeStudent {
  name: string;
}

describe("@hasMany", () => {
  let expectedValue;
  let myClass;

  beforeEach(() => {
    expectedValue = { name: "Bob" };

    class MyClass implements IRelationship {
      @attr(ArrayField)
      public studentIds: string[];

      @hasMany()
      public students: IFakeStudent[];

      public readonly relationships;
      public readonly fields;
      public readonly validationRules;
      public validate = stub();
      public getRelated = stub().callsFake(() => expectedValue);
      public setRelated = stub();
      public getField = stub();
      public setField = stub();
    }

    myClass = new MyClass();
  });

  it("creates a field decorator which with a HasMany FieldType", () => {
    expect(myClass.fields).to.have.property("students").to.deep.contain(HasManyField);
  });

  it("creates a HasMany relationship", () => {
    expect(myClass.relationships).to.have.property("students").to.deep.equal({
      type: RelationshipType.HasMany,
      field: "students",
      relatedFieldName: "studentIds",
      serviceName: "student",
    });
  });

});
