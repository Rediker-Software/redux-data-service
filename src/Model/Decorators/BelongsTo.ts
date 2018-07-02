import { IDecorator } from "./IDecorator";
import { IRelationship, IRelationshipOptions, relationship, RelationshipType } from "./Relationship";

/**
 * A decorator which creates a "BelongsTo" relationship, for establishing a one-to-many or one-to-one relationship to the related service,
 * such that this service has one of the related service. The `relatedFieldName` is the FK field on this model, for identifying the ID of the related model.
 *
 * If no `serviceName` is provided, the property being decorated will be used.
 * If no `relatedFieldName` is provided, the `serviceName` will be used with the suffix "Id". eg: "organizationId"
 *
 * @param {IRelationshipOptions} options
 * @returns {IDecorator<IAttrs>}
 */
export function belongsTo(options: IRelationshipOptions = {}): IDecorator<IRelationship> {
  return relationship(RelationshipType.BelongsTo, options);
}
