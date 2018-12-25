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

*Defined in [Serializers/RestSerializer.ts:29](https://github.com/Rediker-Software/redux-data-service/blob/334b326/src/Serializers/RestSerializer.ts#L29)*

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

*Defined in [Serializers/RestSerializer.ts:17](https://github.com/Rediker-Software/redux-data-service/blob/334b326/src/Serializers/RestSerializer.ts#L17)*

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

*Defined in [Serializers/RestSerializer.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/334b326/src/Serializers/RestSerializer.ts#L39)*

Converts the given IQueryParams object into a url-encoded string.

**Parameters:**

**__namedParameters: `object`**

| Name | Type | Description |
| ------ | ------ | ------ |
| params | [params]() |  \- |
| sort | [ISort](../interfaces/isort.md)[] |

**Returns:** `Promise`<`string`>

___

