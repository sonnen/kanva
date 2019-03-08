import { DataContainer } from './data-container';

export abstract class DataContainerExtension {
  protected constructor(
    public readonly name: string,
    protected readonly dataContainer: DataContainer<any>,
  ) {
  }
}
