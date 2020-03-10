# Class: Line

## Hierarchy

* **Line**

## Index

### Constructors

* [constructor](line.md#constructor)

### Properties

* [endX](line.md#endx)
* [endY](line.md#endy)
* [startX](line.md#startx)
* [startY](line.md#starty)

### Methods

* [add](line.md#add)
* [clone](line.md#clone)
* [cloneTo](line.md#cloneto)
* [extend](line.md#extend)
* [length](line.md#length)
* [move](line.md#move)
* [offset](line.md#offset)
* [pointAt](line.md#pointat)
* [toString](line.md#tostring)

## Constructors

###  constructor

\+ **new Line**(): *[Line](line.md)*

**Returns:** *[Line](line.md)*

\+ **new Line**(`startX`: number, `startY`: number, `endX`: number, `endY`: number): *[Line](line.md)*

**Parameters:**

Name | Type |
------ | ------ |
`startX` | number |
`startY` | number |
`endX` | number |
`endY` | number |

**Returns:** *[Line](line.md)*

## Properties

###  endX

• **endX**: *number*

___

###  endY

• **endY**: *number*

___

###  startX

• **startX**: *number*

___

###  startY

• **startY**: *number*

## Methods

###  add

▸ **add**(`line`: [Line](line.md) | [Point](point.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`line` | [Line](line.md) &#124; [Point](point.md) |

**Returns:** *this*

▸ **add**(`x`: number, `y`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *this*

___

###  clone

▸ **clone**(): *[Line](line.md)‹›*

Returns a copy of Line that can be mutated separately.

**Returns:** *[Line](line.md)‹›*

___

###  cloneTo

▸ **cloneTo**(`line`: [Line](line.md)): *[Line](line.md)‹›*

Copies all of this Line's properties to a Line specified in an argument.
Returns the line passed as argument.

**Parameters:**

Name | Type |
------ | ------ |
`line` | [Line](line.md) |

**Returns:** *[Line](line.md)‹›*

___

###  extend

▸ **extend**(`distance`: number): *this*

Extends this line by a specified distance. Starting point remains the same,
ending point changes it's place by the distance.
If current line has the length of 0, it's extended horizontally.
Resulting Line is the same, mutated Line.

**Parameters:**

Name | Type |
------ | ------ |
`distance` | number |

**Returns:** *this*

___

###  length

▸ **length**(): *number*

**Returns:** *number*

___

###  move

▸ **move**(`distance`: number): *this*

Moves this line by a specified distance on the same angle.
Acting similarly to {@link Line#extend}, but modifies both starting and ending points by a specified distance.
If current line has the length of 0, it's moved horizontally.
Resulting Line is the same, mutated Line.

**Parameters:**

Name | Type |
------ | ------ |
`distance` | number |

**Returns:** *this*

___

###  offset

▸ **offset**(`line`: [Line](line.md) | [Point](point.md)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`line` | [Line](line.md) &#124; [Point](point.md) |

**Returns:** *this*

▸ **offset**(`x`: number, `y`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *this*

___

###  pointAt

▸ **pointAt**(`position`: number, `result`: [Point](point.md)): *[Point](point.md)*

Returns a point on this line, at specified position (ranged from 0 to 1).
I.e. to get the center of line, pass 0.5.
Creates a new Point, but in order to reuse the existing one, you can pass it as a second argument.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`position` | number | - |
`result` | [Point](point.md) | new Point() |

**Returns:** *[Point](point.md)*

___

###  toString

▸ **toString**(): *string*

**Returns:** *string*
