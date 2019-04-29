[redux-data-service](../README.md) > [QueryBuilder](../classes/querybuilder.md)

# Class: QueryBuilder

Uses the builder pattern for building up a query to the data source (such as a query to a REST API).

Example usage:

```
const queryBuilder = new QueryBuilder("student");

queryBuilder
  .filter("firstName", "Bob")
  .filter("state", "MA")
  .sort("lastName")
  .sort("age", "desc")
  .page(2)
  .pageSize(100)
  .invoke();
```

Calling `invoke` will dispatch the query to the associated Redux data service, which will use a QueryMapper to transform the query to the correct format for its data source.

For example, if using a UrlQueryMapper, it would return a string as query params in the following format:

```
?firstName=Bob&state=MA&page=2&pageSize=100&sort=lastName,age:desc
```

Extend the QueryMapper as needed for your data source / API to change how the query built from QueryBuilder is transformed.

Note that QueryBuilder is immutable. Each of the builder methods will return a new QueryBuilder instance.

## Hierarchy

**QueryBuilder**

## Implements

* [IQueryBuilder](../interfaces/iquerybuilder.md)

## Index

### Constructors

* [constructor](querybuilder.md#constructor)

### Properties

* [hashCode](querybuilder.md#hashcode)
* [queryParams](querybuilder.md#queryparams)
* [serviceName](querybuilder.md#servicename)

### Methods

* [filter](querybuilder.md#filter)
* [getHashCode](querybuilder.md#gethashcode)
* [getSortDirection](querybuilder.md#getsortdirection)
* [invoke](querybuilder.md#invoke)
* [page](querybuilder.md#page)
* [pageSize](querybuilder.md#pagesize)
* [removeFilter](querybuilder.md#removefilter)
* [removeSort](querybuilder.md#removesort)
* [sort](querybuilder.md#sort)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new QueryBuilder**(serviceName: *`string`*, queryParams?: *[IQueryParams](../interfaces/iqueryparams.md)*): [QueryBuilder](querybuilder.md)

*Defined in [Query/QueryBuilder.ts:92](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L92)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| serviceName | `string` | - |
| `Default value` queryParams | [IQueryParams](../interfaces/iqueryparams.md) |  {} |

**Returns:** [QueryBuilder](querybuilder.md)

___

## Properties

<a id="hashcode"></a>

### `<Private>` hashCode

**● hashCode**: *`string`*

*Defined in [Query/QueryBuilder.ts:92](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L92)*

___
<a id="queryparams"></a>

###  queryParams

**● queryParams**: *[IQueryParams](../interfaces/iqueryparams.md)*

*Implementation of [IQueryBuilder](../interfaces/iquerybuilder.md).[queryParams](../interfaces/iquerybuilder.md#queryparams)*

*Defined in [Query/QueryBuilder.ts:91](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L91)*

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Implementation of [IQueryBuilder](../interfaces/iquerybuilder.md).[serviceName](../interfaces/iquerybuilder.md#servicename)*

*Defined in [Query/QueryBuilder.ts:90](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L90)*

___

## Methods

<a id="filter"></a>

###  filter

▸ **filter**(key: *`string`*, value: * `string` &#124; `number` &#124; `false` &#124; `true` &#124; ( `string` &#124; `number` &#124; `false` &#124; `true`)[]*): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryBuilder.ts:102](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L102)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value |  `string` &#124; `number` &#124; `false` &#124; `true` &#124; ( `string` &#124; `number` &#124; `false` &#124; `true`)[]|

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___
<a id="gethashcode"></a>

###  getHashCode

▸ **getHashCode**(): `string`

*Defined in [Query/QueryBuilder.ts:186](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L186)*

**Returns:** `string`

___
<a id="getsortdirection"></a>

###  getSortDirection

▸ **getSortDirection**(key: *`string`*):  "asc" &#124; "desc"

*Defined in [Query/QueryBuilder.ts:194](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L194)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:**  "asc" &#124; "desc"

___
<a id="invoke"></a>

###  invoke

▸ **invoke**(): `void`

*Defined in [Query/QueryBuilder.ts:179](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L179)*

**Returns:** `void`

___
<a id="page"></a>

###  page

▸ **page**(pageNumber: *`number`*): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryBuilder.ts:121](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L121)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pageNumber | `number` |

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___
<a id="pagesize"></a>

###  pageSize

▸ **pageSize**(pageSize: *`number`*): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryBuilder.ts:130](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L130)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pageSize | `number` |

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___
<a id="removefilter"></a>

###  removeFilter

▸ **removeFilter**(key: *`string`*): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryBuilder.ts:111](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L111)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___
<a id="removesort"></a>

###  removeSort

▸ **removeSort**(key: *`string`*): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryBuilder.ts:164](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L164)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___
<a id="sort"></a>

###  sort

▸ **sort**(key: *`string`*, direction?: *[SortDirection](../#sortdirection)*, position?: *`number`*): [IQueryBuilder](../interfaces/iquerybuilder.md)

*Defined in [Query/QueryBuilder.ts:139](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Query/QueryBuilder.ts#L139)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| key | `string` | - |
| `Default value` direction | [SortDirection](../#sortdirection) | &quot;asc&quot; |
| `Optional` position | `number` | - |

**Returns:** [IQueryBuilder](../interfaces/iquerybuilder.md)

___

