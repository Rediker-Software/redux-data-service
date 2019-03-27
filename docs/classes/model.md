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
* [parentIdFieldName](model.md#parentidfieldname)
* [parentModel](model.md#parentmodel)
* [parentServiceName](model.md#parentservicename)
* [relatedModels](model.md#relatedmodels)
* [relationships](model.md#relationships)
* [serializeThroughParent](model.md#serializethroughparent)
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
* [parentModelId](model.md#parentmodelid)

### Methods

* [applyUpdates](model.md#applyupdates)
* [checkFieldUpdateIsAllowed](model.md#checkfieldupdateisallowed)
* [delete](model.md#delete)
* [forceReload](model.md#forcereload)
* [getField](model.md#getfield)
* [getFieldError](model.md#getfielderror)
* [getRelated](model.md#getrelated)
* [getServiceForRelationship](model.md#getserviceforrelationship)
* [getValidationRulesForField](model.md#getvalidationrulesforfield)
* [getWillDestroyObservable$](model.md#getwilldestroyobservable_)
* [initializeNewModel](model.md#initializenewmodel)
* [isFieldDirty](model.md#isfielddirty)
* [markForDestruction](model.md#markfordestruction)
* [original](model.md#original)
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

*Defined in [Model/Model.ts:109](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L109)*

**Parameters:**

| Name | Type | Default value |
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

*Defined in [Model/Model.ts:108](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L108)*

___
<a id="_willdestroyobservable_"></a>

### `<Protected>` _willDestroyObservable$

**● _willDestroyObservable$**: *`Subject`<`boolean`>*

*Defined in [Model/Model.ts:109](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L109)*

___
<a id="datedeleted"></a>

###  dateDeleted

**● dateDeleted**: *`Date`*

*Implementation of [IModel](../interfaces/imodel.md).[dateDeleted](../interfaces/imodel.md#datedeleted)*

*Defined in [Model/Model.ts:83](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L83)*

___
<a id="dateupdated"></a>

###  dateUpdated

**● dateUpdated**: *`Date`*

*Implementation of [IModel](../interfaces/imodel.md).[dateUpdated](../interfaces/imodel.md#dateupdated)*

*Defined in [Model/Model.ts:80](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L80)*

___
<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)< `T` & `any`, [IFieldType](../interfaces/ifieldtype.md)<`any`>>*

*Implementation of [IModel](../interfaces/imodel.md).[fields](../interfaces/imodel.md#fields)*

*Defined in [Model/Model.ts:72](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L72)*

___
<a id="id"></a>

###  id

**● id**: *`string`*

*Implementation of [IModel](../interfaces/imodel.md).[id](../interfaces/imodel.md#id)*

*Defined in [Model/Model.ts:77](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L77)*

___
<a id="meta"></a>

### `<Protected>` meta

**● meta**: *[IModelMeta](../interfaces/imodelmeta.md)<`T`>*

*Defined in [Model/Model.ts:106](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L106)*

___
<a id="modeldata"></a>

### `<Protected>` modelData

**● modelData**: *`Partial`<`T`>*

*Defined in [Model/Model.ts:105](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L105)*

___
<a id="parentidfieldname"></a>

###  parentIdFieldName

**● parentIdFieldName**: *`string`*

*Implementation of [IModel](../interfaces/imodel.md).[parentIdFieldName](../interfaces/imodel.md#parentidfieldname)*

*Defined in [Model/Model.ts:92](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L92)*

___
<a id="parentmodel"></a>

###  parentModel

**● parentModel**: *[IModel](../interfaces/imodel.md)<`any`>*

*Implementation of [IModel](../interfaces/imodel.md).[parentModel](../interfaces/imodel.md#parentmodel)*

*Defined in [Model/Model.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L95)*

___
<a id="parentservicename"></a>

###  parentServiceName

**● parentServiceName**: *`any`*

*Implementation of [IModel](../interfaces/imodel.md).[parentServiceName](../interfaces/imodel.md#parentservicename)*

*Defined in [Model/Model.ts:89](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L89)*

___
<a id="relatedmodels"></a>

### `<Protected>` relatedModels

**● relatedModels**: *[IModelsMap](../interfaces/imodelsmap.md)*

*Defined in [Model/Model.ts:107](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L107)*

___
<a id="relationships"></a>

###  relationships

**● relationships**: *`object`*

*Implementation of [IModel](../interfaces/imodel.md).[relationships](../interfaces/imodel.md#relationships)*

*Defined in [Model/Model.ts:74](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L74)*

#### Type declaration

[key: `string`]: [IFieldRelationship](../interfaces/ifieldrelationship.md)

___
<a id="serializethroughparent"></a>

###  serializeThroughParent

**● serializeThroughParent**: *`boolean`*

*Implementation of [IModel](../interfaces/imodel.md).[serializeThroughParent](../interfaces/imodel.md#serializethroughparent)*

*Defined in [Model/Model.ts:86](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L86)*

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Implementation of [IModel](../interfaces/imodel.md).[serviceName](../interfaces/imodel.md#servicename)*

*Defined in [Model/Model.ts:71](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L71)*

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<`T`>*

*Implementation of [IModel](../interfaces/imodel.md).[validationRules](../interfaces/imodel.md#validationrules)*

*Defined in [Model/Model.ts:73](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L73)*

___

## Accessors

<a id="errors"></a>

###  errors

geterrors(): `object`seterrors(value: *`object`*): `void`

*Defined in [Model/Model.ts:658](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L658)*

Get the list of errors, which may have been created from calling `this.validate()` or as a response from the API.

**Returns:** `object`

*Defined in [Model/Model.ts:667](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L667)*

Dispatch an action to Redux to set the error state of the Model.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `object` |   |

**Returns:** `void`

___
<a id="hasunsavedchanges"></a>

###  hasUnsavedChanges

gethasUnsavedChanges(): `boolean`

*Defined in [Model/Model.ts:698](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L698)*

Determine if the model or its previously loaded relationships have unsaved changes.

**Returns:** `boolean`

___
<a id="isdestroying"></a>

###  isDestroying

getisDestroying(): `boolean`

*Defined in [Model/Model.ts:585](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L585)*

Determine if the current instance of the Model has been marked for destruction. That is, this instance is being removed from the Redux store and its subscriptions are being torn down.

**Returns:** `boolean`

___
<a id="isdirty"></a>

###  isDirty

getisDirty(): `boolean`

*Defined in [Model/Model.ts:676](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L676)*

Determine if the Model's data has changed without being saved.

**Returns:** `boolean`

___
<a id="isloading"></a>

###  isLoading

getisLoading(): `boolean`setisLoading(value: *`boolean`*): `void`

*Defined in [Model/Model.ts:629](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L629)*

Determine if the Model is currently loading.

**Returns:** `boolean`

*Defined in [Model/Model.ts:638](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L638)*

Dispatch an action to Redux to set the isLoading state of the Model

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `boolean` |   |

**Returns:** `void`

___
<a id="isnew"></a>

###  isNew

getisNew(): `boolean`

*Defined in [Model/Model.ts:709](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L709)*

Determine if the Model is a new object which has not been committed to the API yet.

**Returns:** `boolean`

___
<a id="isshadow"></a>

###  isShadow

getisShadow(): `boolean`

*Defined in [Model/Model.ts:648](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L648)*

Determine if the Model is a "shadow" object: its data is currently being loaded and this instance of the Model is used as a temporary placeholder until we get a response from the API.

**Returns:** `boolean`

___
<a id="parentmodelid"></a>

###  parentModelId

getparentModelId(): `any`setparentModelId(value: *`any`*): `void`

*Defined in [Model/Model.ts:97](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L97)*

**Returns:** `any`

*Defined in [Model/Model.ts:101](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L101)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `void`

___

## Methods

<a id="applyupdates"></a>

###  applyUpdates

▸ **applyUpdates**(changes?: *`Partial`<`T`>*, meta?: *`Partial`<[IModelMeta](../interfaces/imodelmeta.md)<`T`>>*, relatedModels?: *`any`*): [IModel](../interfaces/imodel.md)<`T`>

*Implementation of [IModel](../interfaces/imodel.md).[applyUpdates](../interfaces/imodel.md#applyupdates)*

*Defined in [Model/Model.ts:349](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L349)*

Since this class is meant to be immutable, you can apply new updates here. The changes will be deep merged with the existing modelData and/or meta, and a new instance of the class will be returned with those values without mutating the current instance of the class.

Note that this is applied locally. Chances are you will want to dispatch an action instead, via one of the magic setters (so your components will know to update).

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` changes | `Partial`<`T`> |  {} |
| `Default value` meta | `Partial`<[IModelMeta](../interfaces/imodelmeta.md)<`T`>> |  {} |
| `Default value` relatedModels | `any` |  {} |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="checkfieldupdateisallowed"></a>

### `<Protected>` checkFieldUpdateIsAllowed

▸ **checkFieldUpdateIsAllowed**(key: *`any`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:406](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L406)*

Throw a TypeError if the provided key is an invalid fieldType, or the value is an invalid type for that fieldType.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `any` |  \- |
| value | `any` |   |

**Returns:** `void`

___
<a id="delete"></a>

###  delete

▸ **delete**(): `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

*Defined in [Model/Model.ts:284](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L284)*

Dispatch an action to Redux to delete the Model

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="forcereload"></a>

###  forceReload

▸ **forceReload**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[forceReload](../interfaces/imodel.md#forcereload)*

*Defined in [Model/Model.ts:332](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L332)*

Dispatch an action to the DataService to force it to reload the model from the API.

**Returns:** `void`

___
<a id="getfield"></a>

###  getField

▸ **getField**(fieldName: *`string`*, defaultValue?: *`any`*): `any`

*Defined in [Model/Model.ts:389](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L389)*

This method is called by the magic getters for the properties decorated by the @attr decorator. The actual data for the decorated properties is stored in modelData.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  \- |
| `Optional` defaultValue | `any` |  \- |

**Returns:** `any`

___
<a id="getfielderror"></a>

###  getFieldError

▸ **getFieldError**(fieldName: *`any`*): `any`

*Defined in [Model/Model.ts:719](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L719)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `any` |

**Returns:** `any`

___
<a id="getrelated"></a>

###  getRelated

▸ **getRelated**(fieldName: *`string`*): `any`

*Defined in [Model/Model.ts:448](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L448)*

This method is called by the magic getters for the properties decorated by the @belongsTo and @hasMany decorators.

It will use the relationship definition created by the decorator to grab the DataService of the related field and return an Observable which provides the corresponding item or items.

If the content has not been loaded yet, the DataService will dispatch an action to load the data.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  \- |

**Returns:** `any`

___
<a id="getserviceforrelationship"></a>

###  getServiceForRelationship

▸ **getServiceForRelationship**(relationshipKey: *`string`*): [DataService](dataservice.md)<`any`>

*Implementation of [IModel](../interfaces/imodel.md).[getServiceForRelationship](../interfaces/imodel.md#getserviceforrelationship)*

*Defined in [Model/Model.ts:545](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L545)*

Get the DataService associated to the relationship specified at the given name of the related field

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| relationshipKey | `string` |  \- |

**Returns:** [DataService](dataservice.md)<`any`>

___
<a id="getvalidationrulesforfield"></a>

### `<Protected>` getValidationRulesForField

▸ **getValidationRulesForField**(fieldName: *`any`*): `any`

*Defined in [Model/Model.ts:273](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L273)*

Get the validationRules for the given fieldName. Works with local or nested fields.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `any` |  \- |

**Returns:** `any`

___
<a id="getwilldestroyobservable_"></a>

###  getWillDestroyObservable$

▸ **getWillDestroyObservable$**(): `Observable`<`boolean`>

*Defined in [Model/Model.ts:595](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L595)*

Subscribe to this Observable to be notified when the current instance of the Model has been marked for destruction. That is, this instance is being removed from the Redux store and its subscriptions are being torn down.

**Returns:** `Observable`<`boolean`>

___
<a id="initializenewmodel"></a>

###  initializeNewModel

▸ **initializeNewModel**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[initializeNewModel](../interfaces/imodel.md#initializenewmodel)*

*Defined in [Model/Model.ts:377](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L377)*

This is a useful hook for doing model-specific initialization when creating a new, unsaved model, such as creating related Models and setting default session values.

**Returns:** `void`

___
<a id="isfielddirty"></a>

###  isFieldDirty

▸ **isFieldDirty**(fieldName: * `keyof T` &#124; `string`*): `boolean`

*Implementation of [IModel](../interfaces/imodel.md).[isFieldDirty](../interfaces/imodel.md#isfielddirty)*

*Defined in [Model/Model.ts:685](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L685)*

Determine if a specific model field of the Model's data has changed without being saved.

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName |  `keyof T` &#124; `string`|

**Returns:** `boolean`

___
<a id="markfordestruction"></a>

###  markForDestruction

▸ **markForDestruction**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[markForDestruction](../interfaces/imodel.md#markfordestruction)*

*Defined in [Model/Model.ts:569](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L569)*

Call this method just before this Model instance will be removed from the Redux store. This allows us to cleanly unsubscribe to any relationship Observables that were previously subscribed to, in order to avoid a possible memory leak.

**Returns:** `void`

___
<a id="original"></a>

###  original

▸ **original**(): `this`

*Implementation of [IModel](../interfaces/imodel.md).[original](../interfaces/imodel.md#original)*

*Defined in [Model/Model.ts:714](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L714)*

Create a clone of the model without any of the unsaved changes

**Returns:** `this`

___
<a id="parsefieldvalue"></a>

###  parseFieldValue

▸ **parseFieldValue**(fieldName: *`string`*, value: *`any`*): `Promise`<`any`>

*Implementation of [IModel](../interfaces/imodel.md).[parseFieldValue](../interfaces/imodel.md#parsefieldvalue)*

*Defined in [Model/Model.ts:732](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L732)*

Given a fieldName as a deep path (such as "firstName" or "person.firstName"), this will use that field's own IFieldType.normalize function to parse the given value.

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `string` |
| value | `any` |

**Returns:** `Promise`<`any`>

___
<a id="reset"></a>

###  reset

▸ **reset**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[reset](../interfaces/imodel.md#reset)*

*Defined in [Model/Model.ts:304](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L304)*

Dispatch an action to Redux to reset the Model to its original state. Note: new items will be removed from the Redux store.

**Returns:** `void`

___
<a id="save"></a>

###  save

▸ **save**(): `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

*Implementation of [IModel](../interfaces/imodel.md).[save](../interfaces/imodel.md#save)*

*Defined in [Model/Model.ts:133](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L133)*

Dispatch an action to Redux to commit the pending changes to the API.

Returns a promise which resolves with the new Model on success, or the error response on failure. If there were no changes, it will resolve immediately with the current instance of the Model.

Will reject with validation errors if model is invalid.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="savemodel"></a>

###  saveModel

▸ **saveModel**(): `Promise`<[IModel](../interfaces/imodel.md)<`any`>>

*Implementation of [IModel](../interfaces/imodel.md).[saveModel](../interfaces/imodel.md#savemodel)*

*Defined in [Model/Model.ts:162](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L162)*

Dispatch an action to Redux to commit the pending changes to the API for just this model, without first saving any related models with pending changes (unless they're serialized with this model).

Returns a promise which resolves with the new Model on success, or the error response on failure.

If this model was loaded initially as a nested model, and the parent is marked to serialize this model, then saving this model will instead save the parent model.

Note that this method does not validate the model or check if it has pending changes. You probably want to use the `save()` method instead.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`any`>>

___
<a id="saverelatedmodels"></a>

###  saveRelatedModels

▸ **saveRelatedModels**(): `Promise`<[IModel](../interfaces/imodel.md)<`T`>[]>

*Implementation of [IModel](../interfaces/imodel.md).[saveRelatedModels](../interfaces/imodel.md#saverelatedmodels)*

*Defined in [Model/Model.ts:193](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L193)*

Dispatch an action to Redux to commit the pending changes to the API for any of the related models which have already been loaded and would not be serialized when this model is saved. After each model is saved, its new copy is set onto a new copy this model.

Returns a promise which resolves with each of the new models.

Note that this method does not validate the related models before it saves them.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="setfield"></a>

###  setField

▸ **setField**(fieldName: *`string`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:428](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L428)*

This method is called by the magic setters for the properties decorated by the @attr decorator.

Since this class is meant to be immutable, attempting to set on a property will actually dispatch an action to Redux, where a new instance of the Model will be created and stored.

_The current instance of the Model will not be mutated!_

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  \- |
| value | `any` |   |

**Returns:** `void`

___
<a id="setmetafield"></a>

###  setMetaField

▸ **setMetaField**(fieldName: *`any`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:615](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L615)*

This method is called by the magic setters for some of the meta properties.

Since this class is meant to be immutable, attempting to set on a property will actually dispatch an action to Redux, where a new instance of the Model will be created and stored.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `any` |  \- |
| value | `any` |   |

**Returns:** `void`

___
<a id="setrelated"></a>

###  setRelated

▸ **setRelated**(fieldName: *`string`*, value: *`any`*): `void`

*Defined in [Model/Model.ts:515](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L515)*

This method is called by the magic setters for the properties decorated by the @belongsTo and @hasMany decorators.

Since the class is meant to be immutable, the related item or items will not be set directly on this instance. Instead, the magic setter for the related field on this class (which tracks the relationship) will be called with the ID or IDs of the value provided, which will dispatch an action to the DataService.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `string` |  \- |
| value | `any` |   |

**Returns:** `void`

___
<a id="triggerwilldestroyobservable"></a>

### `<Protected>` triggerWillDestroyObservable

▸ **triggerWillDestroyObservable**(): `void`

*Defined in [Model/Model.ts:558](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L558)*

This is an internal method which will tell the WillDestroyObservable to emit a value

**Returns:** `void`

___
<a id="unload"></a>

###  unload

▸ **unload**(): `void`

*Implementation of [IModel](../interfaces/imodel.md).[unload](../interfaces/imodel.md#unload)*

*Defined in [Model/Model.ts:321](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L321)*

Dispatch an action to Redux to remove this Model from its data store.

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(includeRelatedModels?: *`boolean`*): [IModelKeys](../#imodelkeys)<`T`>

*Defined in [Model/Model.ts:219](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L219)*

Perform client-side validation on the Model based on the validationRules as defined by property decorators. The validation results will be returned immediately and dispatched to Redux.

We currently use [Validate.JS](https://validatejs.org/) as our validation library.

If `includeRelatedModels` is set to true, any related model on this model which has been loaded previously will be validated as well. The keys for the validation results of nested models will be flattened with "." separator

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` includeRelatedModels | `boolean` | false |  \- |

**Returns:** [IModelKeys](../#imodelkeys)<`T`>

___
<a id="validatefield"></a>

###  validateField

▸ **validateField**(fieldName: *`any`*): `any`

*Defined in [Model/Model.ts:249](https://github.com/Rediker-Software/redux-data-service/blob/860210a/src/Model/Model.ts#L249)*

Perform client-side validation on the Model based on the validationRules as defined for the given `fieldName`. The field's validation results will be returned immediately and dispatched to Redux.

Note: this works with nested paths (such as "person.firstName") in addition to fields local to the model.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `any` |  \- |

**Returns:** `any`

___

