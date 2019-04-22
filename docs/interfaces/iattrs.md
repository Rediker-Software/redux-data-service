[redux-data-service](../README.md) > [IAttrs](../interfaces/iattrs.md)

# Interface: IAttrs

Classes which wish to use the `@attr` decorator should implement this interface.

## Type parameters
#### T 
#### T 
#### T 
## Hierarchy

↳  [IFieldTypes](ifieldtypes.md)

**↳ IAttrs**

↳  [IModel](imodel.md)

## Index

### Properties

* [fields](iattrs.md#fields)
* [validationRules](iattrs.md#validationrules)

### Methods

* [getField](iattrs.md#getfield)
* [setField](iattrs.md#setfield)
* [validate](iattrs.md#validate)

---

## Properties

<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)<`T`, [IFieldType](ifieldtype.md)>*

*Overrides [IFieldTypes](ifieldtypes.md).[fields](ifieldtypes.md#fields)*

*Defined in [Model/Decorators/Attr.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Model/Decorators/Attr.ts#L11)*

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<`T`>*

*Inherited from [IValidate](ivalidate.md).[validationRules](ivalidate.md#validationrules)*

*Defined in [Model/Decorators/Validation.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Model/Decorators/Validation.ts#L6)*

___

## Methods

<a id="getfield"></a>

###  getField

▸ **getField**(fieldName: *`any`*, defaultValue: *`any`*): `any`

*Defined in [Model/Decorators/Attr.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Model/Decorators/Attr.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `any` |
| defaultValue | `any` |

**Returns:** `any`

___
<a id="setfield"></a>

###  setField

▸ **setField**(fieldName: *`any`*, value: *`any`*): `void`

*Defined in [Model/Decorators/Attr.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Model/Decorators/Attr.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fieldName | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(): [IModelKeys](../#imodelkeys)<`T`>

*Inherited from [IValidate](ivalidate.md).[validate](ivalidate.md#validate)*

*Defined in [Model/Decorators/Validation.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/73b0852/src/Model/Decorators/Validation.ts#L7)*

**Returns:** [IModelKeys](../#imodelkeys)<`T`>

___

