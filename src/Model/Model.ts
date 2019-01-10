import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/skip";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { validate } from "validate.js";
import { forEach, get, isEmpty, omit, find } from "lodash";
import { assign, flow, mapValues, omitBy } from "lodash/fp";

import { DataService } from "../Services/DataService";
import { getDataService } from "../Services/ServiceProvider";
import { addPenultimateFieldToPath, flattenObjectKeys } from "../Utils";

import { IModel, IModelData, IModelKeys, IModelMeta, IModelsMap } from "./IModel";
import { DateTimeField, IFieldType, StringField } from "./FieldType";
import { attr, IFieldRelationship, RelationshipType } from "./Decorators";
import { getConfiguration } from "../Configure";

/**
 * # Model
 *
 * The Model class is a helper for working with data associated to a DataService.
 *
 * ## Immutability
 *
 * Properties on the Model should use the `@attr` decorator for specifying fields specific to the Model's own data.
 * It is these values which will be sent to/from the API via the DataService when the Model is instantiated or saved.
 *
 * Since the DataService is tied to Redux, and *data in Redux must be immutable*, this class is immutable.
 * However, it will use a magic setter on each decorated field which will dispatch a Redux action to the DataService's reducer.
 * When the reducer receives the value for the new field, a new instance of the Model will be stored and the current Model instance will
 * be marked for destruction. Thus, we preserve the nature of an immutable architecture, with the convenience of a traditional MVC framework.
 *
 * ## Decorators
 *
 * ### @attr
 * Use this decorator to specify which properties on the model are a part of the model's own data, which will be sent to/from the API.
 * It takes a `FieldType`, from which we can determine the property's default value, default validation rules and how to render it dynamically.
 * You may optionally provide a second parameter, to specify a different default value for the property being decorated. To set
 * additional validation rules for the property, use the `@validation` decorator or one of its variants, such as `@required`.
 *
 * ### @validation
 * Use this decorator to specify additional validation rules on the property being decorated. Should be used in conjunction with `@attr`.
 * The format of the object passed into the decorator should match the validation rules for [Validate.JS](https://validatejs.org/).
 *
 * ### @required
 * Use this decorator as a convenience for setting a validation rule to specify that a property is required.
 *
 * ### @belongsTo
 * Use this decorator to specify a relationship to another Model such that this Model has one of the related Model. For example:
 *
 * ```
 * @belongsTo()
 * organization: IOrganization;
 * ```
 *
 * The above example will use the property name to identify the name of the related field's service (which can be specified as the first parameter).
 * It will use a standard naming convention to identify the name of the field on this Model for identifying the ID of the related model to load,
 * in this case it would look for a field named "organizationId" to load the related IOrganization from the "organization" DataService. The relatedFieldName
 * can be specified as the second parameter.
 *
 * The DataService will return an Observable which will provide new copies of the related Model every time it is updated. If the related Model has not
 * been loaded yet, the DataService will load it and return a "shadow" object while it is loading.
 *
 * ### @hasMany
 * Use this decorator to specify a relationship to another Model such that this Model has many of the related Model. It behaves the exact
 * same as the `@belongsTo` decorator, except it assumes the relatedFieldName is pluralized and it returns arrays of the related Model instead.
 *
 */
export class Model<T extends IModelData> implements IModel<T> {
  public serviceName: string;
  public readonly fields: IModelKeys<T & any, IFieldType<any>>;
  public readonly validationRules: IModelKeys<T>;
  public readonly relationships: { [key: string]: IFieldRelationship };

  @attr(StringField, { serialize: false, readOnly: true })
  public readonly id: string;

  @attr(DateTimeField, { serialize: false, readOnly: true })
  public readonly dateUpdated: Date;

  @attr(DateTimeField, { serialize: false, readOnly: true })
  public readonly dateDeleted: Date;

  protected readonly modelData: Partial<T>;
  protected readonly meta: IModelMeta<T>;
  protected readonly relatedModels: IModelsMap;
  protected _isDestroying: boolean = false;
  protected _willDestroyObservable$: Subject<boolean>;

  constructor(modelData: Partial<T> & { id: string }, meta: Partial<IModelMeta<T>> = {}, relatedModels: IModelsMap = {}) {
    this.modelData = modelData;
    this.relatedModels = relatedModels;
    this.meta = {
      isLoading: false,
      isShadow: false,
      errors: null,
      changes: null,
      ...meta,
    };
  }

