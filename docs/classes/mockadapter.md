[redux-data-service](../README.md) > [MockAdapter](../classes/mockadapter.md)

# Class: MockAdapter

## Hierarchy

**MockAdapter**

## Implements

* [IAdapter](../interfaces/iadapter.md)<`any`>

## Index

### Properties

* [createItem](mockadapter.md#createitem)
* [deleteItem](mockadapter.md#deleteitem)
* [fetchAll](mockadapter.md#fetchall)
* [fetchItem](mockadapter.md#fetchitem)
* [patchItem](mockadapter.md#patchitem)
* [updateItem](mockadapter.md#updateitem)

---

## Properties

<a id="createitem"></a>

###  createItem

**● createItem**: *`any`* =  stub().callsFake((item) => of$({
    ...item,
    id: faker.random.number().toString(),
  }))

*Implementation of [IAdapter](../interfaces/iadapter.md).[createItem](../interfaces/iadapter.md#createitem)*

*Defined in [Adapters/MockAdapter.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/1af9254/src/Adapters/MockAdapter.ts#L7)*

___
<a id="deleteitem"></a>

###  deleteItem

**● deleteItem**: *`any`* =  stub().callsFake((id: string) => of$({
    id,
    dateDeleted: new Date().toISOString(),
  }))

*Implementation of [IAdapter](../interfaces/iadapter.md).[deleteItem](../interfaces/iadapter.md#deleteitem)*

*Defined in [Adapters/MockAdapter.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/1af9254/src/Adapters/MockAdapter.ts#L12)*

___
<a id="fetchall"></a>

###  fetchAll

**● fetchAll**: *`any`* =  stub().callsFake(() => of$([]))

*Implementation of [IAdapter](../interfaces/iadapter.md).[fetchAll](../interfaces/iadapter.md#fetchall)*

*Defined in [Adapters/MockAdapter.ts:17](https://github.com/Rediker-Software/redux-data-service/blob/1af9254/src/Adapters/MockAdapter.ts#L17)*

___
<a id="fetchitem"></a>

###  fetchItem

**● fetchItem**: *`any`* =  stub().callsFake((id: string) => of$({ id }))

*Implementation of [IAdapter](../interfaces/iadapter.md).[fetchItem](../interfaces/iadapter.md#fetchitem)*

*Defined in [Adapters/MockAdapter.ts:18](https://github.com/Rediker-Software/redux-data-service/blob/1af9254/src/Adapters/MockAdapter.ts#L18)*

___
<a id="patchitem"></a>

###  patchItem

**● patchItem**: *`any`* =  stub().callsFake((id: string, item) => of$({ ...item, id }))

*Implementation of [IAdapter](../interfaces/iadapter.md).[patchItem](../interfaces/iadapter.md#patchitem)*

*Defined in [Adapters/MockAdapter.ts:19](https://github.com/Rediker-Software/redux-data-service/blob/1af9254/src/Adapters/MockAdapter.ts#L19)*

___
<a id="updateitem"></a>

###  updateItem

**● updateItem**: *`any`* =  stub().callsFake((id: string, item) => of$({ ...item, id }))

*Implementation of [IAdapter](../interfaces/iadapter.md).[updateItem](../interfaces/iadapter.md#updateitem)*

*Defined in [Adapters/MockAdapter.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/1af9254/src/Adapters/MockAdapter.ts#L20)*

___

