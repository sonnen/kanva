# @kanva/charts

## Index

### Enumerations

* [AxisOrientation](enums/axisorientation.md)
* [DataContainerEventType](enums/datacontainereventtype.md)
* [DataDisplayType](enums/datadisplaytype.md)
* [DataScaleType](enums/datascaletype.md)
* [GridLines](enums/gridlines.md)
* [LabelPosition](enums/labelposition.md)
* [LegendAlignment](enums/legendalignment.md)
* [LegendSeriesType](enums/legendseriestype.md)

### Classes

* [AreaChartView](classes/areachartview.md)
* [AxisView](classes/axisview.md)
* [BarChartView](classes/barchartview.md)
* [ChartGridView](classes/chartgridview.md)
* [ChartView](classes/chartview.md)
* [ChartZoomView](classes/chartzoomview.md)
* [DataContainer](classes/datacontainer.md)
* [DataContainerExtension](classes/datacontainerextension.md)
* [DataContainerTooltipExtension](classes/datacontainertooltipextension.md)
* [DataContainerTransformExtension](classes/datacontainertransformextension.md)
* [LabelsHelper](classes/labelshelper.md)
* [LegendView](classes/legendview.md)
* [LineChartView](classes/linechartview.md)
* [PieChartView](classes/piechartview.md)

### Interfaces

* [AreaChartViewProps](interfaces/areachartviewprops.md)
* [AreaChartViewStyle](interfaces/areachartviewstyle.md)
* [AxisParameters](interfaces/axisparameters.md)
* [AxisPoint](interfaces/axispoint.md)
* [AxisViewProps](interfaces/axisviewprops.md)
* [AxisViewStyle](interfaces/axisviewstyle.md)
* [BackgroundLayout](interfaces/backgroundlayout.md)
* [BarChartViewProps](interfaces/barchartviewprops.md)
* [BarChartViewStyle](interfaces/barchartviewstyle.md)
* [CanvasPosition](interfaces/canvasposition.md)
* [ChartGridViewProps](interfaces/chartgridviewprops.md)
* [ChartGridViewStyle](interfaces/chartgridviewstyle.md)
* [ChartPointerEvent](interfaces/chartpointerevent.md)
* [ChartViewProps](interfaces/chartviewprops.md)
* [ChartZoomViewProps](interfaces/chartzoomviewprops.md)
* [ChartZoomViewStyle](interfaces/chartzoomviewstyle.md)
* [DataContainerEvent](interfaces/datacontainerevent.md)
* [DataContainerTooltipExtensionOptions](interfaces/datacontainertooltipextensionoptions.md)
* [DataContainerTransformExtensionOptions](interfaces/datacontainertransformextensionoptions.md)
* [DataSeries](interfaces/dataseries.md)
* [LabelOptions](interfaces/labeloptions.md)
* [LegendDataSeries](interfaces/legenddataseries.md)
* [LegendViewProps](interfaces/legendviewprops.md)
* [LegendViewStyle](interfaces/legendviewstyle.md)
* [LineChartViewProps](interfaces/linechartviewprops.md)
* [LineChartViewStyle](interfaces/linechartviewstyle.md)
* [LineChartViewStylePart](interfaces/linechartviewstylepart.md)
* [LineEntry](interfaces/lineentry.md)
* [MinLineChartChunkLength](interfaces/minlinechartchunklength.md)
* [NormalizedXYPoint](interfaces/normalizedxypoint.md)
* [PerformanceResults](interfaces/performanceresults.md)
* [PieChartFragmentChunk](interfaces/piechartfragmentchunk.md)
* [PieChartLayout](interfaces/piechartlayout.md)
* [PieChartViewProps](interfaces/piechartviewprops.md)
* [PieChartViewStyle](interfaces/piechartviewstyle.md)
* [PieFragment](interfaces/piefragment.md)
* [ScaleFunction](interfaces/scalefunction.md)
* [ScaleFunctions](interfaces/scalefunctions.md)
* [SimpleOnScaleListenerArgs](interfaces/simpleonscalelistenerargs.md)
* [TooltipEvent](interfaces/tooltipevent.md)
* [ViewPoint](interfaces/viewpoint.md)
* [XYPoint](interfaces/xypoint.md)
* [YValuesMatch](interfaces/yvaluesmatch.md)

