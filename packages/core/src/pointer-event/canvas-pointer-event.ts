import { View } from '../view';
import { Offset } from './dom-pointer-event';

export enum PointerAction {
  UP = 'UP',
  OVER = 'OVER',
  DOWN = 'DOWN',
  MOVE = 'MOVE',
  SCROLL = 'SCROLL',
  CANCEL = 'CANCEL',
}

export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
  BACK = 3,
  FORWARD = 4,
}

export interface PointerPosition {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

export interface CanvasPointer extends PointerPosition {
  pressure: number;
  mouseButton: MouseButton;
}

export class CanvasPointerEvent {
  offset: Offset;
  pointers: CanvasPointer[] = new Array(10).fill(null).map(() => ({}) as any);
  pointerCount: number = 0;
  target: View;
  action: PointerAction;
  scrollX: number = 0;
  scrollY: number = 0;
  scrollZ: number = 0;

  constructor() {
    this.target = null as any;
    this.action = PointerAction.OVER;
    this.offset = { left: 0, top: 0 };
  }

  offsetPointers(offsetX: number, offsetY: number) {
    const pointers = this.pointers;
    for (let i = 0, l = this.pointerCount; i < l; i++) {
      const pointer = pointers[i];
      pointer.x += offsetX;
      pointer.y += offsetY;
    }
  }

  get primaryPointer() {
    return this.pointers[0];
  }

  clone(): CanvasPointerEvent {
    return this.cloneTo(new CanvasPointerEvent());
  }

  cloneTo(event: CanvasPointerEvent): CanvasPointerEvent {
    event.offset.left = this.offset.left;
    event.offset.top = this.offset.top;
    event.pointerCount = this.pointerCount;
    for (let i = 0, l = this.pointerCount; i < l; i++) {
      const dst = event.pointers[i];
      const src = this.pointers[i];

      dst.pressure = src.pressure;
      dst.mouseButton = src.mouseButton;
      dst.deltaX = src.deltaX;
      dst.deltaY = src.deltaY;
      dst.x = src.x;
      dst.y = src.y;
    }
    event.target = this.target;
    event.action = this.action;
    event.scrollX = this.scrollX;
    event.scrollY = this.scrollY;
    event.scrollZ = this.scrollZ;

    return event;
  }

}