  /**
   * Dispatch an action to Redux to commit the pending changes to the API.
   *
   * Returns a promise which resolves with the new Model on success, or the error response on failure.
   * If there were no changes, it will resolve immediately with the current instance of the Model.
   *
   * Will reject with validation errors if model is invalid.
   *
   * @returns {Promise<IModel<T extends IModelData>>}
   */
  public async save(): Promise<IModel<T>> {
    const validationErrors = this.validate(true);

    if (!isEmpty(validationErrors)) {
      throw validationErrors;
    }

    if (this.hasUnsavedChanges) {
      await this.saveRelatedModels();
      return await this.saveModel();
    }

    return this;
  }

  /**
   * Dispatch an action to Redux to commit the pending changes to the API for just this model,
   * without first saving any related models with pending changes (unless they're serialized with this model).
   *
   * Returns a promise which resolves with the new Model on success, or the error response on failure.
   *
   * Note that this method does not validate the model or check if it has pending changes. You probably want to
   * use the `save()` method instead.
   *
   * @returns {Promise<IModel<T extends IModelData>>}
   */
  public saveModel(): Promise<IModel<T>> {
    const service = getDataService(this.serviceName);
    const action = (this.isNew)
      ? service.actions.createRecord
      : getConfiguration().preferPatchOverPut
        ? service.actions.patchRecord
        : service.actions.updateRecord;

    return new Promise((resolve, reject) => {
      action({ id: this.id }, {
        onSuccess: (model) => resolve(model),
        onError: (error) => reject("xhr" in error ? error.xhr.response : error),
      }).invoke();
    });
  }

  /**
   * Dispatch an action to Redux to commit the pending changes to the API for any of the related models
   * which have already been loaded and would not be serialized when this model is saved. After each model is saved,
   * its new copy is set onto this model.
   *
   * Returns a promise which resolves with each of the new models.
   *
   * Note that this method does not validate the related models before it saves them.
   *
   * @returns {Promise<IModel<T extends IModelData>[]>}
   */
  public saveRelatedModels(): Promise<IModel<T>[]> {
    const promises = [];

    forEach(this.relatedModels, (relatedModel, key) => {
      if (relatedModel && "isDirty" in relatedModel && relatedModel.isDirty && !this.fields[key].serialize) {
        const promise = relatedModel.saveModel();
        promise.then(newRelatedModel => this.setRelated(key, newRelatedModel));
        promises.push(promise);
      }
    });

    return Promise.all(promises);
  }

  /**
   * Perform client-side validation on the Model based on the validationRules as defined by property decorators.
   * The validation results will be returned immediately and dispatched to Redux.
   *
   * We currently use [Validate.JS](https://validatejs.org/) as our validation library.
   *
   * If `includeRelatedModels` is set to true, any related model on this model which has been loaded previously
   * will be validated as well. The keys for the validation results of nested models will be flattened with "." separator
   *
   * @param {boolean} includeRelatedModels
   * @returns {IModelKeys<T extends IModelData>}
   */
  public validate(includeRelatedModels = false): IModelKeys<T> {
    const { id, dateUpdated, dateDeleted, ...data } = this.modelData as any;
    const changedData = { ...data, ...(this.meta.changes as any) };
    let errors = validate(changedData, this.validationRules) || {};

    if (includeRelatedModels) {
      errors = flow(
        omitBy((relatedModel: IModel<any>) => (relatedModel == null || !relatedModel.isDirty)),
        mapValues((relatedModel: IModel<any>) => relatedModel.validate()),
        flattenObjectKeys,
        assign(errors),
      )(this.relatedModels);
    }

    if (!(isEmpty(this.errors) && isEmpty(errors))) {
      this.errors = errors;
    }

    return errors;
  }

  /**
   * Perform client-side validation on the Model based on the validationRules as defined for the given `fieldName`.
   * The field's validation results will be returned immediately and dispatched to Redux.
   *
   * Note: this works with nested paths (such as "person.firstName") in addition to fields local to the model.
   *
   * @param fieldName {string}
   * @returns {any}
   */
  public validateField(fieldName) {
    const errors = this.errors as any || {};
    const localFieldName = fieldName.substring(fieldName.lastIndexOf(".") + 1);
    const validationRules = { [localFieldName]: this.getValidationRulesForField(fieldName) };
    const value = { [localFieldName]: get(this, fieldName) };

    const validationResult = validate(value, validationRules);

    // Update existing errors object with the results for this one field
    this.errors = isEmpty(validationResult)
      ? omit(errors, fieldName)
      : { ...errors, [fieldName]: validationResult[localFieldName] };

    return validationResult && localFieldName in validationResult
      ? validationResult[localFieldName]
      : undefined;
  }

