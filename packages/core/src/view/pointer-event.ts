import { View } from './view';

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

export interface CanvasPointer {
  x: number;
  y: number;
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

export type SupportedDomPointerEvent = MouseEvent | WheelEvent | TouchEvent;

export const supportedDomPointerEvents: (
  | 'touchmove'
  | 'mousemove'
  | 'mousedown'
  | 'touchstart'
  | 'mouseover'
  | 'mouseenter'
  | 'touchcancel'
  | 'mouseout'
  | 'mouseup'
  | 'touchend'
  | 'wheel'
  )[] = [
  'touchmove',
  'mousemove',
  'mousedown',
  'touchstart',
  'mouseover',
  'mouseenter',
  'touchcancel',
  'mouseout',
  'mouseup',
  'touchend',
  'wheel',
];

export const domEventToPointerAction = (event: SupportedDomPointerEvent): PointerAction | undefined => {
  switch (event.type as keyof GlobalEventHandlersEventMap) {
    case 'touchmove':
    case 'mousemove':
      return PointerAction.MOVE;
    case 'mousedown':
    case 'touchstart':
    case 'mouseover':
    case 'mouseenter':
      return PointerAction.START;
    case 'touchcancel':
    case 'mouseout':
    case 'mouseup':
    case 'touchend':
      return PointerAction.END;
    case 'wheel':
      return PointerAction.SCROLL;
    default:
      return undefined;
  }
};
