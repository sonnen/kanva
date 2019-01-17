export class Context {
  public debugEnabled: boolean = false;
  private idMap: Record<string, number> & Record<number, string> = {};

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
