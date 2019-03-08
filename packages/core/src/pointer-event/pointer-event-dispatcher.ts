import { isNil } from 'lodash';
import { View } from '../view';
import { CanvasPointer, CanvasPointerEvent, MouseButton } from './canvas-pointer-event';
import { domEventToPointerAction, getElementOffset, Offset, supportedDomPointerEvents } from './dom-pointer-event';

export const isTouchEvent = (event: Event): event is TouchEvent => !!(event as any).touches;
export const isMouseEvent = (event: Event): event is MouseEvent => !!(event as any).initMouseEvent;
export const isWheelEvent = (event: Event): event is WheelEvent => !isNil((event as any).deltaX);

const touchToPointer = (touch: Touch | null, offset: Offset, canvasPointer: CanvasPointer) => {
  if (!touch) {
    return;
  }
  canvasPointer.mouseButton = MouseButton.LEFT;
  canvasPointer.pressure = touch.force;
  canvasPointer.x = touch.pageX - offset.left;
  canvasPointer.y = touch.pageY - offset.top;
  canvasPointer.deltaX = 0;
  canvasPointer.deltaY = 0;
};

const mouseToPointer = (event: MouseEvent, offset: Offset, canvasPointer: CanvasPointer) => {
  canvasPointer.mouseButton = event.button;
  canvasPointer.pressure = event.buttons ? 0.5 : 0;
  canvasPointer.x = event.pageX - offset.left;
  canvasPointer.y = event.pageY - offset.top;
  canvasPointer.deltaX = 0;
  canvasPointer.deltaY = 0;
};

export const fillPointerEventData = (pointerEvent: CanvasPointerEvent, view: View, event: Event) => {
  const element = event.target as HTMLElement;
  const offset = getElementOffset(element);
  const action = domEventToPointerAction(event);
  if (action === undefined) {
    return;
  }
  pointerEvent.action = action;
  pointerEvent.target = view;
  pointerEvent.scrollX = 0;
  pointerEvent.scrollY = 0;
  pointerEvent.scrollZ = 0;

  if (isTouchEvent(event)) {
    pointerEvent.pointerCount = event.touches.length;
    for (let i = 0; i < pointerEvent.pointerCount; i++) {
      touchToPointer(event.touches[i], offset, pointerEvent.pointers[i]);
    }
  } else if (isMouseEvent(event)) {
    pointerEvent.pointerCount = 1;
    const pointer = mouseToPointer(event, offset, pointerEvent.pointers[0]);

    if (isWheelEvent(event)) {
      pointerEvent.scrollX = event.deltaX;
      pointerEvent.scrollY = event.deltaY;
      pointerEvent.scrollZ = event.deltaZ;
    }
  }
};

export const registerEventDispatcher = (element: Element, dispatcher: EventListener) => {
  // TODO passive listeners do not support preventDefault() - what do we do then?
  for (const eventType of supportedDomPointerEvents) {
    element.addEventListener(eventType, dispatcher);
  }
  return () => {
    for (const eventType of supportedDomPointerEvents) {
      element.removeEventListener(eventType, dispatcher);
    }
  };
};

export const createEventDispatcher = (view: View): EventListener => {
  let oldPointerEvent = new CanvasPointerEvent();
  let pointerEvent = new CanvasPointerEvent();
  let tempEvent: CanvasPointerEvent;

  return (event: Event) => {
    fillPointerEventData(pointerEvent, view, event);
    for (let i = 0; i < pointerEvent.pointerCount; i++) {
      const pointer = pointerEvent.pointers[i];
      const oldPointer = oldPointerEvent.pointers[i];
      pointer.deltaX = (pointer.x - oldPointer.x) || 0;
      pointer.deltaY = (pointer.y - oldPointer.y) || 0;
    }
    if (view.dispatchPointerEvent(pointerEvent)) {
      event.preventDefault();
    }

    // Swap events
    tempEvent = oldPointerEvent;
    oldPointerEvent = pointerEvent;
    pointerEvent = tempEvent;
  };
};
