import { CanvasCreator, defaultCanvasCreator, defaultImageClass, ImageClass } from '../canvas/canvas';

export interface ContextOptions {
  imageClass?: ImageClass;
  canvasCreator?: CanvasCreator;
}

export interface ContextLike {
  registerView(idName: string): number;

  getId(id: string | number | undefined): string | number | undefined;

  resolve(id: string | number | undefined): number | undefined;
}

export class Context implements ContextLike {
  private static idCounter: number = 0;
  public debugEnabled = false;
  public readonly imageClass: ImageClass;
  public readonly canvasCreator: CanvasCreator;
  private idMap: Record<string, number> & Record<number, string> = {};

  constructor(options: ContextOptions = {}) {
    this.imageClass = options.imageClass || defaultImageClass!;
    this.canvasCreator = options.canvasCreator || defaultCanvasCreator;
  }

  registerView(idName: string): number {
    const existingId = this.idMap[idName];
    if (existingId !== undefined) {
      return existingId;
    }
    const id = Context.idCounter++;
    this.idMap[id] = idName;
    this.idMap[idName] = id;
    return id;
  }

  deregisterView(id: number) {
    const idName = this.idMap[id];
    delete this.idMap[idName];
    delete this.idMap[id];
  }

  getId(id: string | number | undefined) {
    return id === undefined ? undefined : this.idMap[id];
  }

  resolve(id: string | number | undefined): number | undefined {
    return id !== undefined ? typeof id === 'string' ? this.registerView(id) : id : undefined;
  }
}

const noContextError = () => new Error(
  'No Kanva context has been set. Make sure that you put all Views inside Kanva component.',
);

export class NoContext implements ContextLike {
  deregisterView(id: number): void {
    throw noContextError();
  }

  getId(id: string | number): string | number {
    throw noContextError();
  }

  registerView(idName: string): number {
    throw noContextError();
  }

  resolve(id: string | number | undefined): number | undefined {
    throw noContextError();
  }
}
