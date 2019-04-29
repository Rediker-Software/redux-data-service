[redux-data-service](../README.md) > [FakeModelService](../classes/fakemodelservice.md)

# Class: FakeModelService

## Type parameters
#### R 
## Hierarchy

↳  [DataService](dataservice.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

**↳ FakeModelService**

## Implements

* [IService](../interfaces/iservice.md)<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

## Index

### Properties

* [AdapterClass](fakemodelservice.md#adapterclass)
* [MapperClass](fakemodelservice.md#mapperclass)
* [ModelClass](fakemodelservice.md#modelclass)
* [SerializerClass](fakemodelservice.md#serializerclass)
* [_adapter](fakemodelservice.md#_adapter)
* [_mapper](fakemodelservice.md#_mapper)
* [_serializer](fakemodelservice.md#_serializer)
* [internalActions](fakemodelservice.md#internalactions)
* [internalEpics](fakemodelservice.md#internalepics)
* [internalReducers](fakemodelservice.md#internalreducers)
* [internalSelectors](fakemodelservice.md#internalselectors)
* [internalTypes](fakemodelservice.md#internaltypes)
* [name](fakemodelservice.md#name)
* [observablesByIdCache](fakemodelservice.md#observablesbyidcache)
* [observablesByIdsCache](fakemodelservice.md#observablesbyidscache)
* [observablesByQueryCache](fakemodelservice.md#observablesbyquerycache)
* [shadowObject](fakemodelservice.md#shadowobject)
* [dispatch](fakemodelservice.md#dispatch)
* [state$](fakemodelservice.md#state_)

### Accessors

* [actions](fakemodelservice.md#actions)
* [adapter](fakemodelservice.md#adapter)
* [epics](fakemodelservice.md#epics)
* [mapper](fakemodelservice.md#mapper)
* [reducer](fakemodelservice.md#reducer)
* [reducers](fakemodelservice.md#reducers)
* [selectors](fakemodelservice.md#selectors)
* [serializer](fakemodelservice.md#serializer)
* [types](fakemodelservice.md#types)

### Methods

* [createActions](fakemodelservice.md#createactions)
* [createEpics](fakemodelservice.md#createepics)
* [createNew](fakemodelservice.md#createnew)
* [createReducers](fakemodelservice.md#createreducers)
* [createSelectors](fakemodelservice.md#createselectors)
* [createTypes](fakemodelservice.md#createtypes)
* [deleteRecordEpic](fakemodelservice.md#deleterecordepic)
* [fetchAllEpic](fakemodelservice.md#fetchallepic)
* [getAll](fakemodelservice.md#getall)
* [getById](fakemodelservice.md#getbyid)
* [getByIds](fakemodelservice.md#getbyids)
* [getByQuery](fakemodelservice.md#getbyquery)
* [getDefaultQueryParams](fakemodelservice.md#getdefaultqueryparams)
* [getDefaultState](fakemodelservice.md#getdefaultstate)
* [getShadowObject](fakemodelservice.md#getshadowobject)
* [makeActionCreator](fakemodelservice.md#makeactioncreator)
* [makeActionType](fakemodelservice.md#makeactiontype)
* [patchRecordEpic](fakemodelservice.md#patchrecordepic)
* [updateRecordEpic](fakemodelservice.md#updaterecordepic)
* [getStateObservable](fakemodelservice.md#getstateobservable)
* [registerDispatch](fakemodelservice.md#registerdispatch)
* [setStateObservable](fakemodelservice.md#setstateobservable)

---

## Properties

<a id="adapterclass"></a>

### `<Protected>` AdapterClass

**● AdapterClass**: *[IAdapterFactory](../interfaces/iadapterfactory.md)<`any`>* =  MockAdapter

*Overrides [DataService](dataservice.md).[AdapterClass](dataservice.md#adapterclass)*

*Defined in [Services/DataService/DataService.mock.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.mock.ts#L11)*

___
<a id="mapperclass"></a>

### `<Protected>` MapperClass

**● MapperClass**: *[IMapperFactory](../interfaces/imapperfactory.md)<`any`>* =  MockMapper

*Overrides [DataService](dataservice.md).[MapperClass](dataservice.md#mapperclass)*

*Defined in [Services/DataService/DataService.mock.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.mock.ts#L13)*

___
<a id="modelclass"></a>

###  ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>* =  FakeModel

*Overrides [DataService](dataservice.md).[ModelClass](dataservice.md#modelclass)*

*Defined in [Services/DataService/DataService.mock.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.mock.ts#L10)*

___
<a id="serializerclass"></a>

### `<Protected>` SerializerClass

**● SerializerClass**: *[ISerializerFactory](../interfaces/iserializerfactory.md)<`any`, `any`>* =  MockSerializer

*Overrides [DataService](dataservice.md).[SerializerClass](dataservice.md#serializerclass)*

*Defined in [Services/DataService/DataService.mock.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.mock.ts#L12)*

___
<a id="_adapter"></a>

### `<Protected>` _adapter

**● _adapter**: *[IAdapter](../interfaces/iadapter.md)<`any`>*

*Inherited from [DataService](dataservice.md).[_adapter](dataservice.md#_adapter)*

*Defined in [Services/DataService/DataService.ts:97](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L97)*

___
<a id="_mapper"></a>

### `<Protected>` _mapper

**● _mapper**: *[IMapper](../interfaces/imapper.md)<`any`>*

*Inherited from [DataService](dataservice.md).[_mapper](dataservice.md#_mapper)*

*Defined in [Services/DataService/DataService.ts:98](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L98)*

___
<a id="_serializer"></a>

### `<Protected>` _serializer

**● _serializer**: *[ISerializer](../interfaces/iserializer.md)<`any`, `R`>*

*Inherited from [DataService](dataservice.md).[_serializer](dataservice.md#_serializer)*

*Defined in [Services/DataService/DataService.ts:99](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L99)*

___
<a id="internalactions"></a>

### `<Protected>``<Optional>` internalActions

**● internalActions**: *[IActionCreators](../interfaces/iactioncreators.md)*

*Inherited from [BaseService](baseservice.md).[internalActions](baseservice.md#internalactions)*

*Defined in [Services/BaseService.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L45)*

___
<a id="internalepics"></a>

### `<Protected>``<Optional>` internalEpics

**● internalEpics**: *[IActionEpic](../#iactionepic)[]*

*Inherited from [BaseService](baseservice.md).[internalEpics](baseservice.md#internalepics)*

*Defined in [Services/BaseService.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L44)*

___
<a id="internalreducers"></a>

### `<Protected>``<Optional>` internalReducers

**● internalReducers**: *[IReducers](../#ireducers)<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*

*Inherited from [BaseService](baseservice.md).[internalReducers](baseservice.md#internalreducers)*

*Defined in [Services/BaseService.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L43)*

___
<a id="internalselectors"></a>

### `<Protected>``<Optional>` internalSelectors

**● internalSelectors**: *[ISelectors](../interfaces/iselectors.md)*

*Inherited from [BaseService](baseservice.md).[internalSelectors](baseservice.md#internalselectors)*

*Defined in [Services/BaseService.ts:46](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L46)*

___
<a id="internaltypes"></a>

### `<Protected>` internalTypes

**● internalTypes**: *[IActionTypes](../interfaces/iactiontypes.md)*

*Inherited from [BaseService](baseservice.md).[internalTypes](baseservice.md#internaltypes)*

*Defined in [Services/BaseService.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L47)*

___
<a id="name"></a>

###  name

**● name**: *"fakeModel"* = "fakeModel"

*Implementation of [IService](../interfaces/iservice.md).[name](../interfaces/iservice.md#name)*

*Overrides [BaseService](baseservice.md).[name](baseservice.md#name)*

*Defined in [Services/DataService/DataService.mock.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.mock.ts#L9)*

___
<a id="observablesbyidcache"></a>

### `<Protected>` observablesByIdCache

**● observablesByIdCache**: *`object`*

*Inherited from [DataService](dataservice.md).[observablesByIdCache](dataservice.md#observablesbyidcache)*

*Defined in [Services/DataService/DataService.ts:102](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L102)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="observablesbyidscache"></a>

### `<Protected>` observablesByIdsCache

**● observablesByIdsCache**: *`object`*

*Inherited from [DataService](dataservice.md).[observablesByIdsCache](dataservice.md#observablesbyidscache)*

*Defined in [Services/DataService/DataService.ts:103](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L103)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="observablesbyquerycache"></a>

### `<Protected>` observablesByQueryCache

**● observablesByQueryCache**: *`object`*

*Inherited from [DataService](dataservice.md).[observablesByQueryCache](dataservice.md#observablesbyquerycache)*

*Defined in [Services/DataService/DataService.ts:104](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L104)*

#### Type declaration

[id: `string`]: `Observable`<[IQueryManager](../interfaces/iquerymanager.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="shadowobject"></a>

### `<Protected>` shadowObject

**● shadowObject**: *[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>* =  null

*Inherited from [DataService](dataservice.md).[shadowObject](dataservice.md#shadowobject)*

*Defined in [Services/DataService/DataService.ts:101](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L101)*

___
<a id="dispatch"></a>

### `<Static>``<Protected>` dispatch

**● dispatch**: *`function`*

*Inherited from [BaseService](baseservice.md).[dispatch](baseservice.md#dispatch)*

*Defined in [Services/BaseService.ts:41](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L41)*

#### Type declaration
▸(action: *[IAction](../interfaces/iaction.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | [IAction](../interfaces/iaction.md) |

**Returns:** `void`

___
<a id="state_"></a>

### `<Static>``<Protected>` state$

**● state$**: *`any`*

*Inherited from [BaseService](baseservice.md).[state$](baseservice.md#state_)*

*Defined in [Services/BaseService.ts:42](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L42)*

___

## Accessors

<a id="actions"></a>

###  actions

getactions(): [IActionCreators](../interfaces/iactioncreators.md)

*Inherited from [BaseService](baseservice.md).[actions](baseservice.md#actions)*

*Defined in [Services/BaseService.ts:205](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L205)*

Returns a map of IActionCreators, which when dispatched to Redux, one or many Reducers or epics may act on that IAction.

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="adapter"></a>

###  adapter

getadapter(): [IAdapter](../interfaces/iadapter.md)<`any`>

*Inherited from [DataService](dataservice.md).[adapter](dataservice.md#adapter)*

*Defined in [Services/DataService/DataService.ts:106](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L106)*

**Returns:** [IAdapter](../interfaces/iadapter.md)<`any`>

___
<a id="epics"></a>

###  epics

getepics(): [IActionEpic](../#iactionepic)[]

*Inherited from [BaseService](baseservice.md).[epics](baseservice.md#epics)*

*Defined in [Services/BaseService.ts:248](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L248)*

Returns an array of RxJS Observeable Epics from redux-observable, which are observers that are always listening for a given ActionType. They are useful for triggering side effects (such as loading data asynchronously) in response to an IAction via chainable, asynchronous "streams".

They will usually emit one or many Actions to pass data into Redux (via a IReducer) or to trigger other Epics. Not only can they be daisy-chained in this manner, RxJS also supports a variety of other common use-cases such as throttling/debouncing and retrying failed promises.

Notes:

*   When an IAction is dispatched to Redux, it hits the reducers BEFORE the epics.
*   Before you can use something from RxJS (such as an operator), you must import it first.

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="mapper"></a>

###  mapper

getmapper(): [IMapper](../interfaces/imapper.md)<`any`, `any`>

*Inherited from [DataService](dataservice.md).[mapper](dataservice.md#mapper)*

*Defined in [Services/DataService/DataService.ts:115](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L115)*

**Returns:** [IMapper](../interfaces/imapper.md)<`any`, `any`>

___
<a id="reducer"></a>

###  reducer

getreducer(): [IReducer](../#ireducer)<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [BaseService](baseservice.md).[reducer](baseservice.md#reducer)*

*Defined in [Services/BaseService.ts:170](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L170)*

Returns a single IReducer function which triggers the methods mapped in the internal `reducers` object to the given IAction type.

This is the function that is actually injected into and later triggered by Redux.

**Returns:** [IReducer](../#ireducer)<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="reducers"></a>

### `<Protected>` reducers

getreducers(): [IReducers](../#ireducers)<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [BaseService](baseservice.md).[reducers](baseservice.md#reducers)*

*Defined in [Services/BaseService.ts:156](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L156)*

Return a map of functions which are triggered by the IReducer for a given ActionType. They are used to update the Redux state in response to a given IAction.

Like a reducer, they are given the Redux `state` object and the `action` that was triggered and should return a new copy of the immutable state. However, these are not individually added to Redux, but rather through the single reducer function returned for this IService.

**Returns:** [IReducers](../#ireducers)<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="selectors"></a>

###  selectors

getselectors(): [ISelectors](../interfaces/iselectors.md)

*Inherited from [BaseService](baseservice.md).[selectors](baseservice.md#selectors)*

*Defined in [Services/BaseService.ts:224](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L224)*

Returns an object of selectors using Reselect. ISelectors are useful for efficiently filtering data from the Redux state.

ISelectors are composable: a selector may be built from other selectors

ISelectors are memoized: the output from each selector is cached, so future requests will not require a recompute unless its inputs change

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="serializer"></a>

###  serializer

getserializer(): [ISerializer](../interfaces/iserializer.md)<`any`, `R`>

*Inherited from [DataService](dataservice.md).[serializer](dataservice.md#serializer)*

*Defined in [Services/DataService/DataService.ts:124](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L124)*

**Returns:** [ISerializer](../interfaces/iserializer.md)<`any`, `R`>

___
<a id="types"></a>

###  types

gettypes(): [IActionTypes](../interfaces/iactiontypes.md)

*Inherited from [BaseService](baseservice.md).[types](baseservice.md#types)*

*Defined in [Services/BaseService.ts:191](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L191)*

Returns a map of IActionTypes, which are string "constants" that represent the type of an IAction. When an IAction is dispatched to Redux via an IActionCreator, one or many reducers or epics may act on that IAction

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___

## Methods

<a id="createactions"></a>

###  createActions

▸ **createActions**(): [IActionCreators](../interfaces/iactioncreators.md)

*Inherited from [DataService](dataservice.md).[createActions](dataservice.md#createactions)*

*Overrides [BaseService](baseservice.md).[createActions](baseservice.md#createactions)*

*Defined in [Services/DataService/DataService.ts:284](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L284)*

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="createepics"></a>

###  createEpics

▸ **createEpics**(): [IActionEpic](../#iactionepic)[]

*Inherited from [DataService](dataservice.md).[createEpics](dataservice.md#createepics)*

*Overrides [BaseService](baseservice.md).[createEpics](baseservice.md#createepics)*

*Defined in [Services/DataService/DataService.ts:380](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L380)*

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="createnew"></a>

###  createNew

▸ **createNew**(initialData?: *`Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)>*): [IModel](../interfaces/imodel.md)<`T`>

*Inherited from [DataService](dataservice.md).[createNew](dataservice.md#createnew)*

*Defined in [Services/DataService/DataService.ts:150](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L150)*

Create a new instance of the Model which has not been committed to the API yet.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` initialData | `Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)> |  {} |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="createreducers"></a>

###  createReducers

▸ **createReducers**(): `object`

*Inherited from [DataService](dataservice.md).[createReducers](dataservice.md#createreducers)*

*Overrides [BaseService](baseservice.md).[createReducers](baseservice.md#createreducers)*

*Defined in [Services/DataService/DataService.ts:359](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L359)*

**Returns:** `object`

___
<a id="createselectors"></a>

###  createSelectors

▸ **createSelectors**(): [ISelectors](../interfaces/iselectors.md)

*Inherited from [DataService](dataservice.md).[createSelectors](dataservice.md#createselectors)*

*Overrides [BaseService](baseservice.md).[createSelectors](baseservice.md#createselectors)*

*Defined in [Services/DataService/DataService.ts:311](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L311)*

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="createtypes"></a>

###  createTypes

▸ **createTypes**(): [IActionTypes](../interfaces/iactiontypes.md)

*Inherited from [DataService](dataservice.md).[createTypes](dataservice.md#createtypes)*

*Overrides [BaseService](baseservice.md).[createTypes](baseservice.md#createtypes)*

*Defined in [Services/DataService/DataService.ts:258](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L258)*

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___
<a id="deleterecordepic"></a>

###  deleteRecordEpic

▸ **deleteRecordEpic**(action$: *[IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[deleteRecordEpic](dataservice.md#deleterecordepic)*

*Defined in [Services/DataService/DataService.ts:457](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L457)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="fetchallepic"></a>

###  fetchAllEpic

▸ **fetchAllEpic**(action$: *[IObservableAction](../#iobservableaction)<[IQueryBuilder](../interfaces/iquerybuilder.md),  [IPostActionHandlers](../interfaces/ipostactionhandlers.md) & [IForceReload](../interfaces/iforcereload.md)>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[fetchAllEpic](dataservice.md#fetchallepic)*

*Defined in [Services/DataService/DataService.ts:397](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L397)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IQueryBuilder](../interfaces/iquerybuilder.md),  [IPostActionHandlers](../interfaces/ipostactionhandlers.md) & [IForceReload](../interfaces/iforcereload.md)> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="getall"></a>

###  getAll

▸ **getAll**(): `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

*Inherited from [DataService](dataservice.md).[getAll](dataservice.md#getall)*

*Defined in [Services/DataService/DataService.ts:231](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L231)*

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="getbyid"></a>

###  getById

▸ **getById**(id: *`string`*): `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [DataService](dataservice.md).[getById](dataservice.md#getbyid)*

*Defined in [Services/DataService/DataService.ts:161](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L161)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="getbyids"></a>

###  getByIds

▸ **getByIds**(ids: *`string`[]*): `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

*Inherited from [DataService](dataservice.md).[getByIds](dataservice.md#getbyids)*

*Defined in [Services/DataService/DataService.ts:182](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L182)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ids | `string`[] |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="getbyquery"></a>

###  getByQuery

▸ **getByQuery**(queryBuilder: *[IQueryBuilder](../interfaces/iquerybuilder.md)*): `Observable`<[IQueryManager](../interfaces/iquerymanager.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [DataService](dataservice.md).[getByQuery](dataservice.md#getbyquery)*

*Defined in [Services/DataService/DataService.ts:198](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L198)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| queryBuilder | [IQueryBuilder](../interfaces/iquerybuilder.md) |

**Returns:** `Observable`<[IQueryManager](../interfaces/iquerymanager.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="getdefaultqueryparams"></a>

###  getDefaultQueryParams

▸ **getDefaultQueryParams**(): `Observable`<`any`>

*Inherited from [DataService](dataservice.md).[getDefaultQueryParams](dataservice.md#getdefaultqueryparams)*

*Defined in [Services/DataService/DataService.ts:250](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L250)*

Get the default query params object to use when querying for the Model associated to this DataService.

**Returns:** `Observable`<`any`>
any

___
<a id="getdefaultstate"></a>

###  getDefaultState

▸ **getDefaultState**(): [IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

*Inherited from [DataService](dataservice.md).[getDefaultState](dataservice.md#getdefaultstate)*

*Overrides [BaseService](baseservice.md).[getDefaultState](baseservice.md#getdefaultstate)*

*Defined in [Services/DataService/DataService.ts:133](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L133)*

**Returns:** [IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

___
<a id="getshadowobject"></a>

###  getShadowObject

▸ **getShadowObject**(): [IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

*Inherited from [DataService](dataservice.md).[getShadowObject](dataservice.md#getshadowobject)*

*Defined in [Services/DataService/DataService.ts:137](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L137)*

**Returns:** [IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

___
<a id="makeactioncreator"></a>

###  makeActionCreator

▸ **makeActionCreator**<`T`,`M`>(type: *`string`*, defaultMeta?: *`any`*): [IActionCreator](../#iactioncreator)

*Inherited from [BaseService](baseservice.md).[makeActionCreator](baseservice.md#makeactioncreator)*

*Defined in [Services/BaseService.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L95)*

Creates an IActionCreator function for triggering an IAction with the given type.

**Type parameters:**

#### T :  `any`
#### M 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  \- |
| `Optional` defaultMeta | `any` |  \- |

**Returns:** [IActionCreator](../#iactioncreator)

___
<a id="makeactiontype"></a>

###  makeActionType

▸ **makeActionType**(type: *`string`*): `string`

*Inherited from [BaseService](baseservice.md).[makeActionType](baseservice.md#makeactiontype)*

*Defined in [Services/BaseService.ts:64](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L64)*

Returns a namespaced IAction type in the form `<name>/<type>`. For example: `student/FETCH_ALL`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  \- |

**Returns:** `string`

___
<a id="patchrecordepic"></a>

###  patchRecordEpic

▸ **patchRecordEpic**(action$: *[IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[patchRecordEpic](dataservice.md#patchrecordepic)*

*Defined in [Services/DataService/DataService.ts:440](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L440)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="updaterecordepic"></a>

###  updateRecordEpic

▸ **updateRecordEpic**(action$: *[IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[updateRecordEpic](dataservice.md#updaterecordepic)*

*Defined in [Services/DataService/DataService.ts:423](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/DataService/DataService.ts#L423)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="getstateobservable"></a>

### `<Static>` getStateObservable

▸ **getStateObservable**(): `Observable`<`any`>

*Inherited from [BaseService](baseservice.md).[getStateObservable](baseservice.md#getstateobservable)*

*Defined in [Services/BaseService.ts:82](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L82)*

**Returns:** `Observable`<`any`>

___
<a id="registerdispatch"></a>

### `<Static>` registerDispatch

▸ **registerDispatch**(dispatch: *`any`*): `void`

*Inherited from [BaseService](baseservice.md).[registerDispatch](baseservice.md#registerdispatch)*

*Defined in [Services/BaseService.ts:74](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L74)*

Registers the dispatch function that is passed in from the middleware.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| dispatch | `any` |  \- |

**Returns:** `void`
void

___
<a id="setstateobservable"></a>

### `<Static>` setStateObservable

▸ **setStateObservable**(state$: *`Observable`<`any`>*): `void`

*Inherited from [BaseService](baseservice.md).[setStateObservable](baseservice.md#setstateobservable)*

*Defined in [Services/BaseService.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Services/BaseService.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state$ | `Observable`<`any`> |

**Returns:** `void`

___

