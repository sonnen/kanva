import { Canvas, ViewCanvas } from '../canvas';
import { createEventDispatcher, registerEventDispatcher } from '../pointer-event';
import { Context, RequiredViewChanges, View } from '../view';

const isBrowser = typeof window !== 'undefined' && window.requestAnimationFrame;

export class RootCanvasView extends View {
  private shouldRun = true;
  private readonly canvas: ViewCanvas;
  private dpr = 1;
  private isRequired = true;
  private clearPointerEvents?: () => void;

  constructor(context: Context, canvas: Canvas) {
    super(context, 'RootCanvasView');
    this.canvas = new ViewCanvas(canvas);

    const { width, height } = this.canvas.context.canvas;
    this.rect.r = width;
    this.rect.b = height;
    this.lp.width(width).height(height);
  }

  getCanvas() {
    return this.canvas.context.canvas;
  }

  getScale() {
    return this.dpr;
  }

  setupPointerEvents() {
    const canvas = this.canvas.context.canvas;
    if (!canvas || !canvas.addEventListener) {
      throw new Error('Can\'t setup event listeners in canvas element.');
    }

    const dispatcher = createEventDispatcher(this);
    this.clearPointerEvents = registerEventDispatcher(canvas, dispatcher);
  }

  onSizeChanged() {
    if (!this.canvas) {
      throw new Error('Called onSizeChanged after RootView got detached from canvas.');
    }

    const ctx = this.canvas.context;
    const canvas = ctx.canvas;
    const parent = canvas.parentElement;

    if (!isBrowser || !canvas.style || !parent) {
      // In Node environment we have canvas of constant size
      return;
    }

    const dpr = window && window.devicePixelRatio || 1;
    const { width, height } = parent.getBoundingClientRect();

    if (this.rect.r === width && this.rect.b === height && this.dpr === dpr) {
      return;
    }

    this.dpr = dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    this.rect.r = width;
    this.rect.b = height;
    this.lp.width(width).height(height);
    this.require(RequiredViewChanges.MEASURE);
  }

  onDestroy() {
    if (this.clearPointerEvents) {
      this.clearPointerEvents();
    }
    this.shouldRun = false;
  }

  run = () => {
    if (!this.shouldRun) {
      return;
    }
    this.isRequired = false;

    this.onSizeChanged();
    this.measure(this.canvas);
    this.layout();
    this.draw(this.canvas);
  };

  setDebugEnabled(enabled: boolean) {
    if (this.canvas) {
      this.context.debugEnabled = enabled;
    }
  }

  draw(canvas: ViewCanvas) {
    const { width, height } = this;
    if (!this.requireGuard(RequiredViewChanges.DRAW)) {
      return;
    }
    canvas.context.clearRect(0, 0, width, height);
    super.draw(canvas);
  }

  require(requiredChanges: RequiredViewChanges) {
    super.require(requiredChanges);
    if (this.isRequired) {
      return;
    }
    this.isRequired = true;
    if (isBrowser) {
      setImmediate(() => requestAnimationFrame(this.run));
    }
  }

  onSnapshot() {
    return {
      dpr: this.dpr,
    };
  }
}
