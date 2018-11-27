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
var Relationship_1 = require("./Relationship");
var FieldType_1 = require("../FieldType");
var BelongsTo_1 = require("./BelongsTo");
var Attr_1 = require("./Attr");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("@belongsTo", function () {
    var expectedValue;
    var myClass;
    beforeEach(function () {
        expectedValue = { name: "Bob" };
        var MyClass = (function () {
            function MyClass() {
                this.validate = sinon_1.stub();
                this.getRelated = sinon_1.stub().callsFake(function () { return expectedValue; });
                this.setRelated = sinon_1.stub();
                this.getField = sinon_1.stub();
                this.setField = sinon_1.stub();
            }
            __decorate([
                Attr_1.attr(FieldType_1.StringField),
                __metadata("design:type", String)
            ], MyClass.prototype, "studentId", void 0);
            __decorate([
                BelongsTo_1.belongsTo(),
                __metadata("design:type", Object)
            ], MyClass.prototype, "student", void 0);
            return MyClass;
        }());
        myClass = new MyClass();
    });
    it("creates a field decorator with a BelongsTo FieldType", function () {
        expect(myClass.fields).to.have.property("student").to.deep.contain(FieldType_1.BelongsToField, "it keeps track of the field's FieldType correctly");
    });
    it("creates a BelongsTo relationship", function () {
        expect(myClass.relationships).to.have.property("student").to.deep.equal({
            serviceName: "student",
            serviceNameField: undefined,
            relatedFieldName: "studentId",
            modelRelatedFieldName: undefined,
            field: "student",
            type: Relationship_1.RelationshipType.BelongsTo,
        });
    });
});
