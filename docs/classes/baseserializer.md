[redux-data-service](../README.md) > [BaseSerializer](../classes/baseserializer.md)

# Class: BaseSerializer

The base class from which implementations of `IDataSerializer` should extend.

This class implements the `transform` and `normalize` methods on the interface, to provide a default mechanism to transform a model instance into a ready-to-serialize object, and to normalize a raw data object back into a model instance. Any nested relationships will be side-loaded by dispatching an action to the related service.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
#### S 
## Hierarchy

**BaseSerializer**

↳  [RestSerializer](restserializer.md)

## Implements

* [ISerializer](../interfaces/iserializer.md)<`T`, `S`>

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

*Defined in [Serializers/BaseSerializer.ts:25](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L25)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| ModelClass | [IModelFactory](../interfaces/imodelfactory.md)<`T`> |

**Returns:** [BaseSerializer](baseserializer.md)

___

## Properties

<a id="modelclass"></a>

###  ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*

*Defined in [Serializers/BaseSerializer.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L21)*

___

## Accessors

<a id="fields"></a>

###  fields

getfields(): `any`

*Defined in [Serializers/BaseSerializer.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L35)*

**Returns:** `any`

___
<a id="relationships"></a>

###  relationships

getrelationships(): `any`

*Defined in [Serializers/BaseSerializer.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L31)*

**Returns:** `any`

___

## Methods

<a id="deserialize"></a>

### `<Abstract>` deserialize

▸ **deserialize**(data: *`S`*): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Serializers/BaseSerializer.ts:23](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L23)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| data | `S` |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="isrelationship"></a>

### `<Protected>` isRelationship

▸ **isRelationship**(key: *`any`*): `any`

*Defined in [Serializers/BaseSerializer.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L39)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="loadrelatedmodel"></a>

### `<Protected>` loadRelatedModel

▸ **loadRelatedModel**(model: *[IModel](../interfaces/imodel.md)<`T`>*, relatedModelData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): [IModel](../interfaces/imodel.md)<`any`>

*Defined in [Serializers/BaseSerializer.ts:180](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L180)*

Given the relatedModelData of a single item, normalize the data using the relationship's own serializer, converting it into a Model instance, then dispatch that related Model to its data service and return the Model.

**Parameters:**

| Param | Type |
| ------ | ------ |
| model | [IModel](../interfaces/imodel.md)<`T`> |
| relatedModelData | `any` |
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** [IModel](../interfaces/imodel.md)<`any`>

___
<a id="normalize"></a>

###  normalize

▸ **normalize**(data: *`any`*): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Serializers/BaseSerializer.ts:108](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L108)*

Creates a new IModel by normalizing the given raw data. If a nested relationship was included in the payload, it will be side-loaded.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any` |  - |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="normalizefield"></a>

###  normalizeField

▸ **normalizeField**(data: *`Partial`<`T`>*): `(Anonymous function)`

*Defined in [Serializers/BaseSerializer.ts:81](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L81)*

Returns a function, which when called, converts a single field on the provided raw data into its object equivalent if the given IFieldType implements the optional "normalize" method.

For example, an ISO date string will be converted into a Date object when given a DateField.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `Partial`<`T`> |  - |

**Returns:** `(Anonymous function)`

___
<a id="processnestedrelationship"></a>

### `<Protected>` processNestedRelationship

▸ **processNestedRelationship**(model: *[IModel](../interfaces/imodel.md)<`T`>*, nestedData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*):  `string` &#124; `string`[]

*Defined in [Serializers/BaseSerializer.ts:166](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L166)*

Process the nestedData for the given relationship.

*   If it is a BelongsTo relationship, its data is normalized into a Model instance, added to its store and its id is returned.
*   If it is a HasMany relationship, the above is done for each nested object and the ids of the models are returned.

**Parameters:**

| Param | Type |
| ------ | ------ |
| model | [IModel](../interfaces/imodel.md)<`T`> |
| nestedData | `any` |
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:**  `string` &#124; `string`[]

___
<a id="serialize"></a>

### `<Abstract>` serialize

▸ **serialize**(modelData: *`Partial`<`T`>*): `S`

*Defined in [Serializers/BaseSerializer.ts:25](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L25)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| modelData | `Partial`<`T`> |

**Returns:** `S`

___
<a id="transform"></a>

###  transform

▸ **transform**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Partial`<`T`>

*Defined in [Serializers/BaseSerializer.ts:94](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L94)*

Transforms the given Model into a plain javascript object based on the Model's fieldTypes. Relationships and any fields identified in this class's `excludedFields` array will be excluded.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|  - |

**Returns:** `Partial`<`T`>

___
<a id="transformfield"></a>

###  transformField

▸ **transformField**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `(Anonymous function)`

*Defined in [Serializers/BaseSerializer.ts:52](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L52)*

Returns a function, which when called, transforms the given fieldName on the provided model into its serialized equivalent if the given IFieldType implements the optional "transform" method.

For example, a Date object will be converted into an ISO Date string when given a DateField.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|  - |

**Returns:** `(Anonymous function)`

___
<a id="transformrelatedmodel"></a>

### `<Protected>` transformRelatedModel

▸ **transformRelatedModel**(relatedModel: *[IModel](../interfaces/imodel.md)<`any`>*): `object`

*Defined in [Serializers/BaseSerializer.ts:155](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L155)*

Transform the given relatedModel using its own serializer.

**Parameters:**

| Param | Type |
| ------ | ------ |
| relatedModel | [IModel](../interfaces/imodel.md)<`any`> |

**Returns:** `object`

___
<a id="transformrelationship"></a>

### `<Protected>` transformRelationship

▸ **transformRelationship**(fieldValue: * [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `object`

*Defined in [Serializers/BaseSerializer.ts:141](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Serializers/BaseSerializer.ts#L141)*

Transform the given model or array of models depending on the relationship type.

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldValue |  [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]|
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `object`

___

