# Class: ChartView <**ChartProps, Style**>

## Type parameters

▪ **ChartProps**: *[ChartViewProps](../interfaces/chartviewprops.md)‹any›*

▪ **Style**

## Hierarchy

* View‹ChartProps›

  ↳ **ChartView**

  ↳ [ChartGridView](chartgridview.md)

  ↳ [AreaChartView](areachartview.md)

  ↳ [LineChartView](linechartview.md)

  ↳ [PieChartView](piechartview.md)

  ↳ [BarChartView](barchartview.md)

  ↳ [ChartZoomView](chartzoomview.md)

## Index

### Constructors

* [constructor](chartview.md#protected-constructor)

### Properties

* [backgroundColor](chartview.md#protected-optional-backgroundcolor)
* [borderColor](chartview.md#protected-optional-bordercolor)
* [borderRect](chartview.md#protected-optional-borderrect)
* [context](chartview.md#context)
* [dataContainer](chartview.md#protected-optional-datacontainer)
* [dataSeries](chartview.md#protected-dataseries)
* [height](chartview.md#protected-height)
* [id](chartview.md#optional-id)
* [innerRect](chartview.md#protected-innerrect)
* [lp](chartview.md#protected-lp)
* [name](chartview.md#name)
* [offsetRect](chartview.md#offsetrect)
* [onMount](chartview.md#protected-optional-onmount)
* [rect](chartview.md#protected-rect)
* [style](chartview.md#protected-style)
* [visibility](chartview.md#protected-visibility)
* [width](chartview.md#protected-width)

### Accessors

* [innerHeight](chartview.md#innerheight)
* [innerWidth](chartview.md#innerwidth)

### Methods

* [addChild](chartview.md#addchild)
* [destroy](chartview.md#destroy)
* [dispatchPointerEvent](chartview.md#dispatchpointerevent)
* [draw](chartview.md#draw)
* [getBackgroundColor](chartview.md#getbackgroundcolor)
* [getBorder](chartview.md#getborder)
* [getBorderColor](chartview.md#getbordercolor)
* [getCanvasPositionForPoint](chartview.md#abstract-getcanvaspositionforpoint)
* [getDataContainer](chartview.md#getdatacontainer)
* [getDataSeries](chartview.md#getdataseries)
* [getId](chartview.md#getid)
* [getInternalWrappedHeight](chartview.md#getinternalwrappedheight)
* [getInternalWrappedWidth](chartview.md#getinternalwrappedwidth)
* [getLayoutParams](chartview.md#getlayoutparams)
* [getMatchParentHeight](chartview.md#getmatchparentheight)
* [getMatchParentWidth](chartview.md#getmatchparentwidth)
* [getOnMount](chartview.md#getonmount)
* [getParent](chartview.md#getparent)
* [getPointForCanvasPosition](chartview.md#abstract-getpointforcanvasposition)
* [getRootView](chartview.md#getrootview)
* [getScales](chartview.md#getscales)
* [getStyle](chartview.md#getstyle)
* [getVisibility](chartview.md#getvisibility)
* [hasParent](chartview.md#hasparent)
* [layout](chartview.md#layout)
* [measure](chartview.md#measure)
* [mount](chartview.md#mount)
* [onDataChange](chartview.md#ondatachange)
* [onDataContainerChanged](chartview.md#ondatacontainerchanged)
* [onDestroy](chartview.md#ondestroy)
* [onDraw](chartview.md#ondraw)
* [onLayout](chartview.md#onlayout)
* [onMeasure](chartview.md#onmeasure)
* [onPointerEvent](chartview.md#onpointerevent)
* [onSizeChanged](chartview.md#onsizechanged)
* [onSnapshot](chartview.md#onsnapshot)
* [removeChild](chartview.md#removechild)
* [removeChildAt](chartview.md#removechildat)
* [require](chartview.md#require)
* [requireGuard](chartview.md#requireguard)
* [requireGuardAndTake](chartview.md#requireguardandtake)
* [resolvePositionDependencies](chartview.md#resolvepositiondependencies)
* [screenshot](chartview.md#screenshot)
* [setBackgroundColor](chartview.md#setbackgroundcolor)
* [setBorder](chartview.md#setborder)
* [setBorderColor](chartview.md#setbordercolor)
* [setChildAt](chartview.md#setchildat)
* [setDataContainer](chartview.md#setdatacontainer)
* [setDataSeries](chartview.md#setdataseries)
* [setId](chartview.md#setid)
* [setLayoutParams](chartview.md#setlayoutparams)
* [setOnMount](chartview.md#setonmount)
* [setStyle](chartview.md#setstyle)
* [setVisibility](chartview.md#setvisibility)
* [snapshot](chartview.md#snapshot)

## Constructors

### `Protected` constructor

\+ **new ChartView**(`context`: Context, `name`: string, `defaultStyle`: Style): *[ChartView](chartview.md)*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`context` | Context |
`name` | string |
`defaultStyle` | Style |

**Returns:** *[ChartView](chartview.md)*

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

___

### `Protected` dataSeries

• **dataSeries**: *string[]* = []

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

### `Abstract` getCanvasPositionForPoint

▸ **getCanvasPositionForPoint**(`point`: [XYPoint](../interfaces/xypoint.md)): *[CanvasPosition](../interfaces/canvasposition.md)*

**Parameters:**

Name | Type |
------ | ------ |
`point` | [XYPoint](../interfaces/xypoint.md) |

**Returns:** *[CanvasPosition](../interfaces/canvasposition.md)*

___

###  getDataContainer

▸ **getDataContainer**(): *undefined | [DataContainer](datacontainer.md)‹any›*

**Returns:** *undefined | [DataContainer](datacontainer.md)‹any›*

___

###  getDataSeries

▸ **getDataSeries**(): *string[]*

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

### `Abstract` getPointForCanvasPosition

▸ **getPointForCanvasPosition**(`position`: [XYPoint](../interfaces/xypoint.md)): *[XYPoint](../interfaces/xypoint.md) | undefined*

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

**Returns:** *[ScaleFunctions](../interfaces/scalefunctions.md)*

___

###  getStyle

▸ **getStyle**(): *Style*

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

**Returns:** *void*

___

###  onDataContainerChanged

▸ **onDataContainerChanged**(`_dataContainer`: [DataContainer](datacontainer.md)‹any›, `_oldDataContainer`: [DataContainer](datacontainer.md)‹any› | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_dataContainer` | [DataContainer](datacontainer.md)‹any› |
`_oldDataContainer` | [DataContainer](datacontainer.md)‹any› &#124; undefined |

**Returns:** *void*

___

###  onDestroy

▸ **onDestroy**(): *void*

*Overrides [LegendView](legendview.md).[onDestroy](legendview.md#ondestroy)*

**Returns:** *void*

___

###  onDraw

▸ **onDraw**(`_canvas`: ViewCanvas): *void*

*Inherited from [ChartView](chartview.md).[onDraw](chartview.md#ondraw)*

**Parameters:**

Name | Type |
------ | ------ |
`_canvas` | ViewCanvas |

**Returns:** *void*

___

###  onLayout

▸ **onLayout**(): *void*

*Inherited from [ChartView](chartview.md).[onLayout](chartview.md#onlayout)*

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

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |

**Returns:** *void*

___

###  setDataSeries

▸ **setDataSeries**(`series`: string | string[]): *void*

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

▸ **setStyle**(`style`: Style | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`style` | Style &#124; undefined |

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
