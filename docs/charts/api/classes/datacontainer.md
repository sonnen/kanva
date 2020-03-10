# Class: DataContainer <**DataPoint**>

This is a common base for storing raw point values and converting them to format that can be consumed by ChartViews.
In case of one-dimensional data (as for PieChart), a sum of Y values passed to series will be used.

## Type parameters

▪ **DataPoint**

## Hierarchy

* **DataContainer**

## Index

### Methods

* [addEventListener](datacontainer.md#addeventlistener)
* [addExtension](datacontainer.md#addextension)
* [getAllDataSeries](datacontainer.md#getalldataseries)
* [getBoundsMargin](datacontainer.md#getboundsmargin)
* [getData](datacontainer.md#getdata)
* [getDataSeries](datacontainer.md#getdataseries)
* [getExtension](datacontainer.md#getextension)
* [getPointAccessor](datacontainer.md#getpointaccessor)
* [getScales](datacontainer.md#getscales)
* [getSeriesLength](datacontainer.md#getserieslength)
* [getTotal](datacontainer.md#gettotal)
* [getXAxisData](datacontainer.md#getxaxisdata)
* [getXAxisParameters](datacontainer.md#getxaxisparameters)
* [getXBoundsExtension](datacontainer.md#getxboundsextension)
* [getXScaleType](datacontainer.md#getxscaletype)
* [getYAxisData](datacontainer.md#getyaxisdata)
* [getYAxisParameters](datacontainer.md#getyaxisparameters)
* [getYBoundsExtension](datacontainer.md#getyboundsextension)
* [getYScaleType](datacontainer.md#getyscaletype)
* [getYValuesMatch](datacontainer.md#getyvaluesmatch)
* [onChartPointerEvent](datacontainer.md#onchartpointerevent)
* [postEvent](datacontainer.md#postevent)
* [removeEventListener](datacontainer.md#removeeventlistener)
* [removeExtension](datacontainer.md#removeextension)
* [setBoundsMargin](datacontainer.md#setboundsmargin)
* [setData](datacontainer.md#setdata)
* [setPointAccessor](datacontainer.md#setpointaccessor)
* [setXAxisParameters](datacontainer.md#setxaxisparameters)
* [setXBoundsExtension](datacontainer.md#setxboundsextension)
* [setXScaleType](datacontainer.md#setxscaletype)
* [setYAxisParameters](datacontainer.md#setyaxisparameters)
* [setYBoundsExtension](datacontainer.md#setyboundsextension)
* [setYScaleType](datacontainer.md#setyscaletype)

## Methods

###  addEventListener

▸ **addEventListener**<**T**, **P**>(`eventType`: T, `listener`: [DataContainerEventListener](../README.md#datacontainereventlistener)‹T, P›): *void*

**Type parameters:**

▪ **T**: *[DataContainerEventType](../enums/datacontainereventtype.md)*

▪ **P**

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | T |
`listener` | [DataContainerEventListener](../README.md#datacontainereventlistener)‹T, P› |

**Returns:** *void*

___

###  addExtension

▸ **addExtension**(...`extensions`: [DataContainerExtension](datacontainerextension.md)[]): *this*

**Parameters:**

Name | Type |
------ | ------ |
`...extensions` | [DataContainerExtension](datacontainerextension.md)[] |

**Returns:** *this*

___

###  getAllDataSeries

▸ **getAllDataSeries**(): *[DataSeries](../interfaces/dataseries.md)‹[XYPoint](../interfaces/xypoint.md)›[]*

**Returns:** *[DataSeries](../interfaces/dataseries.md)‹[XYPoint](../interfaces/xypoint.md)›[]*

___

###  getBoundsMargin

▸ **getBoundsMargin**(): *Rect‹›*

**Returns:** *Rect‹›*

___

###  getData

▸ **getData**(): *undefined | [DataSeries](../interfaces/dataseries.md)‹DataPoint›[]*

**Returns:** *undefined | [DataSeries](../interfaces/dataseries.md)‹DataPoint›[]*

___

###  getDataSeries

▸ **getDataSeries**(`name`: string | undefined): *[DataSeries](../interfaces/dataseries.md)‹[XYPoint](../interfaces/xypoint.md)› | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string &#124; undefined |

**Returns:** *[DataSeries](../interfaces/dataseries.md)‹[XYPoint](../interfaces/xypoint.md)› | undefined*

___

###  getExtension

▸ **getExtension**<**Extension**>(`name`: string): *Extension | undefined*

**Type parameters:**

▪ **Extension**: *[DataContainerExtension](datacontainerextension.md)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *Extension | undefined*

___

###  getPointAccessor

▸ **getPointAccessor**(): *undefined | function*

**Returns:** *undefined | function*

___

###  getScales

▸ **getScales**(`width`: number, `height`: number): *[ScaleFunctions](../interfaces/scalefunctions.md)*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`height` | number |

**Returns:** *[ScaleFunctions](../interfaces/scalefunctions.md)*

___

###  getSeriesLength

▸ **getSeriesLength**(): *number*

**Returns:** *number*

___

###  getTotal

▸ **getTotal**(): *number*

**Returns:** *number*

___

###  getXAxisData

▸ **getXAxisData**(): *[AxisPoint](../interfaces/axispoint.md)[]*

**Returns:** *[AxisPoint](../interfaces/axispoint.md)[]*

___

###  getXAxisParameters

▸ **getXAxisParameters**(): *[AxisParameters](../interfaces/axisparameters.md)*

**Returns:** *[AxisParameters](../interfaces/axisparameters.md)*

___

###  getXBoundsExtension

▸ **getXBoundsExtension**(): *number[]*

**Returns:** *number[]*

___

###  getXScaleType

▸ **getXScaleType**(): *[LINEAR](../enums/datascaletype.md#linear)*

**Returns:** *[LINEAR](../enums/datascaletype.md#linear)*

___

###  getYAxisData

▸ **getYAxisData**(): *[AxisPoint](../interfaces/axispoint.md)[]*

**Returns:** *[AxisPoint](../interfaces/axispoint.md)[]*

___

###  getYAxisParameters

▸ **getYAxisParameters**(): *[AxisParameters](../interfaces/axisparameters.md)*

**Returns:** *[AxisParameters](../interfaces/axisparameters.md)*

___

###  getYBoundsExtension

▸ **getYBoundsExtension**(): *number[]*

**Returns:** *number[]*

___

###  getYScaleType

▸ **getYScaleType**(): *[LINEAR](../enums/datascaletype.md#linear)*

**Returns:** *[LINEAR](../enums/datascaletype.md#linear)*

___

###  getYValuesMatch

▸ **getYValuesMatch**(`x`: number, `match?`: [YValuesMatch](../interfaces/yvaluesmatch.md)): *[YValuesMatch](../interfaces/yvaluesmatch.md) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`match?` | [YValuesMatch](../interfaces/yvaluesmatch.md) |

**Returns:** *[YValuesMatch](../interfaces/yvaluesmatch.md) | undefined*

___

###  onChartPointerEvent

▸ **onChartPointerEvent**(`event`: CanvasPointerEvent): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`event` | CanvasPointerEvent |

**Returns:** *boolean*

___

###  postEvent

▸ **postEvent**<**T**, **P**>(`eventType`: T, `payload?`: P): *P*

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

###  removeEventListener

▸ **removeEventListener**<**T**, **P**>(`eventType`: T, `listener`: [DataContainerEventListener](../README.md#datacontainereventlistener)‹T, P›): *void*

**Type parameters:**

▪ **T**: *[DataContainerEventType](../enums/datacontainereventtype.md)*

▪ **P**

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | T |
`listener` | [DataContainerEventListener](../README.md#datacontainereventlistener)‹T, P› |

**Returns:** *void*

___

###  removeExtension

▸ **removeExtension**(...`extensions`: [DataContainerExtension](datacontainerextension.md)[]): *this*

**Parameters:**

Name | Type |
------ | ------ |
`...extensions` | [DataContainerExtension](datacontainerextension.md)[] |

**Returns:** *this*

___

###  setBoundsMargin

▸ **setBoundsMargin**(`boundsMargin`: RectLike): *this*

**Parameters:**

Name | Type |
------ | ------ |
`boundsMargin` | RectLike |

**Returns:** *this*

___

###  setData

▸ **setData**(`data`: [DataSeries](../interfaces/dataseries.md)‹DataPoint›[]): *this*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DataSeries](../interfaces/dataseries.md)‹DataPoint›[] |

**Returns:** *this*

___

###  setPointAccessor

▸ **setPointAccessor**(`pointAccessor`: [PointAccessor](../README.md#pointaccessor)‹DataPoint› | undefined): *this*

**Parameters:**

Name | Type |
------ | ------ |
`pointAccessor` | [PointAccessor](../README.md#pointaccessor)‹DataPoint› &#124; undefined |

**Returns:** *this*

___

###  setXAxisParameters

▸ **setXAxisParameters**(`xAxisParameters`: [AxisParameters](../interfaces/axisparameters.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`xAxisParameters` | [AxisParameters](../interfaces/axisparameters.md) |

**Returns:** *this*

___

###  setXBoundsExtension

▸ **setXBoundsExtension**(`xBounds`: number[]): *this*

**Parameters:**

Name | Type |
------ | ------ |
`xBounds` | number[] |

**Returns:** *this*

___

###  setXScaleType

▸ **setXScaleType**(`scaleType`: [DataScaleType](../enums/datascaletype.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`scaleType` | [DataScaleType](../enums/datascaletype.md) |

**Returns:** *this*

___

###  setYAxisParameters

▸ **setYAxisParameters**(`yAxisParameters`: [AxisParameters](../interfaces/axisparameters.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`yAxisParameters` | [AxisParameters](../interfaces/axisparameters.md) |

**Returns:** *this*

___

###  setYBoundsExtension

▸ **setYBoundsExtension**(`yBounds`: number[]): *this*

**Parameters:**

Name | Type |
------ | ------ |
`yBounds` | number[] |

**Returns:** *this*

___

###  setYScaleType

▸ **setYScaleType**(`scaleType`: [DataScaleType](../enums/datascaletype.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`scaleType` | [DataScaleType](../enums/datascaletype.md) |

**Returns:** *this*
