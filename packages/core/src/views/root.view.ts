import { Canvas, ViewCanvas } from '../canvas';
import { offsetPointerPosition } from '../utils/pointer-event.util';
import { Context, RequiredViewChanges, View } from '../view';
import {
  CanvasPointer,
  CanvasPointerEvent,
  domEventToPointerAction,
  MouseButton,
  PointerAction,
  supportedDomPointerEvents,
} from '../view/pointer-event';

const isBrowser = typeof window !== 'undefined' && window.requestAnimationFrame;

export class RootCanvasView extends View {
  private shouldRun: boolean = true;
  private readonly canvas: ViewCanvas;
  private dpr: number = 1;
  private isRequired: boolean = true;
  private clearPointerEvents?: () => void;

  constructor(context: Context, canvas: Canvas) {
    super(context, 'RootCanvasView');
    this.canvas = new ViewCanvas(canvas);

    const { width, height } = this.canvas.context.canvas;
    this.rect.r = this.lp.w = width;
    this.rect.b = this.lp.h = height;
  }

  setupPointerEvents() {
    const canvas = this.canvas.context.canvas;
    if (!canvas || !canvas.addEventListener) {
      throw new Error('Can\'t setup event listeners.');
    }
    const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => (event as any).touches;
    const pointerEvent = new CanvasPointerEvent(this, PointerAction.START, []);

    const dispatchPointerEvent = (event: MouseEvent | TouchEvent) => {
      const element = event.target as HTMLElement;
      const action = domEventToPointerAction(event.type);
      if (action === undefined) {
        return;
      }
      if (isTouchEvent(event)) {
        const pointers: CanvasPointer[] = new Array(event.touches.length);
        for (let i = 0; i < pointers.length; i++) {
          const touch = event.touches[i];
          pointers[i] = {
            mouseButton: MouseButton.LEFT,
            pressure: touch.force,
            x: touch.pageX,
            y: touch.pageY,
          };
          offsetPointerPosition(pointers[i], element);
        }
        pointerEvent.setEventValues(this, action, pointers);
      } else {
        const pointer = {
          mouseButton: event.button,
          pressure: event.buttons ? 0.5 : 0,
          x: event.pageX,
          y: event.pageY,
        };
        offsetPointerPosition(pointer, element);
        pointerEvent.setEventValues(this, action, [pointer]);
      }
      this.dispatchPointerEvent(pointerEvent);
      return true;
    };
    for (const eventType of supportedDomPointerEvents) {
      canvas.addEventListener(eventType, dispatchPointerEvent);
    }
    this.clearPointerEvents = () => {
      for (const eventType of supportedDomPointerEvents) {
        canvas.removeEventListener(eventType, dispatchPointerEvent);
      }
    };
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
    this.rect.r = this.lp.w = width;
    this.rect.b = this.lp.h = height;
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
    if (isBrowser) {
      requestAnimationFrame(this.run);
    }

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
      requestAnimationFrame(this.run);
    }
  }

  onSnapshot() {
    return {
      canvas: this.canvas,
      dpr: this.dpr,
    };
  }
}
