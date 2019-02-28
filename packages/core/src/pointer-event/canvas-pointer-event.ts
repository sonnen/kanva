import { View } from '../view';

export enum PointerAction {
  START,
  END,
  MOVE,
  SCROLL,
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
  absoluteX: number;
  absoluteY: number;
}

export interface CanvasPointer extends PointerPosition {
  pressure: number;
  mouseButton: MouseButton;
}

export interface CanvasPointerEventValues {
  target: View;
  action: PointerAction;
  pointers: CanvasPointer[];
}

export class CanvasPointerEvent implements CanvasPointerEventValues {
  target: View;
  action: PointerAction;
  pointers: CanvasPointer[];
  scrollX: number = 0;
  scrollY: number = 0;
  scrollZ: number = 0;

  constructor(target: View, action: PointerAction, pointers: CanvasPointer[]) {
    this.target = target;
    this.action = action;
    this.pointers = pointers;
  }

  setEventValues(target: View, action: PointerAction, pointers: CanvasPointer[]) {
    this.target = target;
    this.action = action;
    this.pointers = pointers;
  }

  offsetPointers(offsetX: number, offsetY: number) {
    const pointers = this.pointers;
    for (let i = 0, l = pointers.length; i < l; i++) {
      const pointer = pointers[i];
      pointer.x += offsetX;
      pointer.y += offsetY;
    }
  }

  get primaryPointer() {
    return this.pointers[0];
  }
}
