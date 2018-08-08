[redux-data-service](../README.md) > [BaseService](../classes/baseservice.md)

# Class: BaseService

`IService` takes an Object-Oriented approach to following the [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux/) proposal. This enables us to organize `actions`, `selectors`, and `epics` together with their related `reducer`. The goal is to create a cleaner project structure that is hopefully more extensible and DRY.

Children classes should extend `createTypes`, `createActions`, `createSelectors`, `createEpics` and `createReducers` as needed to add functionality. The output from these methods will be lazy loaded and used to export the `types`, `actions`, `selectors`, `epics` and `reducer`, respectively, as public readonly fields on the service. As such, when overriding those methods you will likely want to build upon and return what was outputted from the parent method.

The `reducers` should map an `ActionType` to a "micro" reducer. A single, final `reducer` that is exported will fire the "micro" reducer associated to the given action type, in lieu of creating one large hairy switch statement.

`IActionTypes` are namespaced to the given service `name` provided to the constructor. This is to avoid naming collisions with other `IService`s.
*__abstract__*: 

*__class__*: BaseService

*__implements__*: IService

## Type parameters
#### S 
## Hierarchy

**BaseService**

↳  [DataService](dataservice.md)

## Implements

* [IService](../interfaces/iservice.md)<`S`>

## Index

### Properties

