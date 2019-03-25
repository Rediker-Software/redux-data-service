[redux-data-service](../README.md) > [MemoryAdapter](../classes/memoryadapter.md)

# Class: MemoryAdapter

An in-memory IAdapter implementation which returns fake data when it is requested. This is useful for testing and local development. Not to be used in production.

## Hierarchy

**MemoryAdapter**

## Implements

* [IAdapter](../interfaces/iadapter.md)<`Partial`<[IModelData](../interfaces/imodeldata.md)>>

## Index

### Constructors

* [constructor](memoryadapter.md#constructor)

### Properties

* [serviceName](memoryadapter.md#servicename)

### Methods

* [createItem](memoryadapter.md#createitem)
* [deleteItem](memoryadapter.md#deleteitem)
* [fetchAll](memoryadapter.md#fetchall)
* [fetchItem](memoryadapter.md#fetchitem)
* [patchItem](memoryadapter.md#patchitem)
* [updateItem](memoryadapter.md#updateitem)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MemoryAdapter**(serviceName: *`string`*): [MemoryAdapter](memoryadapter.md)

*Defined in [Adapters/MemoryAdapter.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| serviceName | `string` |

**Returns:** [MemoryAdapter](memoryadapter.md)

___

## Properties

<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Defined in [Adapters/MemoryAdapter.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L14)*

___

## Methods

<a id="createitem"></a>

###  createItem

▸ **createItem**(item: *[IModelData](../interfaces/imodeldata.md)*): `Observable`<[IModelData](../interfaces/imodeldata.md)>

*Defined in [Adapters/MemoryAdapter.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| item | [IModelData](../interfaces/imodeldata.md) |

**Returns:** `Observable`<[IModelData](../interfaces/imodeldata.md)>

___
<a id="deleteitem"></a>

###  deleteItem

▸ **deleteItem**(id: *`any`*): `Observable`<`Partial`<[IModelData](../interfaces/imodeldata.md)>>

*Defined in [Adapters/MemoryAdapter.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `any` |

**Returns:** `Observable`<`Partial`<[IModelData](../interfaces/imodeldata.md)>>

___
<a id="fetchall"></a>

###  fetchAll

▸ **fetchAll**(requestParams?: *`any`*): `Observable`<`object`>

*Defined in [Adapters/MemoryAdapter.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L20)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` requestParams | `any` |  {} |

**Returns:** `Observable`<`object`>

___
<a id="fetchitem"></a>

###  fetchItem

▸ **fetchItem**(id: *`string`*): `Observable`<[IModelData](../interfaces/imodeldata.md)>

*Defined in [Adapters/MemoryAdapter.ts:25](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Observable`<[IModelData](../interfaces/imodeldata.md)>

___
<a id="patchitem"></a>

###  patchItem

▸ **patchItem**(id: *`any`*, item: *[IModelData](../interfaces/imodeldata.md)*): `Observable`<[IModelData](../interfaces/imodeldata.md)>

*Defined in [Adapters/MemoryAdapter.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `any` |
| item | [IModelData](../interfaces/imodeldata.md) |

**Returns:** `Observable`<[IModelData](../interfaces/imodeldata.md)>

___
<a id="updateitem"></a>

###  updateItem

▸ **updateItem**(id: *`any`*, item: *[IModelData](../interfaces/imodeldata.md)*): `Observable`<[IModelData](../interfaces/imodeldata.md)>

*Defined in [Adapters/MemoryAdapter.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/22c168c/src/Adapters/MemoryAdapter.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `any` |
| item | [IModelData](../interfaces/imodeldata.md) |

**Returns:** `Observable`<[IModelData](../interfaces/imodeldata.md)>

___

