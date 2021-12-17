# Class: Kanva

## Hierarchy

* PureComponent‹[Props](../interfaces/props.md), [State](../interfaces/state.md)›

  ↳ **Kanva**

## Index

### Constructors

* [constructor](kanva.md#constructor)

### Properties

* [state](kanva.md#readonly-state)

### Methods

* [UNSAFE_componentWillMount](kanva.md#optional-unsafe_componentwillmount)
* [UNSAFE_componentWillReceiveProps](kanva.md#optional-unsafe_componentwillreceiveprops)
* [UNSAFE_componentWillUpdate](kanva.md#optional-unsafe_componentwillupdate)
* [componentDidCatch](kanva.md#optional-componentdidcatch)
* [componentDidMount](kanva.md#componentdidmount)
* [componentDidUpdate](kanva.md#componentdidupdate)
* [componentWillMount](kanva.md#optional-componentwillmount)
* [componentWillReceiveProps](kanva.md#optional-componentwillreceiveprops)
* [componentWillUnmount](kanva.md#componentwillunmount)
* [componentWillUpdate](kanva.md#optional-componentwillupdate)
* [getSnapshotBeforeUpdate](kanva.md#optional-getsnapshotbeforeupdate)
* [render](kanva.md#render)
* [setDivElement](kanva.md#setdivelement)
* [shouldComponentUpdate](kanva.md#optional-shouldcomponentupdate)

## Constructors

###  constructor

\+ **new Kanva**(`props`: [Props](../interfaces/props.md)): *[Kanva](kanva.md)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [Props](../interfaces/props.md) |

**Returns:** *[Kanva](kanva.md)*

## Properties

### `Readonly` state

• **state**: *[State](../interfaces/state.md)*

## Methods

### `Optional` UNSAFE_componentWillMount

▸ **UNSAFE_componentWillMount**(): *void*

*Inherited from [Kanva](kanva.md).[UNSAFE_componentWillMount](kanva.md#optional-unsafe_componentwillmount)*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

___

### `Optional` UNSAFE_componentWillReceiveProps

▸ **UNSAFE_componentWillReceiveProps**(`nextProps`: Readonly‹[Props](../interfaces/props.md)›, `nextContext`: any): *void*

*Inherited from [Kanva](kanva.md).[UNSAFE_componentWillReceiveProps](kanva.md#optional-unsafe_componentwillreceiveprops)*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../interfaces/props.md)› |
`nextContext` | any |

**Returns:** *void*

___

### `Optional` UNSAFE_componentWillUpdate

▸ **UNSAFE_componentWillUpdate**(`nextProps`: Readonly‹[Props](../interfaces/props.md)›, `nextState`: Readonly‹[State](../interfaces/state.md)›, `nextContext`: any): *void*

*Inherited from [Kanva](kanva.md).[UNSAFE_componentWillUpdate](kanva.md#optional-unsafe_componentwillupdate)*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../interfaces/props.md)› |
`nextState` | Readonly‹[State](../interfaces/state.md)› |
`nextContext` | any |

**Returns:** *void*

___

### `Optional` componentDidCatch

▸ **componentDidCatch**(`error`: Error, `errorInfo`: ErrorInfo): *void*

*Inherited from [Kanva](kanva.md).[componentDidCatch](kanva.md#optional-componentdidcatch)*

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

**Parameters:**

Name | Type |
------ | ------ |
`error` | Error |
`errorInfo` | ErrorInfo |

**Returns:** *void*

___

###  componentDidMount

▸ **componentDidMount**(): *void*

*Overrides void*

**Returns:** *void*

___

###  componentDidUpdate

▸ **componentDidUpdate**(): *void*

*Overrides void*

**Returns:** *void*

___

### `Optional` componentWillMount

▸ **componentWillMount**(): *void*

*Inherited from [Kanva](kanva.md).[componentWillMount](kanva.md#optional-componentwillmount)*

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Returns:** *void*

___

### `Optional` componentWillReceiveProps

▸ **componentWillReceiveProps**(`nextProps`: Readonly‹[Props](../interfaces/props.md)›, `nextContext`: any): *void*

*Inherited from [Kanva](kanva.md).[componentWillReceiveProps](kanva.md#optional-componentwillreceiveprops)*

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../interfaces/props.md)› |
`nextContext` | any |

**Returns:** *void*

___

###  componentWillUnmount

▸ **componentWillUnmount**(): *void*

*Overrides void*

**Returns:** *void*

___

### `Optional` componentWillUpdate

▸ **componentWillUpdate**(`nextProps`: Readonly‹[Props](../interfaces/props.md)›, `nextState`: Readonly‹[State](../interfaces/state.md)›, `nextContext`: any): *void*

*Inherited from [Kanva](kanva.md).[componentWillUpdate](kanva.md#optional-componentwillupdate)*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../interfaces/props.md)› |
`nextState` | Readonly‹[State](../interfaces/state.md)› |
`nextContext` | any |

**Returns:** *void*

___

### `Optional` getSnapshotBeforeUpdate

▸ **getSnapshotBeforeUpdate**(`prevProps`: Readonly‹[Props](../interfaces/props.md)›, `prevState`: Readonly‹[State](../interfaces/state.md)›): *any | null*

*Inherited from [Kanva](kanva.md).[getSnapshotBeforeUpdate](kanva.md#optional-getsnapshotbeforeupdate)*

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

**Parameters:**

Name | Type |
------ | ------ |
`prevProps` | Readonly‹[Props](../interfaces/props.md)› |
`prevState` | Readonly‹[State](../interfaces/state.md)› |

**Returns:** *any | null*

___

###  render

▸ **render**(): *Element‹›*

**Returns:** *Element‹›*

___

###  setDivElement

▸ **setDivElement**(`ref`: HTMLDivElement): *HTMLDivElement*

**Parameters:**

Name | Type |
------ | ------ |
`ref` | HTMLDivElement |

**Returns:** *HTMLDivElement*

___

### `Optional` shouldComponentUpdate

▸ **shouldComponentUpdate**(`nextProps`: Readonly‹[Props](../interfaces/props.md)›, `nextState`: Readonly‹[State](../interfaces/state.md)›, `nextContext`: any): *boolean*

*Inherited from [Kanva](kanva.md).[shouldComponentUpdate](kanva.md#optional-shouldcomponentupdate)*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

**Parameters:**

Name | Type |
------ | ------ |
`nextProps` | Readonly‹[Props](../interfaces/props.md)› |
`nextState` | Readonly‹[State](../interfaces/state.md)› |
`nextContext` | any |

**Returns:** *boolean*
