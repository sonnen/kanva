import { Context, LayoutProps, View, ViewProps } from '@kanva/core';
import * as React from 'react';

export interface InternalProps {
  context: Context;
  parent: View;
  position: number;
}

const getAllGettersAndSetters = (obj: object) => {
  let props: string[] = [];
  let o = obj;

  do {
    props = props.concat(Object.getOwnPropertyNames(o));
  } while (o = Object.getPrototypeOf(o));

  return props
    .filter(name => (
      name.length > 3 &&
      name.startsWith('set')
    ))
    .map(name => ({
      name: name.replace('set', ''),
      set: obj[name],
      get: obj[name.replace('set', 'get')],
    }))
    .filter(p => typeof p.get === 'function' && typeof p.set === 'function');
};

export const createReactView = <Props extends {}>(viewClass: (new (...args: any[]) => View<Props>)) => {
  type ReactViewProps = Partial<ViewProps & Props>;
  return class ReactViewComponent extends React.PureComponent<ReactViewProps> {
    static displayName: string = viewClass.name;
    view?: View;
    readonly propNames: string[] = [];
    readonly propHandlers: Record<string, { set: (value: any) => void, get: () => any }> = {};
    layoutParams?: LayoutProps;

    constructor(props: ReactViewProps, context?: any) {
      super(props, context);
    }

    get internalProps() {
      return this.props as any as InternalProps;
    }

    get isDebugEnabled(): boolean {
      return !!this.view && this.view.context.debugEnabled;
    }

    createAndAttachView() {
      const view = this.view = new viewClass(this.internalProps.context);
      const gettersAndSetters = getAllGettersAndSetters(view);

      for (const { name, get, set } of gettersAndSetters) {
        const propName = name[0].toLowerCase() + name.substr(1);
        this.propHandlers[propName] = { get, set };
        this.propNames.push(propName);
      }

      this.layoutParams = view.getLayoutParams().asProps();
      this.propHandlers.layoutParams = {
        get: () => this.layoutParams,
        set: (layoutParams: LayoutProps) => {
          this.layoutParams = layoutParams;
          const lp = view.getLayoutParams();
          if (lp.updateWithProps(layoutParams)) {
            view.setLayoutParams(lp);
          }
        },
      };
      const viewRef = this.props.viewRef;
      if (viewRef) {
        viewRef(view);
      }
    }

    refreshProps() {
      const { parent, position } = this.internalProps;
      const { propNames, propHandlers, view } = this;
      if (!view) {
        return;
      }
      if (parent && !view.hasParent()) {
        parent.setChildAt(view, position);
      }
      for (let i = 0, l = propNames.length; i < l; i++) {
        const propName = propNames[i];
        const handler = propHandlers[propName];
        const propValue = this.props[propName];
        if (propValue !== handler.get.call(view)) {
          handler.set.call(view, propValue);
        }
      }
      if (this.isDebugEnabled) {
        console.log(view.snapshot());
      }
    }

    componentDidMount() {
      this.createAndAttachView();
      this.refreshProps();
    }

    componentDidUpdate() {
      this.refreshProps();
    }

    componentWillUnmount() {
      const { parent } = this.internalProps;
      if (!this.view) {
        return;
      }
      if (this.view.hasParent()) {
        return parent.removeChild(this.view);
      }
      this.view.destroy();
      this.view = undefined;
    }

    assignParentProperties = (child: React.ReactChild, position: number) => typeof child === 'object'
      ? React.cloneElement(child, { position, parent: this.view, context: this.internalProps.context })
      : null;

    render() {
      return (
        <>
          {React.Children.map(this.props.children || [], this.assignParentProperties)}
        </>
      );
    }
  };
};
