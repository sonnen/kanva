# Class: DataContainerTooltipExtension

## Hierarchy

* [DataContainerExtension](datacontainerextension.md)

  ↳ **DataContainerTooltipExtension**

## Index

### Constructors

* [constructor](datacontainertooltipextension.md#constructor)

### Properties

* [dataContainers](datacontainertooltipextension.md#protected-readonly-datacontainers)
* [name](datacontainertooltipextension.md#readonly-name)

### Methods

* [attach](datacontainertooltipextension.md#attach)
* [detach](datacontainertooltipextension.md#detach)
* [onAttach](datacontainertooltipextension.md#protected-onattach)
* [onChartPointerEvent](datacontainertooltipextension.md#onchartpointerevent)
* [onDetach](datacontainertooltipextension.md#protected-ondetach)
* [postEvent](datacontainertooltipextension.md#protected-postevent)
* [simulateAbsoluteCanvasPosition](datacontainertooltipextension.md#simulateabsolutecanvasposition)

## Constructors

###  constructor

\+ **new DataContainerTooltipExtension**(`options`: [DeepPartial](../README.md#deeppartial)‹[DataContainerTooltipExtensionOptions](../interfaces/datacontainertooltipextensionoptions.md)›): *[DataContainerTooltipExtension](datacontainertooltipextension.md)*

*Overrides [DataContainerExtension](datacontainerextension.md).[constructor](datacontainerextension.md#protected-constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [DeepPartial](../README.md#deeppartial)‹[DataContainerTooltipExtensionOptions](../interfaces/datacontainertooltipextensionoptions.md)› |

**Returns:** *[DataContainerTooltipExtension](datacontainertooltipextension.md)*

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

###  simulateAbsoluteCanvasPosition

▸ **simulateAbsoluteCanvasPosition**(`view`: [ChartView](chartview.md)‹any, any›, `absolutePosition`: [XYPoint](../interfaces/xypoint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`view` | [ChartView](chartview.md)‹any, any› |
`absolutePosition` | [XYPoint](../interfaces/xypoint.md) |

**Returns:** *void*
