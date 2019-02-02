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

*Defined in [Adapters/RestAdapter.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L22)*

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

*Defined in [Adapters/RestAdapter.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L22)*

___
<a id="pathname"></a>

###  pathName

**● pathName**: *`string`*

*Defined in [Adapters/RestAdapter.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L21)*

___

## Methods

<a id="buildheaders"></a>

### `<Protected>` buildHeaders

▸ **buildHeaders**(headers: *`any`*): `any`

*Defined in [Adapters/RestAdapter.ts:135](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L135)*

Create the list of headers to use when performing ajax requests.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| headers | `any` |  \- |

**Returns:** `any`

___
<a id="createitem"></a>

###  createItem

▸ **createItem**(item: *`string`*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:69](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L69)*

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

*Defined in [Adapters/RestAdapter.ts:101](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L101)*

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

*Defined in [Adapters/RestAdapter.ts:49](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L49)*

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

*Defined in [Adapters/RestAdapter.ts:59](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L59)*

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

*Defined in [Adapters/RestAdapter.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L34)*

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

*Defined in [Adapters/RestAdapter.ts:119](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L119)*

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

*Defined in [Adapters/RestAdapter.ts:91](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L91)*

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

*Defined in [Adapters/RestAdapter.ts:80](https://github.com/Rediker-Software/redux-data-service/blob/d832b55/src/Adapters/RestAdapter.ts#L80)*

Perform a PUT request to the API to update the given T item based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |  \- |
| item | `string` |  \- |

**Returns:** `Observable`<`string`>

___

