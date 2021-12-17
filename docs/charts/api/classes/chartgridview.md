# Class: ChartGridView

## Hierarchy

  ↳ [ChartView](chartview.md)‹[ChartGridViewProps](../interfaces/chartgridviewprops.md)›

  ↳ **ChartGridView**

## Index

### Constructors

* [constructor](chartgridview.md#constructor)

### Properties

* [backgroundColor](chartgridview.md#protected-optional-backgroundcolor)
* [borderColor](chartgridview.md#protected-optional-bordercolor)
* [borderRect](chartgridview.md#protected-optional-borderrect)
* [context](chartgridview.md#readonly-context)
* [dataContainer](chartgridview.md#protected-optional-datacontainer)
* [dataSeries](chartgridview.md#protected-dataseries)
* [height](chartgridview.md#protected-height)
* [id](chartgridview.md#optional-id)
* [innerRect](chartgridview.md#protected-innerrect)
* [lp](chartgridview.md#protected-lp)
* [name](chartgridview.md#readonly-name)
* [offsetRect](chartgridview.md#offsetrect)
* [onMount](chartgridview.md#protected-optional-onmount)
* [rect](chartgridview.md#protected-rect)
* [style](chartgridview.md#protected-style)
* [visibility](chartgridview.md#protected-visibility)
* [width](chartgridview.md#protected-width)

### Accessors

* [innerHeight](chartgridview.md#innerheight)
* [innerWidth](chartgridview.md#innerwidth)

### Methods

* [addChild](chartgridview.md#addchild)
* [destroy](chartgridview.md#destroy)
* [dispatchPointerEvent](chartgridview.md#dispatchpointerevent)
* [draw](chartgridview.md#draw)
* [getBackgroundColor](chartgridview.md#getbackgroundcolor)
* [getBorder](chartgridview.md#getborder)
* [getBorderColor](chartgridview.md#getbordercolor)
* [getCanvasPositionForPoint](chartgridview.md#getcanvaspositionforpoint)
* [getCenterPoint](chartgridview.md#getcenterpoint)
* [getDataContainer](chartgridview.md#getdatacontainer)
* [getDataSeries](chartgridview.md#getdataseries)
* [getGridLines](chartgridview.md#getgridlines)
* [getId](chartgridview.md#getid)
* [getInternalWrappedHeight](chartgridview.md#getinternalwrappedheight)
* [getInternalWrappedWidth](chartgridview.md#getinternalwrappedwidth)
* [getLayoutParams](chartgridview.md#getlayoutparams)
* [getMatchParentHeight](chartgridview.md#getmatchparentheight)
* [getMatchParentWidth](chartgridview.md#getmatchparentwidth)
* [getOnMount](chartgridview.md#getonmount)
* [getParent](chartgridview.md#getparent)
* [getPointForCanvasPosition](chartgridview.md#getpointforcanvasposition)
* [getRootView](chartgridview.md#getrootview)
* [getScales](chartgridview.md#getscales)
* [getStyle](chartgridview.md#getstyle)
* [getVisibility](chartgridview.md#getvisibility)
* [hasParent](chartgridview.md#hasparent)
* [layout](chartgridview.md#layout)
* [measure](chartgridview.md#measure)
* [mount](chartgridview.md#mount)
* [onDataChange](chartgridview.md#ondatachange)
* [onDataContainerChanged](chartgridview.md#ondatacontainerchanged)
* [onDestroy](chartgridview.md#ondestroy)
* [onDraw](chartgridview.md#ondraw)
* [onLayout](chartgridview.md#onlayout)
* [onMeasure](chartgridview.md#onmeasure)
* [onPointerEvent](chartgridview.md#onpointerevent)
* [onSizeChanged](chartgridview.md#onsizechanged)
* [onSnapshot](chartgridview.md#onsnapshot)
* [removeChild](chartgridview.md#removechild)
* [removeChildAt](chartgridview.md#removechildat)
* [require](chartgridview.md#require)
* [requireGuard](chartgridview.md#requireguard)
* [requireGuardAndTake](chartgridview.md#requireguardandtake)
* [resolvePositionDependencies](chartgridview.md#resolvepositiondependencies)
* [screenshot](chartgridview.md#screenshot)
* [setBackgroundColor](chartgridview.md#setbackgroundcolor)
* [setBorder](chartgridview.md#setborder)
* [setBorderColor](chartgridview.md#setbordercolor)
* [setCenterPoint](chartgridview.md#setcenterpoint)
* [setChildAt](chartgridview.md#setchildat)
* [setDataContainer](chartgridview.md#setdatacontainer)
* [setDataSeries](chartgridview.md#setdataseries)
* [setGridLines](chartgridview.md#setgridlines)
* [setId](chartgridview.md#setid)
* [setLayoutParams](chartgridview.md#setlayoutparams)
* [setOnMount](chartgridview.md#setonmount)
* [setStyle](chartgridview.md#setstyle)
* [setVisibility](chartgridview.md#setvisibility)
* [snapshot](chartgridview.md#snapshot)

## Constructors

###  constructor

\+ **new ChartGridView**(`context`: Context): *[ChartGridView](chartgridview.md)*

*Overrides [ChartView](chartview.md).[constructor](chartview.md#protected-constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | Context |

**Returns:** *[ChartGridView](chartgridview.md)*

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

### `Readonly` context

• **context**: *Context*

*Inherited from [ChartView](chartview.md).[context](chartview.md#readonly-context)*

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

### `Readonly` name

• **name**: *string*

*Inherited from [ChartView](chartview.md).[name](chartview.md#readonly-name)*

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

• **style**: *NonNullable‹ChartProps["style"]›*

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

▸ **getCanvasPositionForPoint**(`point`: [XYPoint](../interfaces/xypoint.md)‹any›): *[CanvasPosition](../interfaces/canvasposition.md)*

*Overrides [ChartView](chartview.md).[getCanvasPositionForPoint](chartview.md#abstract-getcanvaspositionforpoint)*

**Parameters:**

Name | Type |
------ | ------ |
`point` | [XYPoint](../interfaces/xypoint.md)‹any› |

**Returns:** *[CanvasPosition](../interfaces/canvasposition.md)*

___

###  getCenterPoint

▸ **getCenterPoint**(): *[XYPoint](../interfaces/xypoint.md)‹number›*

**Returns:** *[XYPoint](../interfaces/xypoint.md)‹number›*

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

###  getGridLines

▸ **getGridLines**(): *[GridLines](../enums/gridlines.md)*

**Returns:** *[GridLines](../enums/gridlines.md)*

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

###  getPointForCanvasPosition

▸ **getPointForCanvasPosition**(`position`: [XYPoint](../interfaces/xypoint.md)‹number›): *[XYPoint](../interfaces/xypoint.md)‹number›*

*Overrides [ChartView](chartview.md).[getPointForCanvasPosition](chartview.md#abstract-getpointforcanvasposition)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [XYPoint](../interfaces/xypoint.md)‹number› |

**Returns:** *[XYPoint](../interfaces/xypoint.md)‹number›*

___

###  getRootView

▸ **getRootView**(): *View‹ViewProps›*

*Inherited from [ChartView](chartview.md).[getRootView](chartview.md#getrootview)*

**Returns:** *View‹ViewProps›*

___

###  getScales

▸ **getScales**(): *[ScaleFunctions](../interfaces/scalefunctions.md)*

*Inherited from [ChartView](chartview.md).[getScales](chartview.md#getscales)*

**Returns:** *[ScaleFunctions](../interfaces/scalefunctions.md)*

___

###  getStyle

▸ **getStyle**(): *[ChartGridViewStyle](../interfaces/chartgridviewstyle.md)*

*Overrides [ChartView](chartview.md).[getStyle](chartview.md#getstyle)*

**Returns:** *[ChartGridViewStyle](../interfaces/chartgridviewstyle.md)*

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

###  setCenterPoint

▸ **setCenterPoint**(`center`: [XYPoint](../interfaces/xypoint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`center` | [XYPoint](../interfaces/xypoint.md) |

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

###  setGridLines

▸ **setGridLines**(`gridLines`: [GridLines](../enums/gridlines.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`gridLines` | [GridLines](../enums/gridlines.md) |

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

▸ **setStyle**(`style`: [ChartGridViewStyle](../interfaces/chartgridviewstyle.md) | undefined): *void*

*Overrides [ChartView](chartview.md).[setStyle](chartview.md#setstyle)*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [ChartGridViewStyle](../interfaces/chartgridviewstyle.md) &#124; undefined |

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
