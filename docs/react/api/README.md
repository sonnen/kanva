# @kanva/react

## Index

### Classes

* [Kanva](classes/kanva.md)

### Interfaces

* [ContextObject](interfaces/contextobject.md)
* [InternalProps](interfaces/internalprops.md)
* [Props](interfaces/props.md)
* [State](interfaces/state.md)

### Variables

* [ImageView](README.md#const-imageview)
* [KanvaContext](README.md#const-kanvacontext)
* [TextView](README.md#const-textview)
* [View](README.md#const-view)

### Functions

* [createReactView](README.md#const-createreactview)
* [getAllGettersAndSetters](README.md#const-getallgettersandsetters)

## Variables

### `Const` ImageView

• **ImageView**: *ReactViewComponent* = createReactView<ImageViewProps>(KanvaImageView)

___

### `Const` KanvaContext

• **KanvaContext**: *Context‹[ContextObject](interfaces/contextobject.md)›* = React.createContext<ContextObject>({
  ctx: new NoContext(),
  parent: undefined as any,
})

___

### `Const` TextView

• **TextView**: *ReactViewComponent* = createReactView<TextViewProps>(KanvaTextView)

___

### `Const` View

• **View**: *ReactViewComponent* = createReactView(KanvaView)

## Functions

### `Const` createReactView

▸ **createReactView**‹**Props**›(`viewClass`: object): *ReactViewComponent*

**Type parameters:**

▪ **Props**: *object*

**Parameters:**

Name | Type |
------ | ------ |
`viewClass` | object |

**Returns:** *ReactViewComponent*

___

### `Const` getAllGettersAndSetters

▸ **getAllGettersAndSetters**(`obj`: object): *object[]*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object[]*
