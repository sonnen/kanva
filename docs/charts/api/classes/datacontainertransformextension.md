# Class: DataContainerTransformExtension

## Hierarchy

* [DataContainerExtension](datacontainerextension.md)

  ↳ **DataContainerTransformExtension**

## Index

### Constructors

* [constructor](datacontainertransformextension.md#constructor)

### Properties

* [dataContainers](datacontainertransformextension.md#protected-readonly-datacontainers)
* [name](datacontainertransformextension.md#readonly-name)

### Methods

* [attach](datacontainertransformextension.md#attach)
* [detach](datacontainertransformextension.md#detach)
* [onAttach](datacontainertransformextension.md#protected-onattach)
* [onChartPointerEvent](datacontainertransformextension.md#onchartpointerevent)
* [onDetach](datacontainertransformextension.md#protected-ondetach)
* [postEvent](datacontainertransformextension.md#protected-postevent)
* [setOptions](datacontainertransformextension.md#setoptions)
* [setScale](datacontainertransformextension.md#setscale)

### Object literals

* [scale](datacontainertransformextension.md#scale)
* [translate](datacontainertransformextension.md#translate)

## Constructors

###  constructor

\+ **new DataContainerTransformExtension**(`transformOptions`: [DeepPartial](../README.md#deeppartial)‹[DataContainerTransformExtensionOptions](../interfaces/datacontainertransformextensionoptions.md)›): *[DataContainerTransformExtension](datacontainertransformextension.md)*

*Overrides [DataContainerExtension](datacontainerextension.md).[constructor](datacontainerextension.md#protected-constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`transformOptions` | [DeepPartial](../README.md#deeppartial)‹[DataContainerTransformExtensionOptions](../interfaces/datacontainertransformextensionoptions.md)› |

**Returns:** *[DataContainerTransformExtension](datacontainertransformextension.md)*

## Properties

### `Protected` `Readonly` dataContainers

• **dataContainers**: *[DataContainer](datacontainer.md)‹any›[]* = []

*Inherited from [DataContainerExtension](datacontainerextension.md).[dataContainers](datacontainerextension.md#protected-readonly-datacontainers)*

___

### `Readonly` name

• **name**: *string*

*Inherited from [DataContainerExtension](datacontainerextension.md).[name](datacontainerextension.md#readonly-name)*

## Methods

###  attach

▸ **attach**(`dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

*Inherited from [DataContainerExtension](datacontainerextension.md).[attach](datacontainerextension.md#attach)*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

###  detach

▸ **detach**(`dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

*Inherited from [DataContainerExtension](datacontainerextension.md).[detach](datacontainerextension.md#detach)*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

### `Protected` onAttach

▸ **onAttach**(`dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

*Overrides [DataContainerExtension](datacontainerextension.md).[onAttach](datacontainerextension.md#protected-onattach)*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

###  onChartPointerEvent

▸ **onChartPointerEvent**(`event`: CanvasPointerEvent): *boolean*

*Overrides [DataContainerExtension](datacontainerextension.md).[onChartPointerEvent](datacontainerextension.md#onchartpointerevent)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | CanvasPointerEvent |

**Returns:** *boolean*

___

### `Protected` onDetach

▸ **onDetach**(`dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

*Overrides [DataContainerExtension](datacontainerextension.md).[onDetach](datacontainerextension.md#protected-ondetach)*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

### `Protected` postEvent

▸ **postEvent**‹**T**, **P**›(`eventType`: T, `payload?`: P): *P*

*Inherited from [DataContainerExtension](datacontainerextension.md).[postEvent](datacontainerextension.md#protected-postevent)*

**Type parameters:**

▪ **T**: *[DataContainerEventType](../enums/datacontainereventtype.md)*

▪ **P**

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | T |
`payload?` | P |

**Returns:** *P*

___

###  setOptions

▸ **setOptions**(`transformOptions`: [DeepPartial](../README.md#deeppartial)‹[DataContainerTransformExtensionOptions](../interfaces/datacontainertransformextensionoptions.md)›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transformOptions` | [DeepPartial](../README.md#deeppartial)‹[DataContainerTransformExtensionOptions](../interfaces/datacontainertransformextensionoptions.md)› |

**Returns:** *void*

___

###  setScale

▸ **setScale**(`scale`: [XYPoint](../interfaces/xypoint.md), `center`: [XYPoint](../interfaces/xypoint.md)): *boolean*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`scale` | [XYPoint](../interfaces/xypoint.md) | - |
`center` | [XYPoint](../interfaces/xypoint.md) | { x: 0, y: 0 } |

**Returns:** *boolean*

## Object literals

###  scale

### ▪ **scale**: *object*

###  x

• **x**: *number* = 1

###  y

• **y**: *number* = 1

___

###  translate

### ▪ **translate**: *object*

###  x

• **x**: *number* = 0

###  y

• **y**: *number* = 0
