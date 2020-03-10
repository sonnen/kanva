# Class: CanvasPointerEvent

## Hierarchy

* **CanvasPointerEvent**

## Index

### Constructors

* [constructor](canvaspointerevent.md#constructor)

### Properties

* [action](canvaspointerevent.md#action)
* [offset](canvaspointerevent.md#offset)
* [pointerCount](canvaspointerevent.md#pointercount)
* [pointers](canvaspointerevent.md#pointers)
* [scrollX](canvaspointerevent.md#scrollx)
* [scrollY](canvaspointerevent.md#scrolly)
* [scrollZ](canvaspointerevent.md#scrollz)
* [target](canvaspointerevent.md#target)

### Accessors

* [primaryPointer](canvaspointerevent.md#primarypointer)

### Methods

* [clone](canvaspointerevent.md#clone)
* [cloneTo](canvaspointerevent.md#cloneto)
* [offsetPointers](canvaspointerevent.md#offsetpointers)

## Constructors

###  constructor

\+ **new CanvasPointerEvent**(): *[CanvasPointerEvent](canvaspointerevent.md)*

**Returns:** *[CanvasPointerEvent](canvaspointerevent.md)*

## Properties

###  action

• **action**: *[PointerAction](../enums/pointeraction.md)*

___

###  offset

• **offset**: *[Offset](../interfaces/offset.md)*

___

###  pointerCount

• **pointerCount**: *number* = 0

___

###  pointers

• **pointers**: *[CanvasPointer](../interfaces/canvaspointer.md)[]* = new Array(10).fill(null).map(() => ({}) as any)

___

###  scrollX

• **scrollX**: *number* = 0

___

###  scrollY

• **scrollY**: *number* = 0

___

###  scrollZ

• **scrollZ**: *number* = 0

___

###  target

• **target**: *[View](view.md)*

## Accessors

###  primaryPointer

• **get primaryPointer**(): *[CanvasPointer](../interfaces/canvaspointer.md)*

**Returns:** *[CanvasPointer](../interfaces/canvaspointer.md)*

## Methods

###  clone

▸ **clone**(): *[CanvasPointerEvent](canvaspointerevent.md)*

**Returns:** *[CanvasPointerEvent](canvaspointerevent.md)*

___

###  cloneTo

▸ **cloneTo**(`event`: [CanvasPointerEvent](canvaspointerevent.md)): *[CanvasPointerEvent](canvaspointerevent.md)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | [CanvasPointerEvent](canvaspointerevent.md) |

**Returns:** *[CanvasPointerEvent](canvaspointerevent.md)*

___

###  offsetPointers

▸ **offsetPointers**(`offsetX`: number, `offsetY`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`offsetX` | number |
`offsetY` | number |

**Returns:** *void*
