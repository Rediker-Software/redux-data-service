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
* [transform](imapper.md#transform)

---

## Properties

<a id="normalize"></a>

###  normalize

**● normalize**: *`function`*

*Defined in [Mapper/IMapper.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Mapper/IMapper.ts#L5)*

#### Type declaration
▸(data: *`Partial`<`R`>*): `Promise`<[IModel](imodel.md)<`T`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Partial`<`R`> |

**Returns:** `Promise`<[IModel](imodel.md)<`T`>>

___
<a id="transform"></a>

###  transform

**● transform**: *`function`*

*Defined in [Mapper/IMapper.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Mapper/IMapper.ts#L4)*

#### Type declaration
▸(model: * [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`Partial`<`R`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| model |  [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `Promise`<`Partial`<`R`>>

___