### Type aliases

* [AreaSelectEvent](README.md#areaselectevent)
* [AxisLabelAccessor](README.md#axislabelaccessor)
* [DataChangeEvent](README.md#datachangeevent)
* [DataContainerEventListener](README.md#datacontainereventlistener)
* [DataContainerEvents](README.md#datacontainerevents)
* [DataNormalizer](README.md#datanormalizer)
* [DeepPartial](README.md#deeppartial)
* [GetScalesEvent](README.md#getscalesevent)
* [PointAccessor](README.md#pointaccessor)
* [SimpleOnScaleListener](README.md#simpleonscalelistener)
* [TooltipEventHandler](README.md#tooltipeventhandler)

### Variables

* [TOOLTIP_EXTENSION](README.md#const-tooltip_extension)
* [TRANSFORM_EXTENSION](README.md#const-transform_extension)
* [VIEW_TAG](README.md#const-view_tag)
* [X_SCALE_BAR_OFFSET](README.md#const-x_scale_bar_offset)
* [performanceResults](README.md#const-performanceresults)

### Functions

* [calculateMinLineLength](README.md#const-calculateminlinelength)
* [defaultNormalizeData](README.md#const-defaultnormalizedata)
* [findBestMatchInSortedArray](README.md#const-findbestmatchinsortedarray)
* [floorToNearest](README.md#const-floortonearest)
* [getContinuousNumericScale](README.md#const-getcontinuousnumericscale)
* [getPaint](README.md#const-getpaint)
* [isXYArray](README.md#const-isxyarray)
* [mergeXY](README.md#const-mergexy)
* [performanceCounter](README.md#const-performancecounter)
* [precision](README.md#const-precision)
* [prepareAxisPoints](README.md#const-prepareaxispoints)
* [prepareAxisValues](README.md#const-prepareaxisvalues)
* [roundToNearest](README.md#const-roundtonearest)
* [segmentizePoints](README.md#const-segmentizepoints)

### Object literals

* [DEFAULT_OPTIONS](README.md#const-default_options)
* [defaultStyle](README.md#const-defaultstyle)
* [labelPaintOverrides](README.md#const-labelpaintoverrides)

## Type aliases

###  AreaSelectEvent

Ƭ **AreaSelectEvent**: *[DataContainerEvent](interfaces/datacontainerevent.md)‹[AREA_SELECT](enums/datacontainereventtype.md#area_select), Rect | undefined›*

___

###  AxisLabelAccessor

Ƭ **AxisLabelAccessor**: *function*

#### Type declaration:

▸ (`value`: number, `index`: number): *string*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`index` | number |

___

###  DataChangeEvent

Ƭ **DataChangeEvent**: *[DataContainerEvent](interfaces/datacontainerevent.md)‹[DATA_CHANGE](enums/datacontainereventtype.md#data_change)›*

___

###  DataContainerEventListener

Ƭ **DataContainerEventListener**: *function*

#### Type declaration:

▸ (`action`: [DataContainerEvent](interfaces/datacontainerevent.md)‹T, P›): *P*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [DataContainerEvent](interfaces/datacontainerevent.md)‹T, P› |

___

###  DataContainerEvents

Ƭ **DataContainerEvents**: *[DataChangeEvent](README.md#datachangeevent) | [GetScalesEvent](README.md#getscalesevent) | [AreaSelectEvent](README.md#areaselectevent)*

___

###  DataNormalizer

Ƭ **DataNormalizer**: *function*

#### Type declaration:

▸ (`point`: [XYPoint](interfaces/xypoint.md)): *[NormalizedXYPoint](interfaces/normalizedxypoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`point` | [XYPoint](interfaces/xypoint.md) |

___

###  DeepPartial

Ƭ **DeepPartial**: *object*

#### Type declaration:

___

###  GetScalesEvent

Ƭ **GetScalesEvent**: *[DataContainerEvent](interfaces/datacontainerevent.md)‹[GET_SCALES](enums/datacontainereventtype.md#get_scales), [ScaleFunctions](interfaces/scalefunctions.md)›*

___

###  PointAccessor

Ƭ **PointAccessor**: *function*

#### Type declaration:

▸ (`point`: DataPoint, `index`: number, `series`: DataPoint[]): *[XYPoint](interfaces/xypoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`point` | DataPoint |
`index` | number |
`series` | DataPoint[] |

___

###  SimpleOnScaleListener

Ƭ **SimpleOnScaleListener**: *function*

#### Type declaration:

▸ (`args`: [SimpleOnScaleListenerArgs](interfaces/simpleonscalelistenerargs.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [SimpleOnScaleListenerArgs](interfaces/simpleonscalelistenerargs.md) |

___

###  TooltipEventHandler

Ƭ **TooltipEventHandler**: *function*

#### Type declaration:

▸ (`event`: [TooltipEvent](interfaces/tooltipevent.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | [TooltipEvent](interfaces/tooltipevent.md) |

## Variables

### `Const` TOOLTIP_EXTENSION

• **TOOLTIP_EXTENSION**: *"DataContainerTooltipExtension"* = "DataContainerTooltipExtension"

___

### `Const` TRANSFORM_EXTENSION

• **TRANSFORM_EXTENSION**: *"DataContainerTransformExtension"* = "DataContainerTransformExtension"

___

### `Const` VIEW_TAG

• **VIEW_TAG**: *"LineChartView"* = "LineChartView"

___

### `Const` X_SCALE_BAR_OFFSET

• **X_SCALE_BAR_OFFSET**: *0.5* = 0.5

___

### `Const` performanceResults

• **performanceResults**: *Record‹string, [PerformanceResults](interfaces/performanceresults.md)›*

## Functions

### `Const` calculateMinLineLength

▸ **calculateMinLineLength**(`start`: number, `end`: number, `scale`: [ScaleFunction](interfaces/scalefunction.md), `customMinLength?`: [MinLineChartChunkLength](interfaces/minlinechartchunklength.md)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`start` | number |
`end` | number |
`scale` | [ScaleFunction](interfaces/scalefunction.md) |
`customMinLength?` | [MinLineChartChunkLength](interfaces/minlinechartchunklength.md) |

**Returns:** *number*

___

### `Const` defaultNormalizeData

▸ **defaultNormalizeData**(`__namedParameters`: object): *object | object*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *object | object*

___

### `Const` findBestMatchInSortedArray

▸ **findBestMatchInSortedArray**<**T**>(`array`: T[], `matcher`: function): *T | undefined*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **array**: *T[]*

▪ **matcher**: *function*

▸ (`element`: T): *number*

**Parameters:**

Name | Type |
------ | ------ |
`element` | T |

**Returns:** *T | undefined*

___

### `Const` floorToNearest

▸ **floorToNearest**(`value`: number, `nearest`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`nearest` | number |

**Returns:** *number*

___

### `Const` getContinuousNumericScale

▸ **getContinuousNumericScale**(`scaleType`: [DataScaleType](enums/datascaletype.md)): *ScaleContinuousNumeric‹number, number›*

**Parameters:**

Name | Type |
------ | ------ |
`scaleType` | [DataScaleType](enums/datascaletype.md) |

**Returns:** *ScaleContinuousNumeric‹number, number›*

___

### `Const` getPaint

▸ **getPaint**<**P**>(`paint`: P, `contrastPaint`: P | undefined, `backgroundIsBright`: boolean): *P*

**Type parameters:**

▪ **P**: *Paint | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`paint` | P |
`contrastPaint` | P &#124; undefined |
`backgroundIsBright` | boolean |

**Returns:** *P*

___

### `Const` isXYArray

▸ **isXYArray**(`data`: any): *data is XYPoint[]*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *data is XYPoint[]*

___

### `Const` mergeXY

▸ **mergeXY**(`x`: number[], `y`: number[]): *[XYPoint](interfaces/xypoint.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number[] |
`y` | number[] |

**Returns:** *[XYPoint](interfaces/xypoint.md)[]*

___

### `Const` performanceCounter

▸ **performanceCounter**(`name`: string): *end*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *end*

___

### `Const` precision

▸ **precision**(`a`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |

**Returns:** *number*

___

### `Const` prepareAxisPoints

▸ **prepareAxisPoints**(`axisValues`: [AxisPoint](interfaces/axispoint.md)[], `scale`: [ScaleFunction](interfaces/scalefunction.md)): *[AxisPoint](interfaces/axispoint.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`axisValues` | [AxisPoint](interfaces/axispoint.md)[] |
`scale` | [ScaleFunction](interfaces/scalefunction.md) |

**Returns:** *[AxisPoint](interfaces/axispoint.md)[]*

___

### `Const` prepareAxisValues

▸ **prepareAxisValues**(`scale`: [ScaleFunction](interfaces/scalefunction.md), `params`: [AxisParameters](interfaces/axisparameters.md), `seriesLength`: number): *[AxisPoint](interfaces/axispoint.md)[]*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`scale` | [ScaleFunction](interfaces/scalefunction.md) | - |
`params` | [AxisParameters](interfaces/axisparameters.md) | - |
`seriesLength` | number | 10 |

**Returns:** *[AxisPoint](interfaces/axispoint.md)[]*

___

### `Const` roundToNearest

▸ **roundToNearest**(`value`: number, `nearest`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`nearest` | number |

**Returns:** *number*

___

### `Const` segmentizePoints

▸ **segmentizePoints**<**In**, **Filter**, **Out**>(`data`: [XYPoint](interfaces/xypoint.md)‹In›[], `filterBy`: Filter): *[XYPoint](interfaces/xypoint.md)‹Out›[][]*

**Type parameters:**

▪ **In**

▪ **Filter**

▪ **Out**

**Parameters:**

Name | Type |
------ | ------ |
`data` | [XYPoint](interfaces/xypoint.md)‹In›[] |
`filterBy` | Filter |

**Returns:** *[XYPoint](interfaces/xypoint.md)‹Out›[][]*

## Object literals

### `Const` DEFAULT_OPTIONS

### ▪ **DEFAULT_OPTIONS**: *object*

▪ **pan**: *object*

* **pointers**: *number* = 1

▪ **scale**: *object*

* **drag**: *true* = true

* **listenerThreshold**: *number* = 1

* **multitouch**: *true* = true

* **scroll**: *true* = true

* **selectArea**: *false* = false

* **limit**: *object*

  * **x**: *[number, number]* = [1, 1]

  * **y**: *[number, number]* = [1, 1]

* **minSelectedAreaThreshold**: *object*

  * **x**: *number* = 50

  * **y**: *number* = 0

___

### `Const` defaultStyle

### ▪ **defaultStyle**: *object*

###  alignment

• **alignment**: *[LegendAlignment](enums/legendalignment.md)* = LegendAlignment.ROW

###  backgroundPaint

• **backgroundPaint**: *Paint‹›* = new Paint()
    .setLineWidth(1.5)

###  barRadius

• **barRadius**: *number* = 0

###  barWidth

• **barWidth**: *number* = 0.5

###  borders

• **borders**: *Rect‹›* = new Rect({left: 1, right: 1, top: 1, bottom: 1 })

###  innerRadius

• **innerRadius**: *number* = 0

###  isBackgroundBright

• **isBackgroundBright**: *boolean* = true

###  labelPadding

• **labelPadding**: *number* = 4

###  labelPaint

• **labelPaint**: *Paint‹›* = new Paint()

###  padding

• **padding**: *number* = 0

###  paint

• **paint**: *Paint‹›* = new Paint().setFillStyle(rgba('#FFF', 0.5)).setStrokeStyle('#FFF')

###  paints

• **paints**: *object*

#### Type declaration:

###  type

• **type**: *[DataDisplayType](enums/datadisplaytype.md)* = DataDisplayType.LINE

###  wrapLabelsOnEdge

• **wrapLabelsOnEdge**: *boolean* = true

▪ **background**: *object*

* **paint**: *Paint‹›* = new Paint()
      .setFillStyle(rgba('#FFF', .1))

* **radius**: *number* = 0

* **width**: *number* = 8

▪ **foreground**: *object*

* **paint**: *Paint‹›* = new Paint()
      .setFillStyle(rgba('#FFF', .5))

* **radius**: *number* = 0

* **width**: *number* = 8

▪ **minChunkLength**: *object*

* **domain**: *number* = 0

___

### `Const` labelPaintOverrides

### ▪ **labelPaintOverrides**: *object*

###  textAlign

• **textAlign**: *CENTER* = TextAlign.CENTER

###  textBaseline

• **textBaseline**: *BOTTOM* = TextBaseline.BOTTOM
