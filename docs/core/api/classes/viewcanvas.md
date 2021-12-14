# Class: ViewCanvas

## Hierarchy

* **ViewCanvas**

## Index

### Constructors

* [constructor](viewcanvas.md#constructor)

### Properties

* [canvas](viewcanvas.md#protected-readonly-canvas)
* [context](viewcanvas.md#readonly-context)

### Methods

* [drawPath](viewcanvas.md#drawpath)
* [drawRect](viewcanvas.md#drawrect)
* [drawText](viewcanvas.md#drawtext)
* [line](viewcanvas.md#line)
* [measureText](viewcanvas.md#measuretext)
* [roundRect](viewcanvas.md#roundrect)
* [setPaint](viewcanvas.md#setpaint)

## Constructors

###  constructor

\+ **new ViewCanvas**(`canvas`: [Canvas](../interfaces/canvas.md)): *[ViewCanvas](viewcanvas.md)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | [Canvas](../interfaces/canvas.md) |

**Returns:** *[ViewCanvas](viewcanvas.md)*

## Properties

### `Protected` `Readonly` canvas

• **canvas**: *[Canvas](../interfaces/canvas.md)*

___

### `Readonly` context

• **context**: *CanvasRenderingContext2D*

## Methods

###  drawPath

▸ **drawPath**(`paint`: [Paint](paint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`paint` | [Paint](paint.md) |

**Returns:** *void*

___

###  drawRect

▸ **drawRect**(`rect`: [Rect](rect.md), `paint`: [Paint](paint.md), `borders?`: [Rect](rect.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`rect` | [Rect](rect.md) |
`paint` | [Paint](paint.md) |
`borders?` | [Rect](rect.md) |

**Returns:** *void*

___

###  drawText

▸ **drawText**(`x`: number, `y`: number, `text`: string, `paint`: [Paint](paint.md), `paintOverrides?`: [PaintOverrides](../interfaces/paintoverrides.md), `maxWidth`: number): *void*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`x` | number | - |
`y` | number | - |
`text` | string | - |
`paint` | [Paint](paint.md) | - |
`paintOverrides?` | [PaintOverrides](../interfaces/paintoverrides.md) | - |
`maxWidth` | number | 0 |

**Returns:** *void*

___

###  line

▸ **line**(`line`: [Line](line.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`line` | [Line](line.md) |

**Returns:** *void*

___

###  measureText

▸ **measureText**(`text`: string, `paint`: [Paint](paint.md)): *TextMetrics*

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |
`paint` | [Paint](paint.md) |

**Returns:** *TextMetrics*

___

###  roundRect

▸ **roundRect**(`x`: number, `y`: number, `w`: number, `h`: number, `r`: [Radius](../interfaces/radius.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`w` | number |
`h` | number |
`r` | [Radius](../interfaces/radius.md) |

**Returns:** *void*

___

###  setPaint

▸ **setPaint**(`paint`: [Paint](paint.md), `paintOverrides?`: [PaintOverrides](../interfaces/paintoverrides.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`paint` | [Paint](paint.md) |
`paintOverrides?` | [PaintOverrides](../interfaces/paintoverrides.md) |

**Returns:** *void*
