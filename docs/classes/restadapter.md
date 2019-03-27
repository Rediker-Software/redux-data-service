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

*Defined in [Adapters/RestAdapter.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L24)*

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

*Defined in [Adapters/RestAdapter.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L24)*

___
<a id="pathname"></a>

###  pathName

**● pathName**: *`string`*

*Defined in [Adapters/RestAdapter.ts:23](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L23)*

___

## Methods

<a id="buildheaders"></a>

### `<Protected>` buildHeaders

▸ **buildHeaders**(headers: *`any`*): `any`

*Defined in [Adapters/RestAdapter.ts:141](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L141)*

Create the list of headers to use when performing ajax requests.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| headers | `any` |  \- |

**Returns:** `any`

___
<a id="createitem"></a>

###  createItem

▸ **createItem**(item: *`string`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:71](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L71)*

Perform a POST request to the API to create the given T item

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| item | `string` |  \- |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`string`>

___
<a id="deleteitem"></a>

###  deleteItem

▸ **deleteItem**(id: *`any`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:103](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L103)*

Perform a DELETE request to the API to update the given T item based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |  \- |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`string`>

___
<a id="fetchall"></a>

###  fetchAll

▸ **fetchAll**(requestParams?: *`any`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`object`>

*Defined in [Adapters/RestAdapter.ts:51](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L51)*

Perform a GET request to the REST endpoint, which should return an array of T items. Optionally pass in `requestParams` to define query params to send to the API for filtering the results.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` requestParams | `any` |  \- |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`object`>

___
<a id="fetchitem"></a>

###  fetchItem

▸ **fetchItem**(id: *`string`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:61](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L61)*

Perform a GET request to load a single T item from the API based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `string` |  \- |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`string`>

___
<a id="getresturl"></a>

###  getRestURL

▸ **getRestURL**(id?: *`string`*): `string`

*Defined in [Adapters/RestAdapter.ts:36](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L36)*

Get the route to the REST endpoint.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` id | `string` |

**Returns:** `string`

___
<a id="makeajaxrequest"></a>

### `<Protected>` makeAjaxRequest

▸ **makeAjaxRequest**(method: *`string`*, url: *`string`*, payload?: *`string`*, progressSubscriber?: *`Subscriber`<`any`>*, headers?: *`any`*): `Observable`<`any`>

*Defined in [Adapters/RestAdapter.ts:121](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L121)*

Perform an ajax request to the given url, using the given http method.

If payload is provided: it is used as query params when performing a GET request, otherwise it is provided in the body of the request.

If headers are provided, they are merged with the default application headers.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| method | `string` | - |  \- |
| url | `string` | - |  \- |
| `Optional` payload | `string` | - |  \- |
| `Optional` progressSubscriber | `Subscriber`<`any`> | - |
| `Default value` headers | `any` |  {} |  \- |

**Returns:** `Observable`<`any`>

___
<a id="patchitem"></a>

###  patchItem

▸ **patchItem**(id: *`any`*, item: *`string`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:93](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L93)*

Perform a PATCH request to the API to update the given T item based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |  \- |
| item | `string` |  \- |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`string`>

___
<a id="updateitem"></a>

###  updateItem

▸ **updateItem**(id: *`any`*, item: *`string`*, progressSubscriber?: *`Subscriber`<`any`>*): `Observable`<`string`>

*Defined in [Adapters/RestAdapter.ts:82](https://github.com/Rediker-Software/redux-data-service/blob/b275c20/src/Adapters/RestAdapter.ts#L82)*

Perform a PUT request to the API to update the given T item based on the given id.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |  \- |
| item | `string` |  \- |
| `Optional` progressSubscriber | `Subscriber`<`any`> |

**Returns:** `Observable`<`string`>

___

