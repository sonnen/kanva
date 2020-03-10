# @kanva/core

## Index

### Enumerations

* [DimensionType](enums/dimensiontype.md)
* [ImageScaleType](enums/imagescaletype.md)
* [MouseButton](enums/mousebutton.md)
* [PointerAction](enums/pointeraction.md)
* [RequiredViewChanges](enums/requiredviewchanges.md)
* [TextAlign](enums/textalign.md)
* [TextBaseline](enums/textbaseline.md)
* [Visibility](enums/visibility.md)

### Classes

* [AreaSelectGestureDetector](classes/areaselectgesturedetector.md)
* [CanvasPointerEvent](classes/canvaspointerevent.md)
* [Context](classes/context.md)
* [DragGestureDetector](classes/draggesturedetector.md)
* [GestureDetector](classes/gesturedetector.md)
* [ImageView](classes/imageview.md)
* [LayoutParams](classes/layoutparams.md)
* [Line](classes/line.md)
* [NoContext](classes/nocontext.md)
* [Paint](classes/paint.md)
* [Point](classes/point.md)
* [Rect](classes/rect.md)
* [RootCanvasView](classes/rootcanvasview.md)
* [ScaleGestureDetector](classes/scalegesturedetector.md)
* [TextView](classes/textview.md)
* [View](classes/view.md)
* [ViewCanvas](classes/viewcanvas.md)

### Interfaces

* [AreaSelectEvent](interfaces/areaselectevent.md)
* [AreaSelectGestureDetectorOptions](interfaces/areaselectgesturedetectoroptions.md)
* [Canvas](interfaces/canvas.md)
* [CanvasCreatorOptions](interfaces/canvascreatoroptions.md)
* [CanvasPointer](interfaces/canvaspointer.md)
* [Color](interfaces/color.md)
* [ContextLike](interfaces/contextlike.md)
* [ContextOptions](interfaces/contextoptions.md)
* [Dependency](interfaces/dependency.md)
* [Dimension](interfaces/dimension.md)
* [DragEvent](interfaces/dragevent.md)
* [DragGestureDetectorOptions](interfaces/draggesturedetectoroptions.md)
* [Font](interfaces/font.md)
* [ImageViewProps](interfaces/imageviewprops.md)
* [LayoutAbsolutePositionProps](interfaces/layoutabsolutepositionprops.md)
* [LayoutProps](interfaces/layoutprops.md)
* [LayoutRelativePositionProps](interfaces/layoutrelativepositionprops.md)
* [LayoutSizeProps](interfaces/layoutsizeprops.md)
* [LayoutStandardProps](interfaces/layoutstandardprops.md)
* [Offset](interfaces/offset.md)
* [OrderedChildren](interfaces/orderedchildren.md)
* [PaintOverrides](interfaces/paintoverrides.md)
* [PointerPosition](interfaces/pointerposition.md)
* [Radius](interfaces/radius.md)
* [RectObjectInput](interfaces/rectobjectinput.md)
* [ScaleEvent](interfaces/scaleevent.md)
* [ScaleGestureDetectorOptions](interfaces/scalegesturedetectoroptions.md)
* [ScaleGestureProps](interfaces/scalegestureprops.md)
* [TextViewProps](interfaces/textviewprops.md)
* [ViewLike](interfaces/viewlike.md)
* [ViewProps](interfaces/viewprops.md)

### Type aliases

