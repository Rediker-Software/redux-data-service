[redux-data-service](../README.md) > [IMapper](../interfaces/imapper.md)

# Interface: IMapper

## Type parameters
#### T :  [IModelData](imodeldata.md)
#### R 
## Hierarchy

**IMapper**

## Implemented by

* [Mapper](../classes/mapper.md)
* [MockMapper](../classes/mockmapper.md)

## Index

### Properties

* [normalize](imapper.md#normalize)
* [normalizeQueryResponse](imapper.md#normalizequeryresponse)
* [transform](imapper.md#transform)
* [transformList](imapper.md#transformlist)
* [transformPatch](imapper.md#transformpatch)

---

## Properties

<a id="normalize"></a>

###  normalize

**● normalize**: *`function`*

*Defined in [Mapper/IMapper.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/c6db69b/src/Mapper/IMapper.ts#L9)*

#### Type declaration
▸(data: *`Partial`<`R`>*): `Promise`<[IModel](imodel.md)<`T`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Partial`<`R`> |

**Returns:** `Promise`<[IModel](imodel.md)<`T`>>

___
<a id="normalizequeryresponse"></a>

###  normalizeQueryResponse

**● normalizeQueryResponse**: *`function`*

*Defined in [Mapper/IMapper.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/c6db69b/src/Mapper/IMapper.ts#L10)*

#### Type declaration
▸(data: *[IRawQueryResponse](irawqueryresponse.md)<`R`>*): `Promise`< [IQueryResponse](iqueryresponse.md) & `object`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | [IRawQueryResponse](irawqueryresponse.md)<`R`> |

**Returns:** `Promise`< [IQueryResponse](iqueryresponse.md) & `object`>

___
<a id="transform"></a>

###  transform

**● transform**: *`function`*

*Defined in [Mapper/IMapper.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/c6db69b/src/Mapper/IMapper.ts#L6)*

#### Type declaration
▸(model: * [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`Partial`<`R`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| model |  [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `Promise`<`Partial`<`R`>>

___
<a id="transformlist"></a>

###  transformList

**● transformList**: *`function`*

*Defined in [Mapper/IMapper.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/c6db69b/src/Mapper/IMapper.ts#L8)*

#### Type declaration
▸(models: *[IModel](imodel.md)<`T`>[]*): `Promise`<`R`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| models | [IModel](imodel.md)<`T`>[] |

**Returns:** `Promise`<`R`[]>

___
<a id="transformpatch"></a>

###  transformPatch

**● transformPatch**: *`function`*

*Defined in [Mapper/IMapper.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/c6db69b/src/Mapper/IMapper.ts#L7)*

#### Type declaration
▸(model: * [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| model |  [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `any`

___

