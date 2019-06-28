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

  onGestureEvent(event: CanvasPointerEvent): boolean {
    return (
      (!!this.options.scroll && this.handleWheelGesture(event)) ||
      (!!this.options.multitouch && this.handleMultitouchGesture(event))
    );
  }

  private handleWheelGesture(pointerEvent: CanvasPointerEvent) {
    if (pointerEvent.action !== PointerAction.SCROLL) {
      return false;
    }
    const { x: centerX, y: centerY } = pointerEvent.primaryPointer;
    const previous = {
      centerX,
      centerY,
      spanX: WHEEL_SCROLL_SPAN,
      spanY: WHEEL_SCROLL_SPAN,
      span: Math.sqrt(2 * WHEEL_SCROLL_SPAN * WHEEL_SCROLL_SPAN),
    };

    const spanX = previous.spanX - pointerEvent.scrollY;
    const spanY = previous.spanY - pointerEvent.scrollX;
    const span = Math.sqrt(spanX * spanX + spanY * spanY);
    const current: ScaleGestureProps = {
      centerX,
      centerY,
      span,
      spanX,
      spanY,
    };

    return this.options.onScale({
      pointerEvent,
      current,
      previous,
      scaleFactor: previous.span ? current.span / previous.span : 1,
      scaleFactorX: previous.spanX ? current.spanX / previous.spanX : 1,
      scaleFactorY: previous.spanY ? current.spanY / previous.spanY : 1,
    });
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
      scaleFactor: previous.span ? current.span / previous.span : 1,
      scaleFactorX: previous.spanX ? current.spanX / previous.spanX : 1,
      scaleFactorY: previous.spanY ? current.spanY / previous.spanY : 1,
    });
    this.previous = current;
    return result;
  }

}
