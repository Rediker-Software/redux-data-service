[redux-data-service](../README.md) > [RestSerializer](../classes/restserializer.md)

# Class: RestSerializer

An ISerializer implementation which will convert a given Model to or from JSON.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
## Hierarchy

 [BaseSerializer](baseserializer.md)<`T`, `string`>

**↳ RestSerializer**

## Implements

* [ISerializer](../interfaces/iserializer.md)<`T`, `string`>

## Index

### Constructors

* [constructor](restserializer.md#constructor)

### Properties

* [ModelClass](restserializer.md#modelclass)

### Accessors

* [fields](restserializer.md#fields)
* [relationships](restserializer.md#relationships)

### Methods

* [deserialize](restserializer.md#deserialize)
* [isRelationship](restserializer.md#isrelationship)
* [loadRelatedModel](restserializer.md#loadrelatedmodel)
* [normalize](restserializer.md#normalize)
* [normalizeField](restserializer.md#normalizefield)
* [processNestedRelationship](restserializer.md#processnestedrelationship)
* [serialize](restserializer.md#serialize)
* [transform](restserializer.md#transform)
* [transformField](restserializer.md#transformfield)
* [transformRelatedModel](restserializer.md#transformrelatedmodel)
* [transformRelationship](restserializer.md#transformrelationship)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RestSerializer**(ModelClass: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*): [RestSerializer](restserializer.md)

*Inherited from [BaseSerializer](baseserializer.md).[constructor](baseserializer.md#constructor)*

*Defined in [Serializers/BaseSerializer.ts:25](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L25)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| ModelClass | [IModelFactory](../interfaces/imodelfactory.md)<`T`> |

**Returns:** [RestSerializer](restserializer.md)

___

## Properties

<a id="modelclass"></a>

###  ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*

*Inherited from [BaseSerializer](baseserializer.md).[ModelClass](baseserializer.md#modelclass)*

*Defined in [Serializers/BaseSerializer.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L21)*

___

## Accessors

<a id="fields"></a>

###  fields

getfields(): `any`

*Inherited from [BaseSerializer](baseserializer.md).[fields](baseserializer.md#fields)*

*Defined in [Serializers/BaseSerializer.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L35)*

**Returns:** `any`

___
<a id="relationships"></a>

###  relationships

getrelationships(): `any`

*Inherited from [BaseSerializer](baseserializer.md).[relationships](baseserializer.md#relationships)*

*Defined in [Serializers/BaseSerializer.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L31)*

**Returns:** `any`

___

## Methods

<a id="deserialize"></a>

###  deserialize

▸ **deserialize**(data: *`any`*): [IModel](../interfaces/imodel.md)<`T`>

*Overrides [BaseSerializer](baseserializer.md).[deserialize](baseserializer.md#deserialize)*

*Defined in [Serializers/RestSerializer.ts:27](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/RestSerializer.ts#L27)*

Converts the given JSON string into an IModel.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any` |  - |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="isrelationship"></a>

### `<Protected>` isRelationship

▸ **isRelationship**(key: *`any`*): `any`

*Inherited from [BaseSerializer](baseserializer.md).[isRelationship](baseserializer.md#isrelationship)*

*Defined in [Serializers/BaseSerializer.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L39)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="loadrelatedmodel"></a>

### `<Protected>` loadRelatedModel

▸ **loadRelatedModel**(model: *[IModel](../interfaces/imodel.md)<`T`>*, relatedModelData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): [IModel](../interfaces/imodel.md)<`any`>

*Inherited from [BaseSerializer](baseserializer.md).[loadRelatedModel](baseserializer.md#loadrelatedmodel)*

*Defined in [Serializers/BaseSerializer.ts:180](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L180)*

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

*Inherited from [BaseSerializer](baseserializer.md).[normalize](baseserializer.md#normalize)*

*Defined in [Serializers/BaseSerializer.ts:108](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L108)*

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

*Inherited from [BaseSerializer](baseserializer.md).[normalizeField](baseserializer.md#normalizefield)*

*Defined in [Serializers/BaseSerializer.ts:81](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L81)*

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

*Inherited from [BaseSerializer](baseserializer.md).[processNestedRelationship](baseserializer.md#processnestedrelationship)*

*Defined in [Serializers/BaseSerializer.ts:166](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L166)*

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

###  serialize

▸ **serialize**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `string`

*Overrides [BaseSerializer](baseserializer.md).[serialize](baseserializer.md#serialize)*

*Defined in [Serializers/RestSerializer.ts:15](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/RestSerializer.ts#L15)*

Converts the given IModel into a JSON string.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|  - |

**Returns:** `string`

___
<a id="transform"></a>

###  transform

▸ **transform**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Partial`<`T`>

*Inherited from [BaseSerializer](baseserializer.md).[transform](baseserializer.md#transform)*

*Defined in [Serializers/BaseSerializer.ts:94](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L94)*

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

*Inherited from [BaseSerializer](baseserializer.md).[transformField](baseserializer.md#transformfield)*

*Defined in [Serializers/BaseSerializer.ts:52](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L52)*

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

*Inherited from [BaseSerializer](baseserializer.md).[transformRelatedModel](baseserializer.md#transformrelatedmodel)*

*Defined in [Serializers/BaseSerializer.ts:155](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L155)*

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

*Inherited from [BaseSerializer](baseserializer.md).[transformRelationship](baseserializer.md#transformrelationship)*

*Defined in [Serializers/BaseSerializer.ts:141](https://github.com/Rediker-Software/redux-data-service/blob/69d850d/src/Serializers/BaseSerializer.ts#L141)*

Transform the given model or array of models depending on the relationship type.

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldValue |  [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]|
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `object`

___

