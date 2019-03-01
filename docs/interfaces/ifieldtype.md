[redux-data-service](../README.md) > [IFieldType](../interfaces/ifieldtype.md)

# Interface: IFieldType

## Type parameters
#### T 
## Hierarchy

**IFieldType**

## Index

### Properties

* [defaultValidationRules](ifieldtype.md#defaultvalidationrules)
* [defaultValue](ifieldtype.md#defaultvalue)
* [navigationFieldName](ifieldtype.md#navigationfieldname)
* [readOnly](ifieldtype.md#readonly)
* [serialize](ifieldtype.md#serialize)
* [type](ifieldtype.md#type)

### Methods

* [isValidType](ifieldtype.md#isvalidtype)
* [normalize](ifieldtype.md#normalize)
* [transform](ifieldtype.md#transform)

---

## Properties

<a id="defaultvalidationrules"></a>

###  defaultValidationRules

**● defaultValidationRules**: *`any`*

*Defined in [Model/FieldType/IFieldType.ts:3](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L3)*

___
<a id="defaultvalue"></a>

###  defaultValue

**● defaultValue**: *`T`*

*Defined in [Model/FieldType/IFieldType.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L4)*

___
<a id="navigationfieldname"></a>

### `<Optional>` navigationFieldName

**● navigationFieldName**: *`string`*

*Defined in [Model/FieldType/IFieldType.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L10)*

___
<a id="readonly"></a>

### `<Optional>` readOnly

**● readOnly**: *`boolean`*

*Defined in [Model/FieldType/IFieldType.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L6)*

___
<a id="serialize"></a>

###  serialize

**● serialize**: *`boolean`*

*Defined in [Model/FieldType/IFieldType.ts:2](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L2)*

___
<a id="type"></a>

###  type

**● type**: *`string`*

*Defined in [Model/FieldType/IFieldType.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L7)*

___

## Methods

<a id="isvalidtype"></a>

###  isValidType

▸ **isValidType**(value: * `T` &#124; `any`*): `boolean`

*Defined in [Model/FieldType/IFieldType.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value |  `T` &#124; `any`|

**Returns:** `boolean`

___
<a id="normalize"></a>

###  normalize

▸ **normalize**(serializedValue: *`any`*): `Promise`<`T`>

*Defined in [Model/FieldType/IFieldType.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| serializedValue | `any` |

**Returns:** `Promise`<`T`>

___
<a id="transform"></a>

### `<Optional>` transform

▸ **transform**(value: *`T`*): `Promise`<`any`>

*Defined in [Model/FieldType/IFieldType.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/d4786b8/src/Model/FieldType/IFieldType.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `T` |

**Returns:** `Promise`<`any`>

___

