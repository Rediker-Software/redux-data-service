[redux-data-service](../README.md) > [IFieldRelationship](../interfaces/ifieldrelationship.md)

# Interface: IFieldRelationship

This is the meta-data about a related field on a `Model`, such as a `BelongsTo` or `HasMany` field. It enables us to lazy-load the related model(s) given a field which specifies the related ID(s) and the related service name.

For example, field "student" relates to the "student" service through the "studentId" relatedFieldName.

## Hierarchy

**IFieldRelationship**

## Index

### Properties

* [field](ifieldrelationship.md#field)
* [modelRelatedFieldName](ifieldrelationship.md#modelrelatedfieldname)
* [relatedFieldName](ifieldrelationship.md#relatedfieldname)
* [serviceName](ifieldrelationship.md#servicename)
* [serviceNameField](ifieldrelationship.md#servicenamefield)
* [type](ifieldrelationship.md#type)

---

## Properties

<a id="field"></a>

###  field

**● field**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Model/Decorators/Relationship.ts#L22)*

The name of the field this relationship decorates

___
<a id="modelrelatedfieldname"></a>

### `<Optional>` modelRelatedFieldName

**● modelRelatedFieldName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Model/Decorators/Relationship.ts#L34)*

The name of the field on the OTHER model which provides the ID of THIS model

___
<a id="relatedfieldname"></a>

###  relatedFieldName

**● relatedFieldName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:31](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Model/Decorators/Relationship.ts#L31)*

The field on THIS model which provides the ID or IDs to identify the OTHER model

___
<a id="servicename"></a>

### `<Optional>` serviceName

**● serviceName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:25](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Model/Decorators/Relationship.ts#L25)*

The name of the service associated to the related field

___
<a id="servicenamefield"></a>

### `<Optional>` serviceNameField

**● serviceNameField**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Model/Decorators/Relationship.ts#L28)*

When no serviceName is given, we will use the value of this field to get the name of the related service

___
<a id="type"></a>

###  type

**● type**: *[RelationshipType](../enums/relationshiptype.md)*

*Defined in [Model/Decorators/Relationship.ts:37](https://github.com/Rediker-Software/redux-data-service/blob/d8bc1de/src/Model/Decorators/Relationship.ts#L37)*

The type of relationship, i.e. BelongsTo (one-to-one or one-to-many) or HasMany (many-to-many, many-to-one)

___

