[redux-data-service](../README.md) > [IPostActionHandlers](../interfaces/ipostactionhandlers.md)

# Interface: IPostActionHandlers

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

*Defined in [Services/DataService.ts:51](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Services/DataService.ts#L51)*

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

*Defined in [Services/DataService.ts:50](https://github.com/Rediker-Software/redux-data-service/blob/7fb0306/src/Services/DataService.ts#L50)*

#### Type declaration
▸(data: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** `void`

___

