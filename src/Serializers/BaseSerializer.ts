import { flow, keys, map, omit, partition, pick, pickBy, property } from "lodash/fp";

import { mapValuesWithKeys } from "Utils/Lodash";
import { IModel, IModelData, IModelFactory } from "Model";
import { getDataService } from "Services";

import { ISerializer } from "./ISerializer";
import { IFieldType } from "Model/FieldType";

/**
 * The base class from which implementations of `ISerializer` should extend.
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

      if ("serviceName" in fieldType) {
        return getDataService(fieldType.serviceName)
          .serializer
          .transform(fieldValue);
      } else if ("transform" in fieldType) {
        return fieldType.transform(fieldValue);
      } else {
        return fieldValue;
      }
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

    // Side-load each nested relationship
    for (const key of relationshipKeys) {
      const service = getDataService(this.relationships[key].serviceName);
      const relatedModel = service.serializer.normalize(data[key]);
      service.actions.pushRecord(relatedModel).invoke();
    }

    // Build the model's data
    const modelData: T = flow(
      pick(fieldKeys),
      mapValuesWithKeys(this.normalizeField(data)),
    )(this.fields) as T;

    return new this.ModelClass(modelData);
  }
}
