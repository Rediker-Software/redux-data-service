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
var Required_1 = require("./Required");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it;
var expect = intern.getPlugin("chai").expect;
describe("@required", function () {
    it("creates a decorator to mark a field as required", function () {
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Required_1.required(),
                __metadata("design:type", String)
            ], MyClass.prototype, "name", void 0);
            return MyClass;
        }());
        expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal({ presence: { message: "is required", allowEmpty: false } }, "it has the expected validation rules");
    });
    it("creates a decorator to mark a field as required with a custom error message", function () {
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Required_1.required("^Name is required"),
                __metadata("design:type", String)
            ], MyClass.prototype, "fullText", void 0);
            return MyClass;
        }());
        expect(MyClass.prototype.validationRules).to.have.property("fullText").to.deep.equal({ presence: { message: "^Name is required", allowEmpty: false } }, "it has the expected validation rules");
    });
    it("creates a decorator to mark a field as required with a custom error message and allows certain empty values", function () {
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
            }
            __decorate([
                Required_1.required("is required", true),
                __metadata("design:type", String)
            ], MyClass.prototype, "name", void 0);
            return MyClass;
        }());
        expect(MyClass.prototype.validationRules).to.have.property("name").to.deep.equal({ presence: { message: "is required", allowEmpty: true } }, "it has the expected validation rules");
    });
});
