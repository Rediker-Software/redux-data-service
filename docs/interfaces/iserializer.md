[redux-data-service](../README.md) > [ISerializer](../interfaces/iserializer.md)

# Interface: ISerializer

## Type parameters
#### T 
#### S 
## Hierarchy

**ISerializer**

## Implemented by

* [MemorySerializer](../classes/memoryserializer.md)
* [MockSerializer](../classes/mockserializer.md)
* [RestSerializer](../classes/restserializer.md)

## Index

### Properties

* [deserialize](iserializer.md#deserialize)
* [serialize](iserializer.md#serialize)
* [serializeQueryParams](iserializer.md#serializequeryparams)

---

## Properties

<a id="deserialize"></a>

###  deserialize

**● deserialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Serializers/ISerializer.ts#L5)*

#### Type declaration
▸(data: * `S` &#124; `T`*): `Promise`<`T`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data |  `S` &#124; `T`|

**Returns:** `Promise`<`T`>

___
<a id="serialize"></a>

###  serialize

**● serialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Serializers/ISerializer.ts#L4)*

#### Type declaration
▸(modelData: *`T`*): `Promise`<`S`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| modelData | `T` |

**Returns:** `Promise`<`S`>

___
<a id="serializequeryparams"></a>

###  serializeQueryParams

**● serializeQueryParams**: *`function`*

*Defined in [Serializers/ISerializer.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Serializers/ISerializer.ts#L6)*

#### Type declaration
▸(params: *[IQueryParams](iqueryparams.md)*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| params | [IQueryParams](iqueryparams.md) |

**Returns:** `any`

___

