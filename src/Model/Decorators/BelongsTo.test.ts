/* tslint:disable: max-classes-per-file */

import { stub } from "sinon";

import { IRelationship, RelationshipType } from "./Relationship";
import { BelongsToField, StringField } from "../FieldType";
import { belongsTo } from "./BelongsTo";
import { attr } from "./Attr";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

interface IFakeStudent {
  name: string;
}

describe("@belongsTo", () => {
  let expectedValue;
  let myClass;

  beforeEach(() => {
    expectedValue = { name: "Bob" };

    class MyClass implements IRelationship {
      @attr(StringField)
      public studentId: string;

      @belongsTo()
      public student: IFakeStudent;

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

  it("creates a field decorator which with a BelongsTo FieldType", () => {
    expect(myClass.fields).to.have.property("student").to.deep.contain(BelongsToField, "it keeps track of the field's FieldType correctly");
  });

  it("creates a BelongsTo relationship", () => {
    expect(myClass.relationships).to.have.property("student").to.deep.equal({
      type: RelationshipType.BelongsTo,
      field: "student",
      relatedFieldName: "studentId",
      modelRelatedFieldName: undefined,
      serviceName: "student",
    });
  });

});
