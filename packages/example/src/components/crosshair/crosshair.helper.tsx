import { getElementOffset } from '@kanva/core';

export const fabricateCrosshairEvent = (canvasRef: HTMLCanvasElement, event: TouchEvent) => {
  const offset = getElementOffset(canvasRef).top + canvasRef.getBoundingClientRect().height / 2;
  return new MouseEvent('mousemove', {
    screenX: event.touches[0].screenX,
    screenY: offset,
    clientX: event.touches[0].clientX,
    clientY: offset,
  });
};
