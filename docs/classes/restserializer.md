[redux-data-service](../README.md) > [RestSerializer](../classes/restserializer.md)

# Class: RestSerializer

An ISerializer implementation which will convert a given Model to or from JSON.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
#### R 
## Hierarchy

**RestSerializer**

## Implements

* [ISerializer](../interfaces/iserializer.md)<`string`, `R`>

## Index

### Methods

* [deserialize](restserializer.md#deserialize)
* [serialize](restserializer.md#serialize)
* [serializeQueryParams](restserializer.md#serializequeryparams)

---

## Methods

<a id="deserialize"></a>

###  deserialize

▸ **deserialize**(data: *`any`*): `Promise`<`R`>

*Defined in [Serializers/RestSerializer.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Serializers/RestSerializer.ts#L28)*

Converts the given JSON string into an IModel.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `any` |  \- |

**Returns:** `Promise`<`R`>

___
<a id="serialize"></a>

###  serialize

▸ **serialize**(model: * [IModel](../interfaces/imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`string`>

*Defined in [Serializers/RestSerializer.ts:16](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Serializers/RestSerializer.ts#L16)*

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

*Defined in [Serializers/RestSerializer.ts:38](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Serializers/RestSerializer.ts#L38)*

Converts the given IQueryParams object into a url-encoded string.

**Parameters:**

**__namedParameters: `object`**

| Name | Type | Description |
| ------ | ------ | ------ |
| params | [params]() |  \- |
| sort | [ISort](../interfaces/isort.md)[] |

**Returns:** `Promise`<`string`>

___

