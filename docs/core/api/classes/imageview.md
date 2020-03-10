# Class: ImageView

## Hierarchy

* [View](view.md)‹[ImageViewProps](../interfaces/imageviewprops.md)›

  ↳ **ImageView**

## Index

### Constructors

* [constructor](imageview.md#constructor)

### Properties

* [backgroundColor](imageview.md#protected-optional-backgroundcolor)
* [borderColor](imageview.md#protected-optional-bordercolor)
* [borderRect](imageview.md#protected-optional-borderrect)
* [context](imageview.md#context)
* [height](imageview.md#protected-height)
* [id](imageview.md#optional-id)
* [innerRect](imageview.md#protected-innerrect)
* [lp](imageview.md#protected-lp)
* [name](imageview.md#name)
* [offsetRect](imageview.md#offsetrect)
* [onMount](imageview.md#protected-optional-onmount)
* [rect](imageview.md#protected-rect)
* [visibility](imageview.md#protected-visibility)
* [width](imageview.md#protected-width)

### Accessors

* [innerHeight](imageview.md#innerheight)
* [innerWidth](imageview.md#innerwidth)

### Methods

* [addChild](imageview.md#addchild)
* [destroy](imageview.md#destroy)
* [dispatchPointerEvent](imageview.md#dispatchpointerevent)
* [draw](imageview.md#draw)
* [getBackgroundColor](imageview.md#getbackgroundcolor)
* [getBorder](imageview.md#getborder)
* [getBorderColor](imageview.md#getbordercolor)
* [getId](imageview.md#getid)
* [getInternalWrappedHeight](imageview.md#getinternalwrappedheight)
* [getInternalWrappedWidth](imageview.md#getinternalwrappedwidth)
* [getLayoutParams](imageview.md#getlayoutparams)
* [getMatchParentHeight](imageview.md#getmatchparentheight)
* [getMatchParentWidth](imageview.md#getmatchparentwidth)
* [getOnMount](imageview.md#getonmount)
* [getParent](imageview.md#getparent)
* [getRootView](imageview.md#getrootview)
* [getScaleType](imageview.md#getscaletype)
* [getSource](imageview.md#getsource)
* [getVisibility](imageview.md#getvisibility)
* [hasParent](imageview.md#hasparent)
* [layout](imageview.md#layout)
* [measure](imageview.md#measure)
* [mount](imageview.md#mount)
* [onDestroy](imageview.md#ondestroy)
* [onDraw](imageview.md#ondraw)
* [onLayout](imageview.md#onlayout)
* [onMeasure](imageview.md#onmeasure)
* [onPointerEvent](imageview.md#onpointerevent)
* [onSizeChanged](imageview.md#onsizechanged)
* [onSnapshot](imageview.md#onsnapshot)
* [removeChild](imageview.md#removechild)
* [removeChildAt](imageview.md#removechildat)
* [require](imageview.md#require)
* [requireGuard](imageview.md#requireguard)
* [requireGuardAndTake](imageview.md#requireguardandtake)
* [resolvePositionDependencies](imageview.md#resolvepositiondependencies)
* [screenshot](imageview.md#screenshot)
* [setBackgroundColor](imageview.md#setbackgroundcolor)
* [setBorder](imageview.md#setborder)
* [setBorderColor](imageview.md#setbordercolor)
* [setChildAt](imageview.md#setchildat)
* [setId](imageview.md#setid)
* [setLayoutParams](imageview.md#setlayoutparams)
* [setOnMount](imageview.md#setonmount)
* [setScaleType](imageview.md#setscaletype)
* [setSource](imageview.md#setsource)
* [setVisibility](imageview.md#setvisibility)
* [snapshot](imageview.md#snapshot)

## Constructors

###  constructor

\+ **new ImageView**(`context`: [Context](context.md)): *[ImageView](imageview.md)*

*Overrides [View](view.md).[constructor](view.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](context.md) |

**Returns:** *[ImageView](imageview.md)*

## Properties

### `Protected` `Optional` backgroundColor

• **backgroundColor**? : *undefined | string*

*Inherited from [RootCanvasView](rootcanvasview.md).[backgroundColor](rootcanvasview.md#protected-optional-backgroundcolor)*

___

### `Protected` `Optional` borderColor

• **borderColor**? : *undefined | string*

*Inherited from [RootCanvasView](rootcanvasview.md).[borderColor](rootcanvasview.md#protected-optional-bordercolor)*

___

### `Protected` `Optional` borderRect

• **borderRect**? : *[Rect](rect.md)*

*Inherited from [RootCanvasView](rootcanvasview.md).[borderRect](rootcanvasview.md#protected-optional-borderrect)*

___

###  context

• **context**: *[Context](context.md)*

*Inherited from [RootCanvasView](rootcanvasview.md).[context](rootcanvasview.md#context)*

___

### `Protected` height

• **height**: *number* = 0

*Inherited from [RootCanvasView](rootcanvasview.md).[height](rootcanvasview.md#protected-height)*

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [RootCanvasView](rootcanvasview.md).[id](rootcanvasview.md#optional-id)*

___

### `Protected` innerRect

• **innerRect**: *[Rect](rect.md)* = new Rect(0)

*Inherited from [RootCanvasView](rootcanvasview.md).[innerRect](rootcanvasview.md#protected-innerrect)*

This are the bounds of view including padding.

___

### `Protected` lp

• **lp**: *[LayoutParams](layoutparams.md)* = new LayoutParams()

*Inherited from [RootCanvasView](rootcanvasview.md).[lp](rootcanvasview.md#protected-lp)*

___

###  name

• **name**: *string*

*Inherited from [RootCanvasView](rootcanvasview.md).[name](rootcanvasview.md#name)*

___

###  offsetRect

• **offsetRect**: *[Rect](rect.md)* = new Rect(0)

*Inherited from [RootCanvasView](rootcanvasview.md).[offsetRect](rootcanvasview.md#offsetrect)*

This are the bounds of view absolute offset.

___

### `Protected` `Optional` onMount

• **onMount**? : *undefined | function*

*Inherited from [RootCanvasView](rootcanvasview.md).[onMount](rootcanvasview.md#protected-optional-onmount)*

___

### `Protected` rect

• **rect**: *[Rect](rect.md)* = new Rect(0)

*Inherited from [RootCanvasView](rootcanvasview.md).[rect](rootcanvasview.md#protected-rect)*

This are bounds of a view including margin and padding

___

### `Protected` visibility

• **visibility**: *[Visibility](../enums/visibility.md)* = Visibility.VISIBLE

*Inherited from [RootCanvasView](rootcanvasview.md).[visibility](rootcanvasview.md#protected-visibility)*

___

### `Protected` width

• **width**: *number* = 0

*Inherited from [RootCanvasView](rootcanvasview.md).[width](rootcanvasview.md#protected-width)*

## Accessors

###  innerHeight

• **get innerHeight**(): *number*

*Inherited from [RootCanvasView](rootcanvasview.md).[innerHeight](rootcanvasview.md#innerheight)*

**Returns:** *number*

___

###  innerWidth

• **get innerWidth**(): *number*

*Inherited from [RootCanvasView](rootcanvasview.md).[innerWidth](rootcanvasview.md#innerwidth)*

**Returns:** *number*

## Methods

###  addChild

▸ **addChild**(`child`: [View](view.md), `position`: number): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[addChild](rootcanvasview.md#addchild)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`child` | [View](view.md) | - |
`position` | number | -1 |

**Returns:** *void*

___

###  destroy

▸ **destroy**(): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[destroy](rootcanvasview.md#destroy)*

**Returns:** *void*

___

###  dispatchPointerEvent

▸ **dispatchPointerEvent**(`event`: [CanvasPointerEvent](canvaspointerevent.md)): *boolean*

*Inherited from [RootCanvasView](rootcanvasview.md).[dispatchPointerEvent](rootcanvasview.md#dispatchpointerevent)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | [CanvasPointerEvent](canvaspointerevent.md) |

**Returns:** *boolean*

___

###  draw

▸ **draw**(`canvas`: [ViewCanvas](viewcanvas.md), `force`: boolean): *void*

*Inherited from [TextView](textview.md).[draw](textview.md#draw)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`canvas` | [ViewCanvas](viewcanvas.md) | - |
`force` | boolean | false |

**Returns:** *void*

___

###  getBackgroundColor

▸ **getBackgroundColor**(): *undefined | string*

*Inherited from [RootCanvasView](rootcanvasview.md).[getBackgroundColor](rootcanvasview.md#getbackgroundcolor)*

**Returns:** *undefined | string*

___

###  getBorder

▸ **getBorder**(): *undefined | string*

*Inherited from [RootCanvasView](rootcanvasview.md).[getBorder](rootcanvasview.md#getborder)*

**Returns:** *undefined | string*

___

###  getBorderColor

▸ **getBorderColor**(): *undefined | string*

*Inherited from [RootCanvasView](rootcanvasview.md).[getBorderColor](rootcanvasview.md#getbordercolor)*

**Returns:** *undefined | string*

___

###  getId

▸ **getId**(): *undefined | string | number*

*Inherited from [RootCanvasView](rootcanvasview.md).[getId](rootcanvasview.md#getid)*

**Returns:** *undefined | string | number*

___

###  getInternalWrappedHeight

▸ **getInternalWrappedHeight**(): *number*

*Overrides [RootCanvasView](rootcanvasview.md).[getInternalWrappedHeight](rootcanvasview.md#getinternalwrappedheight)*

**Returns:** *number*

___

###  getInternalWrappedWidth

▸ **getInternalWrappedWidth**(): *number*

*Overrides [RootCanvasView](rootcanvasview.md).[getInternalWrappedWidth](rootcanvasview.md#getinternalwrappedwidth)*

**Returns:** *number*

___

###  getLayoutParams

▸ **getLayoutParams**(): *[LayoutParams](layoutparams.md)‹›*

*Inherited from [RootCanvasView](rootcanvasview.md).[getLayoutParams](rootcanvasview.md#getlayoutparams)*

**Returns:** *[LayoutParams](layoutparams.md)‹›*

___

###  getMatchParentHeight

▸ **getMatchParentHeight**(): *number*

*Inherited from [RootCanvasView](rootcanvasview.md).[getMatchParentHeight](rootcanvasview.md#getmatchparentheight)*

**Returns:** *number*

___

###  getMatchParentWidth

▸ **getMatchParentWidth**(): *number*

*Inherited from [RootCanvasView](rootcanvasview.md).[getMatchParentWidth](rootcanvasview.md#getmatchparentwidth)*

**Returns:** *number*

___

###  getOnMount

▸ **getOnMount**(): *undefined | function*

*Inherited from [RootCanvasView](rootcanvasview.md).[getOnMount](rootcanvasview.md#getonmount)*

**Returns:** *undefined | function*

___

###  getParent

▸ **getParent**(): *null | [View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

*Inherited from [RootCanvasView](rootcanvasview.md).[getParent](rootcanvasview.md#getparent)*

**Returns:** *null | [View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

___

###  getRootView

▸ **getRootView**(): *[View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

*Inherited from [RootCanvasView](rootcanvasview.md).[getRootView](rootcanvasview.md#getrootview)*

**Returns:** *[View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

___

###  getScaleType

▸ **getScaleType**(): *[ImageScaleType](../enums/imagescaletype.md)*

**Returns:** *[ImageScaleType](../enums/imagescaletype.md)*

___

###  getSource

▸ **getSource**(): *undefined | string*

**Returns:** *undefined | string*

___

###  getVisibility

▸ **getVisibility**(): *[Visibility](../enums/visibility.md)*

*Inherited from [RootCanvasView](rootcanvasview.md).[getVisibility](rootcanvasview.md#getvisibility)*

**Returns:** *[Visibility](../enums/visibility.md)*

___

###  hasParent

▸ **hasParent**(): *boolean*

*Inherited from [RootCanvasView](rootcanvasview.md).[hasParent](rootcanvasview.md#hasparent)*

**Returns:** *boolean*

___

###  layout

▸ **layout**(`force?`: undefined | false | true): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[layout](rootcanvasview.md#layout)*

Prepares the layout for all children

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *void*

___

###  measure

▸ **measure**(`canvas`: [ViewCanvas](viewcanvas.md), `force?`: undefined | false | true): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[measure](rootcanvasview.md#measure)*

Measures the component and adjusts it's dimensions to min/max width and height values.

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | [ViewCanvas](viewcanvas.md) |
`force?` | undefined &#124; false &#124; true |

**Returns:** *void*

true if width or height changed, false otherwise

___

###  mount

▸ **mount**(): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[mount](rootcanvasview.md#mount)*

**Returns:** *void*

___

###  onDestroy

▸ **onDestroy**(): *void*

*Inherited from [TextView](textview.md).[onDestroy](textview.md#ondestroy)*

**Returns:** *void*

___

###  onDraw

▸ **onDraw**(`canvas`: [ViewCanvas](viewcanvas.md)): *void*

*Overrides [RootCanvasView](rootcanvasview.md).[onDraw](rootcanvasview.md#ondraw)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | [ViewCanvas](viewcanvas.md) |

**Returns:** *void*

___

###  onLayout

▸ **onLayout**(): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[onLayout](rootcanvasview.md#onlayout)*

**Returns:** *void*

___

###  onMeasure

▸ **onMeasure**(`width`: number, `height`: number): *object*

*Inherited from [RootCanvasView](rootcanvasview.md).[onMeasure](rootcanvasview.md#onmeasure)*

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

▸ **onPointerEvent**(`_event`: [CanvasPointerEvent](canvaspointerevent.md)): *boolean*

*Inherited from [RootCanvasView](rootcanvasview.md).[onPointerEvent](rootcanvasview.md#onpointerevent)*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | [CanvasPointerEvent](canvaspointerevent.md) |

**Returns:** *boolean*

___

###  onSizeChanged

▸ **onSizeChanged**(`_width`: number, `_height`: number, `_oldWidth`: number, `_oldHeight`: number): *void*

*Inherited from [TextView](textview.md).[onSizeChanged](textview.md#onsizechanged)*

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

*Overrides [View](view.md).[onSnapshot](view.md#onsnapshot)*

**Returns:** *object*

* **source**: *undefined | string* = this.source

___

###  removeChild

▸ **removeChild**(`child`: [View](view.md) | number): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[removeChild](rootcanvasview.md#removechild)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [View](view.md) &#124; number |

**Returns:** *void*

___

###  removeChildAt

▸ **removeChildAt**(`startIndex`: number, `endIndex`: number): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[removeChildAt](rootcanvasview.md#removechildat)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`startIndex` | number | - |
`endIndex` | number | startIndex + 1 |

**Returns:** *void*

___

###  require

▸ **require**(`requiredChanges`: [RequiredViewChanges](../enums/requiredviewchanges.md)): *void*

*Inherited from [TextView](textview.md).[require](textview.md#require)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | [RequiredViewChanges](../enums/requiredviewchanges.md) |

**Returns:** *void*

___

###  requireGuard

▸ **requireGuard**(`requiredChanges`: [RequiredViewChanges](../enums/requiredviewchanges.md)): *boolean*

*Inherited from [RootCanvasView](rootcanvasview.md).[requireGuard](rootcanvasview.md#requireguard)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | [RequiredViewChanges](../enums/requiredviewchanges.md) |

**Returns:** *boolean*

___

###  requireGuardAndTake

▸ **requireGuardAndTake**(`requiredChanges`: [RequiredViewChanges](../enums/requiredviewchanges.md), `force?`: undefined | false | true): *boolean*

*Inherited from [RootCanvasView](rootcanvasview.md).[requireGuardAndTake](rootcanvasview.md#requireguardandtake)*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | [RequiredViewChanges](../enums/requiredviewchanges.md) |
`force?` | undefined &#124; false &#124; true |

**Returns:** *boolean*

___

###  resolvePositionDependencies

▸ **resolvePositionDependencies**(): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[resolvePositionDependencies](rootcanvasview.md#resolvepositiondependencies)*

Prepare arrays of children ordered horizontally and vertically,
so that they could be measured in a single pass,
without waiting for their dependencies to be resolved.

This has to be called before measure whenever child's layoutParams change or views are added/removed.

**`throws`** an error in case of unresolvable dependency (circular or lack of required view)

**Returns:** *void*

___

###  screenshot

▸ **screenshot**(): *string | undefined*

*Inherited from [RootCanvasView](rootcanvasview.md).[screenshot](rootcanvasview.md#screenshot)*

**Returns:** *string | undefined*

___

###  setBackgroundColor

▸ **setBackgroundColor**(`backgroundColor`: string | undefined): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setBackgroundColor](rootcanvasview.md#setbackgroundcolor)*

**Parameters:**

Name | Type |
------ | ------ |
`backgroundColor` | string &#124; undefined |

**Returns:** *void*

___

###  setBorder

▸ **setBorder**(`borderRect`: [RectLike](../README.md#rectlike) | undefined): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setBorder](rootcanvasview.md#setborder)*

**Parameters:**

Name | Type |
------ | ------ |
`borderRect` | [RectLike](../README.md#rectlike) &#124; undefined |

**Returns:** *void*

___

###  setBorderColor

▸ **setBorderColor**(`borderColor`: string | undefined): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setBorderColor](rootcanvasview.md#setbordercolor)*

**Parameters:**

Name | Type |
------ | ------ |
`borderColor` | string &#124; undefined |

**Returns:** *void*

___

###  setChildAt

▸ **setChildAt**(`child`: [View](view.md), `position`: number): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setChildAt](rootcanvasview.md#setchildat)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [View](view.md) |
`position` | number |

**Returns:** *void*

___

###  setId

▸ **setId**(`id?`: undefined | string): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setId](rootcanvasview.md#setid)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | undefined &#124; string |

**Returns:** *void*

___

###  setLayoutParams

▸ **setLayoutParams**(`lp`: [LayoutParams](layoutparams.md)): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setLayoutParams](rootcanvasview.md#setlayoutparams)*

**Parameters:**

Name | Type |
------ | ------ |
`lp` | [LayoutParams](layoutparams.md) |

**Returns:** *void*

___

###  setOnMount

▸ **setOnMount**(`callback`: function): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setOnMount](rootcanvasview.md#setonmount)*

**Parameters:**

▪ **callback**: *function*

▸ (`view`: [View](view.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`view` | [View](view.md)‹any› |

**Returns:** *void*

___

###  setScaleType

▸ **setScaleType**(`scaleType`: [ImageScaleType](../enums/imagescaletype.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`scaleType` | [ImageScaleType](../enums/imagescaletype.md) |

**Returns:** *void*

___

###  setSource

▸ **setSource**(`source`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`source` | string |

**Returns:** *void*

___

###  setVisibility

▸ **setVisibility**(`visibility`: [Visibility](../enums/visibility.md)): *void*

*Inherited from [RootCanvasView](rootcanvasview.md).[setVisibility](rootcanvasview.md#setvisibility)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`visibility` | [Visibility](../enums/visibility.md) | Visibility.VISIBLE |

**Returns:** *void*

___

###  snapshot

▸ **snapshot**(): *object*

*Inherited from [RootCanvasView](rootcanvasview.md).[snapshot](rootcanvasview.md#snapshot)*

**Returns:** *object*
