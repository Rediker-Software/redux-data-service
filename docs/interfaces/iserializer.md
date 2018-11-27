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
* [serializeQueryParams](iserializer.md#serializequeryparams)
* [transform](iserializer.md#transform)

---

## Properties

<a id="deserialize"></a>

###  deserialize

**● deserialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/ISerializer.ts#L6)*

#### Type declaration
▸(data: *`R`*): `Promise`<[IModel](imodel.md)<`T`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `R` |

**Returns:** `Promise`<[IModel](imodel.md)<`T`>>

___
<a id="normalize"></a>

###  normalize

**● normalize**: *`function`*

*Defined in [Serializers/ISerializer.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/ISerializer.ts#L8)*

#### Type declaration
▸(data: *`Partial`<`R`>*): `Promise`<[IModel](imodel.md)<`T`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Partial`<`R`> |

**Returns:** `Promise`<[IModel](imodel.md)<`T`>>

___
<a id="serialize"></a>

###  serialize

**● serialize**: *`function`*

*Defined in [Serializers/ISerializer.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/ISerializer.ts#L5)*

#### Type declaration
▸(modelData: * [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>*): `Promise`<`S`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| modelData |  [IModel](imodel.md)<`T`> &#124; `Partial`<`T`>|

**Returns:** `Promise`<`S`>

___
<a id="serializequeryparams"></a>

###  serializeQueryParams

**● serializeQueryParams**: *`function`*

*Defined in [Serializers/ISerializer.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/ISerializer.ts#L9)*

#### Type declaration
▸(params: *[IQueryParams](iqueryparams.md)*): `Promise`<`any`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| params | [IQueryParams](iqueryparams.md) |

**Returns:** `Promise`<`any`>

___
<a id="transform"></a>

###  transform

**● transform**: *`function`*

*Defined in [Serializers/ISerializer.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Serializers/ISerializer.ts#L7)*

#### Type declaration
▸(model: *[IModel](imodel.md)<`T`>*): `Promise`<`Partial`<`R`>>

**Parameters:**

| Name | Type |
| ------ | ------ |
| model | [IModel](imodel.md)<`T`> |

**Returns:** `Promise`<`Partial`<`R`>>

___

