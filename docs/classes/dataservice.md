[redux-data-service](../README.md) > [DataService](../classes/dataservice.md)

# Class: DataService

`DataService` is an `IService` for marshalling data (by default, with an external service such as a REST end point). To use this class, extend it and set the `name` and `ModelClass` fields in the child class.

The default `IAdapter` for this class is a `RestAdapter`. It uses the Service's `name` to determine the name of the corresponding API end-point. `env.process.API_URL` as the API root url. To override this default functionality, the `_adapter` property should be set on the child class.

The default `ISerializer` for this class is a `RestSerializer`. The `_serializer` property should be set on the child class if you want to:

*   Change how the model is serialized or which values should be omitted
*   Change how the incoming data is transformed when the model is created
*__abstract__*: 

*__class__*: 

## Type parameters
#### T :  [IModelData](../interfaces/imodeldata.md)
## Hierarchy

 [BaseService](baseservice.md)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>

**↳ DataService**

↳  [FakeModelService](fakemodelservice.md)

## Implements

* [IService](../interfaces/iservice.md)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>

## Index

### Properties

* [DataServiceStateRecord](dataservice.md#dataservicestaterecord)
* [ModelClass](dataservice.md#modelclass)
* [_adapter](dataservice.md#_adapter)
* [_serializer](dataservice.md#_serializer)
* [internalActions](dataservice.md#internalactions)
* [internalEpics](dataservice.md#internalepics)
* [internalReducers](dataservice.md#internalreducers)
* [internalSelectors](dataservice.md#internalselectors)
* [internalTypes](dataservice.md#internaltypes)
* [name](dataservice.md#name)
* [observablesByIdCache](dataservice.md#observablesbyidcache)
* [observablesByIdsCache](dataservice.md#observablesbyidscache)
* [observablesByQueryCache](dataservice.md#observablesbyquerycache)
* [shadowObject](dataservice.md#shadowobject)
* [dispatch](dataservice.md#dispatch)
* [state$](dataservice.md#state_)

### Accessors

* [actions](dataservice.md#actions)
* [adapter](dataservice.md#adapter)
* [epics](dataservice.md#epics)
* [reducer](dataservice.md#reducer)
* [reducers](dataservice.md#reducers)
* [selectors](dataservice.md#selectors)
* [serializer](dataservice.md#serializer)
* [types](dataservice.md#types)

### Methods

* [createActions](dataservice.md#createactions)
* [createEpics](dataservice.md#createepics)
* [createNew](dataservice.md#createnew)
* [createRecordEpic](dataservice.md#createrecordepic)
* [createReducers](dataservice.md#createreducers)
* [createSelectors](dataservice.md#createselectors)
* [createTypes](dataservice.md#createtypes)
* [deleteRecordEpic](dataservice.md#deleterecordepic)
* [fetchAllEpic](dataservice.md#fetchallepic)
* [fetchAllReducer](dataservice.md#fetchallreducer)
* [fetchRecordEpic](dataservice.md#fetchrecordepic)
* [getAll](dataservice.md#getall)
* [getById](dataservice.md#getbyid)
* [getByIds](dataservice.md#getbyids)
* [getByQuery](dataservice.md#getbyquery)
* [getDefaultQueryParams](dataservice.md#getdefaultqueryparams)
* [getDefaultState](dataservice.md#getdefaultstate)
* [getShadowObject](dataservice.md#getshadowobject)
* [makeActionCreator](dataservice.md#makeactioncreator)
* [makeActionType](dataservice.md#makeactiontype)
* [patchRecordEpic](dataservice.md#patchrecordepic)
* [pushAllReducer](dataservice.md#pushallreducer)
* [pushRecordReducer](dataservice.md#pushrecordreducer)
* [setErrorsReducer](dataservice.md#seterrorsreducer)
* [setFieldReducer](dataservice.md#setfieldreducer)
* [setMetaFieldReducer](dataservice.md#setmetafieldreducer)
* [setRelationshipReducer](dataservice.md#setrelationshipreducer)
* [shouldFetchAll](dataservice.md#shouldfetchall)
* [shouldFetchItem](dataservice.md#shouldfetchitem)
* [unloadAllReducer](dataservice.md#unloadallreducer)
* [unloadRecordReducer](dataservice.md#unloadrecordreducer)
* [updateRecordEpic](dataservice.md#updaterecordepic)
* [getStateObservable](dataservice.md#getstateobservable)
* [registerDispatch](dataservice.md#registerdispatch)
* [setStateObservable](dataservice.md#setstateobservable)

---

## Properties

<a id="dataservicestaterecord"></a>

### `<Private>` DataServiceStateRecord

**● DataServiceStateRecord**: *`Factory`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>>* =  Record<IDataServiceState<T>>({
    items: Map<string, IModel<T>>(),
    requestCache: Map<IRequestCacheKey, IRequestCacheRecord>(),
  })

*Defined in [Services/DataService.ts:111](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L111)*

___
<a id="modelclass"></a>

### `<Abstract>` ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*

*Defined in [Services/DataService.ts:103](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L103)*

___
<a id="_adapter"></a>

### `<Protected>` _adapter

**● _adapter**: *[IAdapter](../interfaces/iadapter.md)<`any`>*

*Defined in [Services/DataService.ts:105](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L105)*

___
<a id="_serializer"></a>

### `<Protected>` _serializer

**● _serializer**: *[ISerializer](../interfaces/iserializer.md)<`T`, `any`>*

*Defined in [Services/DataService.ts:104](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L104)*

___
<a id="internalactions"></a>

### `<Protected>``<Optional>` internalActions

**● internalActions**: *[IActionCreators](../interfaces/iactioncreators.md)*

*Inherited from [BaseService](baseservice.md).[internalActions](baseservice.md#internalactions)*

*Defined in [Services/BaseService.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L45)*

___
<a id="internalepics"></a>

### `<Protected>``<Optional>` internalEpics

**● internalEpics**: *[IActionEpic](../#iactionepic)[]*

*Inherited from [BaseService](baseservice.md).[internalEpics](baseservice.md#internalepics)*

*Defined in [Services/BaseService.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L44)*

___
<a id="internalreducers"></a>

### `<Protected>``<Optional>` internalReducers

**● internalReducers**: *[IReducers](../#ireducers)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>*

*Inherited from [BaseService](baseservice.md).[internalReducers](baseservice.md#internalreducers)*

*Defined in [Services/BaseService.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L43)*

___
<a id="internalselectors"></a>

### `<Protected>``<Optional>` internalSelectors

**● internalSelectors**: *[ISelectors](../interfaces/iselectors.md)*

*Inherited from [BaseService](baseservice.md).[internalSelectors](baseservice.md#internalselectors)*

*Defined in [Services/BaseService.ts:46](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L46)*

___
<a id="internaltypes"></a>

### `<Protected>` internalTypes

**● internalTypes**: *[IActionTypes](../interfaces/iactiontypes.md)*

*Inherited from [BaseService](baseservice.md).[internalTypes](baseservice.md#internaltypes)*

*Defined in [Services/BaseService.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L47)*

___
<a id="name"></a>

### `<Abstract>` name

**● name**: *`string`*

*Implementation of [IService](../interfaces/iservice.md).[name](../interfaces/iservice.md#name)*

*Inherited from [BaseService](baseservice.md).[name](baseservice.md#name)*

*Defined in [Services/BaseService.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L39)*

___
<a id="observablesbyidcache"></a>

### `<Protected>` observablesByIdCache

**● observablesByIdCache**: *`object`*

*Defined in [Services/DataService.ts:107](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L107)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="observablesbyidscache"></a>

### `<Protected>` observablesByIdsCache

**● observablesByIdsCache**: *`object`*

*Defined in [Services/DataService.ts:108](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L108)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="observablesbyquerycache"></a>

### `<Protected>` observablesByQueryCache

**● observablesByQueryCache**: *`object`*

*Defined in [Services/DataService.ts:109](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L109)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="shadowobject"></a>

### `<Protected>` shadowObject

**● shadowObject**: *[IModel](../interfaces/imodel.md)<`T`>* =  null

*Defined in [Services/DataService.ts:106](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L106)*

___
<a id="dispatch"></a>

### `<Static>``<Protected>` dispatch

**● dispatch**: *`function`*

*Inherited from [BaseService](baseservice.md).[dispatch](baseservice.md#dispatch)*

*Defined in [Services/BaseService.ts:41](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L41)*

#### Type declaration
▸(action: *[IAction](../interfaces/iaction.md)*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| action | [IAction](../interfaces/iaction.md) |

**Returns:** `void`

___
<a id="state_"></a>

### `<Static>``<Protected>` state$

**● state$**: *`any`*

*Inherited from [BaseService](baseservice.md).[state$](baseservice.md#state_)*

*Defined in [Services/BaseService.ts:42](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L42)*

___

## Accessors

<a id="actions"></a>

###  actions

getactions(): [IActionCreators](../interfaces/iactioncreators.md)

*Inherited from [BaseService](baseservice.md).[actions](baseservice.md#actions)*

*Defined in [Services/BaseService.ts:205](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L205)*

Returns a map of IActionCreators, which when dispatched to Redux, one or many reducers or epics may act on that IAction.

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="adapter"></a>

###  adapter

getadapter(): [IAdapter](../interfaces/iadapter.md)<`any`>

*Defined in [Services/DataService.ts:116](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L116)*

**Returns:** [IAdapter](../interfaces/iadapter.md)<`any`>

___
<a id="epics"></a>

###  epics

getepics(): [IActionEpic](../#iactionepic)[]

*Inherited from [BaseService](baseservice.md).[epics](baseservice.md#epics)*

*Defined in [Services/BaseService.ts:248](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L248)*

Returns an array of RxJS Observeable Epics from redux-observable, which are observers that are always listening for a given ActionType. They are useful for triggering side effects (such as loading data asynchronously) in response to an IAction via chainable, asynchronous "streams".

They will usually emit one or many Actions to pass data into Redux (via a IReducer) or to trigger other Epics. Not only can they be daisy-chained in this manner, RxJS also supports a variety of other common use-cases such as throttling/debouncing and retrying failed promises.

Notes:

*   When an IAction is dispatched to Redux, it hits the reducers BEFORE the epics.
*   Before you can use something from RxJS (such as an operator), you must import it first.

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="reducer"></a>

###  reducer

getreducer(): [IReducer](../#ireducer)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>

*Inherited from [BaseService](baseservice.md).[reducer](baseservice.md#reducer)*

*Defined in [Services/BaseService.ts:170](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L170)*

Returns a single IReducer function which triggers the methods mapped in the internal `reducers` object to the given IAction type.

This is the function that is actually injected into and later triggered by Redux.

**Returns:** [IReducer](../#ireducer)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>

___
<a id="reducers"></a>

### `<Protected>` reducers

getreducers(): [IReducers](../#ireducers)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>

*Inherited from [BaseService](baseservice.md).[reducers](baseservice.md#reducers)*

*Defined in [Services/BaseService.ts:156](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L156)*

Return a map of functions which are triggered by the IReducer for a given ActionType. They are used to update the Redux state in response to a given IAction.

Like a reducer, they are given the Redux `state` object and the `action` that was triggered and should return a new copy of the immutable state. However, these are not individually added to Redux, but rather through the single reducer function returned for this IService.

**Returns:** [IReducers](../#ireducers)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>

___
<a id="selectors"></a>

###  selectors

getselectors(): [ISelectors](../interfaces/iselectors.md)

*Inherited from [BaseService](baseservice.md).[selectors](baseservice.md#selectors)*

*Defined in [Services/BaseService.ts:224](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L224)*

Returns an object of selectors using Reselect. ISelectors are useful for efficiently filtering data from the Redux state.

ISelectors are composable: a selector may be built from other selectors

ISelectors are memoized: the output from each selector is cached, so future requests will not require a recompute unless its inputs change

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="serializer"></a>

###  serializer

getserializer(): [ISerializer](../interfaces/iserializer.md)<`T`, `any`>

*Defined in [Services/DataService.ts:124](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L124)*

**Returns:** [ISerializer](../interfaces/iserializer.md)<`T`, `any`>

___
<a id="types"></a>

###  types

gettypes(): [IActionTypes](../interfaces/iactiontypes.md)

*Inherited from [BaseService](baseservice.md).[types](baseservice.md#types)*

*Defined in [Services/BaseService.ts:191](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L191)*

Returns a map of IActionTypes, which are string "constants" that represent the type of an IAction. When an IAction is dispatched to Redux via an IActionCreator, one or many reducers or epics may act on that IAction

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___

## Methods

<a id="createactions"></a>

###  createActions

▸ **createActions**(): [IActionCreators](../interfaces/iactioncreators.md)

*Overrides [BaseService](baseservice.md).[createActions](baseservice.md#createactions)*

*Defined in [Services/DataService.ts:270](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L270)*

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="createepics"></a>

###  createEpics

▸ **createEpics**(): [IActionEpic](../#iactionepic)[]

*Overrides [BaseService](baseservice.md).[createEpics](baseservice.md#createepics)*

*Defined in [Services/DataService.ts:457](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L457)*

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="createnew"></a>

###  createNew

▸ **createNew**(initialData?: *`Partial`<`T`>*): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Services/DataService.ts:149](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L149)*

Create a new instance of the Model which has not been committed to the API yet.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` initialData | `Partial`<`T`> |  {} |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="createrecordepic"></a>

###  createRecordEpic

▸ **createRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService.ts:503](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L503)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="createreducers"></a>

###  createReducers

▸ **createReducers**(): `object`

*Overrides [BaseService](baseservice.md).[createReducers](baseservice.md#createreducers)*

*Defined in [Services/DataService.ts:344](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L344)*

**Returns:** `object`

___
<a id="createselectors"></a>

###  createSelectors

▸ **createSelectors**(): [ISelectors](../interfaces/iselectors.md)

*Overrides [BaseService](baseservice.md).[createSelectors](baseservice.md#createselectors)*

*Defined in [Services/DataService.ts:296](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L296)*

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="createtypes"></a>

###  createTypes

▸ **createTypes**(): [IActionTypes](../interfaces/iactiontypes.md)

*Overrides [BaseService](baseservice.md).[createTypes](baseservice.md#createtypes)*

*Defined in [Services/DataService.ts:245](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L245)*

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___
<a id="deleterecordepic"></a>

###  deleteRecordEpic

▸ **deleteRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService.ts:547](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L547)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="fetchallepic"></a>

###  fetchAllEpic

▸ **fetchAllEpic**(action$: *[IObserveableAction](../#iobserveableaction)*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService.ts:472](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L472)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction) |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="fetchallreducer"></a>

###  fetchAllReducer

▸ **fetchAllReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)<`any`>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:360](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L360)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md)<`any`> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="fetchrecordepic"></a>

###  fetchRecordEpic

▸ **fetchRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`T`>>

*Defined in [Services/DataService.ts:489](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L489)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction) |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`T`>>

___
<a id="getall"></a>

###  getAll

▸ **getAll**(): `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

*Defined in [Services/DataService.ts:218](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L218)*

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="getbyid"></a>

###  getById

▸ **getById**(id: *`string`*): `Observable`<[IModel](../interfaces/imodel.md)<`T`>>

*Defined in [Services/DataService.ts:160](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L160)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="getbyids"></a>

###  getByIds

▸ **getByIds**(ids: *`string`[]*): `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

*Defined in [Services/DataService.ts:181](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L181)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| ids | `string`[] |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="getbyquery"></a>

###  getByQuery

▸ **getByQuery**(queryParams: *`any`*): `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

*Defined in [Services/DataService.ts:198](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L198)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| queryParams | `any` |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="getdefaultqueryparams"></a>

###  getDefaultQueryParams

▸ **getDefaultQueryParams**(): `Observable`<`any`>

*Defined in [Services/DataService.ts:237](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L237)*

Get the default query params object to use when querying for the Model associated to this DataService.

**Returns:** `Observable`<`any`>
any

___
<a id="getdefaultstate"></a>

###  getDefaultState

▸ **getDefaultState**(): [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>

*Overrides [BaseService](baseservice.md).[getDefaultState](baseservice.md#getdefaultstate)*

*Defined in [Services/DataService.ts:132](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L132)*

**Returns:** [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>

___
<a id="getshadowobject"></a>

###  getShadowObject

▸ **getShadowObject**(): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Services/DataService.ts:136](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L136)*

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="makeactioncreator"></a>

###  makeActionCreator

▸ **makeActionCreator**T,M(type: *`string`*, defaultMeta?: *`any`*): [IActionCreator](../#iactioncreator)

*Inherited from [BaseService](baseservice.md).[makeActionCreator](baseservice.md#makeactioncreator)*

*Defined in [Services/BaseService.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L95)*

Creates an IActionCreator function for triggering an IAction with the given type.

**Type parameters:**

#### T :  `any`
#### M 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  - |
| `Optional` defaultMeta | `any` |  - |

**Returns:** [IActionCreator](../#iactioncreator)

___
<a id="makeactiontype"></a>

###  makeActionType

▸ **makeActionType**(type: *`string`*): `string`

*Inherited from [BaseService](baseservice.md).[makeActionType](baseservice.md#makeactiontype)*

*Defined in [Services/BaseService.ts:64](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L64)*

Returns a namespaced IAction type in the form `<name>/<type>`. For example: `student/FETCH_ALL`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  - |

**Returns:** `string`

___
<a id="patchrecordepic"></a>

###  patchRecordEpic

▸ **patchRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<`Partial`<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService.ts:534](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L534)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<`Partial`<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="pushallreducer"></a>

###  pushAllReducer

▸ **pushAllReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)<[IPushAll](../interfaces/ipushall.md)<`T`>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:373](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L373)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md)<[IPushAll](../interfaces/ipushall.md)<`T`>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="pushrecordreducer"></a>

###  pushRecordReducer

▸ **pushRecordReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)<[IModel](../interfaces/imodel.md)<`T`>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:386](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L386)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md)<[IModel](../interfaces/imodel.md)<`T`>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="seterrorsreducer"></a>

###  setErrorsReducer

▸ **setErrorsReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:408](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L408)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md) |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="setfieldreducer"></a>

###  setFieldReducer

▸ **setFieldReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<`T`>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:417](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L417)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<`T`>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="setmetafieldreducer"></a>

###  setMetaFieldReducer

▸ **setMetaFieldReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)<[ISetMetaField](../interfaces/isetmetafield.md)<`T`>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:430](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L430)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md)<[ISetMetaField](../interfaces/isetmetafield.md)<`T`>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="setrelationshipreducer"></a>

###  setRelationshipReducer

▸ **setRelationshipReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<`T`>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:440](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L440)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<`T`>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="shouldfetchall"></a>

### `<Protected>` shouldFetchAll

▸ **shouldFetchAll**(action: *`any`*, state: *`any`*): `any`

*Defined in [Services/DataService.ts:560](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L560)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action | `any` |
| state | `any` |

**Returns:** `any`

___
<a id="shouldfetchitem"></a>

### `<Private>` shouldFetchItem

▸ **shouldFetchItem**(action: *`any`*, state: *`any`*): `any`

*Defined in [Services/DataService.ts:565](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L565)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action | `any` |
| state | `any` |

**Returns:** `any`

___
<a id="unloadallreducer"></a>

###  unloadAllReducer

▸ **unloadAllReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:391](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L391)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="unloadrecordreducer"></a>

###  unloadRecordReducer

▸ **unloadRecordReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>*, action: *[IAction](../interfaces/iaction.md)<[IModelId](../interfaces/imodelid.md)>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Defined in [Services/DataService.ts:398](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L398)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`> |
| action | [IAction](../interfaces/iaction.md)<[IModelId](../interfaces/imodelid.md)> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="updaterecordepic"></a>

###  updateRecordEpic

▸ **updateRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService.ts:519](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/DataService.ts#L519)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="getstateobservable"></a>

### `<Static>` getStateObservable

▸ **getStateObservable**(): `Observable`<`any`>

*Inherited from [BaseService](baseservice.md).[getStateObservable](baseservice.md#getstateobservable)*

*Defined in [Services/BaseService.ts:82](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L82)*

**Returns:** `Observable`<`any`>

___
<a id="registerdispatch"></a>

### `<Static>` registerDispatch

▸ **registerDispatch**(dispatch: *`any`*): `void`

*Inherited from [BaseService](baseservice.md).[registerDispatch](baseservice.md#registerdispatch)*

*Defined in [Services/BaseService.ts:74](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L74)*

Registers the dispatch function that is passed in from the middleware.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dispatch | `any` |  - |

**Returns:** `void`
void

___
<a id="setstateobservable"></a>

### `<Static>` setStateObservable

▸ **setStateObservable**(state$: *`Observable`<`any`>*): `void`

*Inherited from [BaseService](baseservice.md).[setStateObservable](baseservice.md#setstateobservable)*

*Defined in [Services/BaseService.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Services/BaseService.ts#L78)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state$ | `Observable`<`any`> |

**Returns:** `void`

___

