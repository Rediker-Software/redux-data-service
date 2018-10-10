[redux-data-service](../README.md) > [ISerializer](../interfaces/iserializer.md)

# Interface: ISerializer

## Type parameters
#### S 
#### T :  [IModelData](imodeldata.md)
#### R 
## Hierarchy

**ISerializer**

## Implemented by

* [BaseSerializer](../classes/baseserializer.md)
* [MemorySerializer](../classes/memoryserializer.md)
* [MockSerializer](../classes/mockserializer.md)
* [RestSerializer](../classes/restserializer.md)

## Index

### Properties

* [deserialize](iserializer.md#deserialize)
* [normalize](iserializer.md#normalize)
* [serialize](iserializer.md#serialize)
* [transform](iserializer.md#transform)

---

## Properties

<a id="deserialize"></a>

###  deserialize

**● deserialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9a774aa/src/Serializers/ISerializer.ts#L5)*

#### Type declaration
▸(data: *`R`*): [IModel](imodel.md)<`T`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| data | `R` |

**Returns:** [IModel](imodel.md)<`T`>

___
<a id="normalize"></a>

###  normalize

**● normalize**: *`function`*

*Defined in [Serializers/ISerializer.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9a774aa/src/Serializers/ISerializer.ts#L7)*

#### Type declaration
▸(data: *`Partial`<`R`>*): [IModel](imodel.md)<`T`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| data | `Partial`<`R`> |

**Returns:** [IModel](imodel.md)<`T`>

___
<a id="serialize"></a>

###  serialize

**● serialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9a774aa/src/Serializers/ISerializer.ts#L4)*

#### Type declaration
▸(modelData: * [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>*): `S`

**Parameters:**

| Param | Type |
| ------ | ------ |
| modelData |  [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `S`

___
<a id="transform"></a>

###  transform

**● transform**: *`function`*

*Defined in [Serializers/ISerializer.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9a774aa/src/Serializers/ISerializer.ts#L6)*

#### Type declaration
▸(model: *[IModel](imodel.md)<`T`>*): `Partial`<`R`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| model | [IModel](imodel.md)<`T`> |

**Returns:** `Partial`<`R`>

___

