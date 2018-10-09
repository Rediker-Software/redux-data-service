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

*Defined in [Serializers/BaseSerializer.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L21)*

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

*Defined in [Serializers/BaseSerializer.ts:18](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L18)*

___

## Accessors

<a id="fields"></a>

###  fields

getfields(): `any`

*Defined in [Serializers/BaseSerializer.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L31)*

**Returns:** `any`

___
<a id="relationships"></a>

###  relationships

getrelationships(): `any`

*Defined in [Serializers/BaseSerializer.ts:27](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L27)*

**Returns:** `any`

___

## Methods

<a id="deserialize"></a>

### `<Abstract>` deserialize

▸ **deserialize**(data: *`R`*): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Serializers/BaseSerializer.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L20)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| data | `R` |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="isrelationship"></a>

### `<Protected>` isRelationship

▸ **isRelationship**(key: *`any`*): `any`

*Defined in [Serializers/BaseSerializer.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L35)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="loadrelatedmodel"></a>

### `<Protected>` loadRelatedModel

▸ **loadRelatedModel**(model: *[IModel](../interfaces/imodel.md)<`T`>*, relatedModelData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): [IModel](../interfaces/imodel.md)<`any`>

*Defined in [Serializers/BaseSerializer.ts:176](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L176)*

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

▸ **normalize**(data: *`Partial`<`R`>*): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Serializers/BaseSerializer.ts:104](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L104)*

Creates a new IModel by normalizing the given raw data. If a nested relationship was included in the payload, it will be side-loaded.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `Partial`<`R`> |  - |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="normalizefield"></a>

###  normalizeField

▸ **normalizeField**(data: *`Partial`<`R`>*): `(Anonymous function)`

*Defined in [Serializers/BaseSerializer.ts:77](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L77)*

Returns a function, which when called, converts a single field on the provided raw data into its object equivalent if the given IFieldType implements the optional "normalize" method.

For example, an ISO date string will be converted into a Date object when given a DateField.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `Partial`<`R`> |  - |

**Returns:** `(Anonymous function)`

___
<a id="processnestedrelationship"></a>

### `<Protected>` processNestedRelationship

▸ **processNestedRelationship**(model: *[IModel](../interfaces/imodel.md)<`T`>*, nestedData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*):  `string` &#124; `string`[]

*Defined in [Serializers/BaseSerializer.ts:162](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L162)*

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

▸ **serialize**(modelData: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `S`

*Defined in [Serializers/BaseSerializer.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L21)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| modelData |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `S`

___
<a id="transform"></a>

###  transform

▸ **transform**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Partial`<`R`>

*Defined in [Serializers/BaseSerializer.ts:90](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L90)*

Transforms the given Model into a plain javascript object based on the Model's fieldTypes. Relationships and any fields identified in this class's `excludedFields` array will be excluded.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|  - |

**Returns:** `Partial`<`R`>

___
<a id="transformfield"></a>

###  transformField

▸ **transformField**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `(Anonymous function)`

*Defined in [Serializers/BaseSerializer.ts:48](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L48)*

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

*Defined in [Serializers/BaseSerializer.ts:151](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L151)*

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

*Defined in [Serializers/BaseSerializer.ts:137](https://github.com/Rediker-Software/redux-data-service/blob/fbab6d2/src/Serializers/BaseSerializer.ts#L137)*

Transform the given model or array of models depending on the relationship type.

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldValue |  [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]|
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `object`

___

