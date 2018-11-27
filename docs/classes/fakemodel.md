[redux-data-service](../README.md) > [FakeModel](../classes/fakemodel.md)

# Class: FakeModel

## Hierarchy

 [Model](model.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

**↳ FakeModel**

## Implements

* [IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>
* [IFakeModel](../interfaces/ifakemodel.md)

## Index

### Constructors

* [constructor](fakemodel.md#constructor)

### Properties

* [_isDestroying](fakemodel.md#_isdestroying)
* [_willDestroyObservable$](fakemodel.md#_willdestroyobservable_)
* [dateDeleted](fakemodel.md#datedeleted)
* [dateUpdated](fakemodel.md#dateupdated)
* [fields](fakemodel.md#fields)
* [fullText](fakemodel.md#fulltext)
* [id](fakemodel.md#id)
* [meta](fakemodel.md#meta)
* [modelData](fakemodel.md#modeldata)
* [relatedModels](fakemodel.md#relatedmodels)
* [relationships](fakemodel.md#relationships)
* [serviceName](fakemodel.md#servicename)
* [validationRules](fakemodel.md#validationrules)

### Accessors

* [errors](fakemodel.md#errors)
* [hasUnsavedChanges](fakemodel.md#hasunsavedchanges)
* [isDestroying](fakemodel.md#isdestroying)
* [isDirty](fakemodel.md#isdirty)
* [isLoading](fakemodel.md#isloading)
* [isNew](fakemodel.md#isnew)
* [isShadow](fakemodel.md#isshadow)

### Methods

* [applyUpdates](fakemodel.md#applyupdates)
* [checkFieldUpdateIsAllowed](fakemodel.md#checkfieldupdateisallowed)
* [forceReload](fakemodel.md#forcereload)
* [getData](fakemodel.md#getdata)
* [getField](fakemodel.md#getfield)
* [getFieldError](fakemodel.md#getfielderror)
* [getRelated](fakemodel.md#getrelated)
* [getServiceForRelationship](fakemodel.md#getserviceforrelationship)
* [getValidationRulesForField](fakemodel.md#getvalidationrulesforfield)
* [getWillDestroyObservable$](fakemodel.md#getwilldestroyobservable_)
* [initializeNewModel](fakemodel.md#initializenewmodel)
* [isFieldDirty](fakemodel.md#isfielddirty)
* [markForDestruction](fakemodel.md#markfordestruction)
* [parseFieldValue](fakemodel.md#parsefieldvalue)
* [reset](fakemodel.md#reset)
* [save](fakemodel.md#save)
* [saveModel](fakemodel.md#savemodel)
* [saveRelatedModels](fakemodel.md#saverelatedmodels)
* [setField](fakemodel.md#setfield)
* [setMetaField](fakemodel.md#setmetafield)
* [setRelated](fakemodel.md#setrelated)
* [triggerWillDestroyObservable](fakemodel.md#triggerwilldestroyobservable)
* [unload](fakemodel.md#unload)
* [validate](fakemodel.md#validate)
* [validateField](fakemodel.md#validatefield)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new FakeModel**(modelData: * `Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)> & `object`*, meta?: *`Partial`<[IModelMeta](../interfaces/imodelmeta.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*, relatedModels?: *[IModelsMap](../interfaces/imodelsmap.md)*): [FakeModel](fakemodel.md)

*Inherited from [Model](model.md).[constructor](model.md#constructor)*

*Defined in [Model/Model.ts:87](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L87)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| modelData |  `Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)> & `object`| - |
| `Default value` meta | `Partial`<[IModelMeta](../interfaces/imodelmeta.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |  {} |
| `Default value` relatedModels | [IModelsMap](../interfaces/imodelsmap.md) |  {} |

**Returns:** [FakeModel](fakemodel.md)

___

## Properties

<a id="_isdestroying"></a>

### `<Protected>` _isDestroying

**● _isDestroying**: *`boolean`* = false

*Inherited from [Model](model.md).[_isDestroying](model.md#_isdestroying)*

*Defined in [Model/Model.ts:86](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L86)*

___
<a id="_willdestroyobservable_"></a>

### `<Protected>` _willDestroyObservable$

**● _willDestroyObservable$**: *`Subject`<`boolean`>*

*Inherited from [Model](model.md).[_willDestroyObservable$](model.md#_willdestroyobservable_)*

*Defined in [Model/Model.ts:87](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L87)*

___
<a id="datedeleted"></a>

###  dateDeleted

**● dateDeleted**: *`Date`*

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[dateDeleted](../interfaces/ifakemodel.md#datedeleted)*

*Inherited from [Model](model.md).[dateDeleted](model.md#datedeleted)*

*Defined in [Model/Model.ts:81](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L81)*

___
<a id="dateupdated"></a>

###  dateUpdated

**● dateUpdated**: *`Date`*

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[dateUpdated](../interfaces/ifakemodel.md#dateupdated)*

*Inherited from [Model](model.md).[dateUpdated](model.md#dateupdated)*

*Defined in [Model/Model.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L78)*

___
<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)< [IFakeModelData](../interfaces/ifakemodeldata.md) & `any`, [IFieldType](../interfaces/ifieldtype.md)<`any`>>*

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[fields](../interfaces/ifakemodel.md#fields)*

*Inherited from [Model](model.md).[fields](model.md#fields)*

*Defined in [Model/Model.ts:70](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L70)*

___
<a id="fulltext"></a>

###  fullText

**● fullText**: *`string`*

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[fullText](../interfaces/ifakemodel.md#fulltext)*

*Defined in [Model/Model.mock.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.mock.ts#L14)*

___
<a id="id"></a>

###  id

**● id**: *`string`*

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[id](../interfaces/ifakemodel.md#id)*

*Inherited from [Model](model.md).[id](model.md#id)*

*Defined in [Model/Model.ts:75](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L75)*

___
<a id="meta"></a>

### `<Protected>` meta

**● meta**: *[IModelMeta](../interfaces/imodelmeta.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*

*Inherited from [Model](model.md).[meta](model.md#meta)*

*Defined in [Model/Model.ts:84](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L84)*

___
<a id="modeldata"></a>

### `<Protected>` modelData

**● modelData**: *`Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)>*

*Inherited from [Model](model.md).[modelData](model.md#modeldata)*

*Defined in [Model/Model.ts:83](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L83)*

___
<a id="relatedmodels"></a>

### `<Protected>` relatedModels

**● relatedModels**: *[IModelsMap](../interfaces/imodelsmap.md)*

*Inherited from [Model](model.md).[relatedModels](model.md#relatedmodels)*

*Defined in [Model/Model.ts:85](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L85)*

___
<a id="relationships"></a>

###  relationships

**● relationships**: *`object`*

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[relationships](../interfaces/ifakemodel.md#relationships)*

*Inherited from [Model](model.md).[relationships](model.md#relationships)*

*Defined in [Model/Model.ts:72](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L72)*

#### Type declaration

[key: `string`]: [IFieldRelationship](../interfaces/ifieldrelationship.md)

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`* = "fakeModel"

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[serviceName](../interfaces/ifakemodel.md#servicename)*

*Overrides [Model](model.md).[serviceName](model.md#servicename)*

*Defined in [Model/Model.mock.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.mock.ts#L11)*

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[validationRules](../interfaces/ifakemodel.md#validationrules)*

*Inherited from [Model](model.md).[validationRules](model.md#validationrules)*

*Defined in [Model/Model.ts:71](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L71)*

___

## Accessors

<a id="errors"></a>

###  errors

geterrors(): `object`seterrors(value: *`object`*): `void`

*Inherited from [Model](model.md).[errors](model.md#errors)*

*Defined in [Model/Model.ts:599](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L599)*

Get the list of errors, which may have been created from calling `this.validate()` or as a response from the API.

**Returns:** `object`

*Inherited from [Model](model.md).[errors](model.md#errors)*

*Defined in [Model/Model.ts:608](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L608)*

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

*Inherited from [Model](model.md).[hasUnsavedChanges](model.md#hasunsavedchanges)*

*Defined in [Model/Model.ts:639](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L639)*

Determine if the model or its previously loaded relationships have unsaved changes.

**Returns:** `boolean`

___
<a id="isdestroying"></a>

###  isDestroying

getisDestroying(): `boolean`

*Inherited from [Model](model.md).[isDestroying](model.md#isdestroying)*

*Defined in [Model/Model.ts:526](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L526)*

Determine if the current instance of the Model has been marked for destruction. That is, this instance is being removed from the Redux store and its subscriptions are being torn down.

**Returns:** `boolean`

___
<a id="isdirty"></a>

###  isDirty

getisDirty(): `boolean`

*Inherited from [Model](model.md).[isDirty](model.md#isdirty)*

*Defined in [Model/Model.ts:617](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L617)*

Determine if the Model's data has changed without being saved.

**Returns:** `boolean`

___
<a id="isloading"></a>

###  isLoading

getisLoading(): `boolean`setisLoading(value: *`boolean`*): `void`

*Inherited from [Model](model.md).[isLoading](model.md#isloading)*

*Defined in [Model/Model.ts:570](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L570)*

Determine if the Model is currently loading.

**Returns:** `boolean`

*Inherited from [Model](model.md).[isLoading](model.md#isloading)*

*Defined in [Model/Model.ts:579](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L579)*

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

*Inherited from [Model](model.md).[isNew](model.md#isnew)*

*Defined in [Model/Model.ts:650](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L650)*

Determine if the Model is a new object which has not been committed to the API yet.

**Returns:** `boolean`

___
<a id="isshadow"></a>

###  isShadow

getisShadow(): `boolean`

*Inherited from [Model](model.md).[isShadow](model.md#isshadow)*

*Defined in [Model/Model.ts:589](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L589)*

Determine if the Model is a "shadow" object: its data is currently being loaded and this instance of the Model is used as a temporary placeholder until we get a response from the API.

**Returns:** `boolean`

___

## Methods

<a id="applyupdates"></a>

###  applyUpdates

▸ **applyUpdates**(changes?: *`Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, meta?: *`Partial`<[IModelMeta](../interfaces/imodelmeta.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*, relatedModels?: *`any`*): [IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[applyUpdates](../interfaces/ifakemodel.md#applyupdates)*

*Inherited from [Model](model.md).[applyUpdates](model.md#applyupdates)*

*Defined in [Model/Model.ts:298](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L298)*

Since this class is meant to be immutable, you can apply new updates here. The changes will be deep merged with the existing modelData and/or meta, and a new instance of the class will be returned with those values without mutating the current instance of the class.

Note that this is applied locally. Chances are you will want to dispatch an action instead, via one of the magic setters (so your components will know to update).

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` changes | `Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)> |  {} |
| `Default value` meta | `Partial`<[IModelMeta](../interfaces/imodelmeta.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |  {} |
| `Default value` relatedModels | `any` |  {} |

**Returns:** [IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

___
<a id="checkfieldupdateisallowed"></a>

### `<Protected>` checkFieldUpdateIsAllowed

▸ **checkFieldUpdateIsAllowed**(key: *`any`*, value: *`any`*): `void`

*Inherited from [Model](model.md).[checkFieldUpdateIsAllowed](model.md#checkfieldupdateisallowed)*

*Defined in [Model/Model.ts:353](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L353)*

Throw a TypeError if the provided key is an invalid fieldType, or the value is an invalid type for that fieldType.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `any` |  \- |
| value | `any` |   |

**Returns:** `void`

___
<a id="forcereload"></a>

###  forceReload

▸ **forceReload**(): `void`

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[forceReload](../interfaces/ifakemodel.md#forcereload)*

*Inherited from [Model](model.md).[forceReload](model.md#forcereload)*

*Defined in [Model/Model.ts:281](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L281)*

Dispatch an action to the DataService to force it to reload the model from the API.

**Returns:** `void`

___
<a id="getdata"></a>

###  getData

▸ **getData**(): `object`

*Defined in [Model/Model.mock.ts:16](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.mock.ts#L16)*

**Returns:** `object`

___
<a id="getfield"></a>

###  getField

▸ **getField**(fieldName: *`string`*, defaultValue?: *`any`*): `any`

*Inherited from [Model](model.md).[getField](model.md#getfield)*

*Defined in [Model/Model.ts:338](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L338)*

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

*Inherited from [Model](model.md).[getFieldError](model.md#getfielderror)*

*Defined in [Model/Model.ts:654](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L654)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `any` |

**Returns:** `any`

___
<a id="getrelated"></a>

###  getRelated

▸ **getRelated**(fieldName: *`string`*): `any`

*Inherited from [Model](model.md).[getRelated](model.md#getrelated)*

*Defined in [Model/Model.ts:395](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L395)*

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

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[getServiceForRelationship](../interfaces/ifakemodel.md#getserviceforrelationship)*

*Inherited from [Model](model.md).[getServiceForRelationship](model.md#getserviceforrelationship)*

*Defined in [Model/Model.ts:487](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L487)*

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

*Inherited from [Model](model.md).[getValidationRulesForField](model.md#getvalidationrulesforfield)*

*Defined in [Model/Model.ts:240](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L240)*

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

*Inherited from [Model](model.md).[getWillDestroyObservable$](model.md#getwilldestroyobservable_)*

*Defined in [Model/Model.ts:536](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L536)*

Subscribe to this Observable to be notified when the current instance of the Model has been marked for destruction. That is, this instance is being removed from the Redux store and its subscriptions are being torn down.

**Returns:** `Observable`<`boolean`>

___
<a id="initializenewmodel"></a>

###  initializeNewModel

▸ **initializeNewModel**(): `void`

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[initializeNewModel](../interfaces/ifakemodel.md#initializenewmodel)*

*Inherited from [Model](model.md).[initializeNewModel](model.md#initializenewmodel)*

*Defined in [Model/Model.ts:326](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L326)*

This is a useful hook for doing model-specific initialization when creating a new, unsaved model, such as creating related Models and setting default session values.

**Returns:** `void`

___
<a id="isfielddirty"></a>

###  isFieldDirty

▸ **isFieldDirty**(fieldName: *`any`*): `boolean`

*Inherited from [Model](model.md).[isFieldDirty](model.md#isfielddirty)*

*Defined in [Model/Model.ts:626](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L626)*

Determine if a specific model field of the Model's data has changed without being saved.

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `any` |

**Returns:** `boolean`

___
<a id="markfordestruction"></a>

###  markForDestruction

▸ **markForDestruction**(): `void`

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[markForDestruction](../interfaces/ifakemodel.md#markfordestruction)*

*Inherited from [Model](model.md).[markForDestruction](model.md#markfordestruction)*

*Defined in [Model/Model.ts:510](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L510)*

Call this method just before this Model instance will be removed from the Redux store. This allows us to cleanly unsubscribe to any relationship Observables that were previously subscribed to, in order to avoid a possible memory leak.

**Returns:** `void`

___
<a id="parsefieldvalue"></a>

###  parseFieldValue

▸ **parseFieldValue**(fieldName: *`string`*, value: *`any`*): `Promise`<`any`>

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[parseFieldValue](../interfaces/ifakemodel.md#parsefieldvalue)*

*Inherited from [Model](model.md).[parseFieldValue](model.md#parsefieldvalue)*

*Defined in [Model/Model.ts:667](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L667)*

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

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[reset](../interfaces/ifakemodel.md#reset)*

*Inherited from [Model](model.md).[reset](model.md#reset)*

*Defined in [Model/Model.ts:253](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L253)*

Dispatch an action to Redux to reset the Model to its original state. Note: new items will be removed from the Redux store.

**Returns:** `void`

___
<a id="save"></a>

###  save

▸ **save**(): `Promise`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[save](../interfaces/ifakemodel.md#save)*

*Inherited from [Model](model.md).[save](model.md#save)*

*Defined in [Model/Model.ts:111](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L111)*

Dispatch an action to Redux to commit the pending changes to the API.

Returns a promise which resolves with the new Model on success, or the error response on failure. If there were no changes, it will resolve immediately with the current instance of the Model.

Will reject with validation errors if model is invalid.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="savemodel"></a>

###  saveModel

▸ **saveModel**(): `Promise`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[saveModel](../interfaces/ifakemodel.md#savemodel)*

*Inherited from [Model](model.md).[saveModel](model.md#savemodel)*

*Defined in [Model/Model.ts:137](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L137)*

Dispatch an action to Redux to commit the pending changes to the API for just this model, without first saving any related models with pending changes (unless they're serialized with this model).

Returns a promise which resolves with the new Model on success, or the error response on failure.

Note that this method does not validate the model or check if it has pending changes. You probably want to use the `save()` method instead.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="saverelatedmodels"></a>

###  saveRelatedModels

▸ **saveRelatedModels**(): `Promise`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[saveRelatedModels](../interfaces/ifakemodel.md#saverelatedmodels)*

*Inherited from [Model](model.md).[saveRelatedModels](model.md#saverelatedmodels)*

*Defined in [Model/Model.ts:160](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L160)*

Dispatch an action to Redux to commit the pending changes to the API for any of the related models which have already been loaded and would not be serialized when this model is saved. After each model is saved, its new copy is set onto this model.

Returns a promise which resolves with each of the new models.

Note that this method does not validate the related models before it saves them.

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="setfield"></a>

###  setField

▸ **setField**(fieldName: *`string`*, value: *`any`*): `void`

*Inherited from [Model](model.md).[setField](model.md#setfield)*

*Defined in [Model/Model.ts:375](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L375)*

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

*Inherited from [Model](model.md).[setMetaField](model.md#setmetafield)*

*Defined in [Model/Model.ts:556](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L556)*

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

*Inherited from [Model](model.md).[setRelated](model.md#setrelated)*

*Defined in [Model/Model.ts:457](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L457)*

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

*Inherited from [Model](model.md).[triggerWillDestroyObservable](model.md#triggerwilldestroyobservable)*

*Defined in [Model/Model.ts:499](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L499)*

This is an internal method which will tell the WillDestroyObservable to emit a value

**Returns:** `void`

___
<a id="unload"></a>

###  unload

▸ **unload**(): `void`

*Implementation of [IFakeModel](../interfaces/ifakemodel.md).[unload](../interfaces/ifakemodel.md#unload)*

*Inherited from [Model](model.md).[unload](model.md#unload)*

*Defined in [Model/Model.ts:270](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L270)*

Dispatch an action to Redux to remove this Model from its data store.

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(includeRelatedModels?: *`boolean`*): [IModelKeys](../#imodelkeys)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

*Inherited from [Model](model.md).[validate](model.md#validate)*

*Defined in [Model/Model.ts:186](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L186)*

Perform client-side validation on the Model based on the validationRules as defined by property decorators. The validation results will be returned immediately and dispatched to Redux.

We currently use [Validate.JS](https://validatejs.org/) as our validation library.

If `includeRelatedModels` is set to true, any related model on this model which has been loaded previously will be validated as well. The keys for the validation results of nested models will be flattened with "." separator

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` includeRelatedModels | `boolean` | false |  \- |

**Returns:** [IModelKeys](../#imodelkeys)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

___
<a id="validatefield"></a>

###  validateField

▸ **validateField**(fieldName: *`any`*): `any`

*Inherited from [Model](model.md).[validateField](model.md#validatefield)*

*Defined in [Model/Model.ts:216](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Model/Model.ts#L216)*

Perform client-side validation on the Model based on the validationRules as defined for the given `fieldName`. The field's validation results will be returned immediately and dispatched to Redux.

Note: this works with nested paths (such as "person.firstName") in addition to fields local to the model.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldName | `any` |  \- |

**Returns:** `any`

___

