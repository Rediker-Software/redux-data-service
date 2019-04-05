[redux-data-service](../README.md) > [IQueryManager](../interfaces/iquerymanager.md)

# Interface: IQueryManager

## Type parameters
#### T :  [IModelData](imodeldata.md)
## Hierarchy

**IQueryManager**

## Implemented by

* [QueryManager](../classes/querymanager.md)

## Index

### Properties

* [errors](iquerymanager.md#errors)
* [getNextPage](iquerymanager.md#getnextpage)
* [getPreviousPage](iquerymanager.md#getpreviouspage)
* [hasNextPage](iquerymanager.md#hasnextpage)
* [hasPreviousPage](iquerymanager.md#haspreviouspage)
* [isLoading](iquerymanager.md#isloading)
* [items](iquerymanager.md#items)
* [query](iquerymanager.md#query)
* [response](iquerymanager.md#response)

---

## Properties

<a id="errors"></a>

###  errors

**● errors**: *`any`*

*Defined in [Query/QueryManager.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L9)*

___
<a id="getnextpage"></a>

###  getNextPage

**● getNextPage**: *`function`*

*Defined in [Query/QueryManager.ts:13](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L13)*

#### Type declaration
▸(): [IQueryBuilder](iquerybuilder.md)

**Returns:** [IQueryBuilder](iquerybuilder.md)

___
<a id="getpreviouspage"></a>

###  getPreviousPage

**● getPreviousPage**: *`function`*

*Defined in [Query/QueryManager.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L14)*

#### Type declaration
▸(): [IQueryBuilder](iquerybuilder.md)

**Returns:** [IQueryBuilder](iquerybuilder.md)

___
<a id="hasnextpage"></a>

###  hasNextPage

**● hasNextPage**: *`function`*

*Defined in [Query/QueryManager.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L11)*

#### Type declaration
▸(): `boolean`

**Returns:** `boolean`

___
<a id="haspreviouspage"></a>

###  hasPreviousPage

**● hasPreviousPage**: *`function`*

*Defined in [Query/QueryManager.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L12)*

#### Type declaration
▸(): `boolean`

**Returns:** `boolean`

___
<a id="isloading"></a>

###  isLoading

**● isLoading**: *`boolean`*

*Defined in [Query/QueryManager.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L8)*

___
<a id="items"></a>

###  items

**● items**: *[IModel](imodel.md)<`T`>[]*

*Defined in [Query/QueryManager.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L10)*

___
<a id="query"></a>

###  query

**● query**: *[IQueryBuilder](iquerybuilder.md)*

*Defined in [Query/QueryManager.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L6)*

___
<a id="response"></a>

###  response

**● response**: *[IQueryResponse](iqueryresponse.md)*

*Defined in [Query/QueryManager.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/0ef244e/src/Query/QueryManager.ts#L7)*

___

