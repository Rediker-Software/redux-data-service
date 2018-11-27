[redux-data-service](../README.md) > [RestSerializer](../classes/restserializer.md)

# Class: RestSerializer

An ISerializer implementation which will convert a given Model to or from JSON.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
#### R 
## Hierarchy

 [BaseSerializer](baseserializer.md)<`string`, `T`, `R`>

**↳ RestSerializer**

## Implements

* [ISerializer](../interfaces/iserializer.md)<`string`, `T`, `R`>

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
* [serializeQueryParams](restserializer.md#serializequeryparams)
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

*Defined in [Serializers/BaseSerializer.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ModelClass | [IModelFactory](../interfaces/imodelfactory.md)<`T`> |

**Returns:** [RestSerializer](restserializer.md)

___

## Properties

<a id="modelclass"></a>

###  ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*

*Inherited from [BaseSerializer](baseserializer.md).[ModelClass](baseserializer.md#modelclass)*

*Defined in [Serializers/BaseSerializer.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L20)*

___

## Accessors

<a id="fields"></a>

###  fields

getfields(): `any`

*Inherited from [BaseSerializer](baseserializer.md).[fields](baseserializer.md#fields)*

*Defined in [Serializers/BaseSerializer.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L34)*

**Returns:** `any`

___
<a id="relationships"></a>

###  relationships

getrelationships(): `any`

*Inherited from [BaseSerializer](baseserializer.md).[relationships](baseserializer.md#relationships)*

*Defined in [Serializers/BaseSerializer.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L30)*

**Returns:** `any`

___

## Methods

<a id="deserialize"></a>

###  deserialize

▸ **deserialize**(data: *`any`*): `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

*Overrides [BaseSerializer](baseserializer.md).[deserialize](baseserializer.md#deserialize)*

*Defined in [Serializers/RestSerializer.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/RestSerializer.ts#L28)*

Converts the given JSON string into an IModel.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `any` |  \- |

**Returns:** `Promise`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="isrelationship"></a>

### `<Protected>` isRelationship

▸ **isRelationship**(key: *`any`*): `any`

*Inherited from [BaseSerializer](baseserializer.md).[isRelationship](baseserializer.md#isrelationship)*

*Defined in [Serializers/BaseSerializer.ts:38](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L38)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="loadrelatedmodel"></a>

### `<Protected>` loadRelatedModel

▸ **loadRelatedModel**(model: *[IModel](../interfaces/imodel.md)<`T`>*, relatedModelData: *`any`*, relationship: *[IFieldRelationship](../interfaces/ifieldrelationship.md)*): `Promise`<[IModel](../interfaces/imodel.md)<`any`>>

*Inherited from [BaseSerializer](baseserializer.md).[loadRelatedModel](baseserializer.md#loadrelatedmodel)*

*Defined in [Serializers/BaseSerializer.ts:196](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L196)*

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

*Inherited from [BaseSerializer](baseserializer.md).[normalize](baseserializer.md#normalize)*

*Defined in [Serializers/BaseSerializer.ts:115](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L115)*

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

*Inherited from [BaseSerializer](baseserializer.md).[normalizeField](baseserializer.md#normalizefield)*

*Defined in [Serializers/BaseSerializer.ts:77](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L77)*

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

*Inherited from [BaseSerializer](baseserializer.md).[processNestedRelationship](baseserializer.md#processnestedrelationship)*

*Defined in [Serializers/BaseSerializer.ts:179](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L179)*

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

###  serialize

▸ **serialize**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`string`>

*Overrides [BaseSerializer](baseserializer.md).[serialize](baseserializer.md#serialize)*

*Defined in [Serializers/RestSerializer.ts:16](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/RestSerializer.ts#L16)*

Converts the given IModel into a JSON string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| model |  [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>|  \- |

**Returns:** `Promise`<`string`>

___
<a id="serializequeryparams"></a>

###  serializeQueryParams

▸ **serializeQueryParams**(__namedParameters: *`object`*): `Promise`<`string`>

*Overrides [BaseSerializer](baseserializer.md).[serializeQueryParams](baseserializer.md#serializequeryparams)*

*Defined in [Serializers/RestSerializer.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/RestSerializer.ts#L39)*

Converts the given IQueryParams object into a url-encoded string.

**Parameters:**

**__namedParameters: `object`**

| Name | Type | Description |
| ------ | ------ | ------ |
| params | [params]() |  \- |
| sort | [ISort](../interfaces/isort.md)[] |

**Returns:** `Promise`<`string`>

___
<a id="transform"></a>

###  transform

▸ **transform**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`Partial`<`R`>>

*Inherited from [BaseSerializer](baseserializer.md).[transform](baseserializer.md#transform)*

*Defined in [Serializers/BaseSerializer.ts:96](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L96)*

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

*Inherited from [BaseSerializer](baseserializer.md).[transformField](baseserializer.md#transformfield)*

*Defined in [Serializers/BaseSerializer.ts:51](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L51)*

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

*Inherited from [BaseSerializer](baseserializer.md).[transformRelatedModel](baseserializer.md#transformrelatedmodel)*

*Defined in [Serializers/BaseSerializer.ts:168](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L168)*

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

*Inherited from [BaseSerializer](baseserializer.md).[transformRelationship](baseserializer.md#transformrelationship)*

*Defined in [Serializers/BaseSerializer.ts:153](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/BaseSerializer.ts#L153)*

Transform the given model or array of models depending on the relationship type.

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldValue |  [IModel](../interfaces/imodel.md)<`any`> &#124; [IModel](../interfaces/imodel.md)<`any`>[]|
| relationship | [IFieldRelationship](../interfaces/ifieldrelationship.md) |

**Returns:** `Promise`<`object`>

___

