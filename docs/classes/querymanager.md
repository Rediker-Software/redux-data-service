[redux-data-service](../README.md) > [QueryManager](../classes/querymanager.md)

# Class: QueryManager

Manages the data associated with a query. Holds immutable readonly fields for an IQueryBuilder, an array of IModel item results, an IQueryResponse, and an IQueryManagerMeta Each QueryManager instance should be treated as an immutable object, a new instance should be created when query data changes.

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
## Hierarchy

**QueryManager**

## Implements

* [IQueryManager](../interfaces/iquerymanager.md)<`T`>

## Index

### Constructors

* [constructor](querymanager.md#constructor)

### Properties

* [items](querymanager.md#items)
* [meta](querymanager.md#meta)
* [query](querymanager.md#query)
* [response](querymanager.md#response)

### Accessors

* [errors](querymanager.md#errors)
* [isLoading](querymanager.md#isloading)

### Methods

* [getNextPage](querymanager.md#getnextpage)
* [getPreviousPage](querymanager.md#getpreviouspage)
* [hasNextPage](querymanager.md#hasnextpage)
* [hasPreviousPage](querymanager.md#haspreviouspage)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new QueryManager**(query: *[IQueryBuilder](../interfaces/iquerybuilder.md)*, items?: *[IModel](../interfaces/imodel.md)<`T`>[]*, response?: *[IQueryResponse](../interfaces/iqueryresponse.md)*, meta?: *[IQueryManagerMeta](../interfaces/iquerymanagermeta.md)*): [QueryManager](querymanager.md)

*Defined in [Query/QueryManager.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| query | [IQueryBuilder](../interfaces/iquerybuilder.md) |
| `Optional` items | [IModel](../interfaces/imodel.md)<`T`>[] |
| `Optional` response | [IQueryResponse](../interfaces/iqueryresponse.md) |
| `Optional` meta | [IQueryManagerMeta](../interfaces/iquerymanagermeta.md) |

**Returns:** [QueryManager](querymanager.md)

___

## Properties

<a id="items"></a>

###  items

**● items**: *[IModel](../interfaces/imodel.md)<`T`>[]*

*Implementation of [IQueryManager](../interfaces/iquerymanager.md).[items](../interfaces/iquerymanager.md#items)*

*Defined in [Query/QueryManager.ts:29](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L29)*

___
<a id="meta"></a>

### `<Protected>` meta

**● meta**: *[IQueryManagerMeta](../interfaces/iquerymanagermeta.md)*

*Defined in [Query/QueryManager.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L31)*

___
<a id="query"></a>

###  query

**● query**: *[IQueryBuilder](../interfaces/iquerybuilder.md)*

*Implementation of [IQueryManager](../interfaces/iquerymanager.md).[query](../interfaces/iquerymanager.md#query)*

*Defined in [Query/QueryManager.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L28)*

___
<a id="response"></a>

###  response

**● response**: *[IQueryResponse](../interfaces/iqueryresponse.md)*

*Implementation of [IQueryManager](../interfaces/iquerymanager.md).[response](../interfaces/iquerymanager.md#response)*

*Defined in [Query/QueryManager.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L30)*

___

## Accessors

<a id="errors"></a>

###  errors

geterrors(): `any`

*Defined in [Query/QueryManager.ts:48](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L48)*

**Returns:** `any`

___
<a id="isloading"></a>

###  isLoading

getisLoading(): `boolean`

*Defined in [Query/QueryManager.ts:40](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L40)*

**Returns:** `boolean`

___

## Methods

<a id="getnextpage"></a>

###  getNextPage

▸ **getNextPage**(): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryManager.ts:60](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L60)*

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___
<a id="getpreviouspage"></a>

###  getPreviousPage

▸ **getPreviousPage**(): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryManager.ts:66](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L66)*

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___
<a id="hasnextpage"></a>

###  hasNextPage

▸ **hasNextPage**(): `boolean`

*Defined in [Query/QueryManager.ts:52](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L52)*

**Returns:** `boolean`

___
<a id="haspreviouspage"></a>

###  hasPreviousPage

▸ **hasPreviousPage**(): `boolean`

*Defined in [Query/QueryManager.ts:56](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Query/QueryManager.ts#L56)*

**Returns:** `boolean`

___

