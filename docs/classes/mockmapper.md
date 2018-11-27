[redux-data-service](../README.md) > [MockMapper](../classes/mockmapper.md)

# Class: MockMapper

## Hierarchy

**MockMapper**

## Implements

* [IMapper](../interfaces/imapper.md)<`any`>

## Index

### Properties

* [normalize](mockmapper.md#normalize)
* [transform](mockmapper.md#transform)

---

## Properties

<a id="normalize"></a>

###  normalize

**● normalize**: *`any`* =  stub().callsFake(data =>
    of$({
      data,
    }),
  )

*Implementation of [IMapper](../interfaces/imapper.md).[normalize](../interfaces/imapper.md#normalize)*

*Defined in [Mapper/MockMapper.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Mapper/MockMapper.ts#L12)*

___
<a id="transform"></a>

###  transform

**● transform**: *`any`* =  stub().callsFake(model =>
    of$({
      ...model,
    }),
  )

*Implementation of [IMapper](../interfaces/imapper.md).[transform](../interfaces/imapper.md#transform)*

*Defined in [Mapper/MockMapper.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/a126781/src/Mapper/MockMapper.ts#L6)*

___

