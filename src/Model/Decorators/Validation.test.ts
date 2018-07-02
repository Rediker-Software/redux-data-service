/* tslint:disable: max-classes-per-file */

import { stub } from "sinon";
import { IValidate, validation } from "./Validation";

declare var intern;
const { describe, it, beforeEach } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("@validation", () => {
  it("creates a decorator with custom validation rules", () => {
    class MyClass implements IValidate {

      @validation({ asdf: 123 })
      public name: string;

      public validate = stub();
      public readonly validationRules;
    }

    expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal({ asdf: 123 }, "it has the expected validation rules");
  });

  it("shares validation rules among every instance of the class to use memory efficiently", () => {
    class MyClass implements IValidate {

      @validation({ asdf: 123 })
      public name: string;

      public validate = stub();
      public readonly validationRules;
    }

    const myClass = new MyClass();
    const anotherMyClass = new MyClass();

    expect(myClass.validationRules).to.equal(anotherMyClass.validationRules, "it shares the validation rules");
  });
});
