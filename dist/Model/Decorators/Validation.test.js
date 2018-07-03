"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
var Validation_1 = require("./Validation");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("@validation", function () {
    it("creates a decorator with custom validation rules", function () {
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Validation_1.validation({ asdf: 123 }),
                __metadata("design:type", String)
            ], MyClass.prototype, "name", void 0);
            return MyClass;
        }());
        expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal({ asdf: 123 }, "it has the expected validation rules");
    });
    it("shares validation rules among every instance of the class to use memory efficiently", function () {
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Validation_1.validation({ asdf: 123 }),
                __metadata("design:type", String)
            ], MyClass.prototype, "name", void 0);
            return MyClass;
        }());
        var myClass = new MyClass();
        var anotherMyClass = new MyClass();
        expect(myClass.validationRules).to.equal(anotherMyClass.validationRules, "it shares the validation rules");
    });
});
