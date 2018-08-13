[redux-data-service](../README.md) > [IService](../interfaces/iservice.md)

# Interface: IService

## Type parameters
#### S 
## Hierarchy

**IService**

## Implemented by

* [BaseService](../classes/baseservice.md)
* [DataService](../classes/dataservice.md)
* [FakeModelService](../classes/fakemodelservice.md)

## Index

### Properties

* [actions](iservice.md#actions)
* [epics](iservice.md#epics)
* [getDefaultState](iservice.md#getdefaultstate)
* [name](iservice.md#name)
* [reducer](iservice.md#reducer)
* [selectors](iservice.md#selectors)
* [types](iservice.md#types)

---

## Properties

<a id="actions"></a>

###  actions

**● actions**: * [IActionCreators](iactioncreators.md) &#124; `__type`
*

*Defined in [Services/IService.ts:33](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Services/IService.ts#L33)*

___
<a id="epics"></a>

###  epics

**● epics**: *[IActionEpic](../#iactionepic)[]*

*Defined in [Services/IService.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Services/IService.ts#L35)*

___
<a id="getdefaultstate"></a>

###  getDefaultState

**● getDefaultState**: *`function`*

*Defined in [Services/IService.ts:37](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Services/IService.ts#L37)*

#### Type declaration
▸(): `S`

**Returns:** `S`

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Defined in [Services/IService.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Services/IService.ts#L31)*

___
<a id="reducer"></a>

###  reducer

**● reducer**: *[IReducer](../#ireducer)<`S`>*

*Defined in [Services/IService.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Services/IService.ts#L34)*

___
<a id="selectors"></a>

###  selectors

**● selectors**: *[ISelectors](iselectors.md)*

*Defined in [Services/IService.ts:36](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Services/IService.ts#L36)*

___
<a id="types"></a>

###  types

**● types**: * [IActionTypes](iactiontypes.md) &#124; `__type`
*

*Defined in [Services/IService.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Services/IService.ts#L32)*

___

