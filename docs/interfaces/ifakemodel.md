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

* [changes](ifakemodel.md#changes)
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
* [parentIdFieldName](ifakemodel.md#parentidfieldname)
* [parentModel](ifakemodel.md#parentmodel)
* [parentModelId](ifakemodel.md#parentmodelid)
* [parentServiceName](ifakemodel.md#parentservicename)
* [relationships](ifakemodel.md#relationships)
* [serializeThroughParent](ifakemodel.md#serializethroughparent)
* [serviceName](ifakemodel.md#servicename)
* [validationRules](ifakemodel.md#validationrules)

### Methods

* [applyUpdates](ifakemodel.md#applyupdates)
* [forceReload](ifakemodel.md#forcereload)
* [getField](ifakemodel.md#getfield)
* [getFieldError](ifakemodel.md#getfielderror)
* [getRelated](ifakemodel.md#getrelated)
* [getServiceForRelationship](ifakemodel.md#getserviceforrelationship)
* [initializeNewModel](ifakemodel.md#initializenewmodel)
* [isFieldDirty](ifakemodel.md#isfielddirty)
* [markForDestruction](ifakemodel.md#markfordestruction)
* [original](ifakemodel.md#original)
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

<a id="changes"></a>

### `<Optional>` changes

**● changes**: *`Partial`<[IFakeModelData](ifakemodeldata.md)>*

*Inherited from [IModelMeta](imodelmeta.md).[changes](imodelmeta.md#changes)*

*Defined in [Model/IModel.ts:23](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L23)*

___
<a id="datedeleted"></a>

###  dateDeleted

**● dateDeleted**: *`Date`*

*Inherited from [IModelData](imodeldata.md).[dateDeleted](imodeldata.md#datedeleted)*

*Overrides [IModelData](imodeldata.md).[dateDeleted](imodeldata.md#datedeleted)*

*Defined in [Model/IModel.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L10)*

___
<a id="dateupdated"></a>

###  dateUpdated

**● dateUpdated**: *`Date`*

*Inherited from [IModelData](imodeldata.md).[dateUpdated](imodeldata.md#dateupdated)*

*Overrides [IModelData](imodeldata.md).[dateUpdated](imodeldata.md#dateupdated)*

*Defined in [Model/IModel.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L9)*

___
<a id="errors"></a>

###  errors

**● errors**: *[IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>*

*Inherited from [IModelMeta](imodelmeta.md).[errors](imodelmeta.md#errors)*

*Defined in [Model/IModel.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L24)*

___
<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)<`T`, [IFieldType](ifieldtype.md)>*

*Inherited from [IAttrs](iattrs.md).[fields](iattrs.md#fields)*

*Overrides [IFieldTypes](ifieldtypes.md).[fields](ifieldtypes.md#fields)*

*Defined in [Model/Decorators/Attr.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Decorators/Attr.ts#L11)*

___
<a id="fulltext"></a>

###  fullText

**● fullText**: *`string`*

*Inherited from [IFakeModelData](ifakemodeldata.md).[fullText](ifakemodeldata.md#fulltext)*

*Defined in [Model/Model.mock.ts:26](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Model.mock.ts#L26)*

___
<a id="hasunsavedchanges"></a>

###  hasUnsavedChanges

**● hasUnsavedChanges**: *`boolean`*

*Inherited from [IModel](imodel.md).[hasUnsavedChanges](imodel.md#hasunsavedchanges)*

*Defined in [Model/IModel.ts:29](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L29)*

___
<a id="id"></a>

###  id

**● id**: *`string`*

*Inherited from [IModelData](imodeldata.md).[id](imodeldata.md#id)*

*Overrides [IModelData](imodeldata.md).[id](imodeldata.md#id)*

*Defined in [Model/IModel.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L8)*

___
<a id="isdirty"></a>

###  isDirty

**● isDirty**: *`boolean`*

*Inherited from [IModel](imodel.md).[isDirty](imodel.md#isdirty)*

*Defined in [Model/IModel.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L28)*

___
<a id="isloading"></a>

###  isLoading

**● isLoading**: *`boolean`*

*Inherited from [IModelMeta](imodelmeta.md).[isLoading](imodelmeta.md#isloading)*

*Defined in [Model/IModel.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L22)*

___
<a id="isnew"></a>

###  isNew

**● isNew**: *`boolean`*

*Inherited from [IModel](imodel.md).[isNew](imodel.md#isnew)*

*Defined in [Model/IModel.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L30)*

___
<a id="isshadow"></a>

###  isShadow

**● isShadow**: *`boolean`*

*Inherited from [IModelMeta](imodelmeta.md).[isShadow](imodelmeta.md#isshadow)*

*Defined in [Model/IModel.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L21)*

___
<a id="parentidfieldname"></a>

### `<Optional>` parentIdFieldName

**● parentIdFieldName**: *`string`*

*Inherited from [IModelData](imodeldata.md).[parentIdFieldName](imodeldata.md#parentidfieldname)*

*Overrides [IModelData](imodeldata.md).[parentIdFieldName](imodeldata.md#parentidfieldname)*

*Defined in [Model/IModel.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L12)*

___
<a id="parentmodel"></a>

###  parentModel

**● parentModel**: *[IModel](imodel.md)<`any`>*

*Inherited from [IModel](imodel.md).[parentModel](imodel.md#parentmodel)*

*Defined in [Model/IModel.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L32)*

___
<a id="parentmodelid"></a>

### `<Optional>` parentModelId

**● parentModelId**: *`string`*

*Inherited from [IModel](imodel.md).[parentModelId](imodel.md#parentmodelid)*

*Defined in [Model/IModel.ts:33](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L33)*

___
<a id="parentservicename"></a>

### `<Optional>` parentServiceName

**● parentServiceName**: *`string`*

*Inherited from [IModelData](imodeldata.md).[parentServiceName](imodeldata.md#parentservicename)*

*Overrides [IModelData](imodeldata.md).[parentServiceName](imodeldata.md#parentservicename)*

*Defined in [Model/IModel.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L11)*

___
<a id="relationships"></a>

###  relationships

**● relationships**: *`object`*

*Inherited from [IRelationship](irelationship.md).[relationships](irelationship.md#relationships)*

*Defined in [Model/Decorators/Relationship.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Decorators/Relationship.ts#L44)*

#### Type declaration

[key: `string`]: [IFieldRelationship](ifieldrelationship.md)

___
<a id="serializethroughparent"></a>

### `<Optional>` serializeThroughParent

**● serializeThroughParent**: *`boolean`*

*Inherited from [IModelData](imodeldata.md).[serializeThroughParent](imodeldata.md#serializethroughparent)*

*Overrides [IModelData](imodeldata.md).[serializeThroughParent](imodeldata.md#serializethroughparent)*

*Defined in [Model/IModel.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L13)*

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Inherited from [IModel](imodel.md).[serviceName](imodel.md#servicename)*

*Defined in [Model/IModel.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L31)*

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<`T`>*

*Inherited from [IValidate](ivalidate.md).[validationRules](ivalidate.md#validationrules)*

*Defined in [Model/Decorators/Validation.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Decorators/Validation.ts#L6)*

___

## Methods

<a id="applyupdates"></a>

###  applyUpdates

▸ **applyUpdates**(changes?: *`Partial`<[IFakeModelData](ifakemodeldata.md)>*, meta?: *`Partial`<[IModelMeta](imodelmeta.md)<[IFakeModelData](ifakemodeldata.md)>>*, relationships?: *`any`*): [IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>

*Inherited from [IModel](imodel.md).[applyUpdates](imodel.md#applyupdates)*

*Defined in [Model/IModel.ts:42](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L42)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` changes | `Partial`<[IFakeModelData](ifakemodeldata.md)> |
| `Optional` meta | `Partial`<[IModelMeta](imodelmeta.md)<[IFakeModelData](ifakemodeldata.md)>> |
| `Optional` relationships | `any` |

**Returns:** [IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>

___
<a id="forcereload"></a>

###  forceReload

▸ **forceReload**(): `void`

*Inherited from [IModel](imodel.md).[forceReload](imodel.md#forcereload)*

*Defined in [Model/IModel.ts:41](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L41)*

**Returns:** `void`

___
<a id="getfield"></a>

###  getField

▸ **getField**(fieldName: *`any`*, defaultValue: *`any`*): `any`

*Inherited from [IAttrs](iattrs.md).[getField](iattrs.md#getfield)*

*Defined in [Model/Decorators/Attr.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Decorators/Attr.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `any` |
| defaultValue | `any` |

**Returns:** `any`

___
<a id="getfielderror"></a>

###  getFieldError

▸ **getFieldError**(fieldName: *`string`*):  `string` &#124; `undefined`

*Inherited from [IModel](imodel.md).[getFieldError](imodel.md#getfielderror)*

*Defined in [Model/IModel.ts:48](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `string` |

**Returns:**  `string` &#124; `undefined`

___
<a id="getrelated"></a>

###  getRelated

▸ **getRelated**(key: *`any`*): `any`

*Inherited from [IRelationship](irelationship.md).[getRelated](irelationship.md#getrelated)*

*Defined in [Model/Decorators/Relationship.ts:46](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Decorators/Relationship.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="getserviceforrelationship"></a>

###  getServiceForRelationship

▸ **getServiceForRelationship**(relationshipKey: *`string`*): [DataService](../classes/dataservice.md)<`any`>

*Inherited from [IModel](imodel.md).[getServiceForRelationship](imodel.md#getserviceforrelationship)*

*Defined in [Model/IModel.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| relationshipKey | `string` |

**Returns:** [DataService](../classes/dataservice.md)<`any`>

___
<a id="initializenewmodel"></a>

###  initializeNewModel

▸ **initializeNewModel**(): `void`

*Inherited from [IModel](imodel.md).[initializeNewModel](imodel.md#initializenewmodel)*

*Defined in [Model/IModel.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L43)*

**Returns:** `void`

___
<a id="isfielddirty"></a>

###  isFieldDirty

▸ **isFieldDirty**(fieldName: * `keyof IFakeModelData` &#124; `string`*): `boolean`

*Inherited from [IModel](imodel.md).[isFieldDirty](imodel.md#isfielddirty)*

*Defined in [Model/IModel.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName |  `keyof IFakeModelData` &#124; `string`|

**Returns:** `boolean`

___
<a id="markfordestruction"></a>

###  markForDestruction

▸ **markForDestruction**(): `void`

*Inherited from [IModel](imodel.md).[markForDestruction](imodel.md#markfordestruction)*

*Defined in [Model/IModel.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L45)*

**Returns:** `void`

___
<a id="original"></a>

###  original

▸ **original**(): `this`

*Inherited from [IModel](imodel.md).[original](imodel.md#original)*

*Defined in [Model/IModel.ts:49](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L49)*

**Returns:** `this`

___
<a id="parsefieldvalue"></a>

###  parseFieldValue

▸ **parseFieldValue**(fieldName: *`string`*, value: *`any`*): `Promise`<`any`>

*Inherited from [IModel](imodel.md).[parseFieldValue](imodel.md#parsefieldvalue)*

*Defined in [Model/IModel.ts:46](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L46)*

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

*Inherited from [IModel](imodel.md).[reset](imodel.md#reset)*

*Defined in [Model/IModel.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L39)*

**Returns:** `void`

___
<a id="save"></a>

###  save

▸ **save**(): `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

*Inherited from [IModel](imodel.md).[save](imodel.md#save)*

*Defined in [Model/IModel.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L34)*

**Returns:** `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

___
<a id="savemodel"></a>

###  saveModel

▸ **saveModel**(): `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

*Inherited from [IModel](imodel.md).[saveModel](imodel.md#savemodel)*

*Defined in [Model/IModel.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L35)*

**Returns:** `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>>

___
<a id="saverelatedmodels"></a>

###  saveRelatedModels

▸ **saveRelatedModels**(): `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>[]>

*Inherited from [IModel](imodel.md).[saveRelatedModels](imodel.md#saverelatedmodels)*

*Defined in [Model/IModel.ts:36](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L36)*

**Returns:** `Promise`<[IModel](imodel.md)<[IFakeModelData](ifakemodeldata.md)>[]>

___
<a id="setfield"></a>

###  setField

▸ **setField**(fieldName: *`any`*, value: *`any`*): `void`

*Inherited from [IAttrs](iattrs.md).[setField](iattrs.md#setfield)*

*Defined in [Model/Decorators/Attr.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Decorators/Attr.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="setrelated"></a>

###  setRelated

▸ **setRelated**(key: *`any`*, value: *`any`*): `void`

*Inherited from [IRelationship](irelationship.md).[setRelated](irelationship.md#setrelated)*

*Defined in [Model/Decorators/Relationship.ts:48](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/Decorators/Relationship.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="unload"></a>

###  unload

▸ **unload**(): `void`

*Inherited from [IModel](imodel.md).[unload](imodel.md#unload)*

*Defined in [Model/IModel.ts:40](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L40)*

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(): [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

*Inherited from [IModel](imodel.md).[validate](imodel.md#validate)*

*Overrides [IValidate](ivalidate.md).[validate](ivalidate.md#validate)*

*Defined in [Model/IModel.ts:37](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L37)*

**Returns:** [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

___
<a id="validatefield"></a>

###  validateField

▸ **validateField**(fieldName: *`string`*): [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

*Inherited from [IModel](imodel.md).[validateField](imodel.md#validatefield)*

*Defined in [Model/IModel.ts:38](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Model/IModel.ts#L38)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `string` |

**Returns:** [IModelKeys](../#imodelkeys)<[IFakeModelData](ifakemodeldata.md)>

___

