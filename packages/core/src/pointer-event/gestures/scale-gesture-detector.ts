import { CanvasPointerEvent, PointerAction } from '../canvas-pointer-event';
import { GestureDetector } from './gesture-detector';

const WHEEL_SCROLL_SPAN = 100;

export interface ScaleGestureProps {
  centerX: number;
  centerY: number;
  span: number;
  spanX: number;
  spanY: number;
}

export interface ScaleEvent {
  pointerEvent: CanvasPointerEvent;
  current: ScaleGestureProps;
  previous: ScaleGestureProps;
  scaleFactor: number;
  scaleFactorX: number;
  scaleFactorY: number;
}

export interface ScaleGestureDetectorOptions {
  onScale: OnScaleListener;
  multitouch?: boolean;
  scroll?: boolean;
}

export type OnScaleListener = (scaleEvent: ScaleEvent) => boolean;

export class ScaleGestureDetector extends GestureDetector {
  private previous?: ScaleGestureProps;

  constructor(private options: ScaleGestureDetectorOptions) {
    super();
  }

  onGestureEvent(event: CanvasPointerEvent, previousEvent: CanvasPointerEvent): boolean {
    return (
      (!!this.options.scroll && this.handleWheelGesture(event)) ||
      (!!this.options.multitouch && this.handleMultitouchGesture(event))
    );
  }

  private handleWheelGesture(pointerEvent: CanvasPointerEvent) {
    if (pointerEvent.action !== PointerAction.SCROLL) {
      return false;
    }
    if (!this.previous) {
      this.previous = {
        centerX: pointerEvent.primaryPointer.x,
        centerY: pointerEvent.primaryPointer.y,
        spanX: WHEEL_SCROLL_SPAN,
        spanY: WHEEL_SCROLL_SPAN,
        span: Math.sqrt(2 * WHEEL_SCROLL_SPAN * WHEEL_SCROLL_SPAN),
      };
    }
    const previous = this.previous;

    const spanX = previous.spanX - pointerEvent.scrollY;
    const spanY = previous.spanY - pointerEvent.scrollX;
    const span = Math.sqrt(spanX * spanX + spanY * spanY);
    const current: ScaleGestureProps = {
      centerX: pointerEvent.primaryPointer.x,
      centerY: pointerEvent.primaryPointer.y,
      span,
      spanX,
      spanY,
    };

    const result = this.options.onScale({
      pointerEvent,
      current,
      previous,
      scaleFactor: current.span / previous.span,
      scaleFactorX: current.spanX / previous.spanX,
      scaleFactorY: current.spanY / previous.spanY,
    });
    this.previous = current;
    return result;
  }

  private handleMultitouchGesture(pointerEvent: CanvasPointerEvent): boolean {
    if (pointerEvent.pointerCount !== 2) {
      this.previous = undefined;
      return false;
    }
    const x = pointerEvent.pointers[1].x - pointerEvent.pointers[0].x;
    const y = pointerEvent.pointers[1].y - pointerEvent.pointers[0].y;
    const current = {
      spanX: Math.abs(x),
      spanY: Math.abs(y),
      span: Math.sqrt(x * x + y * y),
      centerX: (pointerEvent.pointers[0].x + pointerEvent.pointers[1].x) / 2,
      centerY: (pointerEvent.pointers[0].y + pointerEvent.pointers[1].y) / 2,
    };

    if (!this.previous) {
      this.previous = current;
    }

    const previous = this.previous;

    const result = this.options.onScale({
      pointerEvent,
      current,
      previous,
      scaleFactor: current.span / previous.span,
      scaleFactorX: current.spanX / previous.spanX,
      scaleFactorY: current.spanY / previous.spanY,
    });
    this.previous = current;
    return result;
  }

}
