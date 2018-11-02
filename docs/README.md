
#  redux-data-service

## Index

### Enumerations

* [RelationshipType](enums/relationshiptype.md)

### Classes

* [BaseSerializer](classes/baseserializer.md)
* [BaseService](classes/baseservice.md)
* [DataService](classes/dataservice.md)
* [FakeModel](classes/fakemodel.md)
* [FakeModelService](classes/fakemodelservice.md)
* [MemoryAdapter](classes/memoryadapter.md)
* [MemorySerializer](classes/memoryserializer.md)
* [MockAdapter](classes/mockadapter.md)
* [MockSerializer](classes/mockserializer.md)
* [Model](classes/model.md)
* [QueryBuilder](classes/querybuilder.md)
* [RestAdapter](classes/restadapter.md)
* [RestSerializer](classes/restserializer.md)

### Interfaces

* [IAction](interfaces/iaction.md)
* [IActionCreators](interfaces/iactioncreators.md)
* [IActionTypes](interfaces/iactiontypes.md)
* [IAdapter](interfaces/iadapter.md)
* [IAdapterFactory](interfaces/iadapterfactory.md)
* [IAttrs](interfaces/iattrs.md)
* [IConfiguration](interfaces/iconfiguration.md)
* [IDataServiceState](interfaces/idataservicestate.md)
* [IDecorator](interfaces/idecorator.md)
* [IFakeModel](interfaces/ifakemodel.md)
* [IFakeModelData](interfaces/ifakemodeldata.md)
* [IFieldOptions](interfaces/ifieldoptions.md)
* [IFieldRelationship](interfaces/ifieldrelationship.md)
* [IFieldType](interfaces/ifieldtype.md)
* [IFieldTypes](interfaces/ifieldtypes.md)
* [IForceReload](interfaces/iforcereload.md)
* [IIsEnumOptions](interfaces/iisenumoptions.md)
* [IModel](interfaces/imodel.md)
* [IModelAPIData](interfaces/imodelapidata.md)
* [IModelData](interfaces/imodeldata.md)
* [IModelDataCreatorMap](interfaces/imodeldatacreatormap.md)
* [IModelFactory](interfaces/imodelfactory.md)
* [IModelId](interfaces/imodelid.md)
* [IModelMeta](interfaces/imodelmeta.md)
* [IModelsMap](interfaces/imodelsmap.md)
* [IModuleMap](interfaces/imodulemap.md)
* [IPostActionHandlers](interfaces/ipostactionhandlers.md)
* [IPushAll](interfaces/ipushall.md)
* [IQueryBuilder](interfaces/iquerybuilder.md)
* [IQueryParams](interfaces/iqueryparams.md)
* [IQueryResponse](interfaces/iqueryresponse.md)
* [IRelationship](interfaces/irelationship.md)
* [IRelationshipOptions](interfaces/irelationshipoptions.md)
* [IRequestCache](interfaces/irequestcache.md)
* [IRestAdapterOptions](interfaces/irestadapteroptions.md)
* [ISelectors](interfaces/iselectors.md)
* [ISerializer](interfaces/iserializer.md)
* [ISerializerFactory](interfaces/iserializerfactory.md)
* [IService](interfaces/iservice.md)
* [IServiceFactory](interfaces/iservicefactory.md)
* [IServiceMap](interfaces/iservicemap.md)
* [ISetField](interfaces/isetfield.md)
* [ISetMetaField](interfaces/isetmetafield.md)
* [ISort](interfaces/isort.md)
* [IValidate](interfaces/ivalidate.md)
* [IValidator](interfaces/ivalidator.md)
* [IValidatorMap](interfaces/ivalidatormap.md)

### Type aliases

