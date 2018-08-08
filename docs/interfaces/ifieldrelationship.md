[redux-data-service](../README.md) > [IFieldRelationship](../interfaces/ifieldrelationship.md)

# Interface: IFieldRelationship

A simple interface for identifying that the given `field` relates to the given `serviceName` via the `relatedFieldName`.

For example, field "student" relates to the "student" service through the "studentId" relatedFieldName.

## Hierarchy

**IFieldRelationship**

## Index

### Properties

* [field](ifieldrelationship.md#field)
* [modelRelatedFieldName](ifieldrelationship.md#modelrelatedfieldname)
* [relatedFieldName](ifieldrelationship.md#relatedfieldname)
* [serviceName](ifieldrelationship.md#servicename)
* [type](ifieldrelationship.md#type)

---

## Properties

<a id="field"></a>

###  field

**● field**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:17](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Decorators/Relationship.ts#L17)*

___
<a id="modelrelatedfieldname"></a>

### `<Optional>` modelRelatedFieldName

**● modelRelatedFieldName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Decorators/Relationship.ts#L20)*

___
<a id="relatedfieldname"></a>

###  relatedFieldName

**● relatedFieldName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:19](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Decorators/Relationship.ts#L19)*

___
<a id="servicename"></a>

###  serviceName

**● serviceName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:18](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Decorators/Relationship.ts#L18)*

___
<a id="type"></a>

###  type

**● type**: *[RelationshipType](../enums/relationshiptype.md)*

*Defined in [Model/Decorators/Relationship.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/cb5e36e/src/Model/Decorators/Relationship.ts#L21)*

___

