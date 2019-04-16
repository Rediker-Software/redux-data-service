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
#### R 
## Hierarchy

 [BaseService](baseservice.md)<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>

**↳ DataService**

↳  [FakeModelService](fakemodelservice.md)

## Implements

* [IService](../interfaces/iservice.md)<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>

## Index

### Properties

* [AdapterClass](dataservice.md#adapterclass)
* [MapperClass](dataservice.md#mapperclass)
* [ModelClass](dataservice.md#modelclass)
* [SerializerClass](dataservice.md#serializerclass)
* [_adapter](dataservice.md#_adapter)
* [_mapper](dataservice.md#_mapper)
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
* [mapper](dataservice.md#mapper)
* [reducer](dataservice.md#reducer)
* [reducers](dataservice.md#reducers)
* [selectors](dataservice.md#selectors)
* [serializer](dataservice.md#serializer)
* [types](dataservice.md#types)

### Methods

* [createActions](dataservice.md#createactions)
* [createEpics](dataservice.md#createepics)
* [createNew](dataservice.md#createnew)
* [createReducers](dataservice.md#createreducers)
* [createSelectors](dataservice.md#createselectors)
* [createTypes](dataservice.md#createtypes)
* [deleteRecordEpic](dataservice.md#deleterecordepic)
* [fetchAllEpic](dataservice.md#fetchallepic)
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
* [updateRecordEpic](dataservice.md#updaterecordepic)
* [getStateObservable](dataservice.md#getstateobservable)
* [registerDispatch](dataservice.md#registerdispatch)
* [setStateObservable](dataservice.md#setstateobservable)

---

## Properties

<a id="adapterclass"></a>

### `<Protected>` AdapterClass

**● AdapterClass**: *[IAdapterFactory](../interfaces/iadapterfactory.md)<`any`>*

*Defined in [Services/DataService/DataService.ts:93](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L93)*

___
<a id="mapperclass"></a>

### `<Protected>` MapperClass

**● MapperClass**: *[IMapperFactory](../interfaces/imapperfactory.md)<`T`, `R`>*

*Defined in [Services/DataService/DataService.ts:94](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L94)*

___
<a id="modelclass"></a>

### `<Abstract>` ModelClass

**● ModelClass**: *[IModelFactory](../interfaces/imodelfactory.md)<`T`>*

*Defined in [Services/DataService/DataService.ts:92](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L92)*

___
<a id="serializerclass"></a>

### `<Protected>` SerializerClass

**● SerializerClass**: *[ISerializerFactory](../interfaces/iserializerfactory.md)<`T`, `any`>*

*Defined in [Services/DataService/DataService.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L95)*

___
<a id="_adapter"></a>

### `<Protected>` _adapter

**● _adapter**: *[IAdapter](../interfaces/iadapter.md)<`any`>*

*Defined in [Services/DataService/DataService.ts:97](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L97)*

___
<a id="_mapper"></a>

### `<Protected>` _mapper

**● _mapper**: *[IMapper](../interfaces/imapper.md)<`any`>*

*Defined in [Services/DataService/DataService.ts:98](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L98)*

___
<a id="_serializer"></a>

### `<Protected>` _serializer

**● _serializer**: *[ISerializer](../interfaces/iserializer.md)<`any`, `R`>*

*Defined in [Services/DataService/DataService.ts:99](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L99)*

___
<a id="internalactions"></a>

### `<Protected>``<Optional>` internalActions

**● internalActions**: *[IActionCreators](../interfaces/iactioncreators.md)*

*Inherited from [BaseService](baseservice.md).[internalActions](baseservice.md#internalactions)*

*Defined in [Services/BaseService.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L45)*

___
<a id="internalepics"></a>

### `<Protected>``<Optional>` internalEpics

**● internalEpics**: *[IActionEpic](../#iactionepic)[]*

*Inherited from [BaseService](baseservice.md).[internalEpics](baseservice.md#internalepics)*

*Defined in [Services/BaseService.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L44)*

___
<a id="internalreducers"></a>

### `<Protected>``<Optional>` internalReducers

**● internalReducers**: *[IReducers](../#ireducers)<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>*

*Inherited from [BaseService](baseservice.md).[internalReducers](baseservice.md#internalreducers)*

*Defined in [Services/BaseService.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L43)*

___
<a id="internalselectors"></a>

### `<Protected>``<Optional>` internalSelectors

**● internalSelectors**: *[ISelectors](../interfaces/iselectors.md)*

*Inherited from [BaseService](baseservice.md).[internalSelectors](baseservice.md#internalselectors)*

*Defined in [Services/BaseService.ts:46](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L46)*

___
<a id="internaltypes"></a>

### `<Protected>` internalTypes

**● internalTypes**: *[IActionTypes](../interfaces/iactiontypes.md)*

*Inherited from [BaseService](baseservice.md).[internalTypes](baseservice.md#internaltypes)*

*Defined in [Services/BaseService.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L47)*

___
<a id="name"></a>

### `<Abstract>` name

**● name**: *`string`*

*Implementation of [IService](../interfaces/iservice.md).[name](../interfaces/iservice.md#name)*

*Inherited from [BaseService](baseservice.md).[name](baseservice.md#name)*

*Defined in [Services/BaseService.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L39)*

___
<a id="observablesbyidcache"></a>

### `<Protected>` observablesByIdCache

**● observablesByIdCache**: *`object`*

*Defined in [Services/DataService/DataService.ts:102](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L102)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="observablesbyidscache"></a>

### `<Protected>` observablesByIdsCache

**● observablesByIdsCache**: *`object`*

*Defined in [Services/DataService/DataService.ts:103](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L103)*

#### Type declaration

[id: `string`]: `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="observablesbyquerycache"></a>

### `<Protected>` observablesByQueryCache

**● observablesByQueryCache**: *`object`*

*Defined in [Services/DataService/DataService.ts:104](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L104)*

#### Type declaration

[id: `string`]: `Observable`<[IQueryManager](../interfaces/iquerymanager.md)<`T`>>

___
<a id="shadowobject"></a>

### `<Protected>` shadowObject

**● shadowObject**: *[IModel](../interfaces/imodel.md)<`T`>* =  null

*Defined in [Services/DataService/DataService.ts:101](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L101)*

___
<a id="dispatch"></a>

### `<Static>``<Protected>` dispatch

**● dispatch**: *`function`*

*Inherited from [BaseService](baseservice.md).[dispatch](baseservice.md#dispatch)*

*Defined in [Services/BaseService.ts:41](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L41)*

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

*Defined in [Services/BaseService.ts:42](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L42)*

___

## Accessors

<a id="actions"></a>

###  actions

getactions(): [IActionCreators](../interfaces/iactioncreators.md)

*Inherited from [BaseService](baseservice.md).[actions](baseservice.md#actions)*

*Defined in [Services/BaseService.ts:205](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L205)*

Returns a map of IActionCreators, which when dispatched to Redux, one or many Reducers or epics may act on that IAction.

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="adapter"></a>

###  adapter

getadapter(): [IAdapter](../interfaces/iadapter.md)<`any`>

*Defined in [Services/DataService/DataService.ts:106](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L106)*

**Returns:** [IAdapter](../interfaces/iadapter.md)<`any`>

___
<a id="epics"></a>

###  epics

getepics(): [IActionEpic](../#iactionepic)[]

*Inherited from [BaseService](baseservice.md).[epics](baseservice.md#epics)*

*Defined in [Services/BaseService.ts:248](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L248)*

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

*Defined in [Services/DataService/DataService.ts:115](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L115)*

**Returns:** [IMapper](../interfaces/imapper.md)<`any`, `any`>

___
<a id="reducer"></a>

###  reducer

getreducer(): [IReducer](../#ireducer)<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>

*Inherited from [BaseService](baseservice.md).[reducer](baseservice.md#reducer)*

*Defined in [Services/BaseService.ts:170](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L170)*

Returns a single IReducer function which triggers the methods mapped in the internal `reducers` object to the given IAction type.

This is the function that is actually injected into and later triggered by Redux.

**Returns:** [IReducer](../#ireducer)<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>

___
<a id="reducers"></a>

### `<Protected>` reducers

getreducers(): [IReducers](../#ireducers)<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>

*Inherited from [BaseService](baseservice.md).[reducers](baseservice.md#reducers)*

*Defined in [Services/BaseService.ts:156](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L156)*

Return a map of functions which are triggered by the IReducer for a given ActionType. They are used to update the Redux state in response to a given IAction.

Like a reducer, they are given the Redux `state` object and the `action` that was triggered and should return a new copy of the immutable state. However, these are not individually added to Redux, but rather through the single reducer function returned for this IService.

**Returns:** [IReducers](../#ireducers)<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>

___
<a id="selectors"></a>

###  selectors

getselectors(): [ISelectors](../interfaces/iselectors.md)

*Inherited from [BaseService](baseservice.md).[selectors](baseservice.md#selectors)*

*Defined in [Services/BaseService.ts:224](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L224)*

Returns an object of selectors using Reselect. ISelectors are useful for efficiently filtering data from the Redux state.

ISelectors are composable: a selector may be built from other selectors

ISelectors are memoized: the output from each selector is cached, so future requests will not require a recompute unless its inputs change

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="serializer"></a>

###  serializer

getserializer(): [ISerializer](../interfaces/iserializer.md)<`any`, `R`>

*Defined in [Services/DataService/DataService.ts:124](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L124)*

**Returns:** [ISerializer](../interfaces/iserializer.md)<`any`, `R`>

___
<a id="types"></a>

###  types

gettypes(): [IActionTypes](../interfaces/iactiontypes.md)

*Inherited from [BaseService](baseservice.md).[types](baseservice.md#types)*

*Defined in [Services/BaseService.ts:191](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L191)*

Returns a map of IActionTypes, which are string "constants" that represent the type of an IAction. When an IAction is dispatched to Redux via an IActionCreator, one or many reducers or epics may act on that IAction

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___

## Methods

<a id="createactions"></a>

###  createActions

▸ **createActions**(): [IActionCreators](../interfaces/iactioncreators.md)

*Overrides [BaseService](baseservice.md).[createActions](baseservice.md#createactions)*

*Defined in [Services/DataService/DataService.ts:284](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L284)*

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="createepics"></a>

###  createEpics

▸ **createEpics**(): [IActionEpic](../#iactionepic)[]

*Overrides [BaseService](baseservice.md).[createEpics](baseservice.md#createepics)*

*Defined in [Services/DataService/DataService.ts:380](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L380)*

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="createnew"></a>

###  createNew

▸ **createNew**(initialData?: *`Partial`<`T`>*): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Services/DataService/DataService.ts:150](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L150)*

Create a new instance of the Model which has not been committed to the API yet.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` initialData | `Partial`<`T`> |  {} |

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="createreducers"></a>

###  createReducers

▸ **createReducers**(): `object`

*Overrides [BaseService](baseservice.md).[createReducers](baseservice.md#createreducers)*

*Defined in [Services/DataService/DataService.ts:359](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L359)*

**Returns:** `object`

___
<a id="createselectors"></a>

###  createSelectors

▸ **createSelectors**(): [ISelectors](../interfaces/iselectors.md)

*Overrides [BaseService](baseservice.md).[createSelectors](baseservice.md#createselectors)*

*Defined in [Services/DataService/DataService.ts:311](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L311)*

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="createtypes"></a>

###  createTypes

▸ **createTypes**(): [IActionTypes](../interfaces/iactiontypes.md)

*Overrides [BaseService](baseservice.md).[createTypes](baseservice.md#createtypes)*

*Defined in [Services/DataService/DataService.ts:258](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L258)*

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___
<a id="deleterecordepic"></a>

###  deleteRecordEpic

▸ **deleteRecordEpic**(action$: *[IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService/DataService.ts:457](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L457)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="fetchallepic"></a>

###  fetchAllEpic

▸ **fetchAllEpic**(action$: *[IObservableAction](../#iobservableaction)<[IQueryBuilder](../interfaces/iquerybuilder.md),  [IPostActionHandlers](../interfaces/ipostactionhandlers.md) & [IForceReload](../interfaces/iforcereload.md)>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService/DataService.ts:397](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L397)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IQueryBuilder](../interfaces/iquerybuilder.md),  [IPostActionHandlers](../interfaces/ipostactionhandlers.md) & [IForceReload](../interfaces/iforcereload.md)> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="getall"></a>

###  getAll

▸ **getAll**(): `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

*Defined in [Services/DataService/DataService.ts:231](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L231)*

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="getbyid"></a>

###  getById

▸ **getById**(id: *`string`*): `Observable`<[IModel](../interfaces/imodel.md)<`T`>>

*Defined in [Services/DataService/DataService.ts:161](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L161)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<`T`>>

___
<a id="getbyids"></a>

###  getByIds

▸ **getByIds**(ids: *`string`[]*): `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

*Defined in [Services/DataService/DataService.ts:182](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L182)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ids | `string`[] |

**Returns:** `Observable`<[IModel](../interfaces/imodel.md)<`T`>[]>

___
<a id="getbyquery"></a>

###  getByQuery

▸ **getByQuery**(queryBuilder: *[IQueryBuilder](../interfaces/iquerybuilder.md)*): `Observable`<[IQueryManager](../interfaces/iquerymanager.md)<`T`>>

*Defined in [Services/DataService/DataService.ts:198](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L198)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| queryBuilder | [IQueryBuilder](../interfaces/iquerybuilder.md) |

**Returns:** `Observable`<[IQueryManager](../interfaces/iquerymanager.md)<`T`>>

___
<a id="getdefaultqueryparams"></a>

###  getDefaultQueryParams

▸ **getDefaultQueryParams**(): `Observable`<`any`>

*Defined in [Services/DataService/DataService.ts:250](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L250)*

Get the default query params object to use when querying for the Model associated to this DataService.

**Returns:** `Observable`<`any`>
any

___
<a id="getdefaultstate"></a>

###  getDefaultState

▸ **getDefaultState**(): [IDataServiceStateRecord](../#idataservicestaterecord)<`T`>

*Overrides [BaseService](baseservice.md).[getDefaultState](baseservice.md#getdefaultstate)*

*Defined in [Services/DataService/DataService.ts:133](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L133)*

**Returns:** [IDataServiceStateRecord](../#idataservicestaterecord)<`T`>

___
<a id="getshadowobject"></a>

###  getShadowObject

▸ **getShadowObject**(): [IModel](../interfaces/imodel.md)<`T`>

*Defined in [Services/DataService/DataService.ts:137](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L137)*

**Returns:** [IModel](../interfaces/imodel.md)<`T`>

___
<a id="makeactioncreator"></a>

###  makeActionCreator

▸ **makeActionCreator**<`T`,`M`>(type: *`string`*, defaultMeta?: *`any`*): [IActionCreator](../#iactioncreator)

*Inherited from [BaseService](baseservice.md).[makeActionCreator](baseservice.md#makeactioncreator)*

*Defined in [Services/BaseService.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L95)*

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

*Defined in [Services/BaseService.ts:64](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L64)*

Returns a namespaced IAction type in the form `<name>/<type>`. For example: `student/FETCH_ALL`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  \- |

**Returns:** `string`

___
<a id="patchrecordepic"></a>

###  patchRecordEpic

▸ **patchRecordEpic**(action$: *[IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService/DataService.ts:440](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L440)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="updaterecordepic"></a>

###  updateRecordEpic

▸ **updateRecordEpic**(action$: *[IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)>*, store: *`Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>>*): `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

*Defined in [Services/DataService/DataService.ts:423](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/DataService/DataService.ts#L423)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action$ | [IObservableAction](../#iobservableaction)<[IModelId](../interfaces/imodelid.md)> |
| store | `Store`<[IDataServiceStateRecord](../#idataservicestaterecord)<`T`>> |

**Returns:** `Observable`<[IAction](../interfaces/iaction.md)<`any`, `any`>>

___
<a id="getstateobservable"></a>

### `<Static>` getStateObservable

▸ **getStateObservable**(): `Observable`<`any`>

*Inherited from [BaseService](baseservice.md).[getStateObservable](baseservice.md#getstateobservable)*

*Defined in [Services/BaseService.ts:82](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L82)*

**Returns:** `Observable`<`any`>

___
<a id="registerdispatch"></a>

### `<Static>` registerDispatch

▸ **registerDispatch**(dispatch: *`any`*): `void`

*Inherited from [BaseService](baseservice.md).[registerDispatch](baseservice.md#registerdispatch)*

*Defined in [Services/BaseService.ts:74](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L74)*

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

*Defined in [Services/BaseService.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/6c3666b/src/Services/BaseService.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state$ | `Observable`<`any`> |

**Returns:** `void`

___

