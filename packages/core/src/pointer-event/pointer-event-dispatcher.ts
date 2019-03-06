import { isNil } from 'lodash';
import { View } from '../view';
import { CanvasPointer, CanvasPointerEvent, MouseButton, PointerAction } from './canvas-pointer-event';
import { domEventToPointerAction, getElementOffset, Offset, supportedDomPointerEvents } from './dom-pointer-event';

export const isTouchEvent = (event: Event): event is TouchEvent => !!(event as any).touches;
export const isMouseEvent = (event: Event): event is MouseEvent => !!(event as any).initMouseEvent;
export const isWheelEvent = (event: Event): event is WheelEvent => !isNil((event as any).deltaX);

const touchToPointer = (touch: Touch, offset: Offset) => {
  const x = touch.pageX - offset.left;
  const y = touch.pageY - offset.top;
  return {
    mouseButton: MouseButton.LEFT,
    pressure: touch.force,
    x,
    y,
  };
};

const mouseToPointer = (event: MouseEvent, offset: Offset) => {
  const x = event.pageX - offset.left;
  const y = event.pageY - offset.top;
  return {
    mouseButton: event.button,
    pressure: event.buttons ? 0.5 : 0,
    x,
    y,
  };
};

export const registerEventDispatcher = (element: Element, dispatcher: EventListener) => {
  for (const eventType of supportedDomPointerEvents) {
    element.addEventListener(eventType, dispatcher, { passive: true });
  }
  return () => {
    for (const eventType of supportedDomPointerEvents) {
      element.removeEventListener(eventType, dispatcher);
    }
  };
};

export const createEventDispatcher = (view: View): EventListener => {
  const pointerEvent = new CanvasPointerEvent(null as any, PointerAction.START, []);

  return (event: Event) => {
    const element = event.target as HTMLElement;
    const offset = getElementOffset(element);
    const action = domEventToPointerAction(event);
    if (action === undefined) {
      return;
    }
    pointerEvent.scrollX = 0;
    pointerEvent.scrollY = 0;
    pointerEvent.scrollZ = 0;
    if (isTouchEvent(event)) {
      const pointers: CanvasPointer[] = new Array(event.touches.length);
      for (let i = 0; i < pointers.length; i++) {
        pointers[i] = touchToPointer(event.touches[i], offset);
      }

      pointerEvent.setEventValues(view, action, pointers);
    } else if (isMouseEvent(event)) {
      const pointer = mouseToPointer(event, offset);
      pointerEvent.setEventValues(view, action, [pointer]);

      if (isWheelEvent(event)) {
        pointerEvent.scrollX = event.deltaX;
        pointerEvent.scrollY = event.deltaY;
        pointerEvent.scrollZ = event.deltaZ;
      }
    }
    if (view.dispatchPointerEvent(pointerEvent)) {
      // TODO passive listeners do not support preventDefault() - what do we do then?
      // event.preventDefault();
    }
  };
};
