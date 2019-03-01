import { Canvas, Context, RequiredViewChanges, RootCanvasView, ViewProps } from '@kanva/core';
import * as React from 'react';
import { CSSProperties } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactElement<ViewProps> | React.ReactElement<ViewProps>[];
  enablePointerEvents?: boolean;
  debug?: boolean;
}

interface State {
  view?: RootCanvasView;
}

export class Kanva extends React.PureComponent<Props, State> {
  readonly state: State = {};
  private ctx: Context = new Context();
  private htmlDivElement: HTMLDivElement | null = null;
  private htmlCanvasElement: Canvas | null = null;
  private resizeObserver: ResizeObserver | null = null;

  componentDidMount() {
    const { enablePointerEvents } = this.props;
    const { view } = this.state;
    if (!view && this.htmlCanvasElement && this.htmlDivElement) {
      const view = new RootCanvasView(this.ctx, this.htmlCanvasElement);
      this.setState({ view });
      if (enablePointerEvents) {
        view.setupPointerEvents();
      }
      view.run();
      this.resizeObserver = new ResizeObserver(() => {
        view.require(RequiredViewChanges.MEASURE);
      });
      this.resizeObserver.observe(this.htmlDivElement);
    }
  }

  componentDidUpdate(oldProps: Props) {
    const { view } = this.state;
    if (!view) {
      return;
    }

    const { debug } = this.props;
    view.setDebugEnabled(debug || false);
  }

  componentWillUnmount() {
    const { view } = this.state;
    if (view) {
      view.destroy();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  assignParentProperties = (child: React.ReactChild, position: number) => {
    return typeof child === 'object'
      ? React.cloneElement(child, { position, parent: this.state.view, context: this.ctx })
      : null;
  };

  setDivElement = (ref: HTMLDivElement) => this.htmlDivElement = ref;

  render() {
    const { view } = this.state;
    const { className, children } = this.props;
    return (
      <div
        ref={this.setDivElement}
        style={{ position: 'relative' }}
        className={className}
      >
        <canvas
          style={{ position: 'absolute', left: 0, top: 0 }}
          ref={ref => this.htmlCanvasElement = ref}
        >
          {React.Children.map(children || [], this.assignParentProperties)}
        </canvas>
      </div>
    );
  }
}
