[redux-data-service](../README.md) > [FetchRecordEpic](../classes/fetchrecordepic.md)

# Class: FetchRecordEpic

Requests an individual item using the given api adapter.

*   the item is then deserialized with the given serializer
*   and normalized into the proper IModel instance with the given mapper.

Finally, a `PUSH_RECORD` action is emitted to add the `IModel` instance to its redux store.

Note that the item will not be reloaded if it already exists in its redux store, unless `action.meta.forceReload` is `true`.

If the library configuration setting `coalesceFindRequests` is `true`, it will accumulate these requests for `coalesceBufferTime` (default 50ms) before dispatching a `FETCH_ALL` action with the requested `ids` as query params if more than one item is requested during that period.

## Hierarchy

**FetchRecordEpic**

## Implements

* [IEpic](../interfaces/iepic.md)

## Index

### Constructors

* [constructor](fetchrecordepic.md#constructor)

### Properties

* [bufferedObservable](fetchrecordepic.md#bufferedobservable)
* [context](fetchrecordepic.md#context)

### Methods

* [createBufferObservable](fetchrecordepic.md#createbufferobservable)
* [execute](fetchrecordepic.md#execute)
* [loadRecord](fetchrecordepic.md#loadrecord)
* [performBufferedRequest](fetchrecordepic.md#performbufferedrequest)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new FetchRecordEpic**(context: *[IContext](../interfaces/icontext.md)*): [FetchRecordEpic](fetchrecordepic.md)

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Services/DataService/Epics/FetchRecordEpic.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| context | [IContext](../interfaces/icontext.md) |

**Returns:** [FetchRecordEpic](fetchrecordepic.md)

___

## Properties

<a id="bufferedobservable"></a>

### `<Protected>` bufferedObservable

**● bufferedObservable**: *`any`*

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Services/DataService/Epics/FetchRecordEpic.ts#L45)*

___
<a id="context"></a>

### `<Protected>` context

**● context**: *[IContext](../interfaces/icontext.md)*

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Services/DataService/Epics/FetchRecordEpic.ts#L44)*

___

## Methods

<a id="createbufferobservable"></a>

###  createBufferObservable

▸ **createBufferObservable**(id: *`string`*): `Observable`<`any`>

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:71](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Services/DataService/Epics/FetchRecordEpic.ts#L71)*

This method creates the buffer Observable for use in the `performBufferRequest` function. There is an N millisecond period over which results are coalesced if the `coalesceBufferTime` constant is specified in the configuration (its default is 50 ms). If there is only one item, the standard `loadRecord` function is called.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Observable`<`any`>

___
<a id="execute"></a>

###  execute

▸ **execute**(action$: *`ActionsObservable`<`any`>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`any`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`>>

*Implementation of [IEpic](../interfaces/iepic.md).[execute](../interfaces/iepic.md#execute)*

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:102](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Services/DataService/Epics/FetchRecordEpic.ts#L102)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | `ActionsObservable`<`any`> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`any`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`>>

___
<a id="loadrecord"></a>

###  loadRecord

▸ **loadRecord**(id: *`string`*): `Observable`<[IAction](../interfaces/iaction.md)<`any`>>

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:54](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Services/DataService/Epics/FetchRecordEpic.ts#L54)*

Helper method that fetches, deserializes, and normalizes the item from the API

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`>>

___
<a id="performbufferedrequest"></a>

###  performBufferedRequest

▸ **performBufferedRequest**(id: *`string`*): `Observable`<`any`>

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:89](https://github.com/Rediker-Software/redux-data-service/blob/e3b878c/src/Services/DataService/Epics/FetchRecordEpic.ts#L89)*

Checks the cache for a buffered Observable that matches the context. If the buffer doesn't exist, it is created, and prepared to be disposed of at the end of its lifetime. Either the buffered Observable is returned or the current id is added to the given buffered Observable and the Observable is completed

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Observable`<`any`>

___

