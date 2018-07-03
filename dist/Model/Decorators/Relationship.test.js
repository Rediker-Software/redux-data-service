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
var Attr_1 = require("./Attr");
var _a = intern.getPlugin("interface.bdd"), describe = _a.describe, it = _a.it, beforeEach = _a.beforeEach;
var expect = intern.getPlugin("chai").expect;
describe("@relationship", function () {
    describe("@relationship - magic getter", function () {
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
                    Attr_1.attr(FieldType_1.ArrayField),
                    __metadata("design:type", Array)
                ], MyClass.prototype, "studentIds", void 0);
                __decorate([
                    Relationship_1.relationship(Relationship_1.RelationshipType.HasMany),
                    __metadata("design:type", Array)
                ], MyClass.prototype, "student", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
        });
        it("returns the expected output from the magic getter", function () {
            expect(myClass).to.have.property("student").to.equal(expectedValue);
        });
        it("called the magic getter once", function () {
            var theStudent = myClass.student;
            expect(myClass.getRelated.calledOnce).to.equal(true);
        });
        it("passed the correct field name to the magic getter", function () {
            var theStudent = myClass.student;
            expect(myClass.getRelated.firstCall.args[0]).to.equal("student");
        });
    });
    describe("@relationship - magic setter", function () {
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
                    Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "student", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
            myClass.student = expectedValue;
        });
        it("called the magic setter once", function () {
            expect(myClass.setRelated.calledOnce).to.equal(true);
        });
        it("passed the correct field name to the magic setter", function () {
            expect(myClass.setRelated.firstCall.args[0]).to.equal("student");
        });
        it("passed the correct value to the magic setter", function () {
            expect(myClass.setRelated.firstCall.args[1]).to.equal(expectedValue);
        });
    });
    describe("@relationship - relationship definition with default values", function () {
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
                    Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "student", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
        });
        it("creates a field decorator which tracks the FieldType of the relationship", function () {
            expect(myClass.fields).to.have.property("student").to.deep.contain(FieldType_1.BelongsToField, "it keeps track of the field's FieldType correctly");
        });
        it("builds the IFieldRelationship object using the property name as the service name by default", function () {
            expect(myClass.relationships).to.have.property("student").to.deep.equal({ field: "student", serviceName: "student", relatedFieldName: "studentId", type: Relationship_1.RelationshipType.BelongsTo });
        });
        it("requires the default related field name to be defined on the Model", function () {
            expect(function () { return Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo)(myClass, "organization"); }).to.throw(ReferenceError, "missing for relationship");
        });
    });
    describe("@relationship - relationship definition with custom values", function () {
        it("builds the IFieldRelationship object using a custom service name", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getRelated = sinon_1.stub();
                    this.setRelated = sinon_1.stub();
                    this.getField = sinon_1.stub();
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "someKidId", void 0);
                __decorate([
                    Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo, { serviceName: "student" }),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "someKid", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            expect(myClass.relationships).to.have.property("someKid").to.deep.equal({ field: "someKid", serviceName: "student", relatedFieldName: "someKidId", type: Relationship_1.RelationshipType.BelongsTo });
        });
        it("builds the IFieldRelationship object using a custom service name and custom relatedFieldName", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getRelated = sinon_1.stub();
                    this.setRelated = sinon_1.stub();
                    this.getField = sinon_1.stub();
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "studentFK", void 0);
                __decorate([
                    Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo, { serviceName: "student", relatedFieldName: "studentFK" }),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "someKid", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            expect(myClass.relationships).to.have.property("someKid").to.deep.equal({ field: "someKid", serviceName: "student", relatedFieldName: "studentFK", type: Relationship_1.RelationshipType.BelongsTo });
        });
        it("requires the custom related field name to be defined on the Model", function () {
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getRelated = sinon_1.stub();
                    this.setRelated = sinon_1.stub();
                    this.getField = sinon_1.stub();
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.StringField),
                    __metadata("design:type", String)
                ], MyClass.prototype, "studentFK", void 0);
                __decorate([
                    Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo, { serviceName: "student", relatedFieldName: "studentFK" }),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "someKid", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            expect(function () { return Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo, {
                serviceName: "organization",
                relatedFieldName: "orgIds",
            })(myClass, "organization"); }).to.throw(ReferenceError, "missing for relationship");
        });
    });
    describe("@relationship - supports BelongsTo and HasMany", function () {
        it("builds the IFieldRelationship object with the correct type and relatedFieldName for BelongsTo", function () {
            var expectedValue = { name: "Bob" };
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
                    Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "student", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            expect(myClass.relationships).to.have.property("student").to.deep.equal({ field: "student", serviceName: "student", relatedFieldName: "studentId", type: Relationship_1.RelationshipType.BelongsTo });
        });
        it("builds the IFieldRelationship object with the correct type and relatedFieldName for HasMany", function () {
            var expectedValue = { name: "Bob" };
            var MyClass = (function () {
                function MyClass() {
                    this.validate = sinon_1.stub();
                    this.getRelated = sinon_1.stub().callsFake(function () { return expectedValue; });
                    this.setRelated = sinon_1.stub();
                    this.getField = sinon_1.stub();
                    this.setField = sinon_1.stub();
                }
                __decorate([
                    Attr_1.attr(FieldType_1.ArrayField),
                    __metadata("design:type", Array)
                ], MyClass.prototype, "studentIds", void 0);
                __decorate([
                    Relationship_1.relationship(Relationship_1.RelationshipType.HasMany),
                    __metadata("design:type", Array)
                ], MyClass.prototype, "students", void 0);
                return MyClass;
            }());
            var myClass = new MyClass();
            expect(myClass.relationships).to.have.property("students").to.deep.equal({ field: "students", serviceName: "student", relatedFieldName: "studentIds", type: Relationship_1.RelationshipType.HasMany });
        });
    });
    describe("@relationship - memory efficiency", function () {
        var expectedValue;
        var myClass;
        var anotherMyClass;
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
                    Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo),
                    __metadata("design:type", Object)
                ], MyClass.prototype, "student", void 0);
                return MyClass;
            }());
            myClass = new MyClass();
            anotherMyClass = new MyClass();
        });
        it("shares relationships among every instance of the class to use memory efficiently", function () {
            expect(myClass.relationships).to.equal(anotherMyClass.relationships);
        });
        it("defines relationships on the prototype, not as an own property, for each instance", function () {
            expect(myClass).to.have.property("relationships").but.not.own.property("relationships");
        });
    });
});
