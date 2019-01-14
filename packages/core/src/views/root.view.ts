import { Canvas, ViewCanvas } from '../canvas';
import { Context, RequiredViewChanges, View } from '../view';

export class RootCanvasView extends View {
  private shouldRun: boolean = true;
  private readonly canvas: ViewCanvas;
  private dpr: number = 1;
  private isRequired: boolean = true;

  constructor(canvas: Canvas, context: Context) {
    super('RootCanvasView', context);
    this.canvas = new ViewCanvas(canvas);
  }

  onSizeChanged() {
    if (!this.canvas) {
      throw new Error('Called onSizeChanged after RootView got detached from canvas.');
    }

    const ctx = this.canvas.context;
    const canvas = ctx.canvas;
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;

    const { width, height } = (parent || canvas).getBoundingClientRect();

    if (this.rect.r === width && this.rect.b === height && this.dpr === dpr) {
      return;
    }

    this.dpr = dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    this.rect.r = this.lp.w = width;
    this.rect.b = this.lp.h = height;
    this.require(RequiredViewChanges.MEASURE);
  }

  onDestroy() {
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
      this.canvas.debug(enabled);
    }
  }

  require(requiredChanges: RequiredViewChanges) {
    super.require(requiredChanges);
    if (this.isRequired) {
      return;
    }
    requestAnimationFrame(this.run);
  }

  onSnapshot() {
    return {
      canvas: this.canvas,
      dpr: this.dpr,
    };
  }
}
