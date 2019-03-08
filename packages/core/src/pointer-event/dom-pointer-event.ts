import { PointerAction } from './canvas-pointer-event';

export interface Offset {
  left: number;
  top: number;
}

export const getElementOffset = (element: HTMLElement): Offset => {
  const offset = { left: element.offsetLeft, top: element.offsetTop };
  let reference: HTMLElement | undefined | null = element.offsetParent as any;
  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent as any;
  }
  return offset;
};

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

export const domEventToPointerAction = (event: Event): PointerAction | undefined => {
  switch (event.type as keyof GlobalEventHandlersEventMap) {
    case 'touchmove':
    case 'mousemove':
      return PointerAction.MOVE;
    case 'mousedown':
    case 'touchstart':
      return PointerAction.DOWN;
    case 'mouseover':
    case 'mouseenter':
      return PointerAction.OVER;
    case 'touchcancel':
    case 'mouseout':
      return PointerAction.CANCEL;
    case 'mouseup':
    case 'touchend':
      return PointerAction.UP;
    case 'wheel':
      return PointerAction.SCROLL;
    default:
      return undefined;
  }
};
