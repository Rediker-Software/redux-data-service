[redux-data-service](../README.md) > [MemorySerializer](../classes/memoryserializer.md)

# Class: MemorySerializer

An in-memory ISerializer implementation for testing and local development purposes.

## Type parameters
#### T 
#### S 
## Hierarchy

**MemorySerializer**

## Implements

* [ISerializer](../interfaces/iserializer.md)<`T`, `S`>

## Index

### Methods

* [deserialize](memoryserializer.md#deserialize)
* [serialize](memoryserializer.md#serialize)
* [serializeQueryParams](memoryserializer.md#serializequeryparams)

---

## Methods

<a id="deserialize"></a>

###  deserialize

▸ **deserialize**(data: * `S` &#124; `T`*): `Promise`<`T`>

*Defined in [Serializers/MemorySerializer.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Serializers/MemorySerializer.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data |  `S` &#124; `T`|

**Returns:** `Promise`<`T`>

___
<a id="serialize"></a>

###  serialize

▸ **serialize**(model: *`T`*): `Promise`<`S`>

*Defined in [Serializers/MemorySerializer.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Serializers/MemorySerializer.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| model | `T` |

**Returns:** `Promise`<`S`>

___
<a id="serializequeryparams"></a>

###  serializeQueryParams

▸ **serializeQueryParams**(queryParams: *[IQueryParams](../interfaces/iqueryparams.md)*): [IQueryParams](../interfaces/iqueryparams.md)

*Defined in [Serializers/MemorySerializer.ts:17](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Serializers/MemorySerializer.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| queryParams | [IQueryParams](../interfaces/iqueryparams.md) |

**Returns:** [IQueryParams](../interfaces/iqueryparams.md)

___

