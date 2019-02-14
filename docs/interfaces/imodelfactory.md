[redux-data-service](../README.md) > [IModelFactory](../interfaces/imodelfactory.md)

# Interface: IModelFactory

## Type parameters
#### T :  [IModelData](imodeldata.md)
## Hierarchy

**IModelFactory**

## Index

### Constructors

* [constructor](imodelfactory.md#constructor)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new IModelFactory**(modelData?: *`Partial`<`T`>*, meta?: *`Partial`<[IModelMeta](imodelmeta.md)<`T`>>*, relatedModels?: *[IModelsMap](imodelsmap.md)*): [IModel](imodel.md)<`T`>

*Defined in [Model/IModel.ts:50](https://github.com/Rediker-Software/redux-data-service/blob/2b2774d/src/Model/IModel.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` modelData | `Partial`<`T`> |
| `Optional` meta | `Partial`<[IModelMeta](imodelmeta.md)<`T`>> |
| `Optional` relatedModels | [IModelsMap](imodelsmap.md) |

**Returns:** [IModel](imodel.md)<`T`>

___

