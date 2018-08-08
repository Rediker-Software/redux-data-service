[redux-data-service](../README.md) > [Model](../classes/model.md)

# Class: Model

Model
=====

The Model class is a helper for working with data associated to a DataService.

Immutability
------------

Properties on the Model should use the `@attr` decorator for specifying fields specific to the Model's own data. It is these values which will be sent to/from the API via the DataService when the Model is instantiated or saved.

Since the DataService is tied to Redux, and _data in Redux must be immutable_, this class is immutable. However, it will use a magic setter on each decorated field which will dispatch a Redux action to the DataService's reducer. When the reducer receives the value for the new field, a new instance of the Model will be stored and the current Model instance will be marked for destruction. Thus, we preserve the nature of an immutable architecture, with the convenience of a traditional MVC framework.

Decorators
----------

### @attr

Use this decorator to specify which properties on the model are a part of the model's own data, which will be sent to/from the API. It takes a `FieldType`, from which we can determine the property's default value, default validation rules and how to render it dynamically. You may optionally provide a second parameter, to specify a different default value for the property being decorated. To set additional validation rules for the property, use the `@validation` decorator or one of its variants, such as `@required`.

### @validation

Use this decorator to specify additional validation rules on the property being decorated. Should be used in conjunction with `@attr`. The format of the object passed into the decorator should match the validation rules for [Validate.JS](https://validatejs.org/).

### @required

Use this decorator as a convenience for setting a validation rule to specify that a property is required.

### @belongsTo

Use this decorator to specify a relationship to another Model such that this Model has one of the related Model. For example:

```
@belongsTo()
organization: IOrganization;
```

The above example will use the property name to identify the name of the related field's service (which can be specified as the first parameter). It will use a standard naming convention to identify the name of the field on this Model for identifying the ID of the related model to load, in this case it would look for a field named "organizationId" to load the related IOrganization from the "organization" DataService. The relatedFieldName can be specified as the second parameter.

The DataService will return an Observable which will provide new copies of the related Model every time it is updated. If the related Model has not been loaded yet, the DataService will load it and return a "shadow" object while it is loading.

### @hasMany

Use this decorator to specify a relationship to another Model such that this Model has many of the related Model. It behaves the exact same as the `@belongsTo` decorator, except it assumes the relatedFieldName is pluralized and it returns arrays of the related Model instead.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
## Hierarchy

**Model**

↳  [FakeModel](fakemodel.md)

## Implements

* [IModel](../interfaces/imodel.md)<`T`>

## Index

### Constructors

* [constructor](model.md#constructor)

### Properties

* [_isDestroying](model.md#_isdestroying)
* [_willDestroyObservable$](model.md#_willdestroyobservable_)
* [dateDeleted](model.md#datedeleted)
* [dateUpdated](model.md#dateupdated)
* [fields](model.md#fields)
* [id](model.md#id)
* [meta](model.md#meta)
* [modelData](model.md#modeldata)
* [relatedModels](model.md#relatedmodels)
* [relationships](model.md#relationships)
* [serviceName](model.md#servicename)
* [validationRules](model.md#validationrules)

### Accessors

* [errors](model.md#errors)
* [hasUnsavedChanges](model.md#hasunsavedchanges)
* [isDestroying](model.md#isdestroying)
* [isDirty](model.md#isdirty)
* [isLoading](model.md#isloading)
* [isNew](model.md#isnew)
* [isShadow](model.md#isshadow)

### Methods

* [applyUpdates](model.md#applyupdates)
* [checkFieldUpdateIsAllowed](model.md#checkfieldupdateisallowed)
* [forceReload](model.md#forcereload)
* [getField](model.md#getfield)
* [getFieldError](model.md#getfielderror)
* [getRelated](model.md#getrelated)
* [getValidationRulesForField](model.md#getvalidationrulesforfield)
* [getWillDestroyObservable$](model.md#getwilldestroyobservable_)
* [initializeNewModel](model.md#initializenewmodel)
* [markForDestruction](model.md#markfordestruction)
* [parseFieldValue](model.md#parsefieldvalue)
* [reset](model.md#reset)
* [save](model.md#save)
* [saveModel](model.md#savemodel)
* [saveRelatedModels](model.md#saverelatedmodels)
* [setField](model.md#setfield)
* [setMetaField](model.md#setmetafield)
* [setRelated](model.md#setrelated)
* [triggerWillDestroyObservable](model.md#triggerwilldestroyobservable)
* [unload](model.md#unload)
* [validate](model.md#validate)
* [validateField](model.md#validatefield)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Model**(modelData: * `Partial`<`T`> & `object`*, meta?: *`Partial`<[IModelMeta](../interfaces/imodelmeta.md)<`T`>>*, relatedModels?: *[IModelsMap](../interfaces/imodelsmap.md)*): [Model](model.md)

*Defined in [Model/Model.ts:86](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L86)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| modelData |  `Partial`<`T`> & `object`| - |
| `Default value` meta | `Partial`<[IModelMeta](../interfaces/imodelmeta.md)<`T`>> |  {} |
| `Default value` relatedModels | [IModelsMap](../interfaces/imodelsmap.md) |  {} |

**Returns:** [Model](model.md)

___

## Properties

<a id="_isdestroying"></a>

### `<Protected>` _isDestroying

**● _isDestroying**: *`boolean`* = false

*Defined in [Model/Model.ts:85](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L85)*

___
<a id="_willdestroyobservable_"></a>

### `<Protected>` _willDestroyObservable$

**● _willDestroyObservable$**: *`Subject`<`boolean`>*

*Defined in [Model/Model.ts:86](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L86)*

___
<a id="datedeleted"></a>

###  dateDeleted

**● dateDeleted**: *`Date`*

*Implementation of [IModel](../interfaces/imodel.md).[dateDeleted](../interfaces/imodel.md#datedeleted)*

*Defined in [Model/Model.ts:80](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L80)*

___
<a id="dateupdated"></a>

###  dateUpdated

**● dateUpdated**: *`Date`*

*Implementation of [IModel](../interfaces/imodel.md).[dateUpdated](../interfaces/imodel.md#dateupdated)*

*Defined in [Model/Model.ts:77](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L77)*

___
<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)< `T` & `any`, [IFieldType](../interfaces/ifieldtype.md)<`any`>>*

*Implementation of [IModel](../interfaces/imodel.md).[fields](../interfaces/imodel.md#fields)*

*Defined in [Model/Model.ts:69](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L69)*

___
<a id="id"></a>

###  id

**● id**: *`string`*

*Implementation of [IModel](../interfaces/imodel.md).[id](../interfaces/imodel.md#id)*

*Defined in [Model/Model.ts:74](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L74)*

___
<a id="meta"></a>

### `<Protected>` meta

**● meta**: *[IModelMeta](../interfaces/imodelmeta.md)<`T`>*

*Defined in [Model/Model.ts:83](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L83)*

___
<a id="modeldata"></a>

### `<Protected>` modelData

**● modelData**: *`Partial`<`T`>*

*Defined in [Model/Model.ts:82](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L82)*

___
<a id="relatedmodels"></a>

### `<Protected>` relatedModels

**● relatedModels**: *[IModelsMap](../interfaces/imodelsmap.md)*

*Defined in [Model/Model.ts:84](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L84)*

___
<a id="relationships"></a>

###  relationships

**● relationships**: *`object`*

*Implementation of [IModel](../interfaces/imodel.md).[relationships](../interfaces/imodel.md#relationships)*

*Defined in [Model/Model.ts:71](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L71)*

#### Type declaration

[key: `string`]: [IFieldRelationship](../interfaces/ifieldrelationship.md)

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Implementation of [IModel](../interfaces/imodel.md).[serviceName](../interfaces/imodel.md#servicename)*

*Defined in [Model/Model.ts:68](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L68)*

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<`T`>*

*Implementation of [IModel](../interfaces/imodel.md).[validationRules](../interfaces/imodel.md#validationrules)*

*Defined in [Model/Model.ts:70](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L70)*

___

## Accessors

<a id="errors"></a>

###  errors

geterrors(): `object`seterrors(value: *`object`*): `void`

*Defined in [Model/Model.ts:580](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L580)*

Get the list of errors, which may have been created from calling `this.validate()` or as a response from the API.

**Returns:** `object`

*Defined in [Model/Model.ts:589](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L589)*

Dispatch an action to Redux to set the error state of the Model.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `object` |   |

**Returns:** `void`

___
<a id="hasunsavedchanges"></a>

###  hasUnsavedChanges

gethasUnsavedChanges(): `boolean`

*Defined in [Model/Model.ts:607](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L607)*

Determine if the model or its previously loaded relationships have unsaved changes.

**Returns:** `boolean`

___
<a id="isdestroying"></a>

###  isDestroying

getisDestroying(): `boolean`

*Defined in [Model/Model.ts:507](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L507)*

Determine if the current instance of the Model has been marked for destruction. That is, this instance is being removed from the Redux store and its subscriptions are being torn down.

**Returns:** `boolean`

___
<a id="isdirty"></a>

###  isDirty

getisDirty(): `boolean`

*Defined in [Model/Model.ts:598](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L598)*

Determine if the Model's data has changed without being saved.

**Returns:** `boolean`

___
<a id="isloading"></a>

###  isLoading

getisLoading(): `boolean`setisLoading(value: *`boolean`*): `void`

*Defined in [Model/Model.ts:551](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L551)*

Determine if the Model is currently loading.

**Returns:** `boolean`

*Defined in [Model/Model.ts:560](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L560)*

Dispatch an action to Redux to set the isLoading state of the Model

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `boolean` |   |

**Returns:** `void`

___
<a id="isnew"></a>

###  isNew

getisNew(): `boolean`

*Defined in [Model/Model.ts:618](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L618)*

Determine if the Model is a new object which has not been committed to the API yet.

**Returns:** `boolean`

___
<a id="isshadow"></a>

###  isShadow

getisShadow(): `boolean`

*Defined in [Model/Model.ts:570](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L570)*

Determine if the Model is a "shadow" object: its data is currently being loaded and this instance of the Model is used as a temporary placeholder until we get a response from the API.

**Returns:** `boolean`

___

## Methods

<a id="applyupdates"></a>

###  applyUpdates

▸ **applyUpdates**(modelData?: *`Partial`<`T`>*, meta?: *`Partial`<[IModelMeta](../interfaces/imodelmeta.md)<`T`>>*, relatedModels?: *`any`*): [IModel](../interfaces/imodel.md)<`T`>

*Implementation of [IModel](../interfaces/imodel.md).[applyUpdates](../interfaces/imodel.md#applyupdates)*

*Defined in [Model/Model.ts:293](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L293)*

Since this class is meant to be immutable, you can apply new updates here. The changes will be deep merged with the existing modelData and/or meta, and a new instance of the class will be returned with those values without mutating the current instance of the class.

Note that this is applied locally. Chances are you will want to dispatch an action instead, via one of the magic setters (so your components will know to update).

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` modelData | `Partial`<`T`> |  null |
| `Default value` meta | `Partial`<[IModelMeta](../interfaces/imodelmeta.md)<`T`>> |  {} |
| `Default value` relatedModels | `any` |  {} |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="checkfieldupdateisallowed"></a>

### `<Protected>` checkFieldUpdateIsAllowed

▸ **checkFieldUpdateIsAllowed**(key: *`any`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:349](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L349)*

Throw a TypeError if the provided key is an invalid fieldType, or the value is an invalid type for that fieldType.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any` |  - |
| value | `any` |   |

**Returns:** `void`

___
<a id="forcereload"></a>

###  forceReload

▸ **forceReload**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[forceReload](../interfaces/imodel.md#forcereload)*

*Defined in [Model/Model.ts:276](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L276)*

Dispatch an action to the DataService to force it to reload the model from the API.

**Returns:** `void`

___
<a id="getfield"></a>

###  getField

▸ **getField**(fieldName: *`string`*, defaultValue?: *`any`*): `any`

*Defined in [Model/Model.ts:338](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L338)*

This method is called by the magic getters for the properties decorated by the @attr decorator. The actual data for the decorated properties is stored in modelData.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  - |
| `Optional` defaultValue | `any` |  - |

**Returns:** `any`

___
<a id="getfielderror"></a>

###  getFieldError

▸ **getFieldError**(fieldName: *`any`*): `any`

*Defined in [Model/Model.ts:622](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L622)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldName | `any` |

**Returns:** `any`

___
<a id="getrelated"></a>

###  getRelated

▸ **getRelated**(fieldName: *`string`*): `any`

*Defined in [Model/Model.ts:391](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L391)*

This method is called by the magic getters for the properties decorated by the @belongsTo and @hasMany decorators.

It will use the relationship definition created by the decorator to grab the DataService of the related field and return an Observable which provides the corresponding item or items.

If the content has not been loaded yet, the DataService will dispatch an action to load the data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  - |

**Returns:** `any`

___
<a id="getvalidationrulesforfield"></a>

### `<Protected>` getValidationRulesForField

▸ **getValidationRulesForField**(fieldName: *`any`*):  `object` &#124; `this[any]`

*Defined in [Model/Model.ts:235](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L235)*

Get the validationRules for the given fieldName. Works with local or nested fields.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fieldName | `any` |  - |

**Returns:**  `object` &#124; `this[any]`

___
<a id="getwilldestroyobservable_"></a>

###  getWillDestroyObservable$

▸ **getWillDestroyObservable$**(): `Observable`<`boolean`>

*Defined in [Model/Model.ts:517](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L517)*

Subscribe to this Observable to be notified when the current instance of the Model has been marked for destruction. That is, this instance is being removed from the Redux store and its subscriptions are being torn down.

**Returns:** `Observable`<`boolean`>

___
<a id="initializenewmodel"></a>

###  initializeNewModel

▸ **initializeNewModel**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[initializeNewModel](../interfaces/imodel.md#initializenewmodel)*

*Defined in [Model/Model.ts:326](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L326)*

This is a useful hook for doing model-specific initialization when creating a new, unsaved model, such as creating related Models and setting default session values.

**Returns:** `void`

___
<a id="markfordestruction"></a>

###  markForDestruction

▸ **markForDestruction**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[markForDestruction](../interfaces/imodel.md#markfordestruction)*

*Defined in [Model/Model.ts:491](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L491)*

Call this method just before this Model instance will be removed from the Redux store. This allows us to cleanly unsubscribe to any relationship Observables that were previously subscribed to, in order to avoid a possible memory leak.

**Returns:** `void`

___
<a id="parsefieldvalue"></a>

###  parseFieldValue

▸ **parseFieldValue**(fieldName: *`string`*, value: *`any`*): `any`

*Implementation of [IModel](../interfaces/imodel.md).[parseFieldValue](../interfaces/imodel.md#parsefieldvalue)*

*Defined in [Model/Model.ts:635](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L635)*

Given a fieldName as a deep path (such as "firstName" or "person.firstName"), this will use that field's own IFieldType.normalize function to parse the given value.

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldName | `string` |
| value | `any` |

**Returns:** `any`

___
<a id="reset"></a>

###  reset

▸ **reset**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[reset](../interfaces/imodel.md#reset)*

*Defined in [Model/Model.ts:249](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L249)*

Dispatch an action to Redux to reset the Model to its original state. Note: new items will be removed from the Redux store.

**Returns:** `void`

___
<a id="save"></a>

###  save

▸ **save**(): `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

*Implementation of [IModel](../interfaces/imodel.md).[save](../interfaces/imodel.md#save)*

*Defined in [Model/Model.ts:110](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L110)*

Dispatch an action to Redux to commit the pending changes to the API.

Returns a promise which resolves with the new Model on success, or the error response on failure. If there were no changes, it will resolve immediately with the current instance of the Model.

Will reject with validation errors if model is invalid.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="savemodel"></a>

###  saveModel

▸ **saveModel**(): `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

*Implementation of [IModel](../interfaces/imodel.md).[saveModel](../interfaces/imodel.md#savemodel)*

*Defined in [Model/Model.ts:136](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L136)*

Dispatch an action to Redux to commit the pending changes to the API for just this model, without first saving any related models with pending changes (unless they're serialized with this model).

Returns a promise which resolves with the new Model on success, or the error response on failure.

Note that this method does not validate the model or check if it has pending changes. You probably want to use the `save()` method instead.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="saverelatedmodels"></a>

###  saveRelatedModels

▸ **saveRelatedModels**(): `Promise`<[IModel](../interfaces/imodel.md)<`T`>[]>

*Implementation of [IModel](../interfaces/imodel.md).[saveRelatedModels](../interfaces/imodel.md#saverelatedmodels)*

*Defined in [Model/Model.ts:159](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L159)*

Dispatch an action to Redux to commit the pending changes to the API for any of the related models which have already been loaded and would not be serialized when this model is saved. After each model is saved, its new copy is set onto this model.

Returns a promise which resolves with each of the new models.

Note that this method does not validate the related models before it saves them.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="setfield"></a>

###  setField

▸ **setField**(fieldName: *`string`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:371](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L371)*

This method is called by the magic setters for the properties decorated by the @attr decorator.

Since this class is meant to be immutable, attempting to set on a property will actually dispatch an action to Redux, where a new instance of the Model will be created and stored.

_The current instance of the Model will not be mutated!_

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  - |
| value | `any` |   |

**Returns:** `void`

___
<a id="setmetafield"></a>

###  setMetaField

▸ **setMetaField**(fieldName: *`any`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:537](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L537)*

This method is called by the magic setters for some of the meta properties.

Since this class is meant to be immutable, attempting to set on a property will actually dispatch an action to Redux, where a new instance of the Model will be created and stored.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fieldName | `any` |  - |
| value | `any` |   |

**Returns:** `void`

___
<a id="setrelated"></a>

###  setRelated

▸ **setRelated**(fieldName: *`string`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:453](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L453)*

This method is called by the magic setters for the properties decorated by the @belongsTo and @hasMany decorators.

Since the class is meant to be immutable, the related item or items will not be set directly on this instance. Instead, the magic setter for the related field on this class (which tracks the relationship) will be called with the ID or IDs of the value provided, which will dispatch an action to the DataService.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  - |
| value | `any` |   |

**Returns:** `void`

___
<a id="triggerwilldestroyobservable"></a>

### `<Protected>` triggerWillDestroyObservable

▸ **triggerWillDestroyObservable**(): `void`

*Defined in [Model/Model.ts:480](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L480)*

This is an internal method which will tell the WillDestroyObservable to emit a value

**Returns:** `void`

___
<a id="unload"></a>

###  unload

▸ **unload**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[unload](../interfaces/imodel.md#unload)*

*Defined in [Model/Model.ts:265](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L265)*

Dispatch an action to Redux to remove this Model from its data store.

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(includeRelatedModels?: *`boolean`*): [IModelKeys](../#imodelkeys)<`T`>

*Defined in [Model/Model.ts:185](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L185)*

Perform client-side validation on the Model based on the validationRules as defined by property decorators. The validation results will be returned immediately and dispatched to Redux.

We currently use [Validate.JS](https://validatejs.org/) as our validation library.

If `includeRelatedModels` is set to true, any related model on this model which has been loaded previously will be validated as well. The keys for the validation results of nested models will be flattened with "." separator

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` includeRelatedModels | `boolean` | false |  - |

**Returns:** [IModelKeys](../#imodelkeys)<`T`>

___
<a id="validatefield"></a>

###  validateField

▸ **validateField**(fieldName: *`any`*): `any`

*Defined in [Model/Model.ts:214](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Model.ts#L214)*

Perform client-side validation on the Model based on the validationRules as defined for the given `fieldName`. The field's validation results will be returned immediately and dispatched to Redux.

Note: this works with nested paths (such as "person.firstName") in addition to fields local to the model.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fieldName | `any` |  - |

**Returns:** `any`

___

