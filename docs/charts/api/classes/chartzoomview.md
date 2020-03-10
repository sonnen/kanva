# Class: ChartZoomView <**Style**>

## Type parameters

▪ **Style**

## Hierarchy

  ↳ [ChartView](chartview.md)‹[ChartZoomViewProps](../interfaces/chartzoomviewprops.md)›

  ↳ **ChartZoomView**

## Index

### Constructors

* [constructor](chartzoomview.md#constructor)

### Properties

* [backgroundColor](chartzoomview.md#protected-optional-backgroundcolor)
* [borderColor](chartzoomview.md#protected-optional-bordercolor)
* [borderRect](chartzoomview.md#protected-optional-borderrect)
* [context](chartzoomview.md#context)
* [dataContainer](chartzoomview.md#protected-optional-datacontainer)
* [dataSeries](chartzoomview.md#protected-dataseries)
* [height](chartzoomview.md#protected-height)
* [id](chartzoomview.md#optional-id)
* [innerRect](chartzoomview.md#protected-innerrect)
* [lp](chartzoomview.md#protected-lp)
* [name](chartzoomview.md#name)
* [offsetRect](chartzoomview.md#offsetrect)
* [onMount](chartzoomview.md#protected-optional-onmount)
* [rect](chartzoomview.md#protected-rect)
* [style](chartzoomview.md#protected-style)
* [visibility](chartzoomview.md#protected-visibility)
* [width](chartzoomview.md#protected-width)

### Accessors

* [innerHeight](chartzoomview.md#innerheight)
* [innerWidth](chartzoomview.md#innerwidth)

### Methods

* [addChild](chartzoomview.md#addchild)
* [destroy](chartzoomview.md#destroy)
* [dispatchPointerEvent](chartzoomview.md#dispatchpointerevent)
* [draw](chartzoomview.md#draw)
* [getBackgroundColor](chartzoomview.md#getbackgroundcolor)
* [getBorder](chartzoomview.md#getborder)
* [getBorderColor](chartzoomview.md#getbordercolor)
* [getCanvasPositionForPoint](chartzoomview.md#getcanvaspositionforpoint)
* [getDataContainer](chartzoomview.md#getdatacontainer)
* [getDataSeries](chartzoomview.md#getdataseries)
* [getId](chartzoomview.md#getid)
* [getInternalWrappedHeight](chartzoomview.md#getinternalwrappedheight)
* [getInternalWrappedWidth](chartzoomview.md#getinternalwrappedwidth)
* [getLayoutParams](chartzoomview.md#getlayoutparams)
* [getMatchParentHeight](chartzoomview.md#getmatchparentheight)
* [getMatchParentWidth](chartzoomview.md#getmatchparentwidth)
* [getOnMount](chartzoomview.md#getonmount)
* [getParent](chartzoomview.md#getparent)
* [getPointForCanvasPosition](chartzoomview.md#getpointforcanvasposition)
* [getRootView](chartzoomview.md#getrootview)
* [getScales](chartzoomview.md#getscales)
* [getStyle](chartzoomview.md#getstyle)
* [getVisibility](chartzoomview.md#getvisibility)
* [hasParent](chartzoomview.md#hasparent)
* [layout](chartzoomview.md#layout)
* [measure](chartzoomview.md#measure)
* [mount](chartzoomview.md#mount)
* [onAreaSelect](chartzoomview.md#onareaselect)
* [onDataChange](chartzoomview.md#ondatachange)
* [onDataContainerChanged](chartzoomview.md#ondatacontainerchanged)
* [onDestroy](chartzoomview.md#ondestroy)
* [onDraw](chartzoomview.md#ondraw)
* [onLayout](chartzoomview.md#onlayout)
* [onMeasure](chartzoomview.md#onmeasure)
* [onPointerEvent](chartzoomview.md#onpointerevent)
* [onSizeChanged](chartzoomview.md#onsizechanged)
* [onSnapshot](chartzoomview.md#onsnapshot)
* [removeChild](chartzoomview.md#removechild)
* [removeChildAt](chartzoomview.md#removechildat)
* [require](chartzoomview.md#require)
* [requireGuard](chartzoomview.md#requireguard)
* [requireGuardAndTake](chartzoomview.md#requireguardandtake)
* [resolvePositionDependencies](chartzoomview.md#resolvepositiondependencies)
* [screenshot](chartzoomview.md#screenshot)
* [setBackgroundColor](chartzoomview.md#setbackgroundcolor)
* [setBorder](chartzoomview.md#setborder)
* [setBorderColor](chartzoomview.md#setbordercolor)
* [setChildAt](chartzoomview.md#setchildat)
* [setDataContainer](chartzoomview.md#setdatacontainer)
* [setDataSeries](chartzoomview.md#setdataseries)
* [setId](chartzoomview.md#setid)
* [setLayoutParams](chartzoomview.md#setlayoutparams)
* [setOnMount](chartzoomview.md#setonmount)
* [setStyle](chartzoomview.md#setstyle)
* [setVisibility](chartzoomview.md#setvisibility)
* [snapshot](chartzoomview.md#snapshot)

## Constructors

###  constructor

\+ **new ChartZoomView**(`context`: Context): *[ChartZoomView](chartzoomview.md)*

*Overrides [ChartView](chartview.md).[constructor](chartview.md#protected-constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | Context |

**Returns:** *[ChartZoomView](chartzoomview.md)*

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

▸ **getCanvasPositionForPoint**(`point`: [XYPoint](../interfaces/xypoint.md)‹number›): *[CanvasPosition](../interfaces/canvasposition.md)*

*Overrides [ChartView](chartview.md).[getCanvasPositionForPoint](chartview.md#abstract-getcanvaspositionforpoint)*

**Parameters:**

Name | Type |
------ | ------ |
`point` | [XYPoint](../interfaces/xypoint.md)‹number› |

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

▸ **getPointForCanvasPosition**(`position`: [XYPoint](../interfaces/xypoint.md)‹number›): *[XYPoint](../interfaces/xypoint.md)‹number› | undefined*

*Overrides [ChartView](chartview.md).[getPointForCanvasPosition](chartview.md#abstract-getpointforcanvasposition)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [XYPoint](../interfaces/xypoint.md)‹number› |

**Returns:** *[XYPoint](../interfaces/xypoint.md)‹number› | undefined*

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

###  onAreaSelect

▸ **onAreaSelect**(`area`: [AreaSelectEvent](../README.md#areaselectevent)): *undefined | Rect‹›*

**Parameters:**

Name | Type |
------ | ------ |
`area` | [AreaSelectEvent](../README.md#areaselectevent) |

**Returns:** *undefined | Rect‹›*

___

###  onDataChange

▸ **onDataChange**(): *void*

*Inherited from [ChartView](chartview.md).[onDataChange](chartview.md#ondatachange)*

**Returns:** *void*

___

###  onDataContainerChanged

▸ **onDataContainerChanged**(`dataContainer`: [DataContainer](datacontainer.md)‹any›, `oldDataContainer`: [DataContainer](datacontainer.md)‹any› | undefined): *void*

*Overrides [ChartView](chartview.md).[onDataContainerChanged](chartview.md#ondatacontainerchanged)*

**Parameters:**

Name | Type |
------ | ------ |
`dataContainer` | [DataContainer](datacontainer.md)‹any› |
`oldDataContainer` | [DataContainer](datacontainer.md)‹any› &#124; undefined |

**Returns:** *void*

___

###  onDestroy

▸ **onDestroy**(): *void*

*Overrides [ChartView](chartview.md).[onDestroy](chartview.md#ondestroy)*

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

*Inherited from [ChartView](chartview.md).[setStyle](chartview.md#setstyle)*

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
