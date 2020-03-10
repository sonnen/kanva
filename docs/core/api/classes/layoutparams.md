# Class: LayoutParams

## Hierarchy

* **LayoutParams**

## Index

### Properties

* [aboveId](layoutparams.md#optional-aboveid)
* [belowId](layoutparams.md#optional-belowid)
* [bottomId](layoutparams.md#optional-bottomid)
* [centerH](layoutparams.md#centerh)
* [centerV](layoutparams.md#centerv)
* [dependenciesModified](layoutparams.md#dependenciesmodified)
* [endId](layoutparams.md#optional-endid)
* [h](layoutparams.md#h)
* [hDimension](layoutparams.md#hdimension)
* [isAbsolute](layoutparams.md#isabsolute)
* [isAnimated](layoutparams.md#isanimated)
* [marginRect](layoutparams.md#marginrect)
* [maxH](layoutparams.md#maxh)
* [maxW](layoutparams.md#maxw)
* [minH](layoutparams.md#minh)
* [minW](layoutparams.md#minw)
* [paddingRect](layoutparams.md#paddingrect)
* [startId](layoutparams.md#optional-startid)
* [toEndOfId](layoutparams.md#optional-toendofid)
* [toStartOfId](layoutparams.md#optional-tostartofid)
* [topId](layoutparams.md#optional-topid)
* [w](layoutparams.md#w)
* [wDimension](layoutparams.md#wdimension)
* [x](layoutparams.md#x)
* [xDimension](layoutparams.md#xdimension)
* [y](layoutparams.md#y)
* [yDimension](layoutparams.md#ydimension)

### Methods

* [above](layoutparams.md#above)
* [absolute](layoutparams.md#absolute)
* [alignBottom](layoutparams.md#alignbottom)
* [alignEnd](layoutparams.md#alignend)
* [alignParentBottom](layoutparams.md#alignparentbottom)
* [alignParentEnd](layoutparams.md#alignparentend)
* [alignParentStart](layoutparams.md#alignparentstart)
* [alignParentTop](layoutparams.md#alignparenttop)
* [alignStart](layoutparams.md#alignstart)
* [alignTop](layoutparams.md#aligntop)
* [animate](layoutparams.md#animate)
* [asProps](layoutparams.md#asprops)
* [below](layoutparams.md#below)
* [center](layoutparams.md#center)
* [centerHorizontal](layoutparams.md#centerhorizontal)
* [centerVertical](layoutparams.md#centervertical)
* [height](layoutparams.md#height)
* [margin](layoutparams.md#margin)
* [maxHeight](layoutparams.md#maxheight)
* [maxWidth](layoutparams.md#maxwidth)
* [minHeight](layoutparams.md#minheight)
* [minWidth](layoutparams.md#minwidth)
* [padding](layoutparams.md#padding)
* [posX](layoutparams.md#posx)
* [posY](layoutparams.md#posy)
* [toEndOf](layoutparams.md#toendof)
* [toLeftOf](layoutparams.md#toleftof)
* [toRightOf](layoutparams.md#torightof)
* [toStartOf](layoutparams.md#tostartof)
* [updateWithProps](layoutparams.md#updatewithprops)
* [width](layoutparams.md#width)

## Properties

### `Optional` aboveId

• **aboveId**? : *[Id](../README.md#id)* = DefaultProps.ABOVE

___

### `Optional` belowId

• **belowId**? : *[Id](../README.md#id)* = DefaultProps.BELOW

___

### `Optional` bottomId

• **bottomId**? : *[Id](../README.md#id)* = DefaultProps.ALIGN_BOTTOM

___

###  centerH

• **centerH**: *boolean* = DefaultProps.CENTER_HORIZONTAL

___

###  centerV

• **centerV**: *boolean* = DefaultProps.CENTER_VERTICAL

___

###  dependenciesModified

• **dependenciesModified**: *boolean* = false

___

### `Optional` endId

• **endId**? : *[Id](../README.md#id)* = DefaultProps.ALIGN_END

___

###  h

• **h**: *[DimensionInput](../README.md#dimensioninput)* = DefaultProps.HEIGHT

___

###  hDimension

• **hDimension**: *[Dimension](../interfaces/dimension.md)* = parseDimension(DefaultProps.HEIGHT)

___

###  isAbsolute

• **isAbsolute**: *boolean* = DefaultProps.IS_ABSOLUTE

___

###  isAnimated

• **isAnimated**: *boolean* = DefaultProps.IS_ANIMATED

___

###  marginRect

• **marginRect**: *[Rect](rect.md)‹›* = DefaultProps.MARGIN

___

###  maxH

• **maxH**: *number* = DefaultProps.MAX_HEIGHT

___

###  maxW

• **maxW**: *number* = DefaultProps.MAX_WIDTH

___

###  minH

• **minH**: *number* = DefaultProps.MIN_HEIGHT

___

###  minW

• **minW**: *number* = DefaultProps.MIN_WIDTH

___

###  paddingRect

• **paddingRect**: *[Rect](rect.md)‹›* = DefaultProps.PADDING

___

### `Optional` startId

• **startId**? : *[Id](../README.md#id)* = DefaultProps.ALIGN_START

___

### `Optional` toEndOfId

• **toEndOfId**? : *[Id](../README.md#id)* = DefaultProps.TO_END_OF

___

### `Optional` toStartOfId

• **toStartOfId**? : *[Id](../README.md#id)* = DefaultProps.TO_START_OF

___

### `Optional` topId

• **topId**? : *[Id](../README.md#id)* = DefaultProps.ALIGN_TOP

___

###  w

• **w**: *[DimensionInput](../README.md#dimensioninput)* = DefaultProps.WIDTH

___

###  wDimension

• **wDimension**: *[Dimension](../interfaces/dimension.md)* = parseDimension(DefaultProps.WIDTH)

___

###  x

• **x**: *[DimensionInput](../README.md#dimensioninput)* = DefaultProps.X

___

###  xDimension

• **xDimension**: *[Dimension](../interfaces/dimension.md)* = parseDimension(DefaultProps.X)

___

###  y

• **y**: *[DimensionInput](../README.md#dimensioninput)* = DefaultProps.Y

___

###  yDimension

• **yDimension**: *[Dimension](../interfaces/dimension.md)* = parseDimension(DefaultProps.Y)

## Methods

###  above

▸ **above**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  absolute

▸ **absolute**(`absolute?`: undefined | false | true): *this*

**Parameters:**

Name | Type |
------ | ------ |
`absolute?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  alignBottom

▸ **alignBottom**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  alignEnd

▸ **alignEnd**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  alignParentBottom

▸ **alignParentBottom**(): *this*

**Returns:** *this*

___

###  alignParentEnd

▸ **alignParentEnd**(): *this*

**Returns:** *this*

___

###  alignParentStart

▸ **alignParentStart**(): *this*

**Returns:** *this*

___

###  alignParentTop

▸ **alignParentTop**(): *this*

**Returns:** *this*

___

###  alignStart

▸ **alignStart**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  alignTop

▸ **alignTop**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  animate

▸ **animate**(`animate?`: undefined | false | true): *this*

**Parameters:**

Name | Type |
------ | ------ |
`animate?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  asProps

▸ **asProps**(): *[LayoutProps](../interfaces/layoutprops.md)*

**Returns:** *[LayoutProps](../interfaces/layoutprops.md)*

___

###  below

▸ **below**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  center

▸ **center**(`center?`: undefined | false | true): *this*

**Parameters:**

Name | Type |
------ | ------ |
`center?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  centerHorizontal

▸ **centerHorizontal**(`center?`: undefined | false | true): *this*

**Parameters:**

Name | Type |
------ | ------ |
`center?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  centerVertical

▸ **centerVertical**(`center?`: undefined | false | true): *this*

**Parameters:**

Name | Type |
------ | ------ |
`center?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  height

▸ **height**(`height`: [DimensionInput](../README.md#dimensioninput)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`height` | [DimensionInput](../README.md#dimensioninput) |

**Returns:** *this*

___

###  margin

▸ **margin**(`margin?`: [RectLike](../README.md#rectlike)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`margin?` | [RectLike](../README.md#rectlike) |

**Returns:** *this*

___

###  maxHeight

▸ **maxHeight**(`maxHeight`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`maxHeight` | number |

**Returns:** *this*

___

###  maxWidth

▸ **maxWidth**(`maxWidth`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`maxWidth` | number |

**Returns:** *this*

___

###  minHeight

▸ **minHeight**(`minHeight`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`minHeight` | number |

**Returns:** *this*

___

###  minWidth

▸ **minWidth**(`minWidth`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`minWidth` | number |

**Returns:** *this*

___

###  padding

▸ **padding**(`padding?`: [RectLike](../README.md#rectlike)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`padding?` | [RectLike](../README.md#rectlike) |

**Returns:** *this*

___

###  posX

▸ **posX**(`x`: [DimensionInput](../README.md#dimensioninput)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`x` | [DimensionInput](../README.md#dimensioninput) |

**Returns:** *this*

___

###  posY

▸ **posY**(`y`: [DimensionInput](../README.md#dimensioninput)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`y` | [DimensionInput](../README.md#dimensioninput) |

**Returns:** *this*

___

###  toEndOf

▸ **toEndOf**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  toLeftOf

▸ **toLeftOf**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  toRightOf

▸ **toRightOf**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  toStartOf

▸ **toStartOf**(`id?`: [Id](../README.md#id)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | [Id](../README.md#id) |

**Returns:** *this*

___

###  updateWithProps

▸ **updateWithProps**(`__namedParameters`: object): *boolean*

**Parameters:**

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default |
------ | ------ | ------ |
`above` | undefined &#124; string &#124; number | DefaultProps.ABOVE |
`alignBottom` | undefined &#124; string &#124; number | DefaultProps.ALIGN_BOTTOM |
`alignEnd` | undefined &#124; string &#124; number | DefaultProps.ALIGN_END |
`alignStart` | undefined &#124; string &#124; number | DefaultProps.ALIGN_START |
`alignTop` | undefined &#124; string &#124; number | DefaultProps.ALIGN_TOP |
`below` | undefined &#124; string &#124; number | DefaultProps.BELOW |
`centerHorizontal` | boolean | DefaultProps.CENTER_HORIZONTAL |
`centerVertical` | boolean | DefaultProps.CENTER_VERTICAL |
`height` | null &#124; string &#124; number | DefaultProps.HEIGHT |
`isAbsolute` | boolean | DefaultProps.IS_ABSOLUTE |
`isAnimated` | boolean | DefaultProps.IS_ANIMATED |
`margin` | number &#124; [Rect](rect.md)‹› &#124; [RectObjectInput](../interfaces/rectobjectinput.md) | DefaultProps.MARGIN |
`maxHeight` | number | DefaultProps.MAX_HEIGHT |
`maxWidth` | number | DefaultProps.MAX_WIDTH |
`minHeight` | number | DefaultProps.MIN_HEIGHT |
`minWidth` | number | DefaultProps.MIN_WIDTH |
`padding` | number &#124; [Rect](rect.md)‹› &#124; [RectObjectInput](../interfaces/rectobjectinput.md) | DefaultProps.PADDING |
`posX` | null &#124; string &#124; number | DefaultProps.X |
`posY` | null &#124; string &#124; number | DefaultProps.Y |
`toEndOf` | undefined &#124; string &#124; number | DefaultProps.TO_END_OF |
`toStartOf` | undefined &#124; string &#124; number | DefaultProps.TO_START_OF |
`width` | null &#124; string &#124; number | DefaultProps.WIDTH |

**Returns:** *boolean*

___

###  width

▸ **width**(`width`: [DimensionInput](../README.md#dimensioninput)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`width` | [DimensionInput](../README.md#dimensioninput) |

**Returns:** *this*
