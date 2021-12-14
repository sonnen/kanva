# Class: AxisView ‹**DataPoint**›

## Type parameters

▪ **DataPoint**

## Hierarchy

* View‹[AxisViewProps](../interfaces/axisviewprops.md)›

  ↳ **AxisView**

## Index

### Constructors

* [constructor](axisview.md#constructor)

### Properties

* [backgroundColor](axisview.md#protected-optional-backgroundcolor)
* [borderColor](axisview.md#protected-optional-bordercolor)
* [borderRect](axisview.md#protected-optional-borderrect)
* [context](axisview.md#readonly-context)
* [height](axisview.md#protected-height)
* [id](axisview.md#optional-id)
* [innerRect](axisview.md#protected-innerrect)
* [lp](axisview.md#protected-lp)
* [name](axisview.md#readonly-name)
* [offsetRect](axisview.md#offsetrect)
* [onMount](axisview.md#protected-optional-onmount)
* [rect](axisview.md#protected-rect)
* [visibility](axisview.md#protected-visibility)
* [width](axisview.md#protected-width)

### Accessors

* [innerHeight](axisview.md#innerheight)
* [innerWidth](axisview.md#innerwidth)

### Methods

* [addChild](axisview.md#addchild)
* [destroy](axisview.md#destroy)
* [dispatchPointerEvent](axisview.md#dispatchpointerevent)
* [draw](axisview.md#draw)
* [getBackgroundColor](axisview.md#getbackgroundcolor)
* [getBorder](axisview.md#getborder)
* [getBorderColor](axisview.md#getbordercolor)
* [getDataContainer](axisview.md#getdatacontainer)
* [getId](axisview.md#getid)
* [getInternalWrappedHeight](axisview.md#getinternalwrappedheight)
* [getInternalWrappedWidth](axisview.md#getinternalwrappedwidth)
* [getLayoutParams](axisview.md#getlayoutparams)
* [getMatchParentHeight](axisview.md#getmatchparentheight)
* [getMatchParentWidth](axisview.md#getmatchparentwidth)
* [getOnMount](axisview.md#getonmount)
* [getOrientation](axisview.md#getorientation)
* [getParent](axisview.md#getparent)
* [getRootView](axisview.md#getrootview)
* [getStyle](axisview.md#getstyle)
* [getVisibility](axisview.md#getvisibility)
* [hasParent](axisview.md#hasparent)
* [layout](axisview.md#layout)
* [measure](axisview.md#measure)
* [mount](axisview.md#mount)
* [onDataChange](axisview.md#ondatachange)
* [onDestroy](axisview.md#ondestroy)
* [onDraw](axisview.md#ondraw)
* [onLayout](axisview.md#onlayout)
* [onMeasure](axisview.md#onmeasure)
* [onPointerEvent](axisview.md#onpointerevent)
* [onSizeChanged](axisview.md#onsizechanged)
* [onSnapshot](axisview.md#onsnapshot)
* [removeChild](axisview.md#removechild)
* [removeChildAt](axisview.md#removechildat)
* [require](axisview.md#require)
* [requireGuard](axisview.md#requireguard)
* [requireGuardAndTake](axisview.md#requireguardandtake)
* [resolvePositionDependencies](axisview.md#resolvepositiondependencies)
* [screenshot](axisview.md#screenshot)
* [setBackgroundColor](axisview.md#setbackgroundcolor)
* [setBorder](axisview.md#setborder)
* [setBorderColor](axisview.md#setbordercolor)
* [setChildAt](axisview.md#setchildat)
* [setDataContainer](axisview.md#setdatacontainer)
* [setId](axisview.md#setid)
* [setLayoutParams](axisview.md#setlayoutparams)
* [setOnMount](axisview.md#setonmount)
* [setOrientation](axisview.md#setorientation)
* [setStyle](axisview.md#setstyle)
* [setVisibility](axisview.md#setvisibility)
* [snapshot](axisview.md#snapshot)

## Constructors

###  constructor

\+ **new AxisView**(`context`: Context): *[AxisView](axisview.md)*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`context` | Context |

**Returns:** *[AxisView](axisview.md)*

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

###  getDataContainer

▸ **getDataContainer**(): *undefined | [DataContainer](datacontainer.md)‹any›*

**Returns:** *undefined | [DataContainer](datacontainer.md)‹any›*

___

###  getId

▸ **getId**(): *string | number | undefined*

*Inherited from [ChartView](chartview.md).[getId](chartview.md#getid)*

**Returns:** *string | number | undefined*

___

###  getInternalWrappedHeight

▸ **getInternalWrappedHeight**(): *number*

*Overrides [ChartView](chartview.md).[getInternalWrappedHeight](chartview.md#getinternalwrappedheight)*

**Returns:** *number*

___

###  getInternalWrappedWidth

▸ **getInternalWrappedWidth**(`canvas`: ViewCanvas): *number*

*Overrides [ChartView](chartview.md).[getInternalWrappedWidth](chartview.md#getinternalwrappedwidth)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | ViewCanvas |

**Returns:** *number*

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

###  getOrientation

▸ **getOrientation**(): *[AxisOrientation](../enums/axisorientation.md)*

**Returns:** *[AxisOrientation](../enums/axisorientation.md)*

___

###  getParent

▸ **getParent**(): *View‹ViewProps› | null*

*Inherited from [ChartView](chartview.md).[getParent](chartview.md#getparent)*

**Returns:** *View‹ViewProps› | null*

___

###  getRootView

▸ **getRootView**(): *View‹ViewProps›*

*Inherited from [ChartView](chartview.md).[getRootView](chartview.md#getrootview)*

**Returns:** *View‹ViewProps›*

___

###  getStyle

▸ **getStyle**(): *[AxisViewStyle](../interfaces/axisviewstyle.md)*

**Returns:** *[AxisViewStyle](../interfaces/axisviewstyle.md)*

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

###  onDestroy

▸ **onDestroy**(): *void*

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

▸ **onPointerEvent**(`_event`: CanvasPointerEvent): *boolean*

*Inherited from [AxisView](axisview.md).[onPointerEvent](axisview.md#onpointerevent)*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | CanvasPointerEvent |

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

* **orientation**: *string* = AxisOrientation[this.orientation]

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

###  setOrientation

▸ **setOrientation**(`orientation`: [AxisOrientation](../enums/axisorientation.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`orientation` | [AxisOrientation](../enums/axisorientation.md) |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`style`: [AxisViewStyle](../interfaces/axisviewstyle.md) | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`style` | [AxisViewStyle](../interfaces/axisviewstyle.md) &#124; undefined |

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
