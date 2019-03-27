[redux-data-service](../README.md) > [IAdapter](../interfaces/iadapter.md)

# Interface: IAdapter

## Type parameters
#### T 
## Hierarchy

**IAdapter**

## Implemented by

* [MemoryAdapter](../classes/memoryadapter.md)
* [MockAdapter](../classes/mockadapter.md)
* [RestAdapter](../classes/restadapter.md)

## Index

### Properties

* [createItem](iadapter.md#createitem)
* [deleteItem](iadapter.md#deleteitem)
* [fetchAll](iadapter.md#fetchall)
* [fetchItem](iadapter.md#fetchitem)
* [patchItem](iadapter.md#patchitem)
* [updateItem](iadapter.md#updateitem)

---

## Properties

<a id="createitem"></a>

###  createItem

**● createItem**: *`function`*

*Defined in [Adapters/IAdapter.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/IAdapter.ts#L7)*

#### Type declaration
▸(item: *`T`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`T`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| item | `T` |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`T`>

___
<a id="deleteitem"></a>

###  deleteItem

**● deleteItem**: *`function`*

*Defined in [Adapters/IAdapter.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/IAdapter.ts#L10)*

#### Type declaration
▸(id: *`string`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`T`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`T`>

___
<a id="fetchall"></a>

###  fetchAll

**● fetchAll**: *`function`*

*Defined in [Adapters/IAdapter.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/IAdapter.ts#L5)*

#### Type declaration
▸(requestParams?: *`any`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`object`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` requestParams | `any` |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`object`>

___
<a id="fetchitem"></a>

###  fetchItem

**● fetchItem**: *`function`*

*Defined in [Adapters/IAdapter.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/IAdapter.ts#L6)*

#### Type declaration
▸(id: *`string`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`T`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`T`>

___
<a id="patchitem"></a>

###  patchItem

**● patchItem**: *`function`*

*Defined in [Adapters/IAdapter.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/IAdapter.ts#L9)*

#### Type declaration
▸(id: *`string`*, item: *`T`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`T`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |
| item | `T` |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`T`>

___
<a id="updateitem"></a>

###  updateItem

**● updateItem**: *`function`*

*Defined in [Adapters/IAdapter.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/IAdapter.ts#L8)*

#### Type declaration
▸(id: *`string`*, item: *`T`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`T`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |
| item | `T` |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`T`>

___

