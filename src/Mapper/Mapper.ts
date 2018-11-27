import { flow, keys, partition, pick, pickBy, property } from "lodash/fp";
import { fromPairs } from "lodash";

import { IMapper } from ".";

import { mapWithKeys } from "../Utils";
import { IModel, IModelData, IModelFactory, IFieldType, IFieldRelationship, RelationshipType } from "../Model";
import { getDataService } from "../Services";

/**
 * This class implements the `transform` and `normalize` methods on the IMapper interface, to provide a default mechanism
 * to transform a model instance into a ready-to-serialize object, and to normalize a raw data object back into a model instance.
 * Any nested relationships will be side-loaded by dispatching an action to the related service.
 *
 */
export class Mapper<T extends IModelData, R = T> implements IMapper<T, R> {
  public readonly ModelClass: IModelFactory<T>;

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
   * That function will then return a Promise that resolves to provide a tuple of the fieldName and the value.
   * The Promise is necessary for the rare circumstance that we need to perform the transform asynchronously.
   *
   * For example, a Date object will be converted into an ISO Date string when given a DateField.
   */
  public transformField(model: IModel<T> | Partial<T>) {
    return async (fieldType: IFieldType & any, fieldName: string): Promise<[string, any]> => {
      let fieldValue = model[fieldName];

      if (fieldValue != null) {
        if (this.relationships && fieldName in this.relationships) {
          fieldValue = await this.transformRelationship(fieldValue, this.relationships[fieldName]);
        }

        if ("transform" in fieldType) {
          fieldValue = await fieldType.transform(fieldValue);
        }
      }

      return [fieldName, fieldValue];
    };
  }

  /**
   * Returns a function, which when called, converts a single field on the provided raw data
   * into its object equivalent if the given IFieldType implements the optional "normalize" method.
   *
   * That function then returns a Promise which resolves with a tuple of the field name and the normalized value.
   *
   * For example, an ISO date string will be converted into a Date object when given a DateField.
   */
  public normalizeField(data: Partial<R>) {
    return async (fieldType: IFieldType, fieldName: string): Promise<[string, any]> => {
      let value = data[fieldName];

      if (fieldType.normalize) {
        value = await fieldType.normalize(value);
      }

      return [fieldName, value];
    };
  }

  /**
   * Transforms the given Model into a plain javascript object based on the Model's fieldTypes.
   * Each fieldType with `serialize = false` will be excluded.
   *
   * @param {IModel} model
   * @returns {Promise<Partial<R>>}
   */
  public async transform(model: IModel<T> | Partial<T>): Promise<Partial<R>> {
    const transformPromises = flow(
      pickBy(property("serialize")),
      mapWithKeys(this.transformField(model)),
    )(this.fields) as Promise<[string, any]>[];

    // promise resolves with an array of tuples in the format: [key, value][]
    // fromPairs then converts the array of tuples into an object
    const pairs = await Promise.all(transformPromises);
    return fromPairs(pairs) as any;
  }

  /**
   * Creates a new IModel by normalizing the given raw data.
   * If a nested relationship was included in the payload, it will be side-loaded.
   *
   * @param {Partial<R>} data
   * @returns {Promise<IModel<T extends IModelData>>}
   */
  public async normalize(data: Partial<R>): Promise<IModel<T>> {

    // Split nested relationships from the model's own values
    const [relationshipKeys, fieldKeys] = flow(
      keys,
      partition(this.isRelationship),
    )(data);

    // Build the model's data
    const normalizeFieldPromises = flow(
      pick(fieldKeys),
      mapWithKeys(await this.normalizeField(data)),
    )(this.fields) as Promise<[string, any]>[];

    // promise resolves with an array of tuples in the format: [key, value][]
    // fromPairs then converts the array of tuples into an object
    const pairs = await Promise.all(normalizeFieldPromises);
    const modelData: T = fromPairs(pairs) as any;

    const model = new this.ModelClass(modelData);

    // Side-load each nested relationship
    for (const key of relationshipKeys) {
      const relationship = this.relationships[key];
      const relatedModelData = data[key];
      const relatedIdOrIds = await this.processNestedRelationship(model, relatedModelData, relationship);

      if (!modelData.hasOwnProperty(relationship.relatedFieldName)) {
        modelData[relationship.relatedFieldName] = relatedIdOrIds;
      }
    }

    return model;
  }

  /**
   * Transform the given model or array of models depending on the relationship type.
   */
  protected async transformRelationship(fieldValue: IModel<any> | IModel<any>[], relationship: IFieldRelationship) {
    switch (relationship.type) {
      case RelationshipType.BelongsTo:
        return await this.transformRelatedModel(fieldValue as IModel<any>);
      case RelationshipType.HasMany:
        const promises = (fieldValue as IModel<any>[]).map(async item => await this.transformRelatedModel(item));
        return await Promise.all(promises);
      default:
        throw new TypeError(`BaseSerializer: attempted to transform unknown relationship "${relationship.type}"`);
    }
  }

  /**
   * Transform the given relatedModel using its own serializer.
   */
  protected async transformRelatedModel(relatedModel: IModel<any>) {
    return await getDataService(relatedModel.serviceName)
      .serializer
      .transform(relatedModel);
  }

  /**
   * Process the nestedData for the given relationship.
   * - If it is a BelongsTo relationship, its data is normalized into a Model instance, added to its store and its id is returned.
   * - If it is a HasMany relationship, the above is done for each nested object and the ids of the models are returned.
   */
  protected async processNestedRelationship(model: IModel<T>, nestedData: any, relationship: IFieldRelationship) {
    if (relationship.type === RelationshipType.BelongsTo) {
      const relatedModel = await this.loadRelatedModel(model, nestedData, relationship);
      return relatedModel.id;
    } else if (relationship.type === RelationshipType.HasMany && nestedData instanceof Array) {
      const relatedModels = await Promise.all(
        nestedData.map((relatedModelData) => this.loadRelatedModel(model, relatedModelData, relationship)),
      );

      return relatedModels.map(relatedModel => relatedModel.id);
    }
  }

  /**
   * Given the relatedModelData of a single item, normalize the data using the relationship's own serializer,
   * converting it into a Model instance, then dispatch that related Model to its data service and return the Model.
   */
  protected async loadRelatedModel(model: IModel<T>, relatedModelData: any, relationship: IFieldRelationship) {
    const modelRelatedFieldName: string = relationship.modelRelatedFieldName != null
      ? relationship.modelRelatedFieldName
      : model.serviceName + "Id";

    if (!relatedModelData.hasOwnProperty(modelRelatedFieldName)) {
      relatedModelData[modelRelatedFieldName] = model.id;
    }

    const service = getDataService(relationship.serviceName);
    const relatedModel = await service.mapper.normalize(relatedModelData);
    service.actions.pushRecord(relatedModel).invoke();

    return relatedModel;
  }
}
