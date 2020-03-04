export interface Canvas {
  getContext(contextId: '2d'): CanvasRenderingContext2D | null;

  toDataURL(type?: 'image/png' | 'image/jpeg', quality?: number): string;
}

export type ImageClass = new ()=> (HTMLImageElement & { src: any });

interface CanvasCreatorOptions {
  width: number;
  height: number;
}

export type CanvasCreator = (options: CanvasCreatorOptions) => Canvas;

export const defaultImageClass = (() => {
  try {
    // Browsers default
    return Image;
  } catch {
    return undefined;
  }
})();

export const defaultCanvasCreator: CanvasCreator = ({
  width, height,
}) => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  } catch {
    throw new Error('Could not create a new canvas element. You may not be in a browser environment.');
  }
};
