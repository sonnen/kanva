import { Context, View, ViewProps } from '@kanva/core';
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
  return class ReactViewComponent extends React.Component<ReactViewProps> {
    static displayName: string;
    readonly view: View;
    readonly propNames: string[] = [];
    readonly propHandlers: Record<string, { set: (value: any) => void, get: () => any }> = {};

    constructor(props: ReactViewProps, context?: any) {
      super(props, context);
      const view = this.view = new viewClass(this.internalProps.context);
      ReactViewComponent.displayName = view.name;
      const gettersAndSetters = getAllGettersAndSetters(view);

      for (const { name, get, set } of gettersAndSetters) {
        const propName = name[0].toLowerCase() + name.substr(1);
        this.propHandlers[propName] = { get, set };
        this.propNames.push(propName);
      }
    }

    get internalProps() {
      return this.props as any as InternalProps;
    }

    refreshProps() {
      const { parent, position } = this.internalProps;
      const { propNames, propHandlers, view } = this;
      if (parent && !view.hasParent()) {
        parent.setChildAt(view, position);
      }
      for (let i = 0, l = propNames.length; i < l; i++) {
        const propName = propNames[i];
        const handler = propHandlers[propName];
        const propValue = this.props[propName];
        if (propValue !== undefined && propValue !== handler.get.call(view)) {
          handler.set.call(view, propValue);
        }
      }
      console.log(view.snapshot());
    }

    componentDidMount() {
      this.refreshProps();
    }

    componentDidUpdate() {
      this.refreshProps();
    }

    componentWillUnmount() {
      const { parent } = this.internalProps;
      if (!parent) {
        return;
      }
      parent.removeChild(this.view);
      this.view.destroy();
    }

    assignParentProperties = (child: React.ReactChild, position: number) => typeof child === 'object'
      ? React.cloneElement(child, { position, parent: this.view, context: this.internalProps.context })
      : null;

    render() {
      return React.Children.map(this.props.children || [], this.assignParentProperties) || null;
    }
  };
};