* [internalActions](baseservice.md#internalactions)
* [internalEpics](baseservice.md#internalepics)
* [internalReducers](baseservice.md#internalreducers)
* [internalSelectors](baseservice.md#internalselectors)
* [internalTypes](baseservice.md#internaltypes)
* [name](baseservice.md#name)
* [dispatch](baseservice.md#dispatch)
* [state$](baseservice.md#state_)

### Accessors

* [actions](baseservice.md#actions)
* [epics](baseservice.md#epics)
* [reducer](baseservice.md#reducer)
* [reducers](baseservice.md#reducers)
* [selectors](baseservice.md#selectors)
* [types](baseservice.md#types)

### Methods

* [createActions](baseservice.md#createactions)
* [createEpics](baseservice.md#createepics)
* [createReducers](baseservice.md#createreducers)
* [createSelectors](baseservice.md#createselectors)
* [createTypes](baseservice.md#createtypes)
* [getDefaultState](baseservice.md#getdefaultstate)
* [makeActionCreator](baseservice.md#makeactioncreator)
* [makeActionType](baseservice.md#makeactiontype)
* [getStateObservable](baseservice.md#getstateobservable)
* [registerDispatch](baseservice.md#registerdispatch)
* [setStateObservable](baseservice.md#setstateobservable)

---

## Properties

<a id="internalactions"></a>

### `<Protected>``<Optional>` internalActions

**● internalActions**: *[IActionCreators](../interfaces/iactioncreators.md)*

*Defined in [Services/BaseService.ts:45](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L45)*

___
<a id="internalepics"></a>

### `<Protected>``<Optional>` internalEpics

**● internalEpics**: *[IActionEpic](../#iactionepic)[]*

*Defined in [Services/BaseService.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L44)*

___
<a id="internalreducers"></a>

### `<Protected>``<Optional>` internalReducers

**● internalReducers**: *[IReducers](../#ireducers)<`S`>*

*Defined in [Services/BaseService.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L43)*

___
<a id="internalselectors"></a>

### `<Protected>``<Optional>` internalSelectors

**● internalSelectors**: *[ISelectors](../interfaces/iselectors.md)*

*Defined in [Services/BaseService.ts:46](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L46)*

___
<a id="internaltypes"></a>

### `<Protected>` internalTypes

**● internalTypes**: *[IActionTypes](../interfaces/iactiontypes.md)*

*Defined in [Services/BaseService.ts:47](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L47)*

___
<a id="name"></a>

### `<Abstract>` name

**● name**: *`string`*

*Implementation of [IService](../interfaces/iservice.md).[name](../interfaces/iservice.md#name)*

*Defined in [Services/BaseService.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L39)*

___
<a id="dispatch"></a>

### `<Static>``<Protected>` dispatch

**● dispatch**: *`function`*

*Defined in [Services/BaseService.ts:41](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L41)*

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

*Defined in [Services/BaseService.ts:42](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L42)*

___

## Accessors

<a id="actions"></a>

###  actions

getactions(): [IActionCreators](../interfaces/iactioncreators.md)

*Defined in [Services/BaseService.ts:205](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L205)*

Returns a map of IActionCreators, which when dispatched to Redux, one or many reducers or epics may act on that IAction.

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="epics"></a>

###  epics

getepics(): [IActionEpic](../#iactionepic)[]

*Defined in [Services/BaseService.ts:248](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L248)*

Returns an array of RxJS Observeable Epics from redux-observable, which are observers that are always listening for a given ActionType. They are useful for triggering side effects (such as loading data asynchronously) in response to an IAction via chainable, asynchronous "streams".

They will usually emit one or many Actions to pass data into Redux (via a IReducer) or to trigger other Epics. Not only can they be daisy-chained in this manner, RxJS also supports a variety of other common use-cases such as throttling/debouncing and retrying failed promises.

Notes:

*   When an IAction is dispatched to Redux, it hits the reducers BEFORE the epics.
*   Before you can use something from RxJS (such as an operator), you must import it first.

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="reducer"></a>

###  reducer

getreducer(): [IReducer](../#ireducer)<`S`>

*Defined in [Services/BaseService.ts:170](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L170)*

Returns a single IReducer function which triggers the methods mapped in the internal `reducers` object to the given IAction type.

This is the function that is actually injected into and later triggered by Redux.

**Returns:** [IReducer](../#ireducer)<`S`>

___
<a id="reducers"></a>

### `<Protected>` reducers

getreducers(): [IReducers](../#ireducers)<`S`>

*Defined in [Services/BaseService.ts:156](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L156)*

Return a map of functions which are triggered by the IReducer for a given ActionType. They are used to update the Redux state in response to a given IAction.

Like a reducer, they are given the Redux `state` object and the `action` that was triggered and should return a new copy of the immutable state. However, these are not individually added to Redux, but rather through the single reducer function returned for this IService.

**Returns:** [IReducers](../#ireducers)<`S`>

___
<a id="selectors"></a>

###  selectors

getselectors(): [ISelectors](../interfaces/iselectors.md)

*Defined in [Services/BaseService.ts:224](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L224)*

Returns an object of selectors using Reselect. ISelectors are useful for efficiently filtering data from the Redux state.

ISelectors are composable: a selector may be built from other selectors

ISelectors are memoized: the output from each selector is cached, so future requests will not require a recompute unless its inputs change

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="types"></a>

###  types

gettypes(): [IActionTypes](../interfaces/iactiontypes.md)

*Defined in [Services/BaseService.ts:191](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L191)*

Returns a map of IActionTypes, which are string "constants" that represent the type of an IAction. When an IAction is dispatched to Redux via an IActionCreator, one or many reducers or epics may act on that IAction

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___

## Methods

<a id="createactions"></a>

### `<Protected>` createActions

▸ **createActions**(): [IActionCreators](../interfaces/iactioncreators.md)

*Defined in [Services/BaseService.ts:119](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L119)*

Children classes should extend this method to dispatch new Actions

**Returns:** [IActionCreators](../interfaces/iactioncreators.md)

___
<a id="createepics"></a>

### `<Protected>` createEpics

▸ **createEpics**(): [IActionEpic](../#iactionepic)[]

*Defined in [Services/BaseService.ts:134](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L134)*

Children classes should extend this method to perform new side effects (such as loading data) in response to a given IAction.

**Returns:** [IActionEpic](../#iactionepic)[]

___
<a id="createreducers"></a>

### `<Protected>` createReducers

▸ **createReducers**(): [IReducers](../#ireducers)<`S`>

*Defined in [Services/BaseService.ts:126](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L126)*

Children classes should extend this method to handle new IAction types in the reducer.

**Returns:** [IReducers](../#ireducers)<`S`>

___
<a id="createselectors"></a>

### `<Protected>` createSelectors

▸ **createSelectors**(): [ISelectors](../interfaces/iselectors.md)

*Defined in [Services/BaseService.ts:142](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L142)*

Children classes should extend this method to efficiently slice data from the Redux state in a composable manner.

**Returns:** [ISelectors](../interfaces/iselectors.md)

___
<a id="createtypes"></a>

### `<Protected>` createTypes

▸ **createTypes**(): [IActionTypes](../interfaces/iactiontypes.md)

*Defined in [Services/BaseService.ts:109](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L109)*

Children classes should extend this method to create new IActionTypes

**Returns:** [IActionTypes](../interfaces/iactiontypes.md)

___
<a id="getdefaultstate"></a>

### `<Abstract>` getDefaultState

▸ **getDefaultState**(): `S`

*Defined in [Services/BaseService.ts:55](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L55)*

The default Redux state of the IService
*__abstract__*: 

**Returns:** `S`

___
<a id="makeactioncreator"></a>

###  makeActionCreator

▸ **makeActionCreator**T,M(type: *`string`*, defaultMeta?: *`any`*): [IActionCreator](../#iactioncreator)

*Defined in [Services/BaseService.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L95)*

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

*Defined in [Services/BaseService.ts:64](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L64)*

Returns a namespaced IAction type in the form `<name>/<type>`. For example: `student/FETCH_ALL`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  - |

**Returns:** `string`

___
<a id="getstateobservable"></a>

### `<Static>` getStateObservable

▸ **getStateObservable**(): `Observable`<`any`>

*Defined in [Services/BaseService.ts:82](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L82)*

**Returns:** `Observable`<`any`>

___
<a id="registerdispatch"></a>

### `<Static>` registerDispatch

▸ **registerDispatch**(dispatch: *`any`*): `void`

*Defined in [Services/BaseService.ts:74](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L74)*

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

*Defined in [Services/BaseService.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Services/BaseService.ts#L78)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| state$ | `Observable`<`any`> |

**Returns:** `void`

___

