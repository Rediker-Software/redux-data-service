[redux-data-service](../README.md) > [IRelationship](../interfaces/irelationship.md)

# Interface: IRelationship

Classes which wish to use the `@relationship` decorator (or `@belongsTo` or `@hasMany`) should implement this interface.

## Type parameters
#### T 
#### T 
## Hierarchy

↳  [IFieldTypes](ifieldtypes.md)

**↳ IRelationship**

↳  [IModel](imodel.md)

## Index

### Properties

* [fields](irelationship.md#fields)
* [relationships](irelationship.md#relationships)
* [validationRules](irelationship.md#validationrules)

### Methods

* [getRelated](irelationship.md#getrelated)
* [setRelated](irelationship.md#setrelated)
* [validate](irelationship.md#validate)

---

## Properties

<a id="fields"></a>

###  fields

**● fields**: *[IModelKeys](../#imodelkeys)<`T`, [IFieldType](ifieldtype.md)>*

*Inherited from [IFieldTypes](ifieldtypes.md).[fields](ifieldtypes.md#fields)*

*Defined in [Model/Decorators/Field.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/Decorators/Field.ts#L11)*

___
<a id="relationships"></a>

###  relationships

**● relationships**: *`object`*

*Defined in [Model/Decorators/Relationship.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/Decorators/Relationship.ts#L28)*

#### Type declaration

[key: `string`]: [IFieldRelationship](ifieldrelationship.md)

___
<a id="validationrules"></a>

###  validationRules

**● validationRules**: *[IModelKeys](../#imodelkeys)<`T`>*

*Inherited from [IValidate](ivalidate.md).[validationRules](ivalidate.md#validationrules)*

*Defined in [Model/Decorators/Validation.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/Decorators/Validation.ts#L6)*

___

## Methods

<a id="getrelated"></a>

###  getRelated

▸ **getRelated**(key: *`any`*): `any`

*Defined in [Model/Decorators/Relationship.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/Decorators/Relationship.ts#L30)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `any` |

**Returns:** `any`

___
<a id="setrelated"></a>

###  setRelated

▸ **setRelated**(key: *`any`*, value: *`any`*): `void`

*Defined in [Model/Decorators/Relationship.ts:32](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/Decorators/Relationship.ts#L32)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(): [IModelKeys](../#imodelkeys)<`T`>

*Inherited from [IValidate](ivalidate.md).[validate](ivalidate.md#validate)*

*Defined in [Model/Decorators/Validation.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9bffbe1/src/Model/Decorators/Validation.ts#L7)*

**Returns:** [IModelKeys](../#imodelkeys)<`T`>

___

