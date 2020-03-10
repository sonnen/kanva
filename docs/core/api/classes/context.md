# Class: Context

## Hierarchy

* **Context**

## Implements

* [ContextLike](../interfaces/contextlike.md)

## Index

### Constructors

* [constructor](context.md#constructor)

### Properties

* [canvasCreator](context.md#canvascreator)
* [debugEnabled](context.md#debugenabled)
* [imageClass](context.md#imageclass)

### Methods

* [deregisterView](context.md#deregisterview)
* [getId](context.md#getid)
* [registerView](context.md#registerview)
* [resolve](context.md#resolve)

## Constructors

###  constructor

\+ **new Context**(`options`: [ContextOptions](../interfaces/contextoptions.md)): *[Context](context.md)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | [ContextOptions](../interfaces/contextoptions.md) | {} |

**Returns:** *[Context](context.md)*

## Properties

###  canvasCreator

• **canvasCreator**: *[CanvasCreator](../README.md#canvascreator)*

___

###  debugEnabled

• **debugEnabled**: *boolean* = false

___

###  imageClass

• **imageClass**: *[ImageClass](../README.md#imageclass)*

## Methods

###  deregisterView

▸ **deregisterView**(`id`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *void*

___

###  getId

▸ **getId**(`id`: string | number | undefined): *undefined | string | number*

*Implementation of [ContextLike](../interfaces/contextlike.md)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string &#124; number &#124; undefined |

**Returns:** *undefined | string | number*

___

###  registerView

▸ **registerView**(`idName`: string): *number*

*Implementation of [ContextLike](../interfaces/contextlike.md)*

**Parameters:**

Name | Type |
------ | ------ |
`idName` | string |

**Returns:** *number*

___

###  resolve

▸ **resolve**(`id`: string | number | undefined): *number | undefined*

*Implementation of [ContextLike](../interfaces/contextlike.md)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string &#124; number &#124; undefined |

**Returns:** *number | undefined*
