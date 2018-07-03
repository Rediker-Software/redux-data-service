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
var Attr_1 = require("./Attr");
var FieldType_1 = require("../FieldType");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("@attr", function () {
    describe("@attr - magic getter", function () {
        var defaultValue;
        var expectedValue;
        var myClass;
        beforeEach(function () {
            defaultValue = "hello world";
            expectedValue = "this is a test";
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getField = sinon_1.stub().callsFake(function () { return expectedValue; });
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.StringField, { defaultValue: defaultValue }),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
            var studentName = myClass.name;
        });
        it("returns the expected output from the magic getter", function () {
            expect(myClass).to.have.property("name").to.equal(expectedValue);
        });
        it("called the magic getter once", function () {
            expect(myClass.getField.calledOnce).to.equal(true);
        });
        it("passed the correct field name to the magic getter", function () {
            expect(myClass.getField.firstCall.args[0]).to.equal("name");
        });
        it("passed the correct default value to the magic getter", function () {
            expect(myClass.getField.firstCall.args[1]).to.equal(defaultValue);
        });
    });
    describe("@attr - magic setter", function () {
        var expectedValue;
        var myClass;
        beforeEach(function () {
            expectedValue = "this is a test";
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getField = sinon_1.stub();
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "name", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
            myClass.name = expectedValue;
        });
        it("called the magic setter once", function () {
            expect(myClass.setField.calledOnce).to.equal(true);
        });
        it("passed the correct field name to the magic setter", function () {
            expect(myClass.setField.firstCall.args[0]).to.equal("name");
        });
        it("passed the correct value to the magic setter", function () {
            expect(myClass.setField.firstCall.args[1]).to.equal(expectedValue);
        });
    });
    describe("@attr - field definition", function () {
        var expectedValue;
        var myClass;
        beforeEach(function () {
            expectedValue = "";
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getField = sinon_1.stub().callsFake(function () { return expectedValue; });
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.EmailField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "homeEmail", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
        });
        it("creates a field decorator which tracks the FieldType for the field", function () {
            expect(myClass.fields).to.have.property("homeEmail").to.deep.equal(FieldType_1.EmailField, "it keeps track of the field's FieldType correctly");
        });
        it("creates a field decorator which sets up default validation rules for the FieldType", function () {
            expect(myClass.validationRules).to.have.property("homeEmail").to.deep.equal({ email: true }, "it sets correct validation rules for the FieldType");
        });
        it("returns the expected default value based on the given FieldType", function () {
            expect(myClass).to.have.property("homeEmail").to.equal(expectedValue);
        });
    });
    describe("@attr - memory efficiency", function () {
        var expectedValue;
        var myClass;
        var anotherMyClass;
        beforeEach(function () {
            expectedValue = { name: "Bob" };
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getField = sinon_1.stub().callsFake(function () { return expectedValue; });
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.EmailField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "homeEmail", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
            anotherMyClass = new MyClass();
        });
        it("shares fieldTypes among every instance of the class to use memory efficiently", function () {
            expect(myClass.fields).to.equal(anotherMyClass.fields);
        });
        it("defines fieldTypes on the prototype, not as an own property, for each instance", function () {
            expect(myClass).to.have.property("fields").but.not.own.property("fields");
        });
    });
});
