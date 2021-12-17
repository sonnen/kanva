# Class: DataContainerExtension

## Hierarchy

* **DataContainerExtension**

  ↳ [DataContainerTransformExtension](datacontainertransformextension.md)

  ↳ [DataContainerTooltipExtension](datacontainertooltipextension.md)

## Index

### Constructors

* [constructor](datacontainerextension.md#protected-constructor)

### Properties

* [dataContainers](datacontainerextension.md#protected-readonly-datacontainers)
* [name](datacontainerextension.md#readonly-name)

### Methods

* [attach](datacontainerextension.md#attach)
* [detach](datacontainerextension.md#detach)
* [onAttach](datacontainerextension.md#protected-onattach)
* [onChartPointerEvent](datacontainerextension.md#onchartpointerevent)
* [onDetach](datacontainerextension.md#protected-ondetach)
* [postEvent](datacontainerextension.md#protected-postevent)

## Constructors

### `Protected` constructor

\+ **new DataContainerExtension**(`name`: string): *[DataContainerExtension](datacontainerextension.md)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[DataContainerExtension](datacontainerextension.md)*

## Properties

### `Protected` `Readonly` dataContainers

• **dataContainers**: *[DataContainer](datacontainer.md)‹any›[]* = []

___

### `Readonly` name

• **name**: *string*

## Methods

###  attach

▸ **attach**(`dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

###  detach

▸ **detach**(`dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

### `Protected` onAttach

▸ **onAttach**(`_dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

###  onChartPointerEvent

▸ **onChartPointerEvent**(`_event`: CanvasPointerEvent): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | CanvasPointerEvent |

**Returns:** *boolean*

___

### `Protected` onDetach

▸ **onDetach**(`_dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

### `Protected` postEvent

▸ **postEvent**‹**T**, **P**›(`eventType`: T, `payload?`: P): *P*

**Type parameters:**

▪ **T**: *[DataContainerEventType](../enums/datacontainereventtype.md)*

▪ **P**

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | T |
`payload?` | P |

**Returns:** *P*
