import { View } from './view';

export enum PointerAction {
  DOWN,
  UP,
  MOVE,
  CANCEL,
  ENTER,
  LEAVE,
  OVER,
}

export interface CanvasPointerEvent {
  target: View;
  action: PointerAction;
  isPressed: boolean;
  id: number;
  x: number;
  y: number;
}

export const domEventToPointerAction = (event: string): PointerAction|undefined => {
  switch (event as keyof GlobalEventHandlersEventMap) {
    case 'pointermove':
      return PointerAction.MOVE;
    case 'pointerdown':
      return PointerAction.DOWN;
    case 'pointerenter':
      return PointerAction.ENTER;
    case 'pointercancel':
      return PointerAction.CANCEL;
    case 'pointerleave':
    case 'pointerout':
      return PointerAction.LEAVE;
    case 'pointerover':
      return PointerAction.OVER;
    case 'pointerup':
        return PointerAction.UP;
    default:
      return undefined;
  }
};