  /**
   * Get the validationRules for the given fieldName. Works with local or nested fields.
   *
   * @param fieldName
   * @returns {object}
   */
  protected getValidationRulesForField(fieldName) {
    // split the fieldName if it has a dot, add "validationRules" as penultimate to the path
    // works even if the fieldName is not a nested path
    const validationRulesPath = addPenultimateFieldToPath(fieldName, "validationRules");

    return get(this, validationRulesPath, {});
  }

  /**
   * Dispatch an action to Redux to reset the Model to its original state.
   * Note: new items will be removed from the Redux store.
   *
   */
  public reset(): void {
    if (this.isNew) {
      this.unload();
    } else if (this.isDirty) {
      const service = getDataService(this.serviceName);
      const model = new service.ModelClass(this.modelData);
      service
        .actions
        .pushRecord(model)
        .invoke();
    }
  }

  /**
   * Dispatch an action to Redux to remove this Model from its data store.
   *
   */
  public unload(): void {
    getDataService(this.serviceName)
      .actions
      .unloadRecord({ id: this.id })
      .invoke();
  }

  /**
   * Dispatch an action to the DataService to force it to reload the model from the API.
   *
   */
  public forceReload(): void {
    if (!this.isNew) {
      getDataService(this.serviceName)
        .actions
        .fetchRecord({ id: this.id }, { forceReload: true })
        .invoke();
    }
  }

  /**
   * Since this class is meant to be immutable, you can apply new updates here. The changes will be deep merged
   * with the existing modelData and/or meta, and a new instance of the class will be returned with those values without
   * mutating the current instance of the class.
   *
   * Note that this is applied locally. Chances are you will want to dispatch an action instead, via one of the magic setters
   * (so your components will know to update).
   */
  public applyUpdates(changes: Partial<T> = {}, meta: Partial<IModelMeta<T>> = {}, relatedModels: any = {}): IModel<T> {
    relatedModels = { ...this.relatedModels, ...relatedModels };

    if (!isEmpty(changes)) {

      // Validate the input, clear relatedModels whose ids may have just changed so they can be loaded again
      for (const key in changes) {
        this.checkFieldUpdateIsAllowed(key, changes[key]);
        const relationship = find(this.relationships, { relatedFieldName: key });
        if (relationship && relatedModels.hasOwnProperty(relationship.field)) {
          delete relatedModels[relationship.field];
        }
      }

      meta.changes = { ...(this.meta.changes as any), ...(changes as any) };
    }

    meta = { ...this.meta, ...meta };

    const service = getDataService(this.serviceName);
    return new service.ModelClass(this.modelData, meta, relatedModels);
  }

  /**
   * This is a useful hook for doing model-specific initialization when creating a new, unsaved model,
   * such as creating related Models and setting default session values.
   *
   */
  public initializeNewModel() {
    return;
  }

  /**
   * This method is called by the magic getters for the properties decorated by the @attr decorator.
   * The actual data for the decorated properties is stored in modelData.
   *
   * @param {string} fieldName
   * @param defaultValue
   * @returns {any}
   */
  public getField(fieldName: string, defaultValue?: any) {
    return this.meta.changes && fieldName in this.meta.changes
      ? this.meta.changes[fieldName]
      : fieldName in this.modelData
        ? this.modelData[fieldName]
        : defaultValue;
  }

  /**
   * Throw a TypeError if the provided key is an invalid fieldType,
   * or the value is an invalid type for that fieldType.
   *
   * @param key
   * @param value
   */
  protected checkFieldUpdateIsAllowed(key, value) {
    if (key in this.fields) {
      const fieldType = this.fields[key];
      if (!fieldType.isValidType(value)) {
        throw new TypeError(`${this.serviceName}: Value for field "${key}" invalid. Provided ${typeof value}: ${value}`);
      }
    } else {
      throw new ReferenceError(`${this.serviceName}: Field "${key}" not found in the Model. Did you forget to add an @attr decorator?`);
    }
  }

  /**
   * This method is called by the magic setters for the properties decorated by the @attr decorator.
   *
   * Since this class is meant to be immutable, attempting to set on a property will actually dispatch
   * an action to Redux, where a new instance of the Model will be created and stored.
   *
   * *The current instance of the Model will not be mutated!*
   *
   * @param {string} fieldName
   * @param value
   */
  public setField(fieldName: string, value: any) {
    this.checkFieldUpdateIsAllowed(fieldName, value);

    getDataService(this.serviceName)
      .actions
      .setField({ id: this.id, fieldName, value })
      .invoke();
  }

