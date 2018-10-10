[redux-data-service](../README.md) > [IFieldTypes](../interfaces/ifieldtypes.md)

# Interface: IFieldTypes

Classes which wish to use the `@field` decorator (or any of the decorators which call it) will need to implement this interface.

## Type parameters
#### T 
#### T 
## Hierarchy

 [IValidate](ivalidate.md)

**↳ IFieldTypes**

↳  [IAttrs](iattrs.md)

↳  [IRelationship](irelationship.md)

## Index

### Properties

* [fields](ifieldtypes.md#fields)
* [validationRules](ifieldtypes.md#validationrules)

### Methods

* [validate](ifieldtypes.md#validate)

---

## Properties

<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)<`T`, [IFieldType](ifieldtype.md)>*

*Defined in [Model/Decorators/Field.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9a774aa/src/Model/Decorators/Field.ts#L11)*

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<`T`>*

*Inherited from [IValidate](ivalidate.md).[validationRules](ivalidate.md#validationrules)*

*Defined in [Model/Decorators/Validation.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9a774aa/src/Model/Decorators/Validation.ts#L6)*

___

## Methods

<a id="validate"></a>

###  validate

▸ **validate**(): [IModelKeys](../#imodelkeys)<`T`>

*Inherited from [IValidate](ivalidate.md).[validate](ivalidate.md#validate)*

*Defined in [Model/Decorators/Validation.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9a774aa/src/Model/Decorators/Validation.ts#L7)*

**Returns:** [IModelKeys](../#imodelkeys)<`T`>

___