* [CanvasCreator](README.md#canvascreator)
* [DeepReadonly](README.md#deepreadonly)
* [DeepReadonlyObject](README.md#deepreadonlyobject)
* [DimensionInput](README.md#dimensioninput)
* [FontStyle](README.md#fontstyle)
* [FontVariant](README.md#fontvariant)
* [FontWeight](README.md#fontweight)
* [Id](README.md#id)
* [ImageClass](README.md#imageclass)
* [OnAreaSelectListener](README.md#onareaselectlistener)
* [OnDragListener](README.md#ondraglistener)
* [OnScaleListener](README.md#onscalelistener)
* [Primitive](README.md#primitive)
* [RadiusInput](README.md#radiusinput)
* [RectInput](README.md#rectinput)
* [RectLike](README.md#rectlike)
* [SupportedDomPointerEvent](README.md#supporteddompointerevent)

### Variables

* [DEBUG_POINTER_EVENTS](README.md#const-debug_pointer_events)
* [DEFAULT_POINTER_COUNT](README.md#const-default_pointer_count)
* [MATCH_PARENT](README.md#const-match_parent)
* [PARENT_ID](README.md#const-parent_id)
* [WHEEL_SCROLL_SPAN](README.md#const-wheel_scroll_span)
* [WRAP_CONTENT](README.md#const-wrap_content)
* [colorRegex](README.md#const-colorregex)
* [defaultImageClass](README.md#const-defaultimageclass)
* [defaultLayoutProps](README.md#const-defaultlayoutprops)
* [isBrowser](README.md#const-isbrowser)
* [supportedDomPointerEvents](README.md#const-supporteddompointerevents)

### Functions

* [calcDimension](README.md#const-calcdimension)
* [createEventDispatcher](README.md#const-createeventdispatcher)
* [createLayoutMap](README.md#createlayoutmap)
* [deepFreeze](README.md#const-deepfreeze)
* [defaultCanvasCreator](README.md#const-defaultcanvascreator)
* [domEventToPointerAction](README.md#const-domeventtopointeraction)
* [existingNonParentDependency](README.md#const-existingnonparentdependency)
* [fillPointerEventData](README.md#const-fillpointereventdata)
* [getBox](README.md#const-getbox)
* [getElementOffset](README.md#const-getelementoffset)
* [horizontalLayoutDependencies](README.md#const-horizontallayoutdependencies)
* [isBright](README.md#const-isbright)
* [isChrome](README.md#const-ischrome)
* [isMouseEvent](README.md#const-ismouseevent)
* [isSafari](README.md#const-issafari)
* [isTouchEvent](README.md#const-istouchevent)
* [isWheelEvent](README.md#const-iswheelevent)
* [logPointerEvent](README.md#const-logpointerevent)
* [logScreenshot](README.md#const-logscreenshot)
* [luminance](README.md#const-luminance)
* [mouseToPointer](README.md#const-mousetopointer)
* [noContextError](README.md#const-nocontexterror)
* [normalizeRadius](README.md#const-normalizeradius)
* [parseColor](README.md#const-parsecolor)
* [parseDimension](README.md#const-parsedimension)
* [parseFont](README.md#const-parsefont)
* [registerEventDispatcher](README.md#const-registereventdispatcher)
* [removeDefaultProps](README.md#const-removedefaultprops)
* [removeEqualProps](README.md#const-removeequalprops)
* [removeUndefinedProps](README.md#const-removeundefinedprops)
* [resolveDimensionDependencies](README.md#const-resolvedimensiondependencies)
* [resolveLayoutParamsIds](README.md#const-resolvelayoutparamsids)
* [rgba](README.md#const-rgba)
* [roundCoordinate](README.md#const-roundcoordinate)
* [scaleImage](README.md#const-scaleimage)
* [touchToPointer](README.md#const-touchtopointer)
* [verticalLayoutDependencies](README.md#const-verticallayoutdependencies)
* [xor](README.md#const-xor)

### Object literals

* [DefaultProps](README.md#const-defaultprops)
* [defaultFont](README.md#const-defaultfont)
* [defaultPaintOptions](README.md#const-defaultpaintoptions)
* [zeroRadius](README.md#const-zeroradius)

## Type aliases

###  CanvasCreator

Ƭ **CanvasCreator**: *function*

#### Type declaration:

▸ (`options`: [CanvasCreatorOptions](interfaces/canvascreatoroptions.md)): *[Canvas](interfaces/canvas.md)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CanvasCreatorOptions](interfaces/canvascreatoroptions.md) |

___

###  DeepReadonly

Ƭ **DeepReadonly**: *T extends Primitive ? T : DeepReadonlyObject<T>*

___

###  DeepReadonlyObject

Ƭ **DeepReadonlyObject**: *object*

#### Type declaration:

___

###  DimensionInput

Ƭ **DimensionInput**: *string | number | undefined | null*

___

###  FontStyle

Ƭ **FontStyle**: *"normal" | "italic" | "oblique"*

___

###  FontVariant

Ƭ **FontVariant**: *"normal" | "small-caps"*

___

###  FontWeight

Ƭ **FontWeight**: *"normal" | "bold" | "bolder" | "lighter" | 100 | "100" | 200 | "200" | 300 | "300" | 400 | "400" | 500 | "500" | 600 | "600" | 700 | "700" | 800 | "800" | 900 | "900"*

___

###  Id

Ƭ **Id**: *number | string*

___

###  ImageClass

Ƭ **ImageClass**: *object*

#### Type declaration:

___

###  OnAreaSelectListener

Ƭ **OnAreaSelectListener**: *function*

#### Type declaration:

▸ (`areaSelectEvent`: [AreaSelectEvent](interfaces/areaselectevent.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`areaSelectEvent` | [AreaSelectEvent](interfaces/areaselectevent.md) |

___

###  OnDragListener

Ƭ **OnDragListener**: *function*

#### Type declaration:

▸ (`dragEvent`: [DragEvent](interfaces/dragevent.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`dragEvent` | [DragEvent](interfaces/dragevent.md) |

___

###  OnScaleListener

Ƭ **OnScaleListener**: *function*

#### Type declaration:

▸ (`scaleEvent`: [ScaleEvent](interfaces/scaleevent.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`scaleEvent` | [ScaleEvent](interfaces/scaleevent.md) |

___

###  Primitive

Ƭ **Primitive**: *string | number | boolean | undefined | null*

___

###  RadiusInput

Ƭ **RadiusInput**: *number | Partial‹[Radius](interfaces/radius.md)› | null | undefined*

___

###  RectInput

Ƭ **RectInput**: *[RectObjectInput](interfaces/rectobjectinput.md) | number*

___

###  RectLike

Ƭ **RectLike**: *[Rect](classes/rect.md) | [RectInput](README.md#rectinput)*

___

###  SupportedDomPointerEvent

Ƭ **SupportedDomPointerEvent**: *MouseEvent | WheelEvent | TouchEvent*

## Variables

### `Const` DEBUG_POINTER_EVENTS

• **DEBUG_POINTER_EVENTS**: *false* = false

___

### `Const` DEFAULT_POINTER_COUNT

• **DEFAULT_POINTER_COUNT**: *1* = 1

___

### `Const` MATCH_PARENT

• **MATCH_PARENT**: *-1* = -1

___

### `Const` PARENT_ID

• **PARENT_ID**: *-1* = -1

___

### `Const` WHEEL_SCROLL_SPAN

• **WHEEL_SCROLL_SPAN**: *100* = 100

___

### `Const` WRAP_CONTENT

• **WRAP_CONTENT**: *-2* = -2

___

### `Const` colorRegex

• **colorRegex**: *RegExp‹›* = /^(?:#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2}))|(?:#([0-9a-f])([0-9a-f])([0-9a-f]))|(?:rgb\((\d+),\s*(\d+),\s*(\d+)\))|(?:rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\))$/i

___

### `Const` defaultImageClass

• **defaultImageClass**: *undefined | object* = (() => {
  try {
    // Browsers default
    return Image;
  } catch {
    return undefined;
  }
})()

___

### `Const` defaultLayoutProps

• **defaultLayoutProps**: *[LayoutProps](interfaces/layoutprops.md)* = new LayoutParams().asProps()

___

### `Const` isBrowser

• **isBrowser**: *false | requestAnimationFrame & requestAnimationFrame* = typeof window !== 'undefined' && window.requestAnimationFrame

___

### `Const` supportedDomPointerEvents

• **supportedDomPointerEvents**: *"touchmove" | "mousemove" | "mousedown" | "touchstart" | "mouseover" | "mouseenter" | "touchcancel" | "mouseout" | "mouseup" | "touchend" | "wheel"[]* = [
  'touchmove',
  'mousemove',
  'mousedown',
  'touchstart',
  'mouseover',
  'mouseenter',
  'touchcancel',
  'mouseout',
  'mouseup',
  'touchend',
  'wheel',
]

## Functions

### `Const` calcDimension

▸ **calcDimension**(`dimension`: [Dimension](interfaces/dimension.md), `parentDimension`: number): *undefined | number*

**Parameters:**

Name | Type |
------ | ------ |
`dimension` | [Dimension](interfaces/dimension.md) |
`parentDimension` | number |

**Returns:** *undefined | number*

___

### `Const` createEventDispatcher

▸ **createEventDispatcher**(`view`: [View](classes/view.md)): *EventListener*

**Parameters:**

Name | Type |
------ | ------ |
`view` | [View](classes/view.md) |

**Returns:** *EventListener*

___

###  createLayoutMap

▸ **createLayoutMap**<**K**>(`t`: Record‹K, [LayoutProps](interfaces/layoutprops.md)›): *object*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`t` | Record‹K, [LayoutProps](interfaces/layoutprops.md)› |

**Returns:** *object*

___

### `Const` deepFreeze

▸ **deepFreeze**<**T**>(`object`: T): *[DeepReadonly](README.md#deepreadonly)‹T›*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`object` | T |

**Returns:** *[DeepReadonly](README.md#deepreadonly)‹T›*

___

### `Const` defaultCanvasCreator

▸ **defaultCanvasCreator**(`__namedParameters`: object): *HTMLCanvasElement*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`height` | number |
`width` | number |

**Returns:** *HTMLCanvasElement*

___

### `Const` domEventToPointerAction

▸ **domEventToPointerAction**(`event`: Event): *[PointerAction](enums/pointeraction.md) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`event` | Event |

**Returns:** *[PointerAction](enums/pointeraction.md) | undefined*

___

### `Const` existingNonParentDependency

▸ **existingNonParentDependency**(`id`: undefined | [Id](README.md#id)): *id is number*

**Parameters:**

Name | Type |
------ | ------ |
`id` | undefined &#124; [Id](README.md#id) |

**Returns:** *id is number*

___

### `Const` fillPointerEventData

▸ **fillPointerEventData**(`pointerEvent`: [CanvasPointerEvent](classes/canvaspointerevent.md), `view`: [View](classes/view.md), `event`: Event): *void*

**Parameters:**

Name | Type |
------ | ------ |
`pointerEvent` | [CanvasPointerEvent](classes/canvaspointerevent.md) |
`view` | [View](classes/view.md) |
`event` | Event |

**Returns:** *void*

___

### `Const` getBox

▸ **getBox**(`width`: number, `height`: number, `scale`: number): *object*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`height` | number |
`scale` | number |

**Returns:** *object*

* **str**: *string* = `+`

* **style**: *string* = `
  font-size: 1px;
  padding: ${isSafari() ? height * scale / 2 : 0}px ${Math.floor(width * scale / 2)}px;
  color: transparent;
  line-height: ${height * scale}px;`

___

### `Const` getElementOffset

▸ **getElementOffset**(`element`: HTMLElement, `offset`: [Offset](interfaces/offset.md)): *[Offset](interfaces/offset.md)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | HTMLElement |
`offset` | [Offset](interfaces/offset.md) |

**Returns:** *[Offset](interfaces/offset.md)*

___

### `Const` horizontalLayoutDependencies

▸ **horizontalLayoutDependencies**(`lp`: [LayoutParams](classes/layoutparams.md)): *number[]*

**Parameters:**

Name | Type |
------ | ------ |
`lp` | [LayoutParams](classes/layoutparams.md) |

**Returns:** *number[]*

___

### `Const` isBright

▸ **isBright**(`color`: [Color](interfaces/color.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`color` | [Color](interfaces/color.md) |

**Returns:** *boolean*

___

### `Const` isChrome

▸ **isChrome**(): *boolean*

**Returns:** *boolean*

___

### `Const` isMouseEvent

▸ **isMouseEvent**(`event`: Event): *event is MouseEvent*

**Parameters:**

Name | Type |
------ | ------ |
`event` | Event |

**Returns:** *event is MouseEvent*

___

### `Const` isSafari

▸ **isSafari**(): *boolean*

**Returns:** *boolean*

___

### `Const` isTouchEvent

▸ **isTouchEvent**(`event`: Event): *event is TouchEvent*

**Parameters:**

Name | Type |
------ | ------ |
`event` | Event |

**Returns:** *event is TouchEvent*

___

### `Const` isWheelEvent

▸ **isWheelEvent**(`event`: Event): *event is WheelEvent*

**Parameters:**

Name | Type |
------ | ------ |
`event` | Event |

**Returns:** *event is WheelEvent*

___

### `Const` logPointerEvent

▸ **logPointerEvent**(`pointerEvent`: [CanvasPointerEvent](classes/canvaspointerevent.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`pointerEvent` | [CanvasPointerEvent](classes/canvaspointerevent.md) |

**Returns:** *void*

___

### `Const` logScreenshot

▸ **logScreenshot**(`view`: [View](classes/view.md), `scale`: number): *void*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`view` | [View](classes/view.md) | - |
`scale` | number | 1 |

**Returns:** *void*

___

### `Const` luminance

▸ **luminance**(`c`: [Color](interfaces/color.md)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`c` | [Color](interfaces/color.md) |

**Returns:** *number*

___

### `Const` mouseToPointer

▸ **mouseToPointer**(`event`: MouseEvent, `offset`: [Offset](interfaces/offset.md), `canvasPointer`: [CanvasPointer](interfaces/canvaspointer.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | MouseEvent |
`offset` | [Offset](interfaces/offset.md) |
`canvasPointer` | [CanvasPointer](interfaces/canvaspointer.md) |

**Returns:** *void*

___

### `Const` noContextError

▸ **noContextError**(): *Error*

**Returns:** *Error*

___

### `Const` normalizeRadius

▸ **normalizeRadius**(`radius`: [RadiusInput](README.md#radiusinput)): *[Radius](interfaces/radius.md)*

**Parameters:**

Name | Type |
------ | ------ |
`radius` | [RadiusInput](README.md#radiusinput) |

**Returns:** *[Radius](interfaces/radius.md)*

___

### `Const` parseColor

▸ **parseColor**(`colorString`: string | undefined): *typeof colorString extends undefined ? undefined : Color | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`colorString` | string &#124; undefined |

**Returns:** *typeof colorString extends undefined ? undefined : Color | undefined*

___

### `Const` parseDimension

▸ **parseDimension**(`value`: [DimensionInput](README.md#dimensioninput)): *[Dimension](interfaces/dimension.md)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [DimensionInput](README.md#dimensioninput) |

**Returns:** *[Dimension](interfaces/dimension.md)*

___

### `Const` parseFont

▸ **parseFont**(`__namedParameters`: object): *string*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`fontFamily` | string |
`fontSize` | number |
`fontStyle` | undefined &#124; "normal" &#124; "italic" &#124; "oblique" |
`fontVariant` | undefined &#124; "normal" &#124; "small-caps" |
`fontWeight` | undefined &#124; "normal" &#124; "bold" &#124; "bolder" &#124; "lighter" &#124; 100 &#124; "100" &#124; 200 &#124; "200" &#124; 300 &#124; "300" &#124; 400 &#124; "400" &#124; 500 &#124; "500" &#124; 600 &#124; "600" &#124; 700 &#124; "700" &#124; 800 &#124; "800" &#124; 900 &#124; "900" |

**Returns:** *string*

___

### `Const` registerEventDispatcher

▸ **registerEventDispatcher**(`element`: Element, `dispatcher`: EventListener): *(Anonymous function)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`dispatcher` | EventListener |

**Returns:** *(Anonymous function)*

___

### `Const` removeDefaultProps

▸ **removeDefaultProps**(`props`: [LayoutProps](interfaces/layoutprops.md)): *any*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [LayoutProps](interfaces/layoutprops.md) |

**Returns:** *any*

___

### `Const` removeEqualProps

▸ **removeEqualProps**(`object`: any, `defaultObject`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`object` | any |
`defaultObject` | any |

**Returns:** *any*

___

### `Const` removeUndefinedProps

▸ **removeUndefinedProps**(`object`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`object` | any |

**Returns:** *any*

___

### `Const` resolveDimensionDependencies

▸ **resolveDimensionDependencies**<**T**>(`children`: T[], `dependencySelector`: function, `context`: [Context](classes/context.md)): *T[]*

**Type parameters:**

▪ **T**: *[ViewLike](interfaces/viewlike.md)*

**Parameters:**

▪ **children**: *T[]*

▪ **dependencySelector**: *function*

▸ (`lp`: [LayoutParams](classes/layoutparams.md)): *number[]*

**Parameters:**

Name | Type |
------ | ------ |
`lp` | [LayoutParams](classes/layoutparams.md) |

▪ **context**: *[Context](classes/context.md)*

**Returns:** *T[]*

___

### `Const` resolveLayoutParamsIds

▸ **resolveLayoutParamsIds**(`layoutParams`: [LayoutParams](classes/layoutparams.md), `context`: [Context](classes/context.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`layoutParams` | [LayoutParams](classes/layoutparams.md) |
`context` | [Context](classes/context.md) |

**Returns:** *void*

___

### `Const` rgba

▸ **rgba**(`color`: string, `alpha`: number): *string*

**Parameters:**

Name | Type |
------ | ------ |
`color` | string |
`alpha` | number |

**Returns:** *string*

___

### `Const` roundCoordinate

▸ **roundCoordinate**(`coordinate`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`coordinate` | number |

**Returns:** *number*

___

### `Const` scaleImage

▸ **scaleImage**(`scaleType`: [ImageScaleType](enums/imagescaletype.md), `imageWidth`: number, `imageHeight`: number, `innerWidth`: number, `innerHeight`: number, `rect`: [Rect](classes/rect.md)): *[Rect](classes/rect.md)*

**Parameters:**

Name | Type |
------ | ------ |
`scaleType` | [ImageScaleType](enums/imagescaletype.md) |
`imageWidth` | number |
`imageHeight` | number |
`innerWidth` | number |
`innerHeight` | number |
`rect` | [Rect](classes/rect.md) |

**Returns:** *[Rect](classes/rect.md)*

___

### `Const` touchToPointer

▸ **touchToPointer**(`touch`: Touch | null, `offset`: [Offset](interfaces/offset.md), `canvasPointer`: [CanvasPointer](interfaces/canvaspointer.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`touch` | Touch &#124; null |
`offset` | [Offset](interfaces/offset.md) |
`canvasPointer` | [CanvasPointer](interfaces/canvaspointer.md) |

**Returns:** *void*

___

### `Const` verticalLayoutDependencies

▸ **verticalLayoutDependencies**(`lp`: [LayoutParams](classes/layoutparams.md)): *number[]*

**Parameters:**

Name | Type |
------ | ------ |
`lp` | [LayoutParams](classes/layoutparams.md) |

**Returns:** *number[]*

___

### `Const` xor

▸ **xor**(`a`: boolean, `b`: boolean): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`a` | boolean |
`b` | boolean |

**Returns:** *boolean*

## Object literals

### `Const` DefaultProps

### ▪ **DefaultProps**: *object*

###  ABOVE

• **ABOVE**: *undefined* = undefined

###  ALIGN_BOTTOM

• **ALIGN_BOTTOM**: *undefined* = undefined

###  ALIGN_END

• **ALIGN_END**: *undefined* = undefined

###  ALIGN_START

• **ALIGN_START**: *undefined* = undefined

###  ALIGN_TOP

• **ALIGN_TOP**: *undefined* = undefined

###  BELOW

• **BELOW**: *undefined* = undefined

###  CENTER_HORIZONTAL

• **CENTER_HORIZONTAL**: *boolean* = false

###  CENTER_VERTICAL

• **CENTER_VERTICAL**: *boolean* = false

###  HEIGHT

• **HEIGHT**: *number* = WRAP_CONTENT

###  IS_ABSOLUTE

• **IS_ABSOLUTE**: *boolean* = false

###  IS_ANIMATED

• **IS_ANIMATED**: *boolean* = false

###  MARGIN

• **MARGIN**: *[Rect](classes/rect.md)‹›* = new Rect(0)

###  MAX_HEIGHT

• **MAX_HEIGHT**: *number* = Number.MAX_SAFE_INTEGER

###  MAX_WIDTH

• **MAX_WIDTH**: *number* = Number.MAX_SAFE_INTEGER

###  MIN_HEIGHT

• **MIN_HEIGHT**: *number* = 0

###  MIN_WIDTH

• **MIN_WIDTH**: *number* = 0

###  PADDING

• **PADDING**: *[Rect](classes/rect.md)‹›* = new Rect(0)

###  TO_END_OF

• **TO_END_OF**: *undefined* = undefined

###  TO_START_OF

• **TO_START_OF**: *undefined* = undefined

###  WIDTH

• **WIDTH**: *number* = WRAP_CONTENT

###  X

• **X**: *number* = 0

###  Y

• **Y**: *number* = 0

___

### `Const` defaultFont

### ▪ **defaultFont**: *object*

###  fontFamily

• **fontFamily**: *string* = "Arial"

###  fontSize

• **fontSize**: *number* = 12

___

### `Const` defaultPaintOptions

### ▪ **defaultPaintOptions**: *object*

###  font

• **font**: *string* = parseFont(defaultFont)

###  lineDash

• **lineDash**: *never[]* = []

###  lineRounding

• **lineRounding**: *boolean* = false

###  lineWidth

• **lineWidth**: *number* = 0

###  textAlign

• **textAlign**: *[TextAlign](enums/textalign.md)* = 'left' as TextAlign

###  textBaseline

• **textBaseline**: *[TextBaseline](enums/textbaseline.md)* = 'bottom' as TextBaseline

###  textDirection

• **textDirection**: *"ltr" | "rtl" | "inherit"* = 'ltr' as CanvasDirection

___

### `Const` zeroRadius

### ▪ **zeroRadius**: *object*

###  bl

• **bl**: *number* = 0

###  br

• **br**: *number* = 0

###  tl

• **tl**: *number* = 0

###  tr

• **tr**: *number* = 0
