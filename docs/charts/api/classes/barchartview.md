# Class: BarChartView <**Style**>

## Type parameters

▪ **Style**

## Hierarchy

  ↳ [ChartView](chartview.md)‹[BarChartViewProps](../interfaces/barchartviewprops.md)›

  ↳ **BarChartView**

## Index

### Constructors

* [constructor](barchartview.md#constructor)

### Properties

* [backgroundColor](barchartview.md#protected-optional-backgroundcolor)
* [borderColor](barchartview.md#protected-optional-bordercolor)
* [borderRect](barchartview.md#protected-optional-borderrect)
* [context](barchartview.md#context)
* [dataContainer](barchartview.md#protected-optional-datacontainer)
* [dataSeries](barchartview.md#protected-dataseries)
* [height](barchartview.md#protected-height)
* [id](barchartview.md#optional-id)
* [innerRect](barchartview.md#protected-innerrect)
* [lp](barchartview.md#protected-lp)
* [name](barchartview.md#name)
* [offsetRect](barchartview.md#offsetrect)
* [onMount](barchartview.md#protected-optional-onmount)
* [rect](barchartview.md#protected-rect)
* [style](barchartview.md#protected-style)
* [visibility](barchartview.md#protected-visibility)
* [width](barchartview.md#protected-width)

### Accessors

* [innerHeight](barchartview.md#innerheight)
* [innerWidth](barchartview.md#innerwidth)

### Methods

* [addChild](barchartview.md#addchild)
* [destroy](barchartview.md#destroy)
* [dispatchPointerEvent](barchartview.md#dispatchpointerevent)
* [draw](barchartview.md#draw)
* [getBackgroundColor](barchartview.md#getbackgroundcolor)
* [getBorder](barchartview.md#getborder)
* [getBorderColor](barchartview.md#getbordercolor)
* [getCanvasPositionForPoint](barchartview.md#getcanvaspositionforpoint)
* [getDataContainer](barchartview.md#getdatacontainer)
* [getDataSeries](barchartview.md#getdataseries)
* [getId](barchartview.md#getid)
* [getInternalWrappedHeight](barchartview.md#getinternalwrappedheight)
* [getInternalWrappedWidth](barchartview.md#getinternalwrappedwidth)
* [getLabelOptions](barchartview.md#getlabeloptions)
* [getLayoutParams](barchartview.md#getlayoutparams)
* [getMatchParentHeight](barchartview.md#getmatchparentheight)
* [getMatchParentWidth](barchartview.md#getmatchparentwidth)
* [getOnMount](barchartview.md#getonmount)
* [getParent](barchartview.md#getparent)
* [getPointForCanvasPosition](barchartview.md#getpointforcanvasposition)
* [getRootView](barchartview.md#getrootview)
* [getScales](barchartview.md#getscales)
* [getStyle](barchartview.md#getstyle)
* [getVisibility](barchartview.md#getvisibility)
* [hasParent](barchartview.md#hasparent)
* [layout](barchartview.md#layout)
* [measure](barchartview.md#measure)
* [mount](barchartview.md#mount)
* [onDataChange](barchartview.md#ondatachange)
* [onDataContainerChanged](barchartview.md#ondatacontainerchanged)
* [onDestroy](barchartview.md#ondestroy)
* [onDraw](barchartview.md#ondraw)
* [onLayout](barchartview.md#onlayout)
* [onMeasure](barchartview.md#onmeasure)
* [onPointerEvent](barchartview.md#onpointerevent)
* [onSizeChanged](barchartview.md#onsizechanged)
* [onSnapshot](barchartview.md#onsnapshot)
* [removeChild](barchartview.md#removechild)
* [removeChildAt](barchartview.md#removechildat)
* [require](barchartview.md#require)
* [requireGuard](barchartview.md#requireguard)
* [requireGuardAndTake](barchartview.md#requireguardandtake)
* [resolvePositionDependencies](barchartview.md#resolvepositiondependencies)
* [screenshot](barchartview.md#screenshot)
* [setBackgroundColor](barchartview.md#setbackgroundcolor)
* [setBorder](barchartview.md#setborder)
* [setBorderColor](barchartview.md#setbordercolor)
* [setChildAt](barchartview.md#setchildat)
* [setDataContainer](barchartview.md#setdatacontainer)
* [setDataSeries](barchartview.md#setdataseries)
* [setId](barchartview.md#setid)
* [setLabelOptions](barchartview.md#setlabeloptions)
* [setLayoutParams](barchartview.md#setlayoutparams)
* [setOnMount](barchartview.md#setonmount)
* [setStyle](barchartview.md#setstyle)
* [setVisibility](barchartview.md#setvisibility)
* [snapshot](barchartview.md#snapshot)

## Constructors

###  constructor

\+ **new BarChartView**(`context`: Context): *[BarChartView](barchartview.md)*

*Overrides [ChartView](chartview.md).[constructor](chartview.md#protected-constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | Context |

**Returns:** *[BarChartView](barchartview.md)*

## Properties

### `Protected` `Optional` backgroundColor

• **backgroundColor**? : *undefined | string*

*Inherited from [ChartView](chartview.md).[backgroundColor](chartview.md#protected-optional-backgroundcolor)*

___

### `Protected` `Optional` borderColor

• **borderColor**? : *undefined | string*

*Inherited from [ChartView](chartview.md).[borderColor](chartview.md#protected-optional-bordercolor)*

___

### `Protected` `Optional` borderRect

• **borderRect**? : *Rect*

*Inherited from [ChartView](chartview.md).[borderRect](chartview.md#protected-optional-borderrect)*

___

###  context

• **context**: *Context*

*Inherited from [ChartView](chartview.md).[context](chartview.md#context)*

___

### `Protected` `Optional` dataContainer

• **dataContainer**? : *[DataContainer](datacontainer.md)‹any›*

*Inherited from [ChartView](chartview.md).[dataContainer](chartview.md#protected-optional-datacontainer)*

___

### `Protected` dataSeries

• **dataSeries**: *string[]* = []

*Inherited from [ChartView](chartview.md).[dataSeries](chartview.md#protected-dataseries)*

___

### `Protected` height

• **height**: *number*

*Inherited from [ChartView](chartview.md).[height](chartview.md#protected-height)*

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ChartView](chartview.md).[id](chartview.md#optional-id)*

___

### `Protected` innerRect

• **innerRect**: *Rect*

*Inherited from [ChartView](chartview.md).[innerRect](chartview.md#protected-innerrect)*

This are the bounds of view including padding.

___

### `Protected` lp

• **lp**: *LayoutParams*

*Inherited from [ChartView](chartview.md).[lp](chartview.md#protected-lp)*

___

###  name

• **name**: *string*

*Inherited from [ChartView](chartview.md).[name](chartview.md#name)*

___

###  offsetRect

• **offsetRect**: *Rect*

*Inherited from [ChartView](chartview.md).[offsetRect](chartview.md#offsetrect)*

This are the bounds of view absolute offset.

___

### `Protected` `Optional` onMount

• **onMount**? : *undefined | function*

*Inherited from [ChartView](chartview.md).[onMount](chartview.md#protected-optional-onmount)*

___

### `Protected` rect

• **rect**: *Rect*

*Inherited from [ChartView](chartview.md).[rect](chartview.md#protected-rect)*

This are bounds of a view including margin and padding

___

### `Protected` style

• **style**: *Style*

*Inherited from [ChartView](chartview.md).[style](chartview.md#protected-style)*

___

### `Protected` visibility

• **visibility**: *Visibility*

*Inherited from [ChartView](chartview.md).[visibility](chartview.md#protected-visibility)*

___

### `Protected` width

• **width**: *number*

*Inherited from [ChartView](chartview.md).[width](chartview.md#protected-width)*

## Accessors

###  innerHeight

• **get innerHeight**(): *number*

*Inherited from [ChartView](chartview.md).[innerHeight](chartview.md#innerheight)*

**Returns:** *number*

___

###  innerWidth

• **get innerWidth**(): *number*

*Inherited from [ChartView](chartview.md).[innerWidth](chartview.md#innerwidth)*

**Returns:** *number*

## Methods

###  addChild

▸ **addChild**(`child`: View, `position?`: undefined | number): *void*

*Inherited from [ChartView](chartview.md).[addChild](chartview.md#addchild)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | View |
`position?` | undefined &#124; number |

**Returns:** *void*

___

###  destroy

▸ **destroy**(): *void*

*Inherited from [ChartView](chartview.md).[destroy](chartview.md#destroy)*

**Returns:** *void*

___

###  dispatchPointerEvent

▸ **dispatchPointerEvent**(`event`: CanvasPointerEvent): *boolean*

*Inherited from [ChartView](chartview.md).[dispatchPointerEvent](chartview.md#dispatchpointerevent)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | CanvasPointerEvent |

**Returns:** *boolean*

___

###  draw

▸ **draw**(`canvas`: ViewCanvas, `force?`: undefined | false | true): *void*

*Inherited from [ChartView](chartview.md).[draw](chartview.md#draw)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | ViewCanvas |
`force?` | undefined &#124; false &#124; true |

**Returns:** *void*

___

###  getBackgroundColor

▸ **getBackgroundColor**(): *string | undefined*

*Inherited from [ChartView](chartview.md).[getBackgroundColor](chartview.md#getbackgroundcolor)*

**Returns:** *string | undefined*

___

###  getBorder

▸ **getBorder**(): *string | undefined*

*Inherited from [ChartView](chartview.md).[getBorder](chartview.md#getborder)*

**Returns:** *string | undefined*

___

###  getBorderColor

▸ **getBorderColor**(): *string | undefined*

*Inherited from [ChartView](chartview.md).[getBorderColor](chartview.md#getbordercolor)*

**Returns:** *string | undefined*

___

###  getCanvasPositionForPoint

▸ **getCanvasPositionForPoint**(`point`: [XYPoint](../interfaces/xypoint.md)): *[CanvasPosition](../interfaces/canvasposition.md)*

*Overrides [ChartView](chartview.md).[getCanvasPositionForPoint](chartview.md#abstract-getcanvaspositionforpoint)*

**Parameters:**

Name | Type |
------ | ------ |
`point` | [XYPoint](../interfaces/xypoint.md) |

**Returns:** *[CanvasPosition](../interfaces/canvasposition.md)*

___

###  getDataContainer

▸ **getDataContainer**(): *undefined | [DataContainer](datacontainer.md)‹any›*

*Inherited from [ChartView](chartview.md).[getDataContainer](chartview.md#getdatacontainer)*

**Returns:** *undefined | [DataContainer](datacontainer.md)‹any›*

___

###  getDataSeries

▸ **getDataSeries**(): *string[]*

*Inherited from [ChartView](chartview.md).[getDataSeries](chartview.md#getdataseries)*

**Returns:** *string[]*

___

###  getId

▸ **getId**(): *string | number | undefined*

*Inherited from [ChartView](chartview.md).[getId](chartview.md#getid)*

**Returns:** *string | number | undefined*

___

###  getInternalWrappedHeight

▸ **getInternalWrappedHeight**(`_canvas`: ViewCanvas): *number | undefined*

*Inherited from [ChartView](chartview.md).[getInternalWrappedHeight](chartview.md#getinternalwrappedheight)*

**Parameters:**

Name | Type |
------ | ------ |
`_canvas` | ViewCanvas |

**Returns:** *number | undefined*

___

###  getInternalWrappedWidth

▸ **getInternalWrappedWidth**(`_canvas`: ViewCanvas): *number | undefined*

*Inherited from [ChartView](chartview.md).[getInternalWrappedWidth](chartview.md#getinternalwrappedwidth)*

**Parameters:**

Name | Type |
------ | ------ |
`_canvas` | ViewCanvas |

**Returns:** *number | undefined*

___

###  getLabelOptions

▸ **getLabelOptions**(): *undefined | [LabelOptions](../interfaces/labeloptions.md)*

**Returns:** *undefined | [LabelOptions](../interfaces/labeloptions.md)*

___

###  getLayoutParams

▸ **getLayoutParams**(): *LayoutParams*

*Inherited from [ChartView](chartview.md).[getLayoutParams](chartview.md#getlayoutparams)*

**Returns:** *LayoutParams*

___

###  getMatchParentHeight

▸ **getMatchParentHeight**(): *number*

*Inherited from [ChartView](chartview.md).[getMatchParentHeight](chartview.md#getmatchparentheight)*

**Returns:** *number*

___

###  getMatchParentWidth

▸ **getMatchParentWidth**(): *number*

*Inherited from [ChartView](chartview.md).[getMatchParentWidth](chartview.md#getmatchparentwidth)*

**Returns:** *number*

___

###  getOnMount

▸ **getOnMount**(): *function | undefined*

*Inherited from [ChartView](chartview.md).[getOnMount](chartview.md#getonmount)*

**Returns:** *function | undefined*

___

###  getParent

▸ **getParent**(): *View‹ViewProps› | null*

*Inherited from [ChartView](chartview.md).[getParent](chartview.md#getparent)*

**Returns:** *View‹ViewProps› | null*

___

###  getPointForCanvasPosition

▸ **getPointForCanvasPosition**(`position`: [XYPoint](../interfaces/xypoint.md)): *[XYPoint](../interfaces/xypoint.md) | undefined*

*Overrides [ChartView](chartview.md).[getPointForCanvasPosition](chartview.md#abstract-getpointforcanvasposition)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [XYPoint](../interfaces/xypoint.md) |

**Returns:** *[XYPoint](../interfaces/xypoint.md) | undefined*

___

###  getRootView

▸ **getRootView**(): *View‹ViewProps›*

*Inherited from [ChartView](chartview.md).[getRootView](chartview.md#getrootview)*

**Returns:** *View‹ViewProps›*

___

###  getScales

▸ **getScales**(): *[ScaleFunctions](../interfaces/scalefunctions.md)*

*Overrides [ChartView](chartview.md).[getScales](chartview.md#getscales)*

**Returns:** *[ScaleFunctions](../interfaces/scalefunctions.md)*

___

###  getStyle

▸ **getStyle**(): *Style*

*Inherited from [ChartView](chartview.md).[getStyle](chartview.md#getstyle)*

**Returns:** *Style*

___

###  getVisibility

▸ **getVisibility**(): *Visibility*

*Inherited from [ChartView](chartview.md).[getVisibility](chartview.md#getvisibility)*

**Returns:** *Visibility*

___

###  hasParent

▸ **hasParent**(): *boolean*

*Inherited from [ChartView](chartview.md).[hasParent](chartview.md#hasparent)*

**Returns:** *boolean*

___

###  layout

▸ **layout**(`force?`: undefined | false | true): *void*

*Inherited from [ChartView](chartview.md).[layout](chartview.md#layout)*

Prepares the layout for all children

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *void*

___

###  measure

▸ **measure**(`canvas`: ViewCanvas, `force?`: undefined | false | true): *void*

*Inherited from [ChartView](chartview.md).[measure](chartview.md#measure)*

Measures the component and adjusts it's dimensions to min/max width and height values.

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | ViewCanvas |
`force?` | undefined &#124; false &#124; true |

**Returns:** *void*

true if width or height changed, false otherwise

___

###  mount

▸ **mount**(): *void*

*Inherited from [ChartView](chartview.md).[mount](chartview.md#mount)*

**Returns:** *void*

___

###  onDataChange

▸ **onDataChange**(): *void*

*Inherited from [ChartView](chartview.md).[onDataChange](chartview.md#ondatachange)*

**Returns:** *void*

___

###  onDataContainerChanged

▸ **onDataContainerChanged**(`_dataContainer`: [DataContainer](datacontainer.md)‹any›, `_oldDataContainer`: [DataContainer](datacontainer.md)‹any› | undefined): *void*

*Inherited from [ChartView](chartview.md).[onDataContainerChanged](chartview.md#ondatacontainerchanged)*

**Parameters:**

Name | Type |
------ | ------ |
`_dataContainer` | [DataContainer](datacontainer.md)‹any› |
`_oldDataContainer` | [DataContainer](datacontainer.md)‹any› &#124; undefined |

**Returns:** *void*

___

###  onDestroy

▸ **onDestroy**(): *void*

*Inherited from [ChartView](chartview.md).[onDestroy](chartview.md#ondestroy)*

*Overrides [LegendView](legendview.md).[onDestroy](legendview.md#ondestroy)*

**Returns:** *void*

___

###  onDraw

▸ **onDraw**(`canvas`: ViewCanvas): *void*

*Overrides [ChartView](chartview.md).[onDraw](chartview.md#ondraw)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | ViewCanvas |

**Returns:** *void*

___

###  onLayout

▸ **onLayout**(): *void*

*Overrides [ChartView](chartview.md).[onLayout](chartview.md#onlayout)*

**Returns:** *void*

___

###  onMeasure

▸ **onMeasure**(`width`: number, `height`: number): *object*

*Inherited from [ChartView](chartview.md).[onMeasure](chartview.md#onmeasure)*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`height` | number |

**Returns:** *object*

* **height**: *number*

* **width**: *number*

___

###  onPointerEvent

▸ **onPointerEvent**(`event`: CanvasPointerEvent): *boolean*

*Inherited from [ChartView](chartview.md).[onPointerEvent](chartview.md#onpointerevent)*

*Overrides [AxisView](axisview.md).[onPointerEvent](axisview.md#onpointerevent)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | CanvasPointerEvent |

**Returns:** *boolean*

___

###  onSizeChanged

▸ **onSizeChanged**(`_width`: number, `_height`: number, `_oldWidth`: number, `_oldHeight`: number): *void*

*Inherited from [ChartView](chartview.md).[onSizeChanged](chartview.md#onsizechanged)*

**Parameters:**

Name | Type |
------ | ------ |
`_width` | number |
`_height` | number |
`_oldWidth` | number |
`_oldHeight` | number |

**Returns:** *void*

___

###  onSnapshot

▸ **onSnapshot**(): *object*

*Inherited from [ChartView](chartview.md).[onSnapshot](chartview.md#onsnapshot)*

*Overrides void*

**Returns:** *object*

* **dataSeries**: *string[]* = this.dataSeries

* **style**: *any* = removeUndefinedProps(this.style)

___

###  removeChild

▸ **removeChild**(`child`: View | number): *void*

*Inherited from [ChartView](chartview.md).[removeChild](chartview.md#removechild)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | View &#124; number |

**Returns:** *void*

___

###  removeChildAt

▸ **removeChildAt**(`startIndex`: number, `endIndex?`: undefined | number): *void*

*Inherited from [ChartView](chartview.md).[removeChildAt](chartview.md#removechildat)*

**Parameters:**

Name | Type |
------ | ------ |
`startIndex` | number |
`endIndex?` | undefined &#124; number |

**Returns:** *void*

___

###  require

▸ **require**(`requiredChanges`: RequiredViewChanges): *void*

*Inherited from [ChartView](chartview.md).[require](chartview.md#require)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | RequiredViewChanges |

**Returns:** *void*

___

###  requireGuard

▸ **requireGuard**(`requiredChanges`: RequiredViewChanges): *boolean*

*Inherited from [ChartView](chartview.md).[requireGuard](chartview.md#requireguard)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | RequiredViewChanges |

**Returns:** *boolean*

___

###  requireGuardAndTake

▸ **requireGuardAndTake**(`requiredChanges`: RequiredViewChanges, `force?`: undefined | false | true): *boolean*

*Inherited from [ChartView](chartview.md).[requireGuardAndTake](chartview.md#requireguardandtake)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | RequiredViewChanges |
`force?` | undefined &#124; false &#124; true |

**Returns:** *boolean*

___

###  resolvePositionDependencies

▸ **resolvePositionDependencies**(): *void*

*Inherited from [ChartView](chartview.md).[resolvePositionDependencies](chartview.md#resolvepositiondependencies)*

Prepare arrays of children ordered horizontally and vertically,
so that they could be measured in a single pass,
without waiting for their dependencies to be resolved.

This has to be called before measure whenever child's layoutParams change or views are added/removed.

**`throws`** an error in case of unresolvable dependency (circular or lack of required view)

**Returns:** *void*

___

###  screenshot

▸ **screenshot**(): *string | undefined*

*Inherited from [ChartView](chartview.md).[screenshot](chartview.md#screenshot)*

**Returns:** *string | undefined*

___

###  setBackgroundColor

▸ **setBackgroundColor**(`backgroundColor`: string | undefined): *void*

*Inherited from [ChartView](chartview.md).[setBackgroundColor](chartview.md#setbackgroundcolor)*

**Parameters:**

Name | Type |
------ | ------ |
`backgroundColor` | string &#124; undefined |

**Returns:** *void*

___

###  setBorder

▸ **setBorder**(`borderRect`: RectLike | undefined): *void*

*Inherited from [ChartView](chartview.md).[setBorder](chartview.md#setborder)*

**Parameters:**

Name | Type |
------ | ------ |
`borderRect` | RectLike &#124; undefined |

**Returns:** *void*

___

###  setBorderColor

▸ **setBorderColor**(`borderColor`: string | undefined): *void*

*Inherited from [ChartView](chartview.md).[setBorderColor](chartview.md#setbordercolor)*

**Parameters:**

Name | Type |
------ | ------ |
`borderColor` | string &#124; undefined |

**Returns:** *void*

___

###  setChildAt

▸ **setChildAt**(`child`: View, `position`: number): *void*

*Inherited from [ChartView](chartview.md).[setChildAt](chartview.md#setchildat)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | View |
`position` | number |

**Returns:** *void*

___

###  setDataContainer

▸ **setDataContainer**(`dataContainer`: [DataContainer](datacontainer.md)‹any›): *void*

*Inherited from [ChartView](chartview.md).[setDataContainer](chartview.md#setdatacontainer)*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

###  setDataSeries

▸ **setDataSeries**(`series`: string | string[]): *void*

*Inherited from [ChartView](chartview.md).[setDataSeries](chartview.md#setdataseries)*

**Parameters:**

Name | Type |
------ | ------ |
`series` | string &#124; string[] |

**Returns:** *void*

___

###  setId

▸ **setId**(`id?`: undefined | string): *void*

*Inherited from [ChartView](chartview.md).[setId](chartview.md#setid)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | undefined &#124; string |

**Returns:** *void*

___

###  setLabelOptions

▸ **setLabelOptions**(`labels`: [LabelOptions](../interfaces/labeloptions.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`labels` | [LabelOptions](../interfaces/labeloptions.md) |

**Returns:** *void*

___

###  setLayoutParams

▸ **setLayoutParams**(`lp`: LayoutParams): *void*

*Inherited from [ChartView](chartview.md).[setLayoutParams](chartview.md#setlayoutparams)*

**Parameters:**

Name | Type |
------ | ------ |
`lp` | LayoutParams |

**Returns:** *void*

___

###  setOnMount

▸ **setOnMount**(`callback`: function): *void*

*Inherited from [ChartView](chartview.md).[setOnMount](chartview.md#setonmount)*

**Parameters:**

▪ **callback**: *function*

▸ (`view`: View‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`view` | View‹any› |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`style`: [BarChartViewStyle](../interfaces/barchartviewstyle.md) | undefined): *void*

*Overrides [ChartView](chartview.md).[setStyle](chartview.md#setstyle)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [BarChartViewStyle](../interfaces/barchartviewstyle.md) &#124; undefined |

**Returns:** *void*

___

###  setVisibility

▸ **setVisibility**(`visibility?`: Visibility): *void*

*Inherited from [ChartView](chartview.md).[setVisibility](chartview.md#setvisibility)*

**Parameters:**

Name | Type |
------ | ------ |
`visibility?` | Visibility |

**Returns:** *void*

___

###  snapshot

▸ **snapshot**(): *object*

*Inherited from [ChartView](chartview.md).[snapshot](chartview.md#snapshot)*

**Returns:** *object*
