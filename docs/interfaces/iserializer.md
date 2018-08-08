[redux-data-service](../README.md) > [ISerializer](../interfaces/iserializer.md)

# Interface: ISerializer

## Type parameters
#### T :  [IModelData](imodeldata.md)
#### S 
## Hierarchy

**ISerializer**

## Implemented by

* [BaseSerializer](../classes/baseserializer.md)
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

*Defined in [Serializers/ISerializer.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Serializers/ISerializer.ts#L5)*

#### Type declaration
▸(data: *`S`*): [IModel](imodel.md)<`T`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| data | `S` |

**Returns:** [IModel](imodel.md)<`T`>

___
<a id="normalize"></a>

###  normalize

**● normalize**: *`function`*

*Defined in [Serializers/ISerializer.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Serializers/ISerializer.ts#L7)*

#### Type declaration
▸(data: *`Partial`<`T`>*): [IModel](imodel.md)<`T`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| data | `Partial`<`T`> |

**Returns:** [IModel](imodel.md)<`T`>

___
<a id="serialize"></a>

###  serialize

**● serialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Serializers/ISerializer.ts#L4)*

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

*Defined in [Serializers/ISerializer.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/b03f489/src/Serializers/ISerializer.ts#L6)*

#### Type declaration
▸(model: *[IModel](imodel.md)<`T`>*): `Partial`<`T`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| model | [IModel](imodel.md)<`T`> |

**Returns:** `Partial`<`T`>

___

