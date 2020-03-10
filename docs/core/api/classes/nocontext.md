# Class: NoContext

## Hierarchy

* **NoContext**

## Implements

* [ContextLike](../interfaces/contextlike.md)

## Index

### Methods

* [deregisterView](nocontext.md#deregisterview)
* [getId](nocontext.md#getid)
* [registerView](nocontext.md#registerview)
* [resolve](nocontext.md#resolve)

## Methods

###  deregisterView

▸ **deregisterView**(`_id`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_id` | number |

**Returns:** *void*

___

###  getId

▸ **getId**(`_id`: string | number): *string | number*

**Parameters:**

Name | Type |
------ | ------ |
`_id` | string &#124; number |

**Returns:** *string | number*

___

###  registerView

▸ **registerView**(`_idName`: string): *number*

*Implementation of [ContextLike](../interfaces/contextlike.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_idName` | string |

**Returns:** *number*

___

###  resolve

▸ **resolve**(`_id`: string | number | undefined): *number | undefined*

*Implementation of [ContextLike](../interfaces/contextlike.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_id` | string &#124; number &#124; undefined |

**Returns:** *number | undefined*