  /**
   * This method is called by the magic getters for the properties decorated by the @belongsTo and @hasMany decorators.
   *
   * It will use the relationship definition created by the decorator to grab the DataService of the related field
   * and return an Observable which provides the corresponding item or items.
   *
   * If the content has not been loaded yet, the DataService will dispatch an action to load the data.
   *
   * @param {string} fieldName
   * @returns {any}
   */
  public getRelated(fieldName: string): any {
    // Return the value immediately if we already have it
    if (fieldName in this.relatedModels) {
      return this.relatedModels[fieldName];
    }

    // Short-circuit early: Does this Model even have the requested relationship?
    if (!this.relationships.hasOwnProperty(fieldName)) {
      return undefined;
    }

    const relationship = this.relationships[fieldName];
    const relatedService = this.getServiceForRelationship(fieldName);
    const relatedIDorIDs = this.getField(relationship.relatedFieldName);

    // Initialize the cache to an empty value
    if (this.isShadow && relationship.type === RelationshipType.BelongsTo) {
      this.relatedModels[fieldName] = relatedService.getShadowObject();
    } else if (relationship.type === RelationshipType.HasMany && isEmpty(relatedIDorIDs)) {
      this.relatedModels[fieldName] = [];
    }

    // Return an empty result:
    // if the related id/ids field is empty
    // OR the current model is being destroyed (we do not want to add more subscriptions as they are being torn down)
    if (isEmpty(relatedIDorIDs) || this.isDestroying) {
      return this.relatedModels[fieldName];
    }

    // Request the related model(s)
    const observable: Observable<any> = (relationship.type === RelationshipType.BelongsTo)
      ? relatedService.getById(relatedIDorIDs)
      : relatedService.getByIds(relatedIDorIDs);

    // Dispatch an action to update the Model's relationships when the Observable updates
    const service = getDataService(this.serviceName);
    observable
      .takeUntil(this.getWillDestroyObservable$())
      .subscribe((value) => {
        if (!this.relatedModels.hasOwnProperty(fieldName)) {
          this.relatedModels[fieldName] = value;
        } else if (this.relatedModels[fieldName] !== value) {
          service
            .actions
            .setRelationship({ id: this.id, fieldName, value })
            .invoke();
        }
      });

    return this.relatedModels[fieldName];
  }

  /**
   * This method is called by the magic setters for the properties decorated by the @belongsTo and @hasMany decorators.
   *
   * Since the class is meant to be immutable, the related item or items will not be set directly on this instance.
   * Instead, the magic setter for the related field on this class (which tracks the relationship) will be called
   * with the ID or IDs of the value provided, which will dispatch an action to the DataService.
   *
   * @param {string} fieldName
   * @param value
   */
  public setRelated(fieldName: string, value: any): void {
    if (!this.relationships.hasOwnProperty(fieldName)) {
      throw new ReferenceError(
        `${this.serviceName}: Relationship field "${fieldName}" not found in the Model's relationships. Did you forget to add a relationship decorator?`,
      );
    }

    const relationship = this.relationships[fieldName];
    const { relatedFieldName, type } = relationship;

    if (isEmpty(value)) {
      this.setField(relatedFieldName, value);
      return;
    }

    if (type === RelationshipType.BelongsTo) {
      this.setField(relatedFieldName, value.id);
    } else if (type === RelationshipType.HasMany) {
      this.setField(relatedFieldName, value.map((item) => item.id));
    } else {
      throw new TypeError(`${this.serviceName}: Relationship type "${type}" unknown.`);
    }
  }

  /**
   * Get the DataService associated to the relationship specified at the given name of the related field
   *
   * @param {string} relationshipKey
   * @returns {DataService<any>}
   */
  public getServiceForRelationship(relationshipKey: string): DataService<any> {
    const relationship = this.relationships[relationshipKey];
    const serviceName = relationship.serviceNameField
      ? this.getField(relationship.serviceNameField)
      : relationship.serviceName;

    return getDataService(serviceName);
  }

  /**
   * This is an internal method which will tell the WillDestroyObservable to emit a value
   */
  protected triggerWillDestroyObservable() {
    if (this._willDestroyObservable$) {
      this._willDestroyObservable$.next(true);
    }
  }

