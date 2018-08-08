[redux-data-service](../README.md) > [IFakeModel](../interfaces/ifakemodel.md)

# Interface: IFakeModel

## Type parameters
#### T 
#### T 
#### T 
## Hierarchy

↳  [IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>

↳  [IFakeModelData](ifakemodeldata.md)

**↳ IFakeModel**

## Implemented by

* [FakeModel](../classes/fakemodel.md)

## Index

### Properties

* [dateDeleted](ifakemodel.md#datedeleted)
* [dateUpdated](ifakemodel.md#dateupdated)
* [errors](ifakemodel.md#errors)
* [fields](ifakemodel.md#fields)
* [fullText](ifakemodel.md#fulltext)
* [hasUnsavedChanges](ifakemodel.md#hasunsavedchanges)
* [id](ifakemodel.md#id)
* [isDirty](ifakemodel.md#isdirty)
* [isLoading](ifakemodel.md#isloading)
* [isNew](ifakemodel.md#isnew)
* [isShadow](ifakemodel.md#isshadow)
* [original](ifakemodel.md#original)
* [relationships](ifakemodel.md#relationships)
* [serviceName](ifakemodel.md#servicename)
* [validationRules](ifakemodel.md#validationrules)

### Methods

* [applyUpdates](ifakemodel.md#applyupdates)
* [forceReload](ifakemodel.md#forcereload)
* [getField](ifakemodel.md#getfield)
* [getRelated](ifakemodel.md#getrelated)
* [initializeNewModel](ifakemodel.md#initializenewmodel)
* [markForDestruction](ifakemodel.md#markfordestruction)
* [parseFieldValue](ifakemodel.md#parsefieldvalue)
* [reset](ifakemodel.md#reset)
* [save](ifakemodel.md#save)
* [saveModel](ifakemodel.md#savemodel)
* [saveRelatedModels](ifakemodel.md#saverelatedmodels)
* [setField](ifakemodel.md#setfield)
* [setRelated](ifakemodel.md#setrelated)
* [unload](ifakemodel.md#unload)
* [validate](ifakemodel.md#validate)
* [validateField](ifakemodel.md#validatefield)

---

## Properties

<a id="datedeleted"></a>

###  dateDeleted

**● dateDeleted**: *`Date`*

*Inherited from [IModelData](imodeldata.md).[dateDeleted](imodeldata.md#datedeleted)*

*Overrides [IModelData](imodeldata.md).[dateDeleted](imodeldata.md#datedeleted)*

*Defined in [Model/IModel.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L8)*

___
<a id="dateupdated"></a>

###  dateUpdated

**● dateUpdated**: *`Date`*

*Inherited from [IModelData](imodeldata.md).[dateUpdated](imodeldata.md#dateupdated)*

*Overrides [IModelData](imodeldata.md).[dateUpdated](imodeldata.md#dateupdated)*

*Defined in [Model/IModel.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L7)*

___
<a id="errors"></a>

###  errors

**● errors**: *[IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>*

*Inherited from [IModelMeta](imodelmeta.md).[errors](imodelmeta.md#errors)*

*Defined in [Model/IModel.ts:15](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L15)*

___
<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)<`T`, [IFieldType](ifieldtype.md)>*

*Inherited from [IAttrs](iattrs.md).[fields](iattrs.md#fields)*

*Overrides [IFieldTypes](ifieldtypes.md).[fields](ifieldtypes.md#fields)*

*Defined in [Model/Decorators/Attr.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Attr.ts#L11)*

___
<a id="fulltext"></a>

###  fullText

**● fullText**: *`string`*

*Inherited from [IFakeModelData](ifakemodeldata.md).[fullText](ifakemodeldata.md#fulltext)*

*Defined in [Model/Model.mock.ts:26](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Model.mock.ts#L26)*

___
<a id="hasunsavedchanges"></a>

###  hasUnsavedChanges

**● hasUnsavedChanges**: *`boolean`*

*Inherited from [IModel](imodel.md).[hasUnsavedChanges](imodel.md#hasunsavedchanges)*

*Defined in [Model/IModel.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L20)*

___
<a id="id"></a>

###  id

**● id**: *`string`*

*Inherited from [IModelData](imodeldata.md).[id](imodeldata.md#id)*

*Overrides [IModelData](imodeldata.md).[id](imodeldata.md#id)*

*Defined in [Model/IModel.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L6)*

___
<a id="isdirty"></a>

###  isDirty

**● isDirty**: *`boolean`*

*Inherited from [IModel](imodel.md).[isDirty](imodel.md#isdirty)*

*Defined in [Model/IModel.ts:19](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L19)*

___
<a id="isloading"></a>

###  isLoading

**● isLoading**: *`boolean`*

*Inherited from [IModelMeta](imodelmeta.md).[isLoading](imodelmeta.md#isloading)*

*Defined in [Model/IModel.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L13)*

___
<a id="isnew"></a>

###  isNew

**● isNew**: *`boolean`*

*Inherited from [IModel](imodel.md).[isNew](imodel.md#isnew)*

*Defined in [Model/IModel.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L21)*

___
<a id="isshadow"></a>

###  isShadow

**● isShadow**: *`boolean`*

*Inherited from [IModelMeta](imodelmeta.md).[isShadow](imodelmeta.md#isshadow)*

*Defined in [Model/IModel.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L12)*

___
<a id="original"></a>

### `<Optional>` original

**● original**: *`Partial`<[IFakeModelData](ifakemodeldata.md)>*

*Inherited from [IModelMeta](imodelmeta.md).[original](imodelmeta.md#original)*

*Defined in [Model/IModel.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L14)*

___
<a id="relationships"></a>

###  relationships

**● relationships**: *`object`*

*Inherited from [IRelationship](irelationship.md).[relationships](irelationship.md#relationships)*

*Defined in [Model/Decorators/Relationship.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Relationship.ts#L28)*

#### Type declaration

[key: `string`]: [IFieldRelationship](ifieldrelationship.md)

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Inherited from [IModel](imodel.md).[serviceName](imodel.md#servicename)*

*Defined in [Model/IModel.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L22)*

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<`T`>*

*Inherited from [IValidate](ivalidate.md).[validationRules](ivalidate.md#validationrules)*

*Defined in [Model/Decorators/Validation.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Validation.ts#L6)*

___

## Methods

<a id="applyupdates"></a>

###  applyUpdates

▸ **applyUpdates**(modelData?: *`Partial`<[IFakeModelData](ifakemodeldata.md)>*, meta?: *`Partial`<[IModelMeta](imodelmeta.md)<[IFakeModelData](ifakemodeldata.md)>>*, relationships?: *`any`*): [IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>

*Inherited from [IModel](imodel.md).[applyUpdates](imodel.md#applyupdates)*

*Defined in [Model/IModel.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L31)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` modelData | `Partial`<[IFakeModelData](ifakemodeldata.md)> |
| `Optional` meta | `Partial`<[IModelMeta](imodelmeta.md)<[IFakeModelData](ifakemodeldata.md)>> |
| `Optional` relationships | `any` |

**Returns:** [IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>

___
<a id="forcereload"></a>

###  forceReload

▸ **forceReload**(): `void`

*Inherited from [IModel](imodel.md).[forceReload](imodel.md#forcereload)*

*Defined in [Model/IModel.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L30)*

**Returns:** `void`

___
<a id="getfield"></a>

###  getField

▸ **getField**(fieldName: *`any`*, defaultValue: *`any`*): `any`

*Inherited from [IAttrs](iattrs.md).[getField](iattrs.md#getfield)*

*Defined in [Model/Decorators/Attr.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Attr.ts#L12)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldName | `any` |
| defaultValue | `any` |

**Returns:** `any`

___
<a id="getrelated"></a>

###  getRelated

▸ **getRelated**(key: *`any`*): `any`

*Inherited from [IRelationship](irelationship.md).[getRelated](irelationship.md#getrelated)*

*Defined in [Model/Decorators/Relationship.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Relationship.ts#L30)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="initializenewmodel"></a>

###  initializeNewModel

▸ **initializeNewModel**(): `void`

*Inherited from [IModel](imodel.md).[initializeNewModel](imodel.md#initializenewmodel)*

*Defined in [Model/IModel.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L32)*

**Returns:** `void`

___
<a id="markfordestruction"></a>

###  markForDestruction

▸ **markForDestruction**(): `void`

*Inherited from [IModel](imodel.md).[markForDestruction](imodel.md#markfordestruction)*

*Defined in [Model/IModel.ts:33](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L33)*

**Returns:** `void`

___
<a id="parsefieldvalue"></a>

###  parseFieldValue

▸ **parseFieldValue**(fieldName: *`string`*, value: *`any`*): `any`

*Inherited from [IModel](imodel.md).[parseFieldValue](imodel.md#parsefieldvalue)*

*Defined in [Model/IModel.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L34)*

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

*Inherited from [IModel](imodel.md).[reset](imodel.md#reset)*

*Defined in [Model/IModel.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L28)*

**Returns:** `void`

___
<a id="save"></a>

###  save

▸ **save**(): `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

*Inherited from [IModel](imodel.md).[save](imodel.md#save)*

*Defined in [Model/IModel.ts:23](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L23)*

**Returns:** `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

___
<a id="savemodel"></a>

###  saveModel

▸ **saveModel**(): `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

*Inherited from [IModel](imodel.md).[saveModel](imodel.md#savemodel)*

*Defined in [Model/IModel.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L24)*

**Returns:** `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

___
<a id="saverelatedmodels"></a>

###  saveRelatedModels

▸ **saveRelatedModels**(): `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>[]>

*Inherited from [IModel](imodel.md).[saveRelatedModels](imodel.md#saverelatedmodels)*

*Defined in [Model/IModel.ts:25](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L25)*

**Returns:** `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>[]>

___
<a id="setfield"></a>

###  setField

▸ **setField**(fieldName: *`any`*, value: *`any`*): `void`

*Inherited from [IAttrs](iattrs.md).[setField](iattrs.md#setfield)*

*Defined in [Model/Decorators/Attr.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Attr.ts#L13)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldName | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="setrelated"></a>

###  setRelated

▸ **setRelated**(key: *`any`*, value: *`any`*): `void`

*Inherited from [IRelationship](irelationship.md).[setRelated](irelationship.md#setrelated)*

*Defined in [Model/Decorators/Relationship.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Relationship.ts#L32)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="unload"></a>

###  unload

▸ **unload**(): `void`

*Inherited from [IModel](imodel.md).[unload](imodel.md#unload)*

*Defined in [Model/IModel.ts:29](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L29)*

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(): [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

*Inherited from [IModel](imodel.md).[validate](imodel.md#validate)*

*Overrides [IValidate](ivalidate.md).[validate](ivalidate.md#validate)*

*Defined in [Model/IModel.ts:26](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L26)*

**Returns:** [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

___
<a id="validatefield"></a>

###  validateField

▸ **validateField**(fieldName: *`string`*): [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

*Inherited from [IModel](imodel.md).[validateField](imodel.md#validatefield)*

*Defined in [Model/IModel.ts:27](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/IModel.ts#L27)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldName | `string` |

**Returns:** [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

___

