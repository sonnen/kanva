# Class: Paint

## Hierarchy

* **Paint**

## Implements

* [PaintOverrides](../interfaces/paintoverrides.md)

## Index

### Properties

* [fillStyle](paint.md#optional-fillstyle)
* [font](paint.md#font)
* [fontString](paint.md#fontstring)
* [lineDash](paint.md#linedash)
* [lineRounding](paint.md#linerounding)
* [lineWidth](paint.md#linewidth)
* [strokeStyle](paint.md#optional-strokestyle)
* [textAlign](paint.md#textalign)
* [textBaseline](paint.md#textbaseline)
* [textDirection](paint.md#textdirection)
* [DEFAULT](paint.md#static-readonly-default)

### Methods

* [canDrawFill](paint.md#candrawfill)
* [canDrawStroke](paint.md#candrawstroke)
* [canDrawText](paint.md#candrawtext)
* [clone](paint.md#clone)
* [getLineHeight](paint.md#getlineheight)
* [isBright](paint.md#isbright)
* [setFillStyle](paint.md#setfillstyle)
* [setFont](paint.md#setfont)
* [setLineDash](paint.md#setlinedash)
* [setLineRounding](paint.md#setlinerounding)
* [setLineWidth](paint.md#setlinewidth)
* [setStrokeStyle](paint.md#setstrokestyle)
* [setTextAlign](paint.md#settextalign)
* [setTextBaseline](paint.md#settextbaseline)
* [setTextDirection](paint.md#settextdirection)
* [snapshot](paint.md#snapshot)

## Properties

### `Optional` fillStyle

• **fillStyle**? : *undefined | string*

*Implementation of [PaintOverrides](../interfaces/paintoverrides.md).[fillStyle](../interfaces/paintoverrides.md#optional-fillstyle)*

___

###  font

• **font**: *[Font](../interfaces/font.md)* = defaultFont

___

###  fontString

• **fontString**: *string* = defaultPaintOptions.font

___

###  lineDash

• **lineDash**: *number[]* = defaultPaintOptions.lineDash

___

###  lineRounding

• **lineRounding**: *boolean* = defaultPaintOptions.lineRounding

*Implementation of [PaintOverrides](../interfaces/paintoverrides.md).[lineRounding](../interfaces/paintoverrides.md#optional-linerounding)*

___

###  lineWidth

• **lineWidth**: *number* = defaultPaintOptions.lineWidth

___

### `Optional` strokeStyle

• **strokeStyle**? : *undefined | string*

___

###  textAlign

• **textAlign**: *[TextAlign](../enums/textalign.md)* = defaultPaintOptions.textAlign

*Implementation of [PaintOverrides](../interfaces/paintoverrides.md).[textAlign](../interfaces/paintoverrides.md#optional-textalign)*

___

###  textBaseline

• **textBaseline**: *[TextBaseline](../enums/textbaseline.md)* = defaultPaintOptions.textBaseline

*Implementation of [PaintOverrides](../interfaces/paintoverrides.md).[textBaseline](../interfaces/paintoverrides.md#optional-textbaseline)*

___

###  textDirection

• **textDirection**: *CanvasDirection* = defaultPaintOptions.textDirection

*Implementation of [PaintOverrides](../interfaces/paintoverrides.md).[textDirection](../interfaces/paintoverrides.md#optional-textdirection)*

___

### `Static` `Readonly` DEFAULT

▪ **DEFAULT**: *[DeepReadonly](../README.md#deepreadonly)‹[Paint](paint.md)›* = new Paint()

## Methods

###  canDrawFill

▸ **canDrawFill**(): *boolean*

**Returns:** *boolean*

___

###  canDrawStroke

▸ **canDrawStroke**(): *boolean*

**Returns:** *boolean*

___

###  canDrawText

▸ **canDrawText**(): *boolean*

**Returns:** *boolean*

___

###  clone

▸ **clone**(): *[Paint](paint.md)‹›*

**Returns:** *[Paint](paint.md)‹›*

___

###  getLineHeight

▸ **getLineHeight**(): *number*

**Returns:** *number*

___

###  isBright

▸ **isBright**(): *boolean*

**Returns:** *boolean*

___

###  setFillStyle

▸ **setFillStyle**(`fill`: string): *this*

**Parameters:**

Name | Type |
------ | ------ |
`fill` | string |

**Returns:** *this*

___

###  setFont

▸ **setFont**(`font`: [Font](../interfaces/font.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`font` | [Font](../interfaces/font.md) |

**Returns:** *this*

___

###  setLineDash

▸ **setLineDash**(`lineDash`: number[]): *this*

**Parameters:**

Name | Type |
------ | ------ |
`lineDash` | number[] |

**Returns:** *this*

___

###  setLineRounding

▸ **setLineRounding**(`lineRounding`: boolean): *this*

**Parameters:**

Name | Type |
------ | ------ |
`lineRounding` | boolean |

**Returns:** *this*

___

###  setLineWidth

▸ **setLineWidth**(`lineWidth`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`lineWidth` | number |

**Returns:** *this*

___

###  setStrokeStyle

▸ **setStrokeStyle**(`stroke`: string): *this*

**Parameters:**

Name | Type |
------ | ------ |
`stroke` | string |

**Returns:** *this*

___

###  setTextAlign

▸ **setTextAlign**(`textAlign`: [TextAlign](../enums/textalign.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`textAlign` | [TextAlign](../enums/textalign.md) |

**Returns:** *this*

___

###  setTextBaseline

▸ **setTextBaseline**(`textBaseline`: [TextBaseline](../enums/textbaseline.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`textBaseline` | [TextBaseline](../enums/textbaseline.md) |

**Returns:** *this*

___

###  setTextDirection

▸ **setTextDirection**(`textDirection`: CanvasDirection): *this*

**Parameters:**

Name | Type |
------ | ------ |
`textDirection` | CanvasDirection |

**Returns:** *this*

___

###  snapshot

▸ **snapshot**(): *object*

**Returns:** *object*