  /**
   * Call this method just before this Model instance will be removed from the Redux store.
   * This allows us to cleanly unsubscribe to any relationship Observables that were previously subscribed to,
   * in order to avoid a possible memory leak.
   */
  public markForDestruction(): void {
    this._isDestroying = true;

    // Redux complains if we unsubscribe from the data store observable when a reducer is running
    // so, we use setTimeout to bump the execution to the next run cycle
    setTimeout(() => {
      this.triggerWillDestroyObservable();
    }, 0);
  }

  /**
   * Determine if the current instance of the Model has been marked for destruction.
   * That is, this instance is being removed from the Redux store and its subscriptions are being torn down.
   *
   * @returns {boolean}
   */
  public get isDestroying() {
    return this._isDestroying;
  }

  /**
   * Subscribe to this Observable to be notified when the current instance of the Model has been marked for destruction.
   * That is, this instance is being removed from the Redux store and its subscriptions are being torn down.
   *
   * @returns {Observable<boolean>}
   */
  public getWillDestroyObservable$(): Observable<boolean> {
    if (!this._willDestroyObservable$) {
      this._willDestroyObservable$ = new Subject();
      if (this.isDestroying) {
        this.triggerWillDestroyObservable();
      }
    }

    return this._willDestroyObservable$;
  }

  /**
   * This method is called by the magic setters for some of the meta properties.
   *
   * Since this class is meant to be immutable, attempting to set on a property will actually dispatch
   * an action to Redux, where a new instance of the Model will be created and stored.
   *
   * @param fieldName
   * @param value
   */
  public setMetaField(fieldName, value): void {
    if (this.meta[fieldName] !== value) {
      getDataService(this.serviceName)
        .actions
        .setMetaField({ id: this.id, fieldName, value })
        .invoke();
    }
  }

  /**
   * Determine if the Model is currently loading.
   *
   * @returns {boolean}
   */
  public get isLoading() {
    return this.meta.isLoading;
  }

  /**
   * Dispatch an action to Redux to set the isLoading state of the Model
   *
   * @param {boolean} value
   */
  public set isLoading(value: boolean) {
    this.setMetaField("isLoading", value);
  }

  /**
   * Determine if the Model is a "shadow" object: its data is currently being loaded and
   * this instance of the Model is used as a temporary placeholder until we get a response from the API.
   *
   * @returns {boolean}
   */
  public get isShadow() {
    return this.meta.isShadow;
  }

  /**
   * Get the list of errors, which may have been created from
   * calling `this.validate()` or as a response from the API.
   *
   * @returns {IModelKeys<T extends IModelData>}
   */
  public get errors() {
    return this.meta.errors;
  }

  /**
   * Dispatch an action to Redux to set the error state of the Model.
   *
   * @param value
   */
  public set errors(value) {
    this.setMetaField("errors", value);
  }

  /**
   * Determine if the Model's data has changed without being saved.
   *
   * @returns {boolean}
   */
  public get isDirty() {
    return !isEmpty(this.meta.changes);
  }

  /**
   * Determine if a specific model field of the Model's data has changed without being saved.
   *
   * @returns {boolean}
   */
  public isFieldDirty(fieldName) {
    if (isEmpty(this.meta.changes)) {
      return false;
    } else {
      return fieldName in this.meta.changes;
    }
  }

  /**
   * Determine if the model or its previously loaded relationships have unsaved changes.
   *
   * @returns {boolean}
   */
  public get hasUnsavedChanges() {
    return this.isDirty || Object
      .values(this.relatedModels)
      .some(relatedModel => "isDirty" in relatedModel && relatedModel.isDirty);
  }

  /**
   * Determine if the Model is a new object which has not been committed to the API yet.
   *
   * @returns {boolean}
   */
  public get isNew() {
    return !this.isShadow && this.modelData.id && this.modelData.id.startsWith("new");
  }

  public getFieldError(fieldName) {
    if (isEmpty(this.errors)) {
      return {};
    } else {
      const error = this.errors[fieldName];
      return (error instanceof Array) ? error[0] : error;
    }
  }

  /**
   * Given a fieldName as a deep path (such as "firstName" or "person.firstName"),
   * this will use that field's own IFieldType.normalize function to parse the given value.
   */
  public async parseFieldValue(fieldName: string, value: any): Promise<any> {
    const path = addPenultimateFieldToPath(fieldName, "fields");
    const field: IFieldType<any> = get(this, path);

    return await field.normalize(value);
  }
}
