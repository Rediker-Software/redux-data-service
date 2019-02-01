[redux-data-service](../README.md) > [IEpic](../interfaces/iepic.md)

# Interface: IEpic

## Hierarchy

**IEpic**

## Implemented by

* [FetchRecordEpic](../classes/fetchrecordepic.md)

## Index

### Methods

* [execute](iepic.md#execute)

---

## Methods

<a id="execute"></a>

###  execute

▸ **execute**(action$: *`ActionsObservable`<`any`>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`any`>>*): `Observable`<[IAction](iaction.md)<`any`>>

*Defined in [Services/DataService/Epics/FetchRecordEpic.ts:26](https://github.com/Rediker-Software/redux-data-service/blob/ebcded6/src/Services/DataService/Epics/FetchRecordEpic.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | `ActionsObservable`<`any`> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`any`>> |

**Returns:** `Observable`<[IAction](iaction.md)<`any`>>

___

