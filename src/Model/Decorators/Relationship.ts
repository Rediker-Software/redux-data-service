import { singular } from "pluralize";

import { Omit } from "../../Omit";
import { BelongsToField, HasManyField, IFieldType } from "../FieldType";
import { IDecorator } from "./IDecorator";
import { field, IFieldOptions, IFieldTypes } from "./Field";

export enum RelationshipType {
  BelongsTo = "BelongsTo",
  HasMany = "HasMany",
}

/**
 * This is the meta-data about a related field on a `Model`, such as a `BelongsTo` or `HasMany` field.
 * It enables us to lazy-load the related model(s) given a field which specifies the related ID(s) and the related service name.
 *
 * For example, field "student" relates to the "student" service through the "studentId" relatedFieldName.
 */
export interface IFieldRelationship {
  /** The name of the field this relationship decorates */
  field: string;

  /** The name of the service associated to the related field */
  serviceName?: string;

  /** When no serviceName is given, we will use the value of this field to get the name of the related service */
  serviceNameField?: string;

  /** The field on THIS model which provides the ID or IDs to identify the OTHER model */
  relatedFieldName: string;

  /** The name of the field on the OTHER model which provides the ID of THIS model */
  modelRelatedFieldName?: string;

  /** The type of relationship, i.e. BelongsTo (one-to-one or one-to-many) or HasMany (many-to-many, many-to-one) */
  type: RelationshipType;
}

/**
 * Classes which wish to use the `@relationship` decorator (or `@belongsTo` or `@hasMany`) should implement this interface.
 */
export interface IRelationship extends IFieldTypes {
  readonly relationships: { [key: string]: IFieldRelationship };

  getRelated(key): any;

  setRelated(key, value): void;
}

export interface IRelationshipOptions extends Partial<Omit<IFieldOptions, "type"> & Omit<IFieldRelationship, "type" | "field">> {
}

/**
 * Get the corresponding FieldType object for the given RelationshipType.
 *
 * @param {RelationshipType} relationshipType
 * @returns {IFieldType}
 */
export const getFieldTypeForRelationship = (relationshipType: RelationshipType) => {
  switch (relationshipType) {
    case RelationshipType.BelongsTo:
      return BelongsToField;
    case RelationshipType.HasMany:
      return HasManyField;
    default:
      throw new TypeError(`Unknown relationship type ${relationshipType}`);
  }
};

/**
 * Determine the property name of the related field depending on the relationship.
 *
 * BelongsTo will add the suffix "Id" to the given `baseName`
 * HasMany will add the suffix "Ids" to the given `baseName`
 *
 * @param {RelationshipType} relationshipType
 * @param {string} baseName
 * @returns {string}
 */
export const getRelatedFieldNameForRelationship = (relationshipType: RelationshipType, baseName: string) => {
  switch (relationshipType) {
    case RelationshipType.BelongsTo:
      return baseName + "Id";
    case RelationshipType.HasMany:
      return baseName + "Ids";
    default:
      throw new TypeError(`Unknown relationship type ${relationshipType}`);
  }
};

/**
 * A decorator which establishes that the decorated property is related to the given serviceName through the given relatedFieldName.
 * You probably want to use `@belongsTo` or `@hasMany` decorators, which wrap this one.
 *
 * If no `serviceName` is provided, the name of the property being decorated will be used.
 * If no `relatedFieldName` is provided, the name of the property being decorated will be used with the suffix "Id" or "Ids" depending on the relationship.
 *
 * @param {RelationshipType} relationshipType
 * @param {IRelationshipOptions} options
 * @returns {IDecorator<IRelationship>}
 */
export function relationship(relationshipType: RelationshipType, options: IRelationshipOptions = {}): IDecorator<IRelationship> {

  return (target: any, key: string) => {
    const singularKey = singular(key); // eg. organizations => organization, countries => country

    if (!options.serviceName && !options.serviceNameField) {
      options.serviceName = singularKey;
    }

    if (!options.relatedFieldName) {
      options.relatedFieldName = getRelatedFieldNameForRelationship(relationshipType, singularKey);
    }

    if (process.env.NODE_ENV !== "production" && !options.serialize && !(options.relatedFieldName in target)) {
      throw new ReferenceError(`Related field name "${options.relatedFieldName}" missing for relationship "${key}". Did you forget to add an @attr decorator?`);
    }

    // Keep track of the relationship
    target.relationships = {
      ...target.relationships,
      [key]: {
        serviceName: options.serviceName,
        serviceNameField: options.serviceNameField,
        relatedFieldName: options.relatedFieldName,
        modelRelatedFieldName: options.modelRelatedFieldName,
        field: key,
        type: relationshipType,
      },
    };

    // Replace TypeScript's property definition with our own.
    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get() {
          return this.getRelated(key);
        },
        set(value) {
          return this.setRelated(key, value);
        },
        enumerable: true,
        configurable: true,
      });
    }

    // Keep track of the FieldType for this property
    field(getFieldTypeForRelationship(relationshipType), options)(target, key);
  };
}
