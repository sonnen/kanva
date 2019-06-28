import { CanvasPointerEvent } from '@kanva/core';
import { DataContainer } from './data-container';
import { DataContainerEventType } from './data-container.events';

export abstract class DataContainerExtension {
  protected readonly dataContainers: DataContainer<any>[] = [];

  protected constructor(
    public readonly name: string,
  ) {
  }

  attach(dataContainer: DataContainer<any>) {
    if (this.dataContainers.includes(dataContainer)) {
      return;
    }
    this.dataContainers.push(dataContainer);
    this.onAttach(dataContainer);
  }

  detach(dataContainer: DataContainer<any>) {
    const index = this.dataContainers.indexOf(dataContainer);
    if (index < 0) {
      return;
    }
    this.dataContainers.splice(index, 1);
    this.onDetach(dataContainer);
  }

  onChartPointerEvent(_event: CanvasPointerEvent): boolean {
    return false;
  }

  protected onAttach(_dataContainer: DataContainer<any>) {
    // Extension can implement this method to override the default behaviour of DataContainer
  }

  protected onDetach(_dataContainer: DataContainer<any>) {
    // Extension can implement this method to clean the overrides of the default behaviour of DataContainer
  }

  protected postEvent<T extends DataContainerEventType, P>(eventType: T, payload?: P): P {
    for (let i = 0, l = this.dataContainers.length; i < l; i++) {
      payload = this.dataContainers[i].postEvent(eventType, payload);
    }
    return payload!;
  }

}
