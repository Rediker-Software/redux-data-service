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

*Defined in [Query/QueryBuilder.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L28)*

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

*Defined in [Query/QueryBuilder.ts:40](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L40)*

Get a unique hashcode specific to the current queryParams

#### Type declaration
▸(): `string`

**Returns:** `string`

___
<a id="invoke"></a>

###  invoke

**● invoke**: *`function`*

*Defined in [Query/QueryBuilder.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L43)*

Trigger the query by dispatching an action to the Redux data service.

#### Type declaration
▸(): `void`

**Returns:** `void`

___
<a id="page"></a>

###  page

**● page**: *`function`*

*Defined in [Query/QueryBuilder.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L34)*

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

*Defined in [Query/QueryBuilder.ts:37](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L37)*

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

**● queryParams**: *`any`*

*Defined in [Query/QueryBuilder.ts:19](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L19)*

The current set of query params. DO NOT MUTATE THIS OBJECT DIRECTLY!

___
<a id="removefilter"></a>

###  removeFilter

**● removeFilter**: *`function`*

*Defined in [Query/QueryBuilder.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L31)*

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

*Defined in [Query/QueryBuilder.ts:25](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L25)*

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

*Defined in [Query/QueryBuilder.ts:16](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L16)*

The name of the Redux data service being queried

___
<a id="sort"></a>

###  sort

**● sort**: *`function`*

*Defined in [Query/QueryBuilder.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Query/QueryBuilder.ts#L22)*

Add the given sorting param to the query. Default SortDirection is "asc".

#### Type declaration
▸(key: *`string`*, direction?: *[SortDirection](../#sortdirection)*): [IQueryBuilder](iquerybuilder.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| `Optional` direction | [SortDirection](../#sortdirection) |

**Returns:** [IQueryBuilder](iquerybuilder.md)

___

