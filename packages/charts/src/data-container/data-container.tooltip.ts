import { View } from '@kanva/core';
import { DataContainer } from './data-container';
import { DataContainerExtension } from './data-container.extension';

export const TOOLTIP_EXTENSION = 'DataContainerTooltipExtension';

export class DataContainerTooltipExtension extends DataContainerExtension {
  private view?: View<any>;

  constructor() {
    super(TOOLTIP_EXTENSION);
  }

  registerView(view: View<any>) {
    this.view = view;
  }

  protected onAttach(dataContainer: DataContainer<any>) {
    console.log('hmm');
  }
}
