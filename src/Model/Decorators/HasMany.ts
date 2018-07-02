import { IDecorator } from "./IDecorator";
import { IRelationship, IRelationshipOptions, relationship, RelationshipType } from "./Relationship";

/**
 * A decorator which creates a "HasMany" relationship, for establishing a many-to-one or many-to-many relationship to the related service,
 * such that this service has many of the related service. The `relatedFieldName` is the FK field on this model, for identifying the IDs of the related models.
 *
 * If no `serviceName` is provided, the property being decorated will be used.
 * If no `relatedFieldName` is provided, the `serviceName` will be used with the suffix "Ids". eg: "studentIds"
 *
 * @param {IRelationshipOptions} options
 * @returns {IDecorator<IAttrs>}
 */
export function hasMany(options: IRelationshipOptions = {}): IDecorator<IRelationship> {
  return relationship(RelationshipType.HasMany, options);
}
