[redux-data-service](../README.md) > [BaseSerializer](../classes/baseserializer.md)

# Class: BaseSerializer

The base class from which implementations of `IDataSerializer` should extend.

This class implements the `transform` and `normalize` methods on the interface, to provide a default mechanism to transform a model instance into a ready-to-serialize object, and to normalize a raw data object back into a model instance. Any nested relationships will be side-loaded by dispatching an action to the related service.

## Type parameters
#### S 
#### T :  [IModelData](../interfaces/imodeldata.md)
#### R 
## Hierarchy

**BaseSerializer**

↳  [MockSerializer](mockserializer.md)

↳  [RestSerializer](restserializer.md)

↳  [MemorySerializer](memoryserializer.md)

## Implements

* [ISerializer](../interfaces/iserializer.md)<`S`, `T`, `R`>

## Index

### Constructors

* [constructor](baseserializer.md#constructor)

### Properties

* [ModelClass](baseserializer.md#modelclass)

### Accessors

* [fields](baseserializer.md#fields)
* [relationships](baseserializer.md#relationships)

### Methods

* [deserialize](baseserializer.md#deserialize)
* [isRelationship](baseserializer.md#isrelationship)
* [loadRelatedModel](baseserializer.md#loadrelatedmodel)
* [normalize](baseserializer.md#normalize)
* [normalizeField](baseserializer.md#normalizefield)
* [processNestedRelationship](baseserializer.md#processnestedrelationship)
* [serialize](baseserializer.md#serialize)
* [transform](baseserializer.md#transform)
* [transformField](baseserializer.md#transformfield)
* [transformRelatedModel](baseserializer.md#transformrelatedmodel)
* [transformRelationship](baseserializer.md#transformrelationship)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new BaseSerializer**(ModelClass: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*): [BaseSerializer](baseserializer.md)

*Defined in [Serializers/BaseSerializer.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ModelClass | [IModelFactory](../interfaces/imodelfactory.md)<`T`> |

**Returns:** [BaseSerializer](baseserializer.md)

___

## Properties

<a id="modelclass"></a>

###  ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*

*Defined in [Serializers/BaseSerializer.ts:19](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L19)*

___

## Accessors

<a id="fields"></a>

###  fields

getfields(): `any`

*Defined in [Serializers/BaseSerializer.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L32)*

**Returns:** `any`

___
<a id="relationships"></a>

###  relationships

getrelationships(): `any`

*Defined in [Serializers/BaseSerializer.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L28)*

**Returns:** `any`

___

## Methods

<a id="deserialize"></a>

### `<Abstract>` deserialize

▸ **deserialize**(data: *`R`*): `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

*Defined in [Serializers/BaseSerializer.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `R` |

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="isrelationship"></a>

### `<Protected>` isRelationship

▸ **isRelationship**(key: *`any`*): `any`

*Defined in [Serializers/BaseSerializer.ts:36](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="loadrelatedmodel"></a>

### `<Protected>` loadRelatedModel

▸ **loadRelatedModel**(model: *[IModel](../interfaces/imodel.md)<`T`>*, relatedModelData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `Promise`<[IModel](../interfaces/imodel.md)<`any`>>

*Defined in [Serializers/BaseSerializer.ts:194](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L194)*

Given the relatedModelData of a single item, normalize the data using the relationship's own serializer, converting it into a Model instance, then dispatch that related Model to its data service and return the Model.

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

*Defined in [Serializers/BaseSerializer.ts:113](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L113)*

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

*Defined in [Serializers/BaseSerializer.ts:75](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L75)*

Returns a function, which when called, converts a single field on the provided raw data into its object equivalent if the given IFieldType implements the optional "normalize" method.

That function then returns a Promise which resolves with a tuple of the field name and the normalized value.

For example, an ISO date string will be converted into a Date object when given a DateField.

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Partial`<`R`> |

**Returns:** `(Anonymous function)`

___
<a id="processnestedrelationship"></a>

### `<Protected>` processNestedRelationship

▸ **processNestedRelationship**(model: *[IModel](../interfaces/imodel.md)<`T`>*, nestedData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `Promise`< `string` &#124; `string`[]>

*Defined in [Serializers/BaseSerializer.ts:177](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L177)*

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
<a id="serialize"></a>

### `<Abstract>` serialize

▸ **serialize**(modelData: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`S`>

*Defined in [Serializers/BaseSerializer.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| modelData |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `Promise`<`S`>

___
<a id="transform"></a>

###  transform

▸ **transform**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`Partial`<`R`>>

*Defined in [Serializers/BaseSerializer.ts:94](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L94)*

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

*Defined in [Serializers/BaseSerializer.ts:49](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L49)*

Returns a function, which when called, transforms the given fieldName on the provided model into its serialized equivalent if the given IFieldType implements the optional "transform" method.

That function will then return a Promise that resolves to provide a tuple of the fieldName and the value. The Promise is necessary for the rare circumstance that we need to perform the transform asynchronously.

For example, a Date object will be converted into an ISO Date string when given a DateField.

**Parameters:**

| Name | Type |
| ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `(Anonymous function)`

___
<a id="transformrelatedmodel"></a>

### `<Protected>` transformRelatedModel

▸ **transformRelatedModel**(relatedModel: *[IModel](../interfaces/imodel.md)<`any`>*): `Promise`<`object`>

*Defined in [Serializers/BaseSerializer.ts:166](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L166)*

Transform the given relatedModel using its own serializer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| relatedModel | [IModel](../interfaces/imodel.md)<`any`> |

**Returns:** `Promise`<`object`>

___
<a id="transformrelationship"></a>

### `<Protected>` transformRelationship

▸ **transformRelationship**(fieldValue: * [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `Promise`<`object`>

*Defined in [Serializers/BaseSerializer.ts:151](https://github.com/Rediker-Software/redux-data-service/blob/5a6fe9c/src/Serializers/BaseSerializer.ts#L151)*

Transform the given model or array of models depending on the relationship type.

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldValue |  [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]|
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `Promise`<`object`>

___

