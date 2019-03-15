import { CanvasPointerEvent, PointerAction } from '../canvas-pointer-event';
import { GestureDetector } from './gesture-detector';

export interface DragEvent {
  pointerEvent: CanvasPointerEvent;
  deltaX: number;
  deltaY: number;
}

export interface DragGestureDetectorOptions {
  onDrag: OnDragListener;
  pointers?: number;
}

export type OnDragListener = (dragEvent: DragEvent) => boolean;

export class DragGestureDetector extends GestureDetector {

  constructor(private options: DragGestureDetectorOptions) {
    super();
  }

  onGestureEvent(event: CanvasPointerEvent, previousEvent: CanvasPointerEvent): boolean {
    const { pointers = 1 } = this.options;
    // TODO support multiple fingers drag
    if (event.action === PointerAction.MOVE && event.pointerCount === pointers && event.primaryPointer.pressure > 0) {
      const { deltaX, deltaY } = event.primaryPointer;

      if (deltaX === 0 && deltaY === 0) {
        return false;
      }
      return this.options.onDrag({
        pointerEvent: event,
        deltaX,
        deltaY,
      });
    }
    return false;
  }
}
