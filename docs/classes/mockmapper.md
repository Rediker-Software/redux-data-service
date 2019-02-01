[redux-data-service](../README.md) > [MockMapper](../classes/mockmapper.md)

# Class: MockMapper

## Hierarchy

**MockMapper**

## Implements

* [IMapper](../interfaces/imapper.md)<`any`>

## Index

### Methods

* [normalize](mockmapper.md#normalize)
* [normalizeQueryResponse](mockmapper.md#normalizequeryresponse)
* [transform](mockmapper.md#transform)
* [transformList](mockmapper.md#transformlist)
* [transformPatch](mockmapper.md#transformpatch)

---

## Methods

<a id="normalize"></a>

###  normalize

▸ **normalize**(data: *`any`*): `Promise`<`any`>

*Defined in [Mapper/MockMapper.ts:16](https://github.com/Rediker-Software/redux-data-service/blob/ebcded6/src/Mapper/MockMapper.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** `Promise`<`any`>

___
<a id="normalizequeryresponse"></a>

###  normalizeQueryResponse

▸ **normalizeQueryResponse**(data: *`any`*): `Promise`<`any`>

*Defined in [Mapper/MockMapper.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/ebcded6/src/Mapper/MockMapper.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** `Promise`<`any`>

___
<a id="transform"></a>

###  transform

▸ **transform**(model: *`any`*): `Promise`<`any`>

*Defined in [Mapper/MockMapper.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/ebcded6/src/Mapper/MockMapper.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| model | `any` |

**Returns:** `Promise`<`any`>

___
<a id="transformlist"></a>

###  transformList

▸ **transformList**(models: *`any`*): `Promise`<`any`>

*Defined in [Mapper/MockMapper.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/ebcded6/src/Mapper/MockMapper.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| models | `any` |

**Returns:** `Promise`<`any`>

___
<a id="transformpatch"></a>

###  transformPatch

▸ **transformPatch**(model: *`any`*): `Promise`<`object`[]>

*Defined in [Mapper/MockMapper.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/ebcded6/src/Mapper/MockMapper.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| model | `any` |

**Returns:** `Promise`<`object`[]>

___

