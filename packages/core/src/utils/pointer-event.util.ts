export interface PointerPosition {
  x: number;
  y: number;
}

export const offsetPointerPosition = (position: PointerPosition, element: HTMLElement) => {
  position.x -= element.offsetLeft;
  position.y -= element.offsetTop;

  let reference: HTMLElement | undefined | null = element.offsetParent as any;
  while (reference) {
    position.x -= reference.offsetLeft;
    position.y -= reference.offsetTop;
    reference = reference.offsetParent as any;
  }
};
