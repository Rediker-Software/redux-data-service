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
* [serialize](ifieldtype.md#serialize)

### Methods

* [isValidType](ifieldtype.md#isvalidtype)
* [normalize](ifieldtype.md#normalize)
* [transform](ifieldtype.md#transform)

---

## Properties

<a id="defaultvalidationrules"></a>

###  defaultValidationRules

**● defaultValidationRules**: *`any`*

*Defined in [Model/FieldType/IFieldType.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/FieldType/IFieldType.ts#L4)*

___
<a id="defaultvalue"></a>

###  defaultValue

**● defaultValue**: *`T`*

*Defined in [Model/FieldType/IFieldType.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/FieldType/IFieldType.ts#L5)*

___
<a id="serialize"></a>

###  serialize

**● serialize**: *`boolean`*

*Defined in [Model/FieldType/IFieldType.ts:3](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/FieldType/IFieldType.ts#L3)*

___

## Methods

<a id="isvalidtype"></a>

###  isValidType

▸ **isValidType**(value: * `T` &#124; `any`*): `boolean`

*Defined in [Model/FieldType/IFieldType.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/FieldType/IFieldType.ts#L6)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `T` &#124; `any`|

**Returns:** `boolean`

___
<a id="normalize"></a>

###  normalize

▸ **normalize**(serializedValue: *`any`*): `T`

*Defined in [Model/FieldType/IFieldType.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/FieldType/IFieldType.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| serializedValue | `any` |

**Returns:** `T`

___
<a id="transform"></a>

### `<Optional>` transform

▸ **transform**(value: *`T`*): `any`

*Defined in [Model/FieldType/IFieldType.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/FieldType/IFieldType.ts#L7)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `T` |

**Returns:** `any`

___

