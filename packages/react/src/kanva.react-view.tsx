import { Context, RequiredViewChanges, RootCanvasView, ViewProps } from '@kanva/core';
import * as React from 'react';
import { CSSProperties } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { KanvaContext } from './kanva-context';

interface Props {
  className?: string;
  style?: CSSProperties;
  imageClass?: (new () => HTMLImageElement);
  children?: React.ReactElement<ViewProps> | React.ReactElement<ViewProps>[];
  enablePointerEvents?: boolean;
  debug?: boolean;
  canvasRef?: (instance: HTMLCanvasElement | null) => void;
}

interface State {
  view?: RootCanvasView;
}

export class Kanva extends React.PureComponent<Props, State> {
  readonly state: State = {};
  private readonly ctx: Context;
  private htmlDivElement: HTMLDivElement | null = null;
  private htmlCanvasElement: HTMLCanvasElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(props: Props) {
    super(props);
    this.ctx = new Context(props.imageClass);
  }

  componentDidMount() {
    const { enablePointerEvents } = this.props;
    const { view } = this.state;
    if (!view && this.htmlCanvasElement && this.htmlDivElement) {
      const view = new RootCanvasView(this.ctx, this.htmlCanvasElement);
      this.setState({ view });
      if (enablePointerEvents) {
        view.setupPointerEvents();
      }
      requestAnimationFrame(view.run);
      this.resizeObserver = new ResizeObserver(() => {
        view.require(RequiredViewChanges.MEASURE);
      });
      this.resizeObserver.observe(this.htmlDivElement);
    }
  }

  componentDidUpdate() {
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

  setDivElement = (ref: HTMLDivElement) => this.htmlDivElement = ref;

  render() {
    const { className, children, canvasRef } = this.props;
    const { view } = this.state;
    return (
      <div
        ref={this.setDivElement}
        style={{ position: 'relative' }}
        className={className}
      >
        <canvas
          style={{ position: 'absolute', left: 0, top: 0 }}
          ref={ref => {
            this.htmlCanvasElement = ref;
            if (canvasRef) {
              canvasRef(ref);
            }
          }}
        >
          <KanvaContext.Provider value={{
            ctx: this.ctx,
            parent: view!,
          }}>
            {children}
          </KanvaContext.Provider>
        </canvas>
      </div>
    );
  }
}
