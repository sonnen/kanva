import { View } from '../view';

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

}
