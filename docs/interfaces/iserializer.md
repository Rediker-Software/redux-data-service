[redux-data-service](../README.md) > [ISerializer](../interfaces/iserializer.md)

# Interface: ISerializer

## Type parameters
#### S 
#### R 
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

*Defined in [Serializers/ISerializer.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/334b326/src/Serializers/ISerializer.ts#L5)*

#### Type declaration
▸(data: *`S`*): `Promise`<`R`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `S` |

**Returns:** `Promise`<`R`>

___
<a id="serialize"></a>

###  serialize

**● serialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/334b326/src/Serializers/ISerializer.ts#L4)*

#### Type declaration
▸(modelData: *`R`*): `Promise`<`S`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| modelData | `R` |

**Returns:** `Promise`<`S`>

___
<a id="serializequeryparams"></a>

###  serializeQueryParams

**● serializeQueryParams**: *`function`*

*Defined in [Serializers/ISerializer.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/334b326/src/Serializers/ISerializer.ts#L6)*

#### Type declaration
▸(params: *[IQueryParams](iqueryparams.md)*): `Promise`<`any`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| params | [IQueryParams](iqueryparams.md) |

**Returns:** `Promise`<`any`>

___

