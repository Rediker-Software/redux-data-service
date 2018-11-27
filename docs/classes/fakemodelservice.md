[redux-data-service](../README.md) > [FakeModelService](../classes/fakemodelservice.md)

# Class: FakeModelService

## Type parameters
#### R 
## Hierarchy

↳  [DataService](dataservice.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

**↳ FakeModelService**

## Implements

* [IService](../interfaces/iservice.md)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

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
* [createRecordEpic](fakemodelservice.md#createrecordepic)
* [createReducers](fakemodelservice.md#createreducers)
* [createSelectors](fakemodelservice.md#createselectors)
* [createTypes](fakemodelservice.md#createtypes)
* [deleteRecordEpic](fakemodelservice.md#deleterecordepic)
* [fetchAllEpic](fakemodelservice.md#fetchallepic)
* [fetchAllReducer](fakemodelservice.md#fetchallreducer)
* [fetchRecordEpic](fakemodelservice.md#fetchrecordepic)
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
* [pushAllReducer](fakemodelservice.md#pushallreducer)
* [pushRecordReducer](fakemodelservice.md#pushrecordreducer)
* [setErrorsReducer](fakemodelservice.md#seterrorsreducer)
* [setFieldReducer](fakemodelservice.md#setfieldreducer)
* [setMetaFieldReducer](fakemodelservice.md#setmetafieldreducer)
* [setRelationshipReducer](fakemodelservice.md#setrelationshipreducer)
* [shouldFetchAll](fakemodelservice.md#shouldfetchall)
* [unloadAllReducer](fakemodelservice.md#unloadallreducer)
* [unloadRecordReducer](fakemodelservice.md#unloadrecordreducer)
* [updateRecordEpic](fakemodelservice.md#updaterecordepic)
* [getStateObservable](fakemodelservice.md#getstateobservable)
* [registerDispatch](fakemodelservice.md#registerdispatch)
* [setStateObservable](fakemodelservice.md#setstateobservable)

---

## Properties

<a id="adapterclass"></a>

### `<Protected>` AdapterClass

**● AdapterClass**: *[IAdapterFactory](../interfaces/iadapterfactory.md)<`any`>*

*Inherited from [DataService](dataservice.md).[AdapterClass](dataservice.md#adapterclass)*

*Defined in [Services/DataService.ts:107](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L107)*

___
<a id="mapperclass"></a>

### `<Protected>` MapperClass

**● MapperClass**: *[IMapperFactory](../interfaces/imapperfactory.md)<`any`>*

*Inherited from [DataService](dataservice.md).[MapperClass](dataservice.md#mapperclass)*

*Defined in [Services/DataService.ts:108](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L108)*

___
<a id="modelclass"></a>

###  ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>* =  FakeModel

*Overrides [DataService](dataservice.md).[ModelClass](dataservice.md#modelclass)*

*Defined in [Services/DataService.mock.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.mock.ts#L8)*

___
<a id="serializerclass"></a>

### `<Protected>` SerializerClass

**● SerializerClass**: *[ISerializerFactory](../interfaces/iserializerfactory.md)<`any`, [IFakeModelData](../interfaces/ifakemodeldata.md), `R`>*

*Inherited from [DataService](dataservice.md).[SerializerClass](dataservice.md#serializerclass)*

*Defined in [Services/DataService.ts:109](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L109)*

___
<a id="_adapter"></a>

### `<Protected>` _adapter

**● _adapter**: *[IAdapter](../interfaces/iadapter.md)<`any`>*

*Inherited from [DataService](dataservice.md).[_adapter](dataservice.md#_adapter)*

*Defined in [Services/DataService.ts:111](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L111)*

___
<a id="_mapper"></a>

### `<Protected>` _mapper

**● _mapper**: *[IMapper](../interfaces/imapper.md)<`any`>*

*Inherited from [DataService](dataservice.md).[_mapper](dataservice.md#_mapper)*

*Defined in [Services/DataService.ts:112](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L112)*

___
<a id="_serializer"></a>

### `<Protected>` _serializer

**● _serializer**: *[ISerializer](../interfaces/iserializer.md)<`any`, [IFakeModelData](../interfaces/ifakemodeldata.md), `R`>*

*Inherited from [DataService](dataservice.md).[_serializer](dataservice.md#_serializer)*

*Defined in [Services/DataService.ts:113](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L113)*

___
<a id="internalactions"></a>

### `<Protected>``<Optional>` internalActions

**● internalActions**: *[IActionCreators](../interfaces/iactioncreators.md)*

*Inherited from [BaseService](baseservice.md).[internalActions](baseservice.md#internalactions)*

*Defined in [Services/BaseService.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L45)*

___
<a id="internalepics"></a>

### `<Protected>``<Optional>` internalEpics

**● internalEpics**: *[IActionEpic](../#iactionepic)[]*

*Inherited from [BaseService](baseservice.md).[internalEpics](baseservice.md#internalepics)*

*Defined in [Services/BaseService.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L44)*

___
<a id="internalreducers"></a>

### `<Protected>``<Optional>` internalReducers

**● internalReducers**: *[IReducers](../#ireducers)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*

*Inherited from [BaseService](baseservice.md).[internalReducers](baseservice.md#internalreducers)*

*Defined in [Services/BaseService.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L43)*

___
<a id="internalselectors"></a>

### `<Protected>``<Optional>` internalSelectors

**● internalSelectors**: *[ISelectors](../interfaces/iselectors.md)*

*Inherited from [BaseService](baseservice.md).[internalSelectors](baseservice.md#internalselectors)*

*Defined in [Services/BaseService.ts:46](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L46)*

___
<a id="internaltypes"></a>

### `<Protected>` internalTypes

**● internalTypes**: *[IActionTypes](../interfaces/iactiontypes.md)*

*Inherited from [BaseService](baseservice.md).[internalTypes](baseservice.md#internaltypes)*

*Defined in [Services/BaseService.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L47)*

___
<a id="name"></a>

###  name

**● name**: *"fakeModel"* = "fakeModel"

*Implementation of [IService](../interfaces/iservice.md).[name](../interfaces/iservice.md#name)*

*Overrides [BaseService](baseservice.md).[name](baseservice.md#name)*

*Defined in [Services/DataService.mock.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.mock.ts#L7)*

___
<a id="observablesbyidcache"></a>

### `<Protected>` observablesByIdCache

**● observablesByIdCache**: *`object`*

*Inherited from [DataService](dataservice.md).[observablesByIdCache](dataservice.md#observablesbyidcache)*

*Defined in [Services/DataService.ts:116](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L116)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="observablesbyidscache"></a>

### `<Protected>` observablesByIdsCache

**● observablesByIdsCache**: *`object`*

*Inherited from [DataService](dataservice.md).[observablesByIdsCache](dataservice.md#observablesbyidscache)*

*Defined in [Services/DataService.ts:117](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L117)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="observablesbyquerycache"></a>

### `<Protected>` observablesByQueryCache

**● observablesByQueryCache**: *`object`*

*Inherited from [DataService](dataservice.md).[observablesByQueryCache](dataservice.md#observablesbyquerycache)*

*Defined in [Services/DataService.ts:118](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L118)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="shadowobject"></a>

### `<Protected>` shadowObject

**● shadowObject**: *[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>* =  null

*Inherited from [DataService](dataservice.md).[shadowObject](dataservice.md#shadowobject)*

*Defined in [Services/DataService.ts:115](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L115)*

___
<a id="dispatch"></a>

### `<Static>``<Protected>` dispatch

**● dispatch**: *`function`*

*Inherited from [BaseService](baseservice.md).[dispatch](baseservice.md#dispatch)*

*Defined in [Services/BaseService.ts:41](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L41)*

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

*Defined in [Services/BaseService.ts:42](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L42)*

___

## Accessors

<a id="actions"></a>

###  actions

getactions(): [IActionCreators](../interfaces/iactioncreators.md)

*Inherited from [BaseService](baseservice.md).[actions](baseservice.md#actions)*

*Defined in [Services/BaseService.ts:205](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L205)*

Returns a map of IActionCreators, which when dispatched to Redux, one or many reducers or epics may act on that IAction.

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="adapter"></a>

###  adapter

getadapter(): [IAdapter](../interfaces/iadapter.md)<`any`>

*Inherited from [DataService](dataservice.md).[adapter](dataservice.md#adapter)*

*Defined in [Services/DataService.ts:125](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L125)*

**Returns:** [IAdapter](../interfaces/iadapter.md)<`any`>

___
<a id="epics"></a>

###  epics

getepics(): [IActionEpic](../#iactionepic)[]

*Inherited from [BaseService](baseservice.md).[epics](baseservice.md#epics)*

*Defined in [Services/BaseService.ts:248](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L248)*

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

*Defined in [Services/DataService.ts:134](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L134)*

**Returns:** [IMapper](../interfaces/imapper.md)<`any`, `any`>

___
<a id="reducer"></a>

###  reducer

getreducer(): [IReducer](../#ireducer)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [BaseService](baseservice.md).[reducer](baseservice.md#reducer)*

*Defined in [Services/BaseService.ts:170](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L170)*

Returns a single IReducer function which triggers the methods mapped in the internal `reducers` object to the given IAction type.

This is the function that is actually injected into and later triggered by Redux.

**Returns:** [IReducer](../#ireducer)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="reducers"></a>

### `<Protected>` reducers

getreducers(): [IReducers](../#ireducers)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [BaseService](baseservice.md).[reducers](baseservice.md#reducers)*

*Defined in [Services/BaseService.ts:156](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L156)*

Return a map of functions which are triggered by the IReducer for a given ActionType. They are used to update the Redux state in response to a given IAction.

Like a reducer, they are given the Redux `state` object and the `action` that was triggered and should return a new copy of the immutable state. However, these are not individually added to Redux, but rather through the single reducer function returned for this IService.

**Returns:** [IReducers](../#ireducers)<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="selectors"></a>

###  selectors

getselectors(): [ISelectors](../interfaces/iselectors.md)

*Inherited from [BaseService](baseservice.md).[selectors](baseservice.md#selectors)*

*Defined in [Services/BaseService.ts:224](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L224)*

Returns an object of selectors using Reselect. ISelectors are useful for efficiently filtering data from the Redux state.

ISelectors are composable: a selector may be built from other selectors

ISelectors are memoized: the output from each selector is cached, so future requests will not require a recompute unless its inputs change

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="serializer"></a>

###  serializer

getserializer(): [ISerializer](../interfaces/iserializer.md)<`any`, `T`, `R`>

*Inherited from [DataService](dataservice.md).[serializer](dataservice.md#serializer)*

*Defined in [Services/DataService.ts:143](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L143)*

**Returns:** [ISerializer](../interfaces/iserializer.md)<`any`, `T`, `R`>

___
<a id="types"></a>

###  types

gettypes(): [IActionTypes](../interfaces/iactiontypes.md)

*Inherited from [BaseService](baseservice.md).[types](baseservice.md#types)*

*Defined in [Services/BaseService.ts:191](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L191)*

Returns a map of IActionTypes, which are string "constants" that represent the type of an IAction. When an IAction is dispatched to Redux via an IActionCreator, one or many reducers or epics may act on that IAction

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___

## Methods

<a id="createactions"></a>

###  createActions

▸ **createActions**(): [IActionCreators](../interfaces/iactioncreators.md)

*Inherited from [DataService](dataservice.md).[createActions](dataservice.md#createactions)*

*Overrides [BaseService](baseservice.md).[createActions](baseservice.md#createactions)*

*Defined in [Services/DataService.ts:290](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L290)*

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="createepics"></a>

###  createEpics

▸ **createEpics**(): [IActionEpic](../#iactionepic)[]

*Inherited from [DataService](dataservice.md).[createEpics](dataservice.md#createepics)*

*Overrides [BaseService](baseservice.md).[createEpics](baseservice.md#createepics)*

*Defined in [Services/DataService.ts:477](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L477)*

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="createnew"></a>

###  createNew

▸ **createNew**(initialData?: *`Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)>*): [IModel](../interfaces/imodel.md)<`T`>

*Inherited from [DataService](dataservice.md).[createNew](dataservice.md#createnew)*

*Defined in [Services/DataService.ts:169](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L169)*

Create a new instance of the Model which has not been committed to the API yet.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` initialData | `Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)> |  {} |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="createrecordepic"></a>

###  createRecordEpic

▸ **createRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[createRecordEpic](dataservice.md#createrecordepic)*

*Defined in [Services/DataService.ts:526](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L526)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="createreducers"></a>

###  createReducers

▸ **createReducers**(): `object`

*Inherited from [DataService](dataservice.md).[createReducers](dataservice.md#createreducers)*

*Overrides [BaseService](baseservice.md).[createReducers](baseservice.md#createreducers)*

*Defined in [Services/DataService.ts:364](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L364)*

**Returns:** `object`

___
<a id="createselectors"></a>

###  createSelectors

▸ **createSelectors**(): [ISelectors](../interfaces/iselectors.md)

*Inherited from [DataService](dataservice.md).[createSelectors](dataservice.md#createselectors)*

*Overrides [BaseService](baseservice.md).[createSelectors](baseservice.md#createselectors)*

*Defined in [Services/DataService.ts:316](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L316)*

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="createtypes"></a>

###  createTypes

▸ **createTypes**(): [IActionTypes](../interfaces/iactiontypes.md)

*Inherited from [DataService](dataservice.md).[createTypes](dataservice.md#createtypes)*

*Overrides [BaseService](baseservice.md).[createTypes](baseservice.md#createtypes)*

*Defined in [Services/DataService.ts:265](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L265)*

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___
<a id="deleterecordepic"></a>

###  deleteRecordEpic

▸ **deleteRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[deleteRecordEpic](dataservice.md#deleterecordepic)*

*Defined in [Services/DataService.ts:572](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L572)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="fetchallepic"></a>

###  fetchAllEpic

▸ **fetchAllEpic**(action$: *[IObserveableAction](../#iobserveableaction)*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[fetchAllEpic](dataservice.md#fetchallepic)*

*Defined in [Services/DataService.ts:492](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L492)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction) |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="fetchallreducer"></a>

###  fetchAllReducer

▸ **fetchAllReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)<`any`>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[fetchAllReducer](dataservice.md#fetchallreducer)*

*Defined in [Services/DataService.ts:380](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L380)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md)<`any`> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="fetchrecordepic"></a>

###  fetchRecordEpic

▸ **fetchRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [DataService](dataservice.md).[fetchRecordEpic](dataservice.md#fetchrecordepic)*

*Defined in [Services/DataService.ts:512](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L512)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction) |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

___
<a id="getall"></a>

###  getAll

▸ **getAll**(): `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

*Inherited from [DataService](dataservice.md).[getAll](dataservice.md#getall)*

*Defined in [Services/DataService.ts:238](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L238)*

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="getbyid"></a>

###  getById

▸ **getById**(id: *`string`*): `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>

*Inherited from [DataService](dataservice.md).[getById](dataservice.md#getbyid)*

*Defined in [Services/DataService.ts:180](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L180)*

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

*Defined in [Services/DataService.ts:201](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L201)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ids | `string`[] |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="getbyquery"></a>

###  getByQuery

▸ **getByQuery**(queryParams: *`any`*): `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

*Inherited from [DataService](dataservice.md).[getByQuery](dataservice.md#getbyquery)*

*Defined in [Services/DataService.ts:218](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L218)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| queryParams | `any` |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>[]>

___
<a id="getdefaultqueryparams"></a>

###  getDefaultQueryParams

▸ **getDefaultQueryParams**(): `Observable`<`any`>

*Inherited from [DataService](dataservice.md).[getDefaultQueryParams](dataservice.md#getdefaultqueryparams)*

*Defined in [Services/DataService.ts:257](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L257)*

Get the default query params object to use when querying for the Model associated to this DataService.

**Returns:** `Observable`<`any`>
any

___
<a id="getdefaultstate"></a>

###  getDefaultState

▸ **getDefaultState**(): [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

*Inherited from [DataService](dataservice.md).[getDefaultState](dataservice.md#getdefaultstate)*

*Overrides [BaseService](baseservice.md).[getDefaultState](baseservice.md#getdefaultstate)*

*Defined in [Services/DataService.ts:152](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L152)*

**Returns:** [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

___
<a id="getshadowobject"></a>

###  getShadowObject

▸ **getShadowObject**(): [IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

*Inherited from [DataService](dataservice.md).[getShadowObject](dataservice.md#getshadowobject)*

*Defined in [Services/DataService.ts:156](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L156)*

**Returns:** [IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>

___
<a id="makeactioncreator"></a>

###  makeActionCreator

▸ **makeActionCreator**<`T`,`M`>(type: *`string`*, defaultMeta?: *`any`*): [IActionCreator](../#iactioncreator)

*Inherited from [BaseService](baseservice.md).[makeActionCreator](baseservice.md#makeactioncreator)*

*Defined in [Services/BaseService.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L95)*

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

*Defined in [Services/BaseService.ts:64](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L64)*

Returns a namespaced IAction type in the form `<name>/<type>`. For example: `student/FETCH_ALL`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  \- |

**Returns:** `string`

___
<a id="patchrecordepic"></a>

###  patchRecordEpic

▸ **patchRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<`Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[patchRecordEpic](dataservice.md#patchrecordepic)*

*Defined in [Services/DataService.ts:557](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L557)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<`Partial`<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="pushallreducer"></a>

###  pushAllReducer

▸ **pushAllReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)<[IPushAll](../interfaces/ipushall.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[pushAllReducer](dataservice.md#pushallreducer)*

*Defined in [Services/DataService.ts:393](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L393)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md)<[IPushAll](../interfaces/ipushall.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="pushrecordreducer"></a>

###  pushRecordReducer

▸ **pushRecordReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[pushRecordReducer](dataservice.md#pushrecordreducer)*

*Defined in [Services/DataService.ts:406](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L406)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md)<[IModel](../interfaces/imodel.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="seterrorsreducer"></a>

###  setErrorsReducer

▸ **setErrorsReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[setErrorsReducer](dataservice.md#seterrorsreducer)*

*Defined in [Services/DataService.ts:428](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L428)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md) |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="setfieldreducer"></a>

###  setFieldReducer

▸ **setFieldReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[setFieldReducer](dataservice.md#setfieldreducer)*

*Defined in [Services/DataService.ts:437](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L437)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="setmetafieldreducer"></a>

###  setMetaFieldReducer

▸ **setMetaFieldReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)<[ISetMetaField](../interfaces/isetmetafield.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[setMetaFieldReducer](dataservice.md#setmetafieldreducer)*

*Defined in [Services/DataService.ts:450](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L450)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md)<[ISetMetaField](../interfaces/isetmetafield.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="setrelationshipreducer"></a>

###  setRelationshipReducer

▸ **setRelationshipReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[setRelationshipReducer](dataservice.md#setrelationshipreducer)*

*Defined in [Services/DataService.ts:460](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L460)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md)<[ISetField](../interfaces/isetfield.md)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="shouldfetchall"></a>

### `<Protected>` shouldFetchAll

▸ **shouldFetchAll**(action: *`any`*, state: *`any`*): `any`

*Inherited from [DataService](dataservice.md).[shouldFetchAll](dataservice.md#shouldfetchall)*

*Defined in [Services/DataService.ts:585](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L585)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | `any` |
| state | `any` |

**Returns:** `any`

___
<a id="unloadallreducer"></a>

###  unloadAllReducer

▸ **unloadAllReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[unloadAllReducer](dataservice.md#unloadallreducer)*

*Defined in [Services/DataService.ts:411](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L411)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="unloadrecordreducer"></a>

###  unloadRecordReducer

▸ **unloadRecordReducer**(state: *[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>*, action: *[IAction](../interfaces/iaction.md)<[IModelId](../interfaces/imodelid.md)>*):  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

*Inherited from [DataService](dataservice.md).[unloadRecordReducer](dataservice.md#unloadrecordreducer)*

*Defined in [Services/DataService.ts:418](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L418)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)> |
| action | [IAction](../interfaces/iaction.md)<[IModelId](../interfaces/imodelid.md)> |

**Returns:**  `Record`<[IDataServiceState](../interfaces/idataservicestate.md)<`T`>> & `object`

___
<a id="updaterecordepic"></a>

###  updateRecordEpic

▸ **updateRecordEpic**(action$: *[IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Inherited from [DataService](dataservice.md).[updateRecordEpic](dataservice.md#updaterecordepic)*

*Defined in [Services/DataService.ts:542](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/DataService.ts#L542)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObserveableAction](../#iobserveableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[DataServiceStateRecord](dataservice.md#dataservicestaterecord)<[IFakeModelData](../interfaces/ifakemodeldata.md)>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="getstateobservable"></a>

### `<Static>` getStateObservable

▸ **getStateObservable**(): `Observable`<`any`>

*Inherited from [BaseService](baseservice.md).[getStateObservable](baseservice.md#getstateobservable)*

*Defined in [Services/BaseService.ts:82](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L82)*

**Returns:** `Observable`<`any`>

___
<a id="registerdispatch"></a>

### `<Static>` registerDispatch

▸ **registerDispatch**(dispatch: *`any`*): `void`

*Inherited from [BaseService](baseservice.md).[registerDispatch](baseservice.md#registerdispatch)*

*Defined in [Services/BaseService.ts:74](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L74)*

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

*Defined in [Services/BaseService.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Services/BaseService.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state$ | `Observable`<`any`> |

**Returns:** `void`

___

