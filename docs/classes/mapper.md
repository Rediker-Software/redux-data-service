[redux-data-service](../README.md) > [Mapper](../classes/mapper.md)

# Class: Mapper

This class implements the `transform` and `normalize` methods on the IMapper interface, to provide a default mechanism to transform a model instance into a ready-to-serialize object, and to normalize a raw data object back into a model instance. Any nested relationships will be side-loaded by dispatching an action to the related service.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
#### R 
## Hierarchy

**Mapper**

## Implements

* [IMapper](../interfaces/imapper.md)<`T`, `R`>

## Index

### Constructors

* [constructor](mapper.md#constructor)

### Properties

* [ModelClass](mapper.md#modelclass)

### Accessors

* [fields](mapper.md#fields)
* [relationships](mapper.md#relationships)

### Methods

* [isRelationship](mapper.md#isrelationship)
* [loadRelatedModel](mapper.md#loadrelatedmodel)
* [normalize](mapper.md#normalize)
* [normalizeField](mapper.md#normalizefield)
* [normalizeQueryResponse](mapper.md#normalizequeryresponse)
* [processNestedRelationship](mapper.md#processnestedrelationship)
* [transform](mapper.md#transform)
* [transformField](mapper.md#transformfield)
* [transformList](mapper.md#transformlist)
* [transformPatch](mapper.md#transformpatch)
* [transformRelatedModel](mapper.md#transformrelatedmodel)
* [transformRelationship](mapper.md#transformrelationship)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Mapper**(ModelClass: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*): [Mapper](mapper.md)

*Defined in [Mapper/Mapper.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ModelClass | [IModelFactory](../interfaces/imodelfactory.md)<`T`> |

**Returns:** [Mapper](mapper.md)

___

## Properties

<a id="modelclass"></a>

###  ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*

*Defined in [Mapper/Mapper.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L20)*

___

## Accessors

<a id="fields"></a>

###  fields

getfields(): `any`

*Defined in [Mapper/Mapper.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L30)*

**Returns:** `any`

___
<a id="relationships"></a>

###  relationships

getrelationships(): `any`

*Defined in [Mapper/Mapper.ts:26](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L26)*

**Returns:** `any`

___

## Methods

<a id="isrelationship"></a>

### `<Protected>` isRelationship

▸ **isRelationship**(key: *`any`*): `any`

*Defined in [Mapper/Mapper.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="loadrelatedmodel"></a>

### `<Protected>` loadRelatedModel

▸ **loadRelatedModel**(model: *[IModel](../interfaces/imodel.md)<`T`>*, relatedModelData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `Promise`<[IModel](../interfaces/imodel.md)<`any`>>

*Defined in [Mapper/Mapper.ts:228](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L228)*

Given the relatedModelData of a single item, normalize the data using the relationship's own mapper, converting it into a Model instance, then dispatch that related Model to its data service and return the Model.

Information about the parent model will be stored on the child model so we can look up the parent later.

**Parameters:**

| Name | Type |
| ------ | ------ |
| model | [IModel](../interfaces/imodel.md)<`T`> |
| relatedModelData | `any` |
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`any`>>

___
<a id="normalize"></a>

###  normalize

▸ **normalize**(data: *`Partial`<`R`>*): `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

*Defined in [Mapper/Mapper.ts:129](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L129)*

Creates a new IModel by normalizing the given raw data. If a nested relationship was included in the payload, it will be side-loaded.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `Partial`<`R`> |  \- |

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="normalizefield"></a>

###  normalizeField

▸ **normalizeField**(data: *`Partial`<`R`>*): `(Anonymous function)`

*Defined in [Mapper/Mapper.ts:110](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L110)*

Returns a function, which when called, converts a single field on the provided raw data into its object equivalent if the given IFieldType implements the optional "normalize" method.

That function then returns a Promise which resolves with a tuple of the field name and the normalized value.

For example, an ISO date string will be converted into a Date object when given a DateField.

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Partial`<`R`> |

**Returns:** `(Anonymous function)`

___
<a id="normalizequeryresponse"></a>

###  normalizeQueryResponse

▸ **normalizeQueryResponse**(__namedParameters: *`object`*): `Promise`< [IQueryResponse](../interfaces/iqueryresponse.md) & `object`>

*Defined in [Mapper/Mapper.ts:170](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L170)*

Supports converting a raw query response object from the API into an IQueryResponse object.

**Parameters:**

**__namedParameters: `object`**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | [data]() |  \- |
| items | `R`[] |

**Returns:** `Promise`< [IQueryResponse](../interfaces/iqueryresponse.md) & `object`>

___
<a id="processnestedrelationship"></a>

### `<Protected>` processNestedRelationship

▸ **processNestedRelationship**(model: *[IModel](../interfaces/imodel.md)<`T`>*, nestedData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `Promise`< `string` &#124; `string`[]>

*Defined in [Mapper/Mapper.ts:209](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L209)*

Process the nestedData for the given relationship.

*   If it is a BelongsTo relationship, its data is normalized into a Model instance, added to its store and its id is returned.
*   If it is a HasMany relationship, the above is done for each nested object and the ids of the models are returned.

**Parameters:**

| Name | Type |
| ------ | ------ |
| model | [IModel](../interfaces/imodel.md)<`T`> |
| nestedData | `any` |
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `Promise`< `string` &#124; `string`[]>

___
<a id="transform"></a>

###  transform

▸ **transform**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`Partial`<`R`>>

*Defined in [Mapper/Mapper.ts:72](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L72)*

Transforms the given Model into a plain javascript object based on the Model's fieldTypes. Each fieldType with `serialize = false` will be excluded.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|  \- |

**Returns:** `Promise`<`Partial`<`R`>>

___
<a id="transformfield"></a>

###  transformField

▸ **transformField**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `(Anonymous function)`

*Defined in [Mapper/Mapper.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L47)*

Returns a function, which when called, transforms the given fieldName on the provided model into its serialized equivalent if the given IFieldType implements the optional "transform" method.

That function will then return a Promise that resolves to provide a tuple of the fieldName and the value. The Promise is necessary for the rare circumstance that we need to perform the transform asynchronously.

For example, a Date object will be converted into an ISO Date string when given a DateField.

**Parameters:**

| Name | Type |
| ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `(Anonymous function)`

___
<a id="transformlist"></a>

###  transformList

▸ **transformList**(models: *[IModel](../interfaces/imodel.md)<`T`>[]*): `Promise`<`R`[]>

*Defined in [Mapper/Mapper.ts:97](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L97)*

Transforms a given list of Models into an array of items of R

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| models | [IModel](../interfaces/imodel.md)<`T`>[] |  \- |

**Returns:** `Promise`<`R`[]>

___
<a id="transformpatch"></a>

###  transformPatch

▸ **transformPatch**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`> &#124; `any`*): `Promise`<`any`>

*Defined in [Mapper/Mapper.ts:85](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L85)*

Calls transform on the model and the model.original then creates a JSON patch to update the original to the updated

**Parameters:**

| Name | Type |
| ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`> &#124; `any`|

**Returns:** `Promise`<`any`>

___
<a id="transformrelatedmodel"></a>

### `<Protected>` transformRelatedModel

▸ **transformRelatedModel**(relatedModel: *[IModel](../interfaces/imodel.md)<`any`>*): `Promise`<`object`>

*Defined in [Mapper/Mapper.ts:198](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L198)*

Transform the given relatedModel using its own mapper.

**Parameters:**

| Name | Type |
| ------ | ------ |
| relatedModel | [IModel](../interfaces/imodel.md)<`any`> |

**Returns:** `Promise`<`object`>

___
<a id="transformrelationship"></a>

### `<Protected>` transformRelationship

▸ **transformRelationship**(fieldValue: * [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `Promise`<`object`>

*Defined in [Mapper/Mapper.ts:183](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Mapper/Mapper.ts#L183)*

Transform the given model or array of models depending on the relationship type.

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldValue |  [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]|
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `Promise`<`object`>

___

