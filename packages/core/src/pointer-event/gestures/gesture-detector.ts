import { CanvasPointerEvent, PointerAction } from '../canvas-pointer-event';

export abstract class GestureDetector {
  private previousEvent: CanvasPointerEvent = null as any;

  onPointerEvent(event: CanvasPointerEvent): boolean {
    if (!this.previousEvent ||
      event.action === PointerAction.CANCEL ||
      event.action === PointerAction.UP
    ) {
      this.previousEvent = event;
    }
    const handled = this.onGestureEvent(event, this.previousEvent);
    this.previousEvent = event;
    return handled;
  }

  abstract onGestureEvent(event: CanvasPointerEvent, previousEvent: CanvasPointerEvent): boolean;
}
