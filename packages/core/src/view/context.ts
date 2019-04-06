export interface ContextLike {
  registerView(id: number, idName: string): void;

  deregisterView(id: number): void;

  getId(id: string | number): string | number;

  resolve(id: string | number | undefined): number | undefined;
}

export class Context implements ContextLike {
  public debugEnabled = false;
  private idMap: Record<string, number> & Record<number, string> = {};

  constructor(public readonly imageClass: (new () => HTMLImageElement) = Image) {
  }

  registerView(id: number, idName: string) {
    this.idMap[id] = idName;
    this.idMap[idName] = id;
  }

  deregisterView(id: number) {
    const idName = this.idMap[id];
    delete this.idMap[idName];
    delete this.idMap[id];
  }

  getId(id: string | number) {
    return this.idMap[id];
  }

  resolve(id: string | number | undefined): number | undefined {
    return id !== undefined ? typeof id === 'string' ? this.idMap[id] : id : undefined;
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

  registerView(id: number, idName: string): void {
    throw noContextError();
  }

  resolve(id: string | number | undefined): number | undefined {
    throw noContextError();
  }
}
