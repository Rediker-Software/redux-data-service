[redux-data-service](../README.md) > [RestAdapter](../classes/restadapter.md)

# Class: RestAdapter

An IAdapter implementation for connecting to a REST end point.

Outgoing item data should be serialized to a json string. The incoming data will be converted into an object by the underlying ajax library.

## Hierarchy

**RestAdapter**

## Implements

* [IAdapter](../interfaces/iadapter.md)<`string`>

## Index

### Constructors

* [constructor](restadapter.md#constructor)

### Properties

* [apiUrl](restadapter.md#apiurl)
* [pathName](restadapter.md#pathname)

### Methods

* [buildHeaders](restadapter.md#buildheaders)
* [buildQueryParams](restadapter.md#buildqueryparams)
* [createItem](restadapter.md#createitem)
* [deleteItem](restadapter.md#deleteitem)
* [fetchAll](restadapter.md#fetchall)
* [fetchItem](restadapter.md#fetchitem)
* [getRestURL](restadapter.md#getresturl)
* [makeAjaxRequest](restadapter.md#makeajaxrequest)
* [patchItem](restadapter.md#patchitem)
* [updateItem](restadapter.md#updateitem)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RestAdapter**(pathName: *`string`*, options?: *[IRestAdapterOptions](../interfaces/irestadapteroptions.md)*): [RestAdapter](restadapter.md)

*Defined in [Adapters/RestAdapter.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L20)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| pathName | `string` | - |
| `Default value` options | [IRestAdapterOptions](../interfaces/irestadapteroptions.md) |  {} |

**Returns:** [RestAdapter](restadapter.md)

___

## Properties

<a id="apiurl"></a>

###  apiUrl

**● apiUrl**: *`string`*

*Defined in [Adapters/RestAdapter.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L20)*

___
<a id="pathname"></a>

###  pathName

**● pathName**: *`string`*

*Defined in [Adapters/RestAdapter.ts:19](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L19)*

___

## Methods

<a id="buildheaders"></a>

### `<Protected>` buildHeaders

▸ **buildHeaders**(headers: *`any`*): `any`

*Defined in [Adapters/RestAdapter.ts:133](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L133)*

Create the list of headers to use when performing ajax requests.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| headers | `any` |  \- |

**Returns:** `any`

___
<a id="buildqueryparams"></a>

### `<Protected>` buildQueryParams

▸ **buildQueryParams**(payload: *`any`*): `string`

*Defined in [Adapters/RestAdapter.ts:148](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L148)*

Convert the given object into a string of query params.

Example: {abc: 123, hello: "world"} becomes: "abc=123&hello=world"

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| payload | `any` |  \- |

**Returns:** `string`

___
<a id="createitem"></a>

###  createItem

▸ **createItem**(item: *`string`*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:67](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L67)*

Perform a POST request to the API to create the given T item

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| item | `string` |  \- |

**Returns:** `Observable`<`string`>

___
<a id="deleteitem"></a>

###  deleteItem

▸ **deleteItem**(id: *`any`*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:99](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L99)*

Perform a DELETE request to the API to update the given T item based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |  \- |

**Returns:** `Observable`<`string`>

___
<a id="fetchall"></a>

###  fetchAll

▸ **fetchAll**(requestParams?: *`any`*): `Observable`<`object`>

*Defined in [Adapters/RestAdapter.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L47)*

Perform a GET request to the REST endpoint, which should return an array of T items. Optionally pass in `requestParams` to define query params to send to the API for filtering the results.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` requestParams | `any` |  \- |

**Returns:** `Observable`<`object`>

___
<a id="fetchitem"></a>

###  fetchItem

▸ **fetchItem**(id: *`string`*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:57](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L57)*

Perform a GET request to load a single T item from the API based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `string` |  \- |

**Returns:** `Observable`<`string`>

___
<a id="getresturl"></a>

###  getRestURL

▸ **getRestURL**(id?: *`string`*): `string`

*Defined in [Adapters/RestAdapter.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L32)*

Get the route to the REST endpoint.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` id | `string` |

**Returns:** `string`

___
<a id="makeajaxrequest"></a>

### `<Protected>` makeAjaxRequest

▸ **makeAjaxRequest**(method: *`string`*, url: *`string`*, payload?: *`string`*, headers?: *`any`*): `Observable`<`any`>

*Defined in [Adapters/RestAdapter.ts:117](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L117)*

Perform an ajax request to the given url, using the given http method.

If payload is provided: it is used as query params when performing a GET request, otherwise it is provided in the body of the request.

If headers are provided, they are merged with the default application headers.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| method | `string` | - |  \- |
| url | `string` | - |  \- |
| `Optional` payload | `string` | - |  \- |
| `Default value` headers | `any` |  {} |  \- |

**Returns:** `Observable`<`any`>

___
<a id="patchitem"></a>

###  patchItem

▸ **patchItem**(id: *`any`*, item: *`string`*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:89](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L89)*

Perform a PATCH request to the API to update the given T item based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |  \- |
| item | `string` |  \- |

**Returns:** `Observable`<`string`>

___
<a id="updateitem"></a>

###  updateItem

▸ **updateItem**(id: *`any`*, item: *`string`*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/ac48abe/src/Adapters/RestAdapter.ts#L78)*

Perform a PUT request to the API to update the given T item based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |  \- |
| item | `string` |  \- |

**Returns:** `Observable`<`string`>

___

