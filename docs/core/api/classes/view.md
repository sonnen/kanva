# Class: View ‹**Props**›

## Type parameters

▪ **Props**: *object*

## Hierarchy

* **View**

  ↳ [RootCanvasView](rootcanvasview.md)

  ↳ [TextView](textview.md)

  ↳ [ImageView](imageview.md)

## Index

### Constructors

* [constructor](view.md#constructor)

### Properties

* [backgroundColor](view.md#protected-optional-backgroundcolor)
* [borderColor](view.md#protected-optional-bordercolor)
* [borderRect](view.md#protected-optional-borderrect)
* [context](view.md#readonly-context)
* [height](view.md#protected-height)
* [id](view.md#optional-id)
* [innerRect](view.md#protected-innerrect)
* [lp](view.md#protected-lp)
* [name](view.md#readonly-name)
* [offsetRect](view.md#offsetrect)
* [onMount](view.md#protected-optional-onmount)
* [rect](view.md#protected-rect)
* [visibility](view.md#protected-visibility)
* [width](view.md#protected-width)

### Accessors

* [innerHeight](view.md#innerheight)
* [innerWidth](view.md#innerwidth)

### Methods

* [addChild](view.md#addchild)
* [destroy](view.md#destroy)
* [dispatchPointerEvent](view.md#dispatchpointerevent)
* [draw](view.md#draw)
* [getBackgroundColor](view.md#getbackgroundcolor)
* [getBorder](view.md#getborder)
* [getBorderColor](view.md#getbordercolor)
* [getId](view.md#getid)
* [getInternalWrappedHeight](view.md#getinternalwrappedheight)
* [getInternalWrappedWidth](view.md#getinternalwrappedwidth)
* [getLayoutParams](view.md#getlayoutparams)
* [getMatchParentHeight](view.md#getmatchparentheight)
* [getMatchParentWidth](view.md#getmatchparentwidth)
* [getOnMount](view.md#getonmount)
* [getParent](view.md#getparent)
* [getRootView](view.md#getrootview)
* [getVisibility](view.md#getvisibility)
* [hasParent](view.md#hasparent)
* [layout](view.md#layout)
* [measure](view.md#measure)
* [mount](view.md#mount)
* [onDestroy](view.md#ondestroy)
* [onDraw](view.md#ondraw)
* [onLayout](view.md#onlayout)
* [onMeasure](view.md#onmeasure)
* [onPointerEvent](view.md#onpointerevent)
* [onSizeChanged](view.md#onsizechanged)
* [onSnapshot](view.md#onsnapshot)
* [removeChild](view.md#removechild)
* [removeChildAt](view.md#removechildat)
* [require](view.md#require)
* [requireGuard](view.md#requireguard)
* [requireGuardAndTake](view.md#requireguardandtake)
* [resolvePositionDependencies](view.md#resolvepositiondependencies)
* [screenshot](view.md#screenshot)
* [setBackgroundColor](view.md#setbackgroundcolor)
* [setBorder](view.md#setborder)
* [setBorderColor](view.md#setbordercolor)
* [setChildAt](view.md#setchildat)
* [setId](view.md#setid)
* [setLayoutParams](view.md#setlayoutparams)
* [setOnMount](view.md#setonmount)
* [setVisibility](view.md#setvisibility)
* [snapshot](view.md#snapshot)

## Constructors

###  constructor

\+ **new View**(`context`: [Context](context.md), `name`: string): *[View](view.md)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`context` | [Context](context.md) | - |
`name` | string | "View" |

**Returns:** *[View](view.md)*

## Properties

### `Protected` `Optional` backgroundColor

• **backgroundColor**? : *undefined | string*

___

### `Protected` `Optional` borderColor

• **borderColor**? : *undefined | string*

___

### `Protected` `Optional` borderRect

• **borderRect**? : *[Rect](rect.md)*

___

### `Readonly` context

• **context**: *[Context](context.md)*

___

### `Protected` height

• **height**: *number* = 0

___

### `Optional` id

• **id**? : *undefined | number*

___

### `Protected` innerRect

• **innerRect**: *[Rect](rect.md)* = new Rect(0)

This are the bounds of view including padding.

___

### `Protected` lp

• **lp**: *[LayoutParams](layoutparams.md)* = new LayoutParams()

___

### `Readonly` name

• **name**: *string*

___

###  offsetRect

• **offsetRect**: *[Rect](rect.md)* = new Rect(0)

This are the bounds of view absolute offset.

___

### `Protected` `Optional` onMount

• **onMount**? : *undefined | function*

___

### `Protected` rect

• **rect**: *[Rect](rect.md)* = new Rect(0)

This are bounds of a view including margin and padding

___

### `Protected` visibility

• **visibility**: *[Visibility](../enums/visibility.md)* = Visibility.VISIBLE

___

### `Protected` width

• **width**: *number* = 0

## Accessors

###  innerHeight

• **get innerHeight**(): *number*

**Returns:** *number*

___

###  innerWidth

• **get innerWidth**(): *number*

**Returns:** *number*

## Methods

###  addChild

▸ **addChild**(`child`: [View](view.md), `position`: number): *void*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`child` | [View](view.md) | - |
`position` | number | -1 |

**Returns:** *void*

___

###  destroy

▸ **destroy**(): *void*

**Returns:** *void*

___

###  dispatchPointerEvent

▸ **dispatchPointerEvent**(`event`: [CanvasPointerEvent](canvaspointerevent.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`event` | [CanvasPointerEvent](canvaspointerevent.md) |

**Returns:** *boolean*

___

###  draw

▸ **draw**(`canvas`: [ViewCanvas](viewcanvas.md), `force`: boolean): *void*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`canvas` | [ViewCanvas](viewcanvas.md) | - |
`force` | boolean | false |

**Returns:** *void*

___

###  getBackgroundColor

▸ **getBackgroundColor**(): *undefined | string*

**Returns:** *undefined | string*

___

###  getBorder

▸ **getBorder**(): *undefined | string*

**Returns:** *undefined | string*

___

###  getBorderColor

▸ **getBorderColor**(): *undefined | string*

**Returns:** *undefined | string*

___

###  getId

▸ **getId**(): *undefined | string | number*

**Returns:** *undefined | string | number*

___

###  getInternalWrappedHeight

▸ **getInternalWrappedHeight**(`_canvas`: [ViewCanvas](viewcanvas.md)): *number | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`_canvas` | [ViewCanvas](viewcanvas.md) |

**Returns:** *number | undefined*

___

###  getInternalWrappedWidth

▸ **getInternalWrappedWidth**(`_canvas`: [ViewCanvas](viewcanvas.md)): *number | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`_canvas` | [ViewCanvas](viewcanvas.md) |

**Returns:** *number | undefined*

___

###  getLayoutParams

▸ **getLayoutParams**(): *[LayoutParams](layoutparams.md)‹›*

**Returns:** *[LayoutParams](layoutparams.md)‹›*

___

###  getMatchParentHeight

▸ **getMatchParentHeight**(): *number*

**Returns:** *number*

___

###  getMatchParentWidth

▸ **getMatchParentWidth**(): *number*

**Returns:** *number*

___

###  getOnMount

▸ **getOnMount**(): *undefined | function*

**Returns:** *undefined | function*

___

###  getParent

▸ **getParent**(): *null | [View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

**Returns:** *null | [View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

___

###  getRootView

▸ **getRootView**(): *[View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

**Returns:** *[View](view.md)‹[ViewProps](../interfaces/viewprops.md)›*

___

###  getVisibility

▸ **getVisibility**(): *[Visibility](../enums/visibility.md)*

**Returns:** *[Visibility](../enums/visibility.md)*

___

###  hasParent

▸ **hasParent**(): *boolean*

**Returns:** *boolean*

___

###  layout

▸ **layout**(`force?`: undefined | false | true): *void*

Prepares the layout for all children

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *void*

___

###  measure

▸ **measure**(`canvas`: [ViewCanvas](viewcanvas.md), `force?`: undefined | false | true): *void*

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

**Returns:** *void*

___

###  onDestroy

▸ **onDestroy**(): *void*

**Returns:** *void*

___

###  onDraw

▸ **onDraw**(`_canvas`: [ViewCanvas](viewcanvas.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_canvas` | [ViewCanvas](viewcanvas.md) |

**Returns:** *void*

___

###  onLayout

▸ **onLayout**(): *void*

**Returns:** *void*

___

###  onMeasure

▸ **onMeasure**(`width`: number, `height`: number): *object*

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

**Parameters:**

Name | Type |
------ | ------ |
`_event` | [CanvasPointerEvent](canvaspointerevent.md) |

**Returns:** *boolean*

___

###  onSizeChanged

▸ **onSizeChanged**(`_width`: number, `_height`: number, `_oldWidth`: number, `_oldHeight`: number): *void*

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

**Returns:** *object*

___

###  removeChild

▸ **removeChild**(`child`: [View](view.md) | number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [View](view.md) &#124; number |

**Returns:** *void*

___

###  removeChildAt

▸ **removeChildAt**(`startIndex`: number, `endIndex`: number): *void*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`startIndex` | number | - |
`endIndex` | number | startIndex + 1 |

**Returns:** *void*

___

###  require

▸ **require**(`requiredChanges`: [RequiredViewChanges](../enums/requiredviewchanges.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | [RequiredViewChanges](../enums/requiredviewchanges.md) |

**Returns:** *void*

___

###  requireGuard

▸ **requireGuard**(`requiredChanges`: [RequiredViewChanges](../enums/requiredviewchanges.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | [RequiredViewChanges](../enums/requiredviewchanges.md) |

**Returns:** *boolean*

___

###  requireGuardAndTake

▸ **requireGuardAndTake**(`requiredChanges`: [RequiredViewChanges](../enums/requiredviewchanges.md), `force?`: undefined | false | true): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`requiredChanges` | [RequiredViewChanges](../enums/requiredviewchanges.md) |
`force?` | undefined &#124; false &#124; true |

**Returns:** *boolean*

___

###  resolvePositionDependencies

▸ **resolvePositionDependencies**(): *void*

Prepare arrays of children ordered horizontally and vertically,
so that they could be measured in a single pass,
without waiting for their dependencies to be resolved.

This has to be called before measure whenever child's layoutParams change or views are added/removed.

**`throws`** an error in case of unresolvable dependency (circular or lack of required view)

**Returns:** *void*

___

###  screenshot

▸ **screenshot**(): *string | undefined*

**Returns:** *string | undefined*

___

###  setBackgroundColor

▸ **setBackgroundColor**(`backgroundColor`: string | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`backgroundColor` | string &#124; undefined |

**Returns:** *void*

___

###  setBorder

▸ **setBorder**(`borderRect`: [RectLike](../README.md#rectlike) | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`borderRect` | [RectLike](../README.md#rectlike) &#124; undefined |

**Returns:** *void*

___

###  setBorderColor

▸ **setBorderColor**(`borderColor`: string | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`borderColor` | string &#124; undefined |

**Returns:** *void*

___

###  setChildAt

▸ **setChildAt**(`child`: [View](view.md), `position`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [View](view.md) |
`position` | number |

**Returns:** *void*

___

###  setId

▸ **setId**(`id?`: undefined | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | undefined &#124; string |

**Returns:** *void*

___

###  setLayoutParams

▸ **setLayoutParams**(`lp`: [LayoutParams](layoutparams.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`lp` | [LayoutParams](layoutparams.md) |

**Returns:** *void*

___

###  setOnMount

▸ **setOnMount**(`callback`: function): *void*

**Parameters:**

▪ **callback**: *function*

▸ (`view`: [View](view.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`view` | [View](view.md)‹any› |

**Returns:** *void*

___

###  setVisibility

▸ **setVisibility**(`visibility`: [Visibility](../enums/visibility.md)): *void*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`visibility` | [Visibility](../enums/visibility.md) | Visibility.VISIBLE |

**Returns:** *void*

___

###  snapshot

▸ **snapshot**(): *object*

**Returns:** *object*
