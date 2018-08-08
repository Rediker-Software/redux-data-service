[redux-data-service](../README.md) > [IRelationshipOptions](../interfaces/irelationshipoptions.md)

# Interface: IRelationshipOptions

## Hierarchy

↳  [IFieldOptions](ifieldoptions.md)

**↳ IRelationshipOptions**

## Index

### Properties

* [modelRelatedFieldName](irelationshipoptions.md#modelrelatedfieldname)
* [relatedFieldName](irelationshipoptions.md#relatedfieldname)
* [serviceName](irelationshipoptions.md#servicename)

---

## Properties

<a id="modelrelatedfieldname"></a>

### `<Optional>` modelRelatedFieldName

**● modelRelatedFieldName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:43](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Relationship.ts#L43)*

The name of the field on the OTHER model which provides the ID of THIS model

___
<a id="relatedfieldname"></a>

### `<Optional>` relatedFieldName

**● relatedFieldName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:40](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Relationship.ts#L40)*

The field on THIS model which provides the ID or IDs to identify the OTHER model

___
<a id="servicename"></a>

### `<Optional>` serviceName

**● serviceName**: *`string`*

*Defined in [Model/Decorators/Relationship.ts:37](https://github.com/Rediker-Software/redux-data-service/blob/9764f28/src/Model/Decorators/Relationship.ts#L37)*

The service associated to the related field

___

