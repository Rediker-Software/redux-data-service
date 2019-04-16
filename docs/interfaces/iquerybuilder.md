[redux-data-service](../README.md) > [IQueryBuilder](../interfaces/iquerybuilder.md)

# Interface: IQueryBuilder

## Hierarchy

**IQueryBuilder**

## Implemented by

* [QueryBuilder](../classes/querybuilder.md)

## Index

### Properties

* [filter](iquerybuilder.md#filter)
* [getHashCode](iquerybuilder.md#gethashcode)
* [getSortDirection](iquerybuilder.md#getsortdirection)
* [invoke](iquerybuilder.md#invoke)
* [page](iquerybuilder.md#page)
* [pageSize](iquerybuilder.md#pagesize)
* [queryParams](iquerybuilder.md#queryparams)
* [removeFilter](iquerybuilder.md#removefilter)
* [removeSort](iquerybuilder.md#removesort)
* [serviceName](iquerybuilder.md#servicename)
* [sort](iquerybuilder.md#sort)

---

## Properties

<a id="filter"></a>

###  filter

**● filter**: *`function`*

*Defined in [Query/QueryBuilder.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L32)*

Add the given filtering criteria to the query.

#### Type declaration
▸(key: *`string`*, value: * [FilterValue](../#filtervalue) &#124; [FilterValue](../#filtervalue)[]*): [IQueryBuilder](iquerybuilder.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value |  [FilterValue](../#filtervalue) &#124; [FilterValue](../#filtervalue)[]|

**Returns:** [IQueryBuilder](iquerybuilder.md)

___
<a id="gethashcode"></a>

###  getHashCode

**● getHashCode**: *`function`*

*Defined in [Query/QueryBuilder.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L44)*

Get a unique hashcode specific to the current queryParams

#### Type declaration
▸(): `string`

**Returns:** `string`

___
<a id="getsortdirection"></a>

###  getSortDirection

**● getSortDirection**: *`function`*

*Defined in [Query/QueryBuilder.ts:29](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L29)*

Get the sort direction for a given key

#### Type declaration
▸(key: *`string`*):  [SortDirection](../#sortdirection) &#124; `undefined`

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:**  [SortDirection](../#sortdirection) &#124; `undefined`

___
<a id="invoke"></a>

###  invoke

**● invoke**: *`function`*

*Defined in [Query/QueryBuilder.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L47)*

Trigger the query by dispatching an action to the Redux data service.

#### Type declaration
▸(): `void`

**Returns:** `void`

___
<a id="page"></a>

###  page

**● page**: *`function`*

*Defined in [Query/QueryBuilder.ts:38](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L38)*

Set which page number to use in the query.

#### Type declaration
▸(pageNumber: *`number`*): [IQueryBuilder](iquerybuilder.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| pageNumber | `number` |

**Returns:** [IQueryBuilder](iquerybuilder.md)

___
<a id="pagesize"></a>

###  pageSize

**● pageSize**: *`function`*

*Defined in [Query/QueryBuilder.ts:41](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L41)*

Set the query's page size.

#### Type declaration
▸(pageSize: *`number`*): [IQueryBuilder](iquerybuilder.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| pageSize | `number` |

**Returns:** [IQueryBuilder](iquerybuilder.md)

___
<a id="queryparams"></a>

###  queryParams

**● queryParams**: *[IQueryParams](iqueryparams.md)*

*Defined in [Query/QueryBuilder.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L20)*

The current set of query params. DO NOT MUTATE THIS OBJECT DIRECTLY!

___
<a id="removefilter"></a>

###  removeFilter

**● removeFilter**: *`function`*

*Defined in [Query/QueryBuilder.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L35)*

Remove the given filtering criteria from the query.

#### Type declaration
▸(key: *`string`*): [IQueryBuilder](iquerybuilder.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** [IQueryBuilder](iquerybuilder.md)

___
<a id="removesort"></a>

###  removeSort

**● removeSort**: *`function`*

*Defined in [Query/QueryBuilder.ts:26](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L26)*

Remove the given sorting param from the query.

#### Type declaration
▸(key: *`string`*): [IQueryBuilder](iquerybuilder.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** [IQueryBuilder](iquerybuilder.md)

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Defined in [Query/QueryBuilder.ts:17](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L17)*

The name of the Redux data service being queried

___
<a id="sort"></a>

###  sort

**● sort**: *`function`*

*Defined in [Query/QueryBuilder.ts:23](https://github.com/Rediker-Software/redux-data-service/blob/95a67d9/src/Query/QueryBuilder.ts#L23)*

Add the given sorting param to the query. Default SortDirection is "asc". Position is a zero-based index

#### Type declaration
▸(key: *`string`*, direction?: *[SortDirection](../#sortdirection)*, position?: *`number`*): [IQueryBuilder](iquerybuilder.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| `Optional` direction | [SortDirection](../#sortdirection) |
| `Optional` position | `number` |

**Returns:** [IQueryBuilder](iquerybuilder.md)

___

