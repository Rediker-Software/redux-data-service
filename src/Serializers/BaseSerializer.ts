import { flow, keys, map, omit, partition, pick, pickBy, property } from "lodash/fp";
import { isEmpty } from "lodash";

import { mapValuesWithKeys } from "../Utils";
import { IModel, IModelData, IModelFactory } from "../Model";
import { getDataService } from "../Services";

import { ISerializer } from "./ISerializer";
import { IFieldType } from "../Model/FieldType";
import { IFieldRelationship, RelationshipType } from "../Model/Decorators";

/**
 * The base class from which implementations of `IDataSerializer` should extend.
 *
 * This class implements the `transform` and `normalize` methods on the interface, to provide a default mechanism
 * to transform a model instance into a ready-to-serialize object, and to normalize a raw data object back into a model instance.
 * Any nested relationships will be side-loaded by dispatching an action to the related service.
 *
 */
export abstract class BaseSerializer<T extends IModelData, S> implements ISerializer<T, S> {
  public readonly ModelClass: IModelFactory<T>;

  public abstract deserialize(data: S): IModel<T>;

  public abstract serialize(modelData: Partial<T>): S;

  public constructor(ModelClass: IModelFactory<T>) {
    this.ModelClass = ModelClass;
  }

  get relationships() {
    return this.ModelClass.prototype.relationships;
  }

  get fields() {
    return this.ModelClass.prototype.fields;
  }

  protected isRelationship = (key) => (
    this.relationships != null && (this.relationships.hasOwnProperty(key))
  )

  /**
   * Returns a function, which when called, transforms the given fieldName on the provided model
   * into its serialized equivalent if the given IFieldType implements the optional "transform" method.
   *
   * For example, a Date object will be converted into an ISO Date string when given a DateField.
   *
   * @param {IModel<T extends IModelData>} model
   * @returns {(fieldType: IFieldType, fieldName: string) => IModel<T extends IModelData>[string]}
   */
  public transformField(model: IModel<T> | Partial<T>) {
    return (fieldType: IFieldType & any, fieldName: string) => {
      const fieldValue = model[fieldName];

      if (fieldValue == null) {
        return fieldValue;
      }

      if (this.relationships && fieldName in this.relationships) {
        return this.transformRelationship(fieldValue, this.relationships[fieldName]);
      }

      if ("transform" in fieldType) {
        return fieldType.transform(fieldValue);
      }

      return fieldValue;
    };
  }

  /**
   * Returns a function, which when called, converts a single field on the provided raw data
   * into its object equivalent if the given IFieldType implements the optional "normalize" method.
   *
   * For example, an ISO date string will be converted into a Date object when given a DateField.
   *
   * @param {Partial<T extends IModelData>} data
   * @returns {(fieldType: IFieldType, fieldName: string) => Partial<T extends IModelData>[string]}
   */
  public normalizeField(data: Partial<T>) {
    return (fieldType: IFieldType, fieldName: string) => (
      "normalize" in fieldType
        ? fieldType.normalize(data[fieldName])
        : data[fieldName]
    );
  }

  /**
   * Transforms the given Model into a plain javascript object based on the Model's fieldTypes.
   * Relationships and any fields identified in this class's `excludedFields` array will be excluded.
   *
   * @param {IModel} model
   * @returns {any}
   */
  public transform(model: IModel<T> | Partial<T>): Partial<T> {
    return flow(
      pickBy(property("serialize")),
      mapValuesWithKeys(this.transformField(model)),
    )(this.fields);
  }

  /**
   * Creates a new IModel by normalizing the given raw data.
   * If a nested relationship was included in the payload, it will be side-loaded.
   *
   * @param {Partial<T extends IModelData>} data
   * @returns {IModel<T extends IModelData>}
   */
  public normalize(data: any): IModel<T> {

    // Split nested relationships from the model's own values
    const [relationshipKeys, fieldKeys] = flow(
      keys,
      partition(this.isRelationship),
    )(data);

    // Build the model's data
    const modelData: T = flow(
      pick(fieldKeys),
      mapValuesWithKeys(this.normalizeField(data)),
    )(this.fields) as T;

    const model = new this.ModelClass(modelData);

    // Side-load each nested relationship
    for (const key of relationshipKeys) {
      const relationship = this.relationships[key];
      const relatedModelData = data[key];
      const relatedIdOrIds = this.processNestedRelationship(model, relatedModelData, relationship);

      if (!modelData.hasOwnProperty(relationship.relatedFieldName)) {
        modelData[relationship.relatedFieldName] = relatedIdOrIds;
      }
    }

    return model;
  }

  /**
   * Transform the given model or array of models depending on the relationship type.
   */
  protected transformRelationship(fieldValue: IModel<any> | IModel<any>[], relationship: IFieldRelationship) {
    switch (relationship.type) {
      case RelationshipType.BelongsTo:
        return this.transformRelatedModel(fieldValue as IModel<any>);
      case RelationshipType.HasMany:
        return (fieldValue as IModel<any>[]).map(item => this.transformRelatedModel(item));
      default:
        throw new TypeError(`BaseSerializer: attempted to transform unknown relationship "${relationship.type}"`);
    }
  }

  /**
   * Transform the given relatedModel using its own serializer.
   */
  protected transformRelatedModel(relatedModel: IModel<any>) {
    return getDataService(relatedModel.serviceName)
      .serializer
      .transform(relatedModel);
  }

  /**
   * Process the nestedData for the given relationship.
   * - If it is a BelongsTo relationship, its data is normalized into a Model instance, added to its store and its id is returned.
   * - If it is a HasMany relationship, the above is done for each nested object and the ids of the models are returned.
   */
  protected processNestedRelationship(model: IModel<T>, nestedData: any, relationship: IFieldRelationship) {
    if (relationship.type === RelationshipType.BelongsTo) {
      const relatedModel = this.loadRelatedModel(model, nestedData, relationship);
      return relatedModel.id;
    } else if (relationship.type === RelationshipType.HasMany && nestedData instanceof Array) {
      const relatedModels = nestedData.map((relatedModelData) => this.loadRelatedModel(model, relatedModelData, relationship));
      return relatedModels.map(relatedModel => relatedModel.id);
    }
  }

  /**
   * Given the relatedModelData of a single item, normalize the data using the relationship's own serializer,
   * converting it into a Model instance, then dispatch that related Model to its data service and return the Model.
   */
  protected loadRelatedModel(model: IModel<T>, relatedModelData: any, relationship: IFieldRelationship) {
    const modelRelatedFieldName: string = relationship.modelRelatedFieldName != null
      ? relationship.modelRelatedFieldName
      : model.serviceName + "Id";

    if (!relatedModelData.hasOwnProperty(modelRelatedFieldName)) {
      relatedModelData[modelRelatedFieldName] = model.id;
    }

    const service = getDataService(relationship.serviceName);
    const relatedModel = service.serializer.normalize(relatedModelData);
    service.actions.pushRecord(relatedModel).invoke();

    return relatedModel;
  }
}
