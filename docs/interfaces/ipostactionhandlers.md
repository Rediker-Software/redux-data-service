[redux-data-service](../README.md) > [IPostActionHandlers](../interfaces/ipostactionhandlers.md)

# Interface: IPostActionHandlers

Used in an action's meta, such that an epic will call the given callbacks when an API request resolves

## Hierarchy

**IPostActionHandlers**

## Index

### Properties

* [onError](ipostactionhandlers.md#onerror)
* [onSuccess](ipostactionhandlers.md#onsuccess)

---

## Properties

<a id="onerror"></a>

### `<Optional>` onError

**● onError**: *`function`*

*Defined in [Services/DataService/IPostActionHandlers.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/2eee607/src/Services/DataService/IPostActionHandlers.ts#L4)*

#### Type declaration
▸(errors: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| errors | `any` |

**Returns:** `void`

___
<a id="onsuccess"></a>

### `<Optional>` onSuccess

**● onSuccess**: *`function`*

*Defined in [Services/DataService/IPostActionHandlers.ts:3](https://github.com/Rediker-Software/redux-data-service/blob/2eee607/src/Services/DataService/IPostActionHandlers.ts#L3)*

#### Type declaration
▸(data: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** `void`

___

