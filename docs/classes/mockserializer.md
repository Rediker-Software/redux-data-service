[redux-data-service](../README.md) > [MockSerializer](../classes/mockserializer.md)

# Class: MockSerializer

## Hierarchy

**MockSerializer**

## Implements

* [ISerializer](../interfaces/iserializer.md)<`any`, `any`>

## Index

### Methods

* [deserialize](mockserializer.md#deserialize)
* [serialize](mockserializer.md#serialize)
* [serializeQueryParams](mockserializer.md#serializequeryparams)

---

## Methods

<a id="deserialize"></a>

###  deserialize

▸ **deserialize**(): `Promise`<[FakeModel](fakemodel.md)>

*Defined in [Serializers/MockSerializer.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Serializers/MockSerializer.ts#L10)*

**Returns:** `Promise`<[FakeModel](fakemodel.md)>

___
<a id="serialize"></a>

###  serialize

▸ **serialize**(): `Promise`<`string`>

*Defined in [Serializers/MockSerializer.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Serializers/MockSerializer.ts#L6)*

**Returns:** `Promise`<`string`>

___
<a id="serializequeryparams"></a>

###  serializeQueryParams

▸ **serializeQueryParams**(queryParams: *[IQueryParams](../interfaces/iqueryparams.md)*): [IQueryParams](../interfaces/iqueryparams.md)

*Defined in [Serializers/MockSerializer.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Serializers/MockSerializer.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| queryParams | [IQueryParams](../interfaces/iqueryparams.md) |

**Returns:** [IQueryParams](../interfaces/iqueryparams.md)

___