* [DataServiceStateRecord](#dataservicestaterecord)
* [FilterValue](#filtervalue)
* [IActionCreator](#iactioncreator)
* [IActionEpic](#iactionepic)
* [IConfigureStore](#iconfigurestore)
* [IModelKeys](#imodelkeys)
* [IObserveableAction](#iobserveableaction)
* [IReducer](#ireducer)
* [IReducers](#ireducers)
* [IRequestCacheKey](#irequestcachekey)
* [IRequestCacheRecord](#irequestcacherecord)
* [SortDirection](#sortdirection)

### Variables

* [RequestCacheRecord](#requestcacherecord)
* [_FakeXHR](#_fakexhr)
* [_FakedXHRHistory](#_fakedxhrhistory)
* [actionStubMap](#actionstubmap)
* [configuration](#configuration)
* [initializationComplete](#initializationcomplete)
* [initialize](#initialize)
* [initializeValidateJS](#initializevalidatejs)
* [mapValuesWithKeys](#mapvalueswithkeys)
* [mapWithKeys](#mapwithkeys)
* [modelDataCreatorMap](#modeldatacreatormap)
* [serviceMap](#servicemap)

### Functions

* [addPenultimateFieldToPath](#addpenultimatefieldtopath)
* [attr](#attr)
* [belongsTo](#belongsto)
* [configure](#configure)
* [configureStore](#configurestore)
* [createEnumField](#createenumfield)
* [createMockFakeModel](#createmockfakemodel)
* [createMockFakeModelArray](#createmockfakemodelarray)
* [createMockFakeModelData](#createmockfakemodeldata)
* [createMockFakeModels](#createmockfakemodels)
* [createMockServiceState](#createmockservicestate)
* [field](#field)
* [flattenObjectKeys](#flattenobjectkeys)
* [getActionStubMap](#getactionstubmap)
* [getConfiguration](#getconfiguration)
* [getDataService](#getdataservice)
* [getDateTimeFormat](#getdatetimeformat)
* [getEpics](#getepics)
* [getFakeXHR](#getfakexhr)
* [getFakedXHRHistory](#getfakedxhrhistory)
* [getFieldTypeForRelationship](#getfieldtypeforrelationship)
* [getNestedFieldName](#getnestedfieldname)
* [getReducers](#getreducers)
* [getRelatedFieldNameForRelationship](#getrelatedfieldnameforrelationship)
* [getService](#getservice)
* [hasMany](#hasmany)
* [initializeDateTimeValidator](#initializedatetimevalidator)
* [initializeMockDataCreators](#initializemockdatacreators)
* [initializePhoneNumberValidator](#initializephonenumbervalidator)
* [initializeServices](#initializeservices)
* [initializeTestServices](#initializetestservices)
* [isApplicationInitialized](#isapplicationinitialized)
* [isEnum](#isenum)
* [loggerMiddleware](#loggermiddleware)
* [makeInitialize](#makeinitialize)
* [makeInitializeValidateJS](#makeinitializevalidatejs)
* [registerService](#registerservice)
* [relationship](#relationship)
* [required](#required)
* [resetInitializationStatus](#resetinitializationstatus)
* [restoreActionStubs](#restoreactionstubs)
* [seedService](#seedservice)
* [seedServiceList](#seedservicelist)
* [seedServices](#seedservices)
* [stubActionCreators](#stubactioncreators)
* [stubService](#stubservice)
* [stubXHR](#stubxhr)
* [tryStubAction](#trystubaction)
* [validation](#validation)

### Object literals

* [ArrayField](#arrayfield)
* [BelongsToField](#belongstofield)
* [BooleanField](#booleanfield)
* [DateField](#datefield)
* [DateTimeField](#datetimefield)
* [EmailField](#emailfield)
* [FileField](#filefield)
* [HasManyField](#hasmanyfield)
* [NumberField](#numberfield)
* [ObjectField](#objectfield)
* [PhoneNumberField](#phonenumberfield)
* [StringField](#stringfield)
* [TimeField](#timefield)
* [URLField](#urlfield)
* [fakeModelModule](#fakemodelmodule)

---

## Type aliases

<a id="dataservicestaterecord"></a>

###  DataServiceStateRecord

**ΤDataServiceStateRecord**: * `Record`<[IDataServiceState](interfaces/idataservicestate.md)<`T`>> & `Readonly`<[IDataServiceState](interfaces/idataservicestate.md)<`T`>>
*

*Defined in [Services/DataService.ts:54](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/DataService.ts#L54)*

___
<a id="filtervalue"></a>

###  FilterValue

**ΤFilterValue**: * `string` &#124; `number` &#124; `boolean`
*

*Defined in [Query/QueryBuilder.ts:12](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Query/QueryBuilder.ts#L12)*

___
<a id="iactioncreator"></a>

###  IActionCreator

**ΤIActionCreator**: *`function`*

*Defined in [Services/IService.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/IService.ts#L14)*

#### Type declaration
▸(payload?: *`T`*, meta?: *`M`*): [IAction](interfaces/iaction.md)<`T`, `M`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` payload | `T` |
| `Optional` meta | `M` |

**Returns:** [IAction](interfaces/iaction.md)<`T`, `M`>

___
<a id="iactionepic"></a>

###  IActionEpic

**ΤIActionEpic**: *`Epic`<[IObserveableAction](#iobserveableaction)<`T`>, `__type`, `any`>*

*Defined in [Services/IService.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/IService.ts#L24)*

___
<a id="iconfigurestore"></a>

###  IConfigureStore

**ΤIConfigureStore**: *`function`*

*Defined in [Store/ConfigureStore.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Store/ConfigureStore.ts#L8)*

#### Type declaration
▸(reducers: *[IReducers](#ireducers)<`any`>*, epics: *[IActionEpic](#iactionepic)[]*): `Store`<`any`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| reducers | [IReducers](#ireducers)<`any`> |
| epics | [IActionEpic](#iactionepic)[] |

**Returns:** `Store`<`any`>

___
<a id="imodelkeys"></a>

###  IModelKeys

**ΤIModelKeys**: * `object` &#124; `null`
*

*Defined in [Model/IModel.ts:3](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/IModel.ts#L3)*

___
<a id="iobserveableaction"></a>

###  IObserveableAction

**ΤIObserveableAction**: * `ActionsObservable`<[IAction](interfaces/iaction.md)<`T`>> & [IAction](interfaces/iaction.md)<`T`>
*

*Defined in [Services/IService.ts:23](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/IService.ts#L23)*

___
<a id="ireducer"></a>

###  IReducer

**ΤIReducer**: *`function`*

*Defined in [Services/IService.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/IService.ts#L20)*

#### Type declaration
▸(state: *`S`*, action: *[IAction](interfaces/iaction.md)*): `S`

**Parameters:**

| Param | Type |
| ------ | ------ |
| state | `S` |
| action | [IAction](interfaces/iaction.md) |

**Returns:** `S`

___
<a id="ireducers"></a>

###  IReducers

**ΤIReducers**: * `object` &#124; `__type`
*

*Defined in [Services/IService.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/IService.ts#L21)*

___
<a id="irequestcachekey"></a>

###  IRequestCacheKey

**ΤIRequestCacheKey**: *`string`*

*Defined in [Services/DataService.ts:34](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/DataService.ts#L34)*

___
<a id="irequestcacherecord"></a>

###  IRequestCacheRecord

**ΤIRequestCacheRecord**: * `Record`<[IRequestCache](interfaces/irequestcache.md)> & `Readonly`<[IRequestCache](interfaces/irequestcache.md)>
*

*Defined in [Services/DataService.ts:42](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/DataService.ts#L42)*

___
<a id="sortdirection"></a>

###  SortDirection

**ΤSortDirection**: * "asc" &#124; "desc"
*

*Defined in [Query/QueryBuilder.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Query/QueryBuilder.ts#L6)*

___

## Variables

<a id="requestcacherecord"></a>

### `<Const>` RequestCacheRecord

**● RequestCacheRecord**: *`Factory`<[IRequestCache](interfaces/irequestcache.md)>* =  Record<IRequestCache>({
  isLoading: false,
  errors: null,
  ids: List(),
})

*Defined in [Services/DataService.ts:58](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/DataService.ts#L58)*

___
<a id="_fakexhr"></a>

### `<Let>` _FakeXHR

**● _FakeXHR**: *`any`*

*Defined in [TestUtils/Service.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L30)*

___
<a id="_fakedxhrhistory"></a>

### `<Let>` _FakedXHRHistory

**● _FakedXHRHistory**: *`any`[]* =  []

*Defined in [TestUtils/Service.ts:29](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L29)*

___
<a id="actionstubmap"></a>

### `<Let>` actionStubMap

**● actionStubMap**: *`any`*

*Defined in [TestUtils/Service.ts:28](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L28)*

Looks like { \[moduleName\] : { \[actionName\] : { base: main stub on action invokeSpy: A Sinon Spy } } }

___
<a id="configuration"></a>

### `<Let>` configuration

**● configuration**: *[IConfiguration](interfaces/iconfiguration.md)* =  {} as IConfiguration

*Defined in [Configure.ts:16](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Configure.ts#L16)*

___
<a id="initializationcomplete"></a>

### `<Let>` initializationComplete

**● initializationComplete**: *`boolean`* = false

*Defined in [Initialize.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Initialize.ts#L4)*

___
<a id="initialize"></a>

### `<Const>` initialize

**● initialize**: *`(Anonymous function)`* =  makeInitialize(Initializers)

*Defined in [Initialize.ts:37](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Initialize.ts#L37)*

Initializers are fired once when the app boots up, providing a useful hook for initializing the application. For instance, if a third-party dependency needs some initial setup, create an initializer in the Initializers directory.

Every function exported from the Initializers directory whose name starts with "initialize" will be executed.

___
<a id="initializevalidatejs"></a>

### `<Const>` initializeValidateJS

**● initializeValidateJS**: *`(Anonymous function)`* =  makeInitializeValidateJS(validateJS, Validators)

*Defined in [Initializers/InitializeValidateJS.ts:27](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Initializers/InitializeValidateJS.ts#L27)*

Validation initializers are pulled out of the Validation directory and executed using a standard naming convention such that they are executed if their name starts with "initialize". They are passed an instance of validate.js

___
<a id="mapvalueswithkeys"></a>

### `<Const>` mapValuesWithKeys

**● mapValuesWithKeys**: *`any`* =  convert("mapValues", mapValues, {
  cap: false,
})

*Defined in [Utils/Lodash.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Utils/Lodash.ts#L11)*

By default, lodash/fp/mapValues does not return the key to the iterator. This example was lifted from their docs to make it work as expected.
*__type__*: {any}

*__see__*: [https://github.com/lodash/lodash/wiki/FP-Guide](https://github.com/lodash/lodash/wiki/FP-Guide)

___
<a id="mapwithkeys"></a>

### `<Const>` mapWithKeys

**● mapWithKeys**: *`any`* =  convert("map", map, {
  cap: false,
})

*Defined in [Utils/Lodash.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Utils/Lodash.ts#L22)*

By default, lodash/fp/map does not return the key to the iterator. This example was lifted from their docs to make it work as expected.
*__type__*: {any}

*__see__*: [https://github.com/lodash/lodash/wiki/FP-Guide](https://github.com/lodash/lodash/wiki/FP-Guide)

___
<a id="modeldatacreatormap"></a>

### `<Let>` modelDataCreatorMap

**● modelDataCreatorMap**: *[IModelDataCreatorMap](interfaces/imodeldatacreatormap.md)*

*Defined in [TestUtils/Service.ts:15](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L15)*

___
<a id="servicemap"></a>

### `<Let>` serviceMap

**● serviceMap**: *[IServiceMap](interfaces/iservicemap.md)*

*Defined in [Services/ServiceProvider.ts:21](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/ServiceProvider.ts#L21)*

___

## Functions

<a id="addpenultimatefieldtopath"></a>

### `<Const>` addPenultimateFieldToPath

▸ **addPenultimateFieldToPath**(path: *`string`*, field: *`any`*): `string`[]

*Defined in [Utils/String.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Utils/String.ts#L24)*

Given a path string in dot notation compatible with lodash's `get` and `set` functions, will return the path as an array of strings with the given field as the second to last item.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string` |  - |
| field | `any` |  - |

**Returns:** `string`[]

___
<a id="attr"></a>

###  attr

▸ **attr**(fieldType: *[IFieldType](interfaces/ifieldtype.md)*, options?: *[IFieldOptions](interfaces/ifieldoptions.md)*): [IDecorator](interfaces/idecorator.md)<[IAttrs](interfaces/iattrs.md)>

*Defined in [Model/Decorators/Attr.ts:24](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/Attr.ts#L24)*

A decorator which maps a property's getter and setter to `getField` and `setField` methods implemented on the target class.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| fieldType | [IFieldType](interfaces/ifieldtype.md) | - |  - |
| `Default value` options | [IFieldOptions](interfaces/ifieldoptions.md) |  {} |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IAttrs](interfaces/iattrs.md)>

___
<a id="belongsto"></a>

###  belongsTo

▸ **belongsTo**(options?: *[IRelationshipOptions](interfaces/irelationshipoptions.md)*): [IDecorator](interfaces/idecorator.md)<[IRelationship](interfaces/irelationship.md)>

*Defined in [Model/Decorators/BelongsTo.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/BelongsTo.ts#L14)*

A decorator which creates a "BelongsTo" relationship, for establishing a one-to-many or one-to-one relationship to the related service, such that this service has one of the related service. The `relatedFieldName` is the FK field on this model, for identifying the ID of the related model.

If no `serviceName` is provided, the property being decorated will be used. If no `relatedFieldName` is provided, the `serviceName` will be used with the suffix "Id". eg: "organizationId"

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` options | [IRelationshipOptions](interfaces/irelationshipoptions.md) |  {} |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IRelationship](interfaces/irelationship.md)>

___
<a id="configure"></a>

###  configure

▸ **configure**(config: *[IConfiguration](interfaces/iconfiguration.md)*, configureStore?: *[IConfigureStore](#iconfigurestore)*): `Store`<`any`>

*Defined in [Configure.ts:22](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Configure.ts#L22)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| config | [IConfiguration](interfaces/iconfiguration.md) | - |
| `Default value` configureStore | [IConfigureStore](#iconfigurestore) |  defaultConfigureStore |

**Returns:** `Store`<`any`>

___
<a id="configurestore"></a>

### `<Const>` configureStore

▸ **configureStore**(reducers: *[IReducers](#ireducers)<`any`>*, epics: *[IActionEpic](#iactionepic)[]*):  `Store`<`Object`, `AnyAction`> & `object`

*Defined in [Store/ConfigureStore.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Store/ConfigureStore.ts#L10)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| reducers | [IReducers](#ireducers)<`any`> |
| epics | [IActionEpic](#iactionepic)[] |

**Returns:**  `Store`<`Object`, `AnyAction`> & `object`

___
<a id="createenumfield"></a>

### `<Const>` createEnumField

▸ **createEnumField**(fieldEnum: *`any`*): [IFieldType](interfaces/ifieldtype.md)<`any`>

*Defined in [Model/FieldType/EnumField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/EnumField.ts#L4)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fieldEnum | `any` |

**Returns:** [IFieldType](interfaces/ifieldtype.md)<`any`>

___
<a id="createmockfakemodel"></a>

###  createMockFakeModel

▸ **createMockFakeModel**(overrideValues?: *[IFakeModelData](interfaces/ifakemodeldata.md)*): [FakeModel](classes/fakemodel.md)

*Defined in [Model/Model.mock.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Model.mock.ts#L44)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` overrideValues | [IFakeModelData](interfaces/ifakemodeldata.md) |

**Returns:** [FakeModel](classes/fakemodel.md)

___
<a id="createmockfakemodelarray"></a>

###  createMockFakeModelArray

▸ **createMockFakeModelArray**(numItems?: *`number`*): [IFakeModelData](interfaces/ifakemodeldata.md)[]

*Defined in [Model/Model.mock.ts:59](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Model.mock.ts#L59)*

Generates an array of items using fake data

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` numItems | `number` | 10 |  - |

**Returns:** [IFakeModelData](interfaces/ifakemodeldata.md)[]

___
<a id="createmockfakemodeldata"></a>

###  createMockFakeModelData

▸ **createMockFakeModelData**(id?: *`string`*): [IFakeModelData](interfaces/ifakemodeldata.md)

*Defined in [Model/Model.mock.ts:35](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Model.mock.ts#L35)*

Generates a single item using fake data

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` id | `string` |  - |

**Returns:** [IFakeModelData](interfaces/ifakemodeldata.md)

___
<a id="createmockfakemodels"></a>

###  createMockFakeModels

▸ **createMockFakeModels**(numItems?: *`number`*): [FakeModel](classes/fakemodel.md)[]

*Defined in [Model/Model.mock.ts:69](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Model.mock.ts#L69)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` numItems | `number` | 10 |

**Returns:** [FakeModel](classes/fakemodel.md)[]

___
<a id="createmockservicestate"></a>

###  createMockServiceState

▸ **createMockServiceState**T(service: *[IService](interfaces/iservice.md)<`T`>*, actions?: *[IAction](interfaces/iaction.md)[]*): `object`

*Defined in [TestUtils/Service.ts:218](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L218)*

Creates a mock state object for the given service to plug it into a mock Redux store
*__see__*: redux-test-utils/createMockStore

**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| service | [IService](interfaces/iservice.md)<`T`> | - |  - |
| `Default value` actions | [IAction](interfaces/iaction.md)[] |  [] |  - |

**Returns:** `object`
any

___
<a id="field"></a>

###  field

▸ **field**(fieldType: *[IFieldType](interfaces/ifieldtype.md)*, options?: * [IFieldOptions](interfaces/ifieldoptions.md) & `any`*): [IDecorator](interfaces/idecorator.md)<[IFieldTypes](interfaces/ifieldtypes.md)>

*Defined in [Model/Decorators/Field.ts:27](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/Field.ts#L27)*

A decorator which marks the FieldType for the property and sets up default validation rules.

Note: Chances are you should use the `@attr`, `@belongsTo` or `@hasMany` decorators instead, each of which wrap this decorator.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| fieldType | [IFieldType](interfaces/ifieldtype.md) | - |  - |
| `Default value` options |  [IFieldOptions](interfaces/ifieldoptions.md) & `any`|  {} |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IFieldTypes](interfaces/ifieldtypes.md)>

___
<a id="flattenobjectkeys"></a>

### `<Const>` flattenObjectKeys

▸ **flattenObjectKeys**(obj: *`any`*): `any`

*Defined in [Utils/Lodash.ts:39](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Utils/Lodash.ts#L39)*

Flattens the keys of an object's immediate children onto a copy of the parent object.

For example:

Given input: `{ a: { b: 123, c: 456 }, name: "Jessica" }`, This will output: `{ "a.b": 123, "a.c": 456, name: "Jessica" }`.

Note that this function will intentionally go only one level deep.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any` |  - |

**Returns:** `any`

___
<a id="getactionstubmap"></a>

###  getActionStubMap

▸ **getActionStubMap**(): `any`

*Defined in [TestUtils/Service.ts:138](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L138)*

**Returns:** `any`

___
<a id="getconfiguration"></a>

###  getConfiguration

▸ **getConfiguration**(): [IConfiguration](interfaces/iconfiguration.md)

*Defined in [Configure.ts:18](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Configure.ts#L18)*

**Returns:** [IConfiguration](interfaces/iconfiguration.md)

___
<a id="getdataservice"></a>

###  getDataService

▸ **getDataService**T(name: *`string`*): [DataService](classes/dataservice.md)<`T`>

*Defined in [Services/ServiceProvider.ts:44](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/ServiceProvider.ts#L44)*

Get the requested DataService using getService.

**Type parameters:**

#### T :  [IModelData](interfaces/imodeldata.md)
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  - |

**Returns:** [DataService](classes/dataservice.md)<`T`>

___
<a id="getdatetimeformat"></a>

### `<Const>` getDateTimeFormat

▸ **getDateTimeFormat**(options: *`any`*): `any`

*Defined in [Validators/DateTime.ts:3](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Validators/DateTime.ts#L3)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| options | `any` |

**Returns:** `any`

___
<a id="getepics"></a>

###  getEpics

▸ **getEpics**(): [IActionEpic](#iactionepic)[]

*Defined in [Services/ServiceProvider.ts:110](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/ServiceProvider.ts#L110)*

Creates the root epic which will be added to the redux-observable epic middleware

Note: This method is called on startup. You should not need to call it directly except for testing purposes.

**Returns:** [IActionEpic](#iactionepic)[]

___
<a id="getfakexhr"></a>

###  getFakeXHR

▸ **getFakeXHR**(): `any`

*Defined in [TestUtils/Service.ts:86](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L86)*

**Returns:** `any`

___
<a id="getfakedxhrhistory"></a>

###  getFakedXHRHistory

▸ **getFakedXHRHistory**(): `any`[]

*Defined in [TestUtils/Service.ts:90](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L90)*

**Returns:** `any`[]

___
<a id="getfieldtypeforrelationship"></a>

### `<Const>` getFieldTypeForRelationship

▸ **getFieldTypeForRelationship**(relationshipType: *[RelationshipType](enums/relationshiptype.md)*): [IFieldType](interfaces/ifieldtype.md)<`any`>

*Defined in [Model/Decorators/Relationship.ts:52](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/Relationship.ts#L52)*

Get the corresponding FieldType object for the given RelationshipType.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| relationshipType | [RelationshipType](enums/relationshiptype.md) |  - |

**Returns:** [IFieldType](interfaces/ifieldtype.md)<`any`>

___
<a id="getnestedfieldname"></a>

### `<Const>` getNestedFieldName

▸ **getNestedFieldName**(path: *`any`*): `any`

*Defined in [Utils/String.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Utils/String.ts#L11)*

Given a path string in dot notation compatible with lodash's `get` and `set` functions, this will return the nested value.

For example, given path "a.b.c", this will return "c".

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `any` |  - |

**Returns:** `any`

___
<a id="getreducers"></a>

###  getReducers

▸ **getReducers**(): [IReducers](#ireducers)<`any`>

*Defined in [Services/ServiceProvider.ts:101](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/ServiceProvider.ts#L101)*

Creates the root reducer to be added to the Redux store. Note: This method is called on startup. You should not need to call it directly except for testing purposes.

**Returns:** [IReducers](#ireducers)<`any`>

___
<a id="getrelatedfieldnameforrelationship"></a>

### `<Const>` getRelatedFieldNameForRelationship

▸ **getRelatedFieldNameForRelationship**(relationshipType: *[RelationshipType](enums/relationshiptype.md)*, baseName: *`string`*): `string`

*Defined in [Model/Decorators/Relationship.ts:73](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/Relationship.ts#L73)*

Determine the property name of the related field depending on the relationship.

BelongsTo will add the suffix "Id" to the given `baseName` HasMany will add the suffix "Ids" to the given `baseName`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| relationshipType | [RelationshipType](enums/relationshiptype.md) |  - |
| baseName | `string` |  - |

**Returns:** `string`

___
<a id="getservice"></a>

###  getService

▸ **getService**T(name: *`any`*): [IService](interfaces/iservice.md)<`T`>

*Defined in [Services/ServiceProvider.ts:30](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/ServiceProvider.ts#L30)*

Behaves as a dependency injection service to facilitate injecting service instances based on their name and module. This is useful for testing so services can be replaced with mocks.

**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `any` |  - |

**Returns:** [IService](interfaces/iservice.md)<`T`>

___
<a id="hasmany"></a>

###  hasMany

▸ **hasMany**(options?: *[IRelationshipOptions](interfaces/irelationshipoptions.md)*): [IDecorator](interfaces/idecorator.md)<[IRelationship](interfaces/irelationship.md)>

*Defined in [Model/Decorators/HasMany.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/HasMany.ts#L14)*

A decorator which creates a "HasMany" relationship, for establishing a many-to-one or many-to-many relationship to the related service, such that this service has many of the related service. The `relatedFieldName` is the FK field on this model, for identifying the IDs of the related models.

If no `serviceName` is provided, the property being decorated will be used. If no `relatedFieldName` is provided, the `serviceName` will be used with the suffix "Ids". eg: "studentIds"

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` options | [IRelationshipOptions](interfaces/irelationshipoptions.md) |  {} |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IRelationship](interfaces/irelationship.md)>

___
<a id="initializedatetimevalidator"></a>

### `<Const>` initializeDateTimeValidator

▸ **initializeDateTimeValidator**(validate: *`any`*): `any`

*Defined in [Validators/DateTime.ts:19](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Validators/DateTime.ts#L19)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| validate | `any` |

**Returns:** `any`

___
<a id="initializemockdatacreators"></a>

###  initializeMockDataCreators

▸ **initializeMockDataCreators**(modules: *`any`*): `void`

*Defined in [TestUtils/Service.ts:56](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L56)*

Build a modelDataCreatorMap for later use in the seedService* functions

**Parameters:**

| Param | Type |
| ------ | ------ |
| modules | `any` |

**Returns:** `void`

___
<a id="initializephonenumbervalidator"></a>

### `<Const>` initializePhoneNumberValidator

▸ **initializePhoneNumberValidator**(validate: *`any`*): `(Anonymous function)`

*Defined in [Validators/PhoneNumber.ts:1](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Validators/PhoneNumber.ts#L1)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| validate | `any` |

**Returns:** `(Anonymous function)`

___
<a id="initializeservices"></a>

###  initializeServices

▸ **initializeServices**(modules: *[IModuleMap](interfaces/imodulemap.md)*): `void`

*Defined in [Services/ServiceProvider.ts:62](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/ServiceProvider.ts#L62)*

Initialize the map of services to enable dependency injection.

We assume each module exports a class which follows the naming convention: "Service" For example: the "country" module should export a CountryService

Note: This is called when the application boots up, pulling in the map from the "fakeModelModule" directory to automagically register all fakeModelModule. Eventually, it would be nice to register services as they are requested and dynamically update the redux store as they are needed. This would be especially ideal for code splitting.

You should not need to call this method directly unless it is needed for testing.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| modules | [IModuleMap](interfaces/imodulemap.md) |   |

**Returns:** `void`

___
<a id="initializetestservices"></a>

###  initializeTestServices

▸ **initializeTestServices**(modules: *[IModuleMap](interfaces/imodulemap.md)*, shouldStubActionCreators?: *`boolean`*, configOptions?: *`Partial`<[IConfiguration](interfaces/iconfiguration.md)>*): `Store`<`any`>

*Defined in [TestUtils/Service.ts:36](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L36)*

Registers the services, short circuits their XHR epics and returns a Redux store. Will use a MemoryAdapter and MemorySerializer by default.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| modules | [IModuleMap](interfaces/imodulemap.md) | - |
| `Default value` shouldStubActionCreators | `boolean` | true |
| `Default value` configOptions | `Partial`<[IConfiguration](interfaces/iconfiguration.md)> |  {} |

**Returns:** `Store`<`any`>

___
<a id="isapplicationinitialized"></a>

### `<Const>` isApplicationInitialized

▸ **isApplicationInitialized**(): `boolean`

*Defined in [Initialize.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Initialize.ts#L11)*

Determine if the application's initializers have been fired yet.

**Returns:** `boolean`

___
<a id="isenum"></a>

###  isEnum

▸ **isEnum**(fieldEnum: *`any`*, options?: *[IIsEnumOptions](interfaces/iisenumoptions.md)*): [IDecorator](interfaces/idecorator.md)<[IFieldTypes](interfaces/ifieldtypes.md)>

*Defined in [Model/Decorators/IsEnum.ts:17](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/IsEnum.ts#L17)*

A decorator which maps a property's getter and setter to `getField` and `setField` methods implemented on the target class.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| fieldEnum | `any` | - |  - |
| `Default value` options | [IIsEnumOptions](interfaces/iisenumoptions.md) |  {} |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IFieldTypes](interfaces/ifieldtypes.md)>

___
<a id="loggermiddleware"></a>

###  loggerMiddleware

▸ **loggerMiddleware**(): `(Anonymous function)`

*Defined in [Store/Middleware/Logger.ts:1](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Store/Middleware/Logger.ts#L1)*

**Returns:** `(Anonymous function)`

___
<a id="makeinitialize"></a>

### `<Const>` makeInitialize

▸ **makeInitialize**(initializers: *`any`*): `(Anonymous function)`

*Defined in [Initialize.ts:20](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Initialize.ts#L20)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| initializers | `any` |

**Returns:** `(Anonymous function)`

___
<a id="makeinitializevalidatejs"></a>

### `<Const>` makeInitializeValidateJS

▸ **makeInitializeValidateJS**(validate: *`validateJS.ValidateJS`*, validators: *[IValidatorMap](interfaces/ivalidatormap.md)*): `(Anonymous function)`

*Defined in [Initializers/InitializeValidateJS.ts:14](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Initializers/InitializeValidateJS.ts#L14)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| validate | `validateJS.ValidateJS` |
| validators | [IValidatorMap](interfaces/ivalidatormap.md) |

**Returns:** `(Anonymous function)`

___
<a id="registerservice"></a>

###  registerService

▸ **registerService**(service: *[IService](interfaces/iservice.md)<`any`>*): `void`

*Defined in [Services/ServiceProvider.ts:92](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Services/ServiceProvider.ts#L92)*

Enables service dependency injection by registering services so they can later be retrieved (injected) as needed.

Note: Until we can support dynamically updating the redux store, you should not need to call this method except as a convenience for testing purposes.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| service | [IService](interfaces/iservice.md)<`any`> |   |

**Returns:** `void`

___
<a id="relationship"></a>

###  relationship

▸ **relationship**(relationshipType: *[RelationshipType](enums/relationshiptype.md)*, options?: *[IRelationshipOptions](interfaces/irelationshipoptions.md)*): [IDecorator](interfaces/idecorator.md)<[IRelationship](interfaces/irelationship.md)>

*Defined in [Model/Decorators/Relationship.ts:95](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/Relationship.ts#L95)*

A decorator which establishes that the decorated property is related to the given serviceName through the given relatedFieldName. You probably want to use `@belongsTo` or `@hasMany` decorators, which wrap this one.

If no `serviceName` is provided, the name of the property being decorated will be used. If no `relatedFieldName` is provided, the name of the property being decorated will be used with the suffix "Id" or "Ids" depending on the relationship.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| relationshipType | [RelationshipType](enums/relationshiptype.md) | - |  - |
| `Default value` options | [IRelationshipOptions](interfaces/irelationshipoptions.md) |  {} |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IRelationship](interfaces/irelationship.md)>

___
<a id="required"></a>

###  required

▸ **required**(message?: *`string`*, allowEmpty?: *`boolean`*): [IDecorator](interfaces/idecorator.md)<[IValidate](interfaces/ivalidate.md)>

*Defined in [Model/Decorators/Required.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/Required.ts#L11)*

Decorator to conveniently set a "required" validation rule.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` message | `string` | &quot;is required&quot; |  - |
| `Default value` allowEmpty | `boolean` | false |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IValidate](interfaces/ivalidate.md)>

___
<a id="resetinitializationstatus"></a>

### `<Const>` resetInitializationStatus

▸ **resetInitializationStatus**(): `boolean`

*Defined in [Initialize.ts:18](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Initialize.ts#L18)*

Reset the application's initialization status.

**Returns:** `boolean`

___
<a id="restoreactionstubs"></a>

###  restoreActionStubs

▸ **restoreActionStubs**(): `void`

*Defined in [TestUtils/Service.ts:145](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L145)*

Restores all stubs in the action stub map

**Returns:** `void`

___
<a id="seedservice"></a>

###  seedService

▸ **seedService**T(serviceName: *`string`*, overrideValues?: *`Partial`<`T`>*): [IModel](interfaces/imodel.md)<`T`>

*Defined in [TestUtils/Service.ts:160](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L160)*

Adds seed data to the redux store for a single specific service

**Type parameters:**

#### T :  [IModelData](interfaces/imodeldata.md)
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| serviceName | `string` | - |  service to seed |
| `Default value` overrideValues | `Partial`<`T`> |  {} |  values to override in seed |

**Returns:** [IModel](interfaces/imodel.md)<`T`>

___
<a id="seedservicelist"></a>

###  seedServiceList

▸ **seedServiceList**T(serviceName: *`string`*, count?: *`number`*, overrideValues?: *`Partial`<`T`>*): [IModel](interfaces/imodel.md)<`T`>[]

*Defined in [TestUtils/Service.ts:180](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L180)*

Adds multiple seeds to the redux store for a single specified service. If `overrideValues` are provided, they will be added to the service's requestCache as queryParams.

**Type parameters:**

#### T :  [IModelData](interfaces/imodeldata.md)
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| serviceName | `string` | - |  service to seed |
| `Default value` count | `number` | 5 |  number of seeds |
| `Default value` overrideValues | `Partial`<`T`> |  {} |  values to override in seeds |

**Returns:** [IModel](interfaces/imodel.md)<`T`>[]

___
<a id="seedservices"></a>

###  seedServices

▸ **seedServices**(serviceNames?: *`string`[]*): `__type`

*Defined in [TestUtils/Service.ts:198](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L198)*

Add multiple seeds for each of the initialized services

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` serviceNames | `string`[] |  services to seed, defaults to all services initialized in initializeTestServices() |

**Returns:** `__type`

___
<a id="stubactioncreators"></a>

###  stubActionCreators

▸ **stubActionCreators**(modules: *`any`*): `void`

*Defined in [TestUtils/Service.ts:67](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L67)*

Stub all actions in each service

**Parameters:**

| Param | Type |
| ------ | ------ |
| modules | `any` |

**Returns:** `void`

___
<a id="stubservice"></a>

###  stubService

▸ **stubService**(moduleName: *`string`*): `object`

*Defined in [TestUtils/Service.ts:100](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L100)*

Attempts to stub a service

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| moduleName | `string` |  name of module which will have its service stubbed |

**Returns:** `object`
stubMapEntry or undefined if nothing stubbed

___
<a id="stubxhr"></a>

###  stubXHR

▸ **stubXHR**(): `void`

*Defined in [TestUtils/Service.ts:78](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L78)*

Stub all XHR requests via Sinon

**Returns:** `void`

___
<a id="trystubaction"></a>

###  tryStubAction

▸ **tryStubAction**(moduleName: *`string`*, obj: *`any`*, methodName: *`string`*): `object`

*Defined in [TestUtils/Service.ts:123](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/Service.ts#L123)*

Attempts to stub a method on an object if that method exists, stub returns a valid IAction

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| moduleName | `string` |  Name of module this stub is acting on |
| obj | `any` |  Object to stub |
| methodName | `string` |  method in object to stub |

**Returns:** `object`
Sinon stub if methodName in obj otherwise undefined

___
<a id="validation"></a>

###  validation

▸ **validation**(validationRules: *`any`*): [IDecorator](interfaces/idecorator.md)<[IValidate](interfaces/ivalidate.md)>

*Defined in [Model/Decorators/Validation.ts:18](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/Decorators/Validation.ts#L18)*

A property decorator for specifying validation rules.

We currently use [Validate.js](https://validatejs.org/), but this should work with any rules-based validation engine.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| validationRules | `any` |  - |

**Returns:** [IDecorator](interfaces/idecorator.md)<[IValidate](interfaces/ivalidate.md)>

___

## Object literals

<a id="arrayfield"></a>

### `<Const>` ArrayField

**ArrayField**: *`object`*

*Defined in [Model/FieldType/ArrayField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ArrayField.ts#L4)*

<a id="arrayfield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`undefined`[]* =  []

*Defined in [Model/FieldType/ArrayField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ArrayField.ts#L7)*

___
<a id="arrayfield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/ArrayField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ArrayField.ts#L5)*

___
<a id="arrayfield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/ArrayField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ArrayField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="arrayfield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `Promise`<`any`>

*Defined in [Model/FieldType/ArrayField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ArrayField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Promise`<`any`>

___
<a id="arrayfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/ArrayField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ArrayField.ts#L6)*

<a id="arrayfield.defaultvalidationrules.type"></a>

####  type

**● type**: *`string`* = "array"

*Defined in [Model/FieldType/ArrayField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ArrayField.ts#L6)*

___

___

___
<a id="belongstofield"></a>

### `<Const>` BelongsToField

**BelongsToField**: *`object`*

*Defined in [Model/FieldType/BelongsToField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BelongsToField.ts#L4)*

<a id="belongstofield.serialize"></a>

####  serialize

**● serialize**: *`false`* = false

*Defined in [Model/FieldType/BelongsToField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BelongsToField.ts#L6)*

___

___
<a id="booleanfield"></a>

### `<Const>` BooleanField

**BooleanField**: *`object`*

*Defined in [Model/FieldType/BooleanField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BooleanField.ts#L4)*

<a id="booleanfield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`false`* = false

*Defined in [Model/FieldType/BooleanField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BooleanField.ts#L7)*

___
<a id="booleanfield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/BooleanField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BooleanField.ts#L5)*

___
<a id="booleanfield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/BooleanField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BooleanField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="booleanfield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `Promise`<`boolean`>

*Defined in [Model/FieldType/BooleanField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BooleanField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Promise`<`boolean`>

___
<a id="booleanfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/BooleanField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BooleanField.ts#L6)*

<a id="booleanfield.defaultvalidationrules.type"></a>

####  type

**● type**: *`string`* = "boolean"

*Defined in [Model/FieldType/BooleanField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/BooleanField.ts#L6)*

___

___

___
<a id="datefield"></a>

### `<Const>` DateField

**DateField**: *`object`*

*Defined in [Model/FieldType/DateField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L5)*

<a id="datefield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`null`* =  null

*Defined in [Model/FieldType/DateField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L8)*

___
<a id="datefield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/DateField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L6)*

___
<a id="datefield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/DateField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="datefield.normalize"></a>

####  normalize

▸ **normalize**(value: * `string` &#124; `any`*): `Promise`<`Date`>

*Defined in [Model/FieldType/DateField.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L11)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `string` &#124; `any`|

**Returns:** `Promise`<`Date`>

___
<a id="datefield.transform"></a>

####  transform

▸ **transform**(date: *`Date`*): `Promise`<`string`>

*Defined in [Model/FieldType/DateField.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L10)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| date | `Date` |

**Returns:** `Promise`<`string`>

___
<a id="datefield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/DateField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L7)*

<a id="datefield.defaultvalidationrules.datetime"></a>

####  datetime

**datetime**: *`object`*

*Defined in [Model/FieldType/DateField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L7)*

<a id="datefield.defaultvalidationrules.datetime.dateonly"></a>

####  dateOnly

**● dateOnly**: *`boolean`* = true

*Defined in [Model/FieldType/DateField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateField.ts#L7)*

___

___

___

___
<a id="datetimefield"></a>

### `<Const>` DateTimeField

**DateTimeField**: *`object`*

*Defined in [Model/FieldType/DateTimeField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L4)*

<a id="datetimefield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`null`* =  null

*Defined in [Model/FieldType/DateTimeField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L7)*

___
<a id="datetimefield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/DateTimeField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L5)*

___
<a id="datetimefield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/DateTimeField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="datetimefield.normalize"></a>

####  normalize

▸ **normalize**(value: * `string` &#124; `any`*): `Promise`<`Date`>

*Defined in [Model/FieldType/DateTimeField.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L10)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `string` &#124; `any`|

**Returns:** `Promise`<`Date`>

___
<a id="datetimefield.transform"></a>

####  transform

▸ **transform**(date: *`Date`*): `Promise`<`string`>

*Defined in [Model/FieldType/DateTimeField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| date | `Date` |

**Returns:** `Promise`<`string`>

___
<a id="datetimefield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/DateTimeField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L6)*

<a id="datetimefield.defaultvalidationrules.datetime"></a>

####  datetime

**● datetime**: *`boolean`* = true

*Defined in [Model/FieldType/DateTimeField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/DateTimeField.ts#L6)*

___

___

___
<a id="emailfield"></a>

### `<Const>` EmailField

**EmailField**: *`object`*

*Defined in [Model/FieldType/EmailField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/EmailField.ts#L4)*

<a id="emailfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/EmailField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/EmailField.ts#L6)*

<a id="emailfield.defaultvalidationrules.email"></a>

####  email

**● email**: *`boolean`* = true

*Defined in [Model/FieldType/EmailField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/EmailField.ts#L6)*

___

___

___
<a id="filefield"></a>

### `<Const>` FileField

**FileField**: *`object`*

*Defined in [Model/FieldType/FileField.ts:3](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/FileField.ts#L3)*

<a id="filefield.defaultvalidationrules"></a>

####  defaultValidationRules

**● defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/FileField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/FileField.ts#L5)*

#### Type declaration

___
<a id="filefield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`null`* =  null

*Defined in [Model/FieldType/FileField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/FileField.ts#L6)*

___
<a id="filefield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/FileField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/FileField.ts#L4)*

___
<a id="filefield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/FileField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/FileField.ts#L7)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="filefield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `any`

*Defined in [Model/FieldType/FileField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/FileField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `any`

___
<a id="filefield.transform"></a>

####  transform

▸ **transform**(file: *`File`*): `Promise`<`any`[]>

*Defined in [Model/FieldType/FileField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/FileField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| file | `File` |

**Returns:** `Promise`<`any`[]>

___

___
<a id="hasmanyfield"></a>

### `<Const>` HasManyField

**HasManyField**: *`object`*

*Defined in [Model/FieldType/HasManyField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/HasManyField.ts#L4)*

<a id="hasmanyfield.serialize"></a>

####  serialize

**● serialize**: *`false`* = false

*Defined in [Model/FieldType/HasManyField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/HasManyField.ts#L6)*

___

___
<a id="numberfield"></a>

### `<Const>` NumberField

**NumberField**: *`object`*

*Defined in [Model/FieldType/NumberField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/NumberField.ts#L4)*

<a id="numberfield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`number`* = 0

*Defined in [Model/FieldType/NumberField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/NumberField.ts#L7)*

___
<a id="numberfield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/NumberField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/NumberField.ts#L5)*

___
<a id="numberfield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/NumberField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/NumberField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="numberfield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `Promise`<`number`>

*Defined in [Model/FieldType/NumberField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/NumberField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Promise`<`number`>

___
<a id="numberfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/NumberField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/NumberField.ts#L6)*

<a id="numberfield.defaultvalidationrules.numericality"></a>

####  numericality

**● numericality**: *`boolean`* = true

*Defined in [Model/FieldType/NumberField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/NumberField.ts#L6)*

___

___

___
<a id="objectfield"></a>

### `<Const>` ObjectField

**ObjectField**: *`object`*

*Defined in [Model/FieldType/ObjectField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ObjectField.ts#L4)*

<a id="objectfield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`null`* =  null

*Defined in [Model/FieldType/ObjectField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ObjectField.ts#L7)*

___
<a id="objectfield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/ObjectField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ObjectField.ts#L5)*

___
<a id="objectfield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/ObjectField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ObjectField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="objectfield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `Promise`<`any`>

*Defined in [Model/FieldType/ObjectField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ObjectField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Promise`<`any`>

___
<a id="objectfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/ObjectField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ObjectField.ts#L6)*

<a id="objectfield.defaultvalidationrules.type"></a>

####  type

**● type**: *`string`* = "object"

*Defined in [Model/FieldType/ObjectField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/ObjectField.ts#L6)*

___

___

___
<a id="phonenumberfield"></a>

### `<Const>` PhoneNumberField

**PhoneNumberField**: *`object`*

*Defined in [Model/FieldType/PhoneNumberField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/PhoneNumberField.ts#L4)*

<a id="phonenumberfield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`string`* = ""

*Defined in [Model/FieldType/PhoneNumberField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/PhoneNumberField.ts#L7)*

___
<a id="phonenumberfield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/PhoneNumberField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/PhoneNumberField.ts#L5)*

___
<a id="phonenumberfield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/PhoneNumberField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/PhoneNumberField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="phonenumberfield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `Promise`<`string`>

*Defined in [Model/FieldType/PhoneNumberField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/PhoneNumberField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Promise`<`string`>

___
<a id="phonenumberfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/PhoneNumberField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/PhoneNumberField.ts#L6)*

<a id="phonenumberfield.defaultvalidationrules.phonenumber"></a>

####  phoneNumber

**● phoneNumber**: *`boolean`* = true

*Defined in [Model/FieldType/PhoneNumberField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/PhoneNumberField.ts#L6)*

___

___

___
<a id="stringfield"></a>

### `<Const>` StringField

**StringField**: *`object`*

*Defined in [Model/FieldType/StringField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/StringField.ts#L4)*

<a id="stringfield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`string`* = ""

*Defined in [Model/FieldType/StringField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/StringField.ts#L7)*

___
<a id="stringfield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/StringField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/StringField.ts#L5)*

___
<a id="stringfield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/StringField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/StringField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="stringfield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `Promise`<`string`>

*Defined in [Model/FieldType/StringField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/StringField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Promise`<`string`>

___
<a id="stringfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/StringField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/StringField.ts#L6)*

<a id="stringfield.defaultvalidationrules.type"></a>

####  type

**● type**: *`string`* = "string"

*Defined in [Model/FieldType/StringField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/StringField.ts#L6)*

___

___

___
<a id="timefield"></a>

### `<Const>` TimeField

**TimeField**: *`object`*

*Defined in [Model/FieldType/TimeField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L5)*

<a id="timefield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`null`* =  null

*Defined in [Model/FieldType/TimeField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L8)*

___
<a id="timefield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/TimeField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L6)*

___
<a id="timefield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/TimeField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="timefield.normalize"></a>

####  normalize

▸ **normalize**(serializedDate: *`string`*): `Promise`<`Date`>

*Defined in [Model/FieldType/TimeField.ts:11](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L11)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| serializedDate | `string` |

**Returns:** `Promise`<`Date`>

___
<a id="timefield.transform"></a>

####  transform

▸ **transform**(date: *`Date`*): `Promise`<`string`>

*Defined in [Model/FieldType/TimeField.ts:10](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L10)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| date | `Date` |

**Returns:** `Promise`<`string`>

___
<a id="timefield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/TimeField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L7)*

<a id="timefield.defaultvalidationrules.datetime"></a>

####  datetime

**datetime**: *`object`*

*Defined in [Model/FieldType/TimeField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L7)*

<a id="timefield.defaultvalidationrules.datetime.message"></a>

####  message

**● message**: *`string`* = "must be a valid time"

*Defined in [Model/FieldType/TimeField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L7)*

___
<a id="timefield.defaultvalidationrules.datetime.timeonly"></a>

####  timeOnly

**● timeOnly**: *`boolean`* = true

*Defined in [Model/FieldType/TimeField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/TimeField.ts#L7)*

___

___

___

___
<a id="urlfield"></a>

### `<Const>` URLField

**URLField**: *`object`*

*Defined in [Model/FieldType/URLField.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L4)*

<a id="urlfield.defaultvalue"></a>

####  defaultValue

**● defaultValue**: *`string`* = ""

*Defined in [Model/FieldType/URLField.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L7)*

___
<a id="urlfield.serialize"></a>

####  serialize

**● serialize**: *`true`* = true

*Defined in [Model/FieldType/URLField.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L5)*

___
<a id="urlfield.isvalidtype"></a>

####  isValidType

▸ **isValidType**(value: *`any`*): `boolean`

*Defined in [Model/FieldType/URLField.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L8)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="urlfield.normalize"></a>

####  normalize

▸ **normalize**(value: *`any`*): `Promise`<`string`>

*Defined in [Model/FieldType/URLField.ts:9](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Promise`<`string`>

___
<a id="urlfield.defaultvalidationrules"></a>

####  defaultValidationRules

**defaultValidationRules**: *`object`*

*Defined in [Model/FieldType/URLField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L6)*

<a id="urlfield.defaultvalidationrules.url"></a>

####  url

**url**: *`object`*

*Defined in [Model/FieldType/URLField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L6)*

<a id="urlfield.defaultvalidationrules.url.allowlocal"></a>

####  allowLocal

**● allowLocal**: *`boolean`* = true

*Defined in [Model/FieldType/URLField.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/Model/FieldType/URLField.ts#L6)*

___

___

___

___
<a id="fakemodelmodule"></a>

### `<Const>` fakeModelModule

**fakeModelModule**: *`object`*

*Defined in [TestUtils/FakeModelModule.ts:4](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/FakeModelModule.ts#L4)*

<a id="fakemodelmodule.fakemodel"></a>

####  fakeModel

**fakeModel**: *`object`*

*Defined in [TestUtils/FakeModelModule.ts:5](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/FakeModelModule.ts#L5)*

<a id="fakemodelmodule.fakemodel.fakemodel-1"></a>

####  FakeModel

**● FakeModel**: *[FakeModel](classes/fakemodel.md)*

*Defined in [TestUtils/FakeModelModule.ts:6](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/FakeModelModule.ts#L6)*

___
<a id="fakemodelmodule.fakemodel.fakemodelservice"></a>

####  FakeModelService

**● FakeModelService**: *[FakeModelService](classes/fakemodelservice.md)*

*Defined in [TestUtils/FakeModelModule.ts:7](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/FakeModelModule.ts#L7)*

___
<a id="fakemodelmodule.fakemodel.createmockfakemodel"></a>

####  createMockFakeModel

**● createMockFakeModel**: *[createMockFakeModel](#createmockfakemodel)*

*Defined in [TestUtils/FakeModelModule.ts:8](https://github.com/Rediker-Software/redux-data-service/blob/9e76fc2/src/TestUtils/FakeModelModule.ts#L8)*

___

___

___

