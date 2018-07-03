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
var Field_1 = require("./Field");
var FieldType_1 = require("../FieldType");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("@field", function () {
    it("creates a decorator which tracks the FieldType for the field", function () {
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Field_1.field(FieldType_1.StringField),
                __metadata("design:type", String)
            ], MyClass.prototype, "name", void 0);
            return MyClass;
        }());
        var myClass = new MyClass();
        expect(myClass.fields).to.have.property("name").to.deep.equal(FieldType_1.StringField, "it keeps track of the field's FieldType correctly");
    });
    it("creates a decorator which sets up default validation rules for the FieldType", function () {
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Field_1.field(FieldType_1.EmailField),
                __metadata("design:type", String)
            ], MyClass.prototype, "name", void 0);
            return MyClass;
        }());
        var myClass = new MyClass();
        expect(myClass.validationRules).to.have.property("name").to.deep.equal({ email: true }, "it sets correct validation rules for the FieldType");
    });
    it("shares the same fieldTypes object among every instance of the class to use memory efficiently", function () {
        var expectedValue = 0;
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Field_1.field(FieldType_1.StringField),
                __metadata("design:type", String)
            ], MyClass.prototype, "name", void 0);
            return MyClass;
        }());
        var myClass = new MyClass();
        var anotherMyClass = new MyClass();
        expect(myClass.fields).to.equal(anotherMyClass.fields);
    });
});
