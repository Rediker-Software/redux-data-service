[redux-data-service](../README.md) > [RestSerializer](../classes/restserializer.md)

# Class: RestSerializer

An ISerializer implementation which will convert a given Model to or from JSON.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
## Hierarchy

**RestSerializer**

## Implements

* [ISerializer](../interfaces/iserializer.md)<`T`, `string`>

## Index

### Methods

* [deserialize](restserializer.md#deserialize)
* [serialize](restserializer.md#serialize)
* [serializeQueryParams](restserializer.md#serializequeryparams)

---

## Methods

<a id="deserialize"></a>

###  deserialize

▸ **deserialize**(data: * `T` &#124; `string`*): `Promise`<`T`>

*Defined in [Serializers/RestSerializer.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/5fcb9dc/src/Serializers/RestSerializer.ts#L21)*

Converts the given JSON string into an object.

**Parameters:**

| Name | Type |
| ------ | ------ |
| data |  `T` &#124; `string`|

**Returns:** `Promise`<`T`>

___
<a id="serialize"></a>

###  serialize

▸ **serialize**(modelData: *`Partial`<`T`>*): `Promise`<`string`>

*Defined in [Serializers/RestSerializer.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/5fcb9dc/src/Serializers/RestSerializer.ts#L14)*

Converts the given object into a JSON string.

**Parameters:**

| Name | Type |
| ------ | ------ |
| modelData | `Partial`<`T`> |

**Returns:** `Promise`<`string`>

___
<a id="serializequeryparams"></a>

###  serializeQueryParams

▸ **serializeQueryParams**(__namedParameters: *`object`*): `string`

*Defined in [Serializers/RestSerializer.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/5fcb9dc/src/Serializers/RestSerializer.ts#L30)*

Converts the given IQueryParams object into a url-encoded string.

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| params | [params]() |
| sort | [ISort](../interfaces/isort.md)[] |

**Returns:** `string`

___

