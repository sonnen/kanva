# Class: Rect

## Hierarchy

* **Rect**

## Index

### Constructors

* [constructor](rect.md#constructor)

### Properties

* [b](rect.md#b)
* [l](rect.md#l)
* [r](rect.md#r)
* [t](rect.md#t)

### Accessors

* [height](rect.md#height)
* [width](rect.md#width)

### Methods

* [clone](rect.md#clone)
* [cloneTo](rect.md#cloneto)
* [contains](rect.md#contains)
* [expand](rect.md#expand)
* [inset](rect.md#inset)
* [intersects](rect.md#intersects)
* [offset](rect.md#offset)
* [toString](rect.md#tostring)
* [from](rect.md#static-from)

## Constructors

###  constructor

\+ **new Rect**(`value`: [RectInput](../README.md#rectinput)): *[Rect](rect.md)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RectInput](../README.md#rectinput) |

**Returns:** *[Rect](rect.md)*

## Properties

###  b

• **b**: *number*

___

###  l

• **l**: *number*

___

###  r

• **r**: *number*

___

###  t

• **t**: *number*

## Accessors

###  height

• **get height**(): *number*

**Returns:** *number*

___

###  width

• **get width**(): *number*

**Returns:** *number*

## Methods

###  clone

▸ **clone**(): *[Rect](rect.md)‹›*

Returns a copy of Rect that can be mutated separately.

**Returns:** *[Rect](rect.md)‹›*

___

###  cloneTo

▸ **cloneTo**(`rect`: [Rect](rect.md)): *[Rect](rect.md)‹›*

Copies all of this Rect's properties to a Rect specified in an argument.
Returns the line passed as argument.

**Parameters:**

Name | Type |
------ | ------ |
`rect` | [Rect](rect.md) |

**Returns:** *[Rect](rect.md)‹›*

___

###  contains

▸ **contains**(`x`: number, `y`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *boolean*

___

###  expand

▸ **expand**(`expansion`: [Rect](rect.md) | number): *this*

Expands this Rect by other Rect's dimensions (i.e. to reduce padding)
or by a constant numeric value from each side.
Resulting Rect is the same, mutated Rect.

**Parameters:**

Name | Type |
------ | ------ |
`expansion` | [Rect](rect.md) &#124; number |

**Returns:** *this*

___

###  inset

▸ **inset**(`shrink`: [Rect](rect.md) | number): *this*

Shrinks this Rect by other Rect's dimensions (i.e. to apply padding)
or by a constant numeric value from each side.
Resulting Rect is the same, mutated Rect.

**Parameters:**

Name | Type |
------ | ------ |
`shrink` | [Rect](rect.md) &#124; number |

**Returns:** *this*

___

###  intersects

▸ **intersects**(`rect`: [Rect](rect.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`rect` | [Rect](rect.md) |

**Returns:** *boolean*

___

###  offset

▸ **offset**(`offset`: [Rect](rect.md) | [Point](point.md)): *this*

Moves this Rect by left top position of passed rect or by XY coordinates of a Point.
Resulting Rect is the same, mutated Rect.

**Parameters:**

Name | Type |
------ | ------ |
`offset` | [Rect](rect.md) &#124; [Point](point.md) |

**Returns:** *this*

▸ **offset**(`x`: number, `y`: number): *this*

Moves this Rect by passed x and y coordinates.
Resulting Rect is the same, mutated Rect.

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *this*

___

###  toString

▸ **toString**(): *string*

**Returns:** *string*

___

### `Static` from

▸ **from**(`rectLike`: [RectLike](../README.md#rectlike)): *[Rect](rect.md)*

**Parameters:**

Name | Type |
------ | ------ |
`rectLike` | [RectLike](../README.md#rectlike) |

**Returns:** *[Rect](rect.md)*
