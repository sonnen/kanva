import { View } from '@kanva/core';
import { SnapValuesMatch, XYPoint, YValuesMatch } from 'src/chart.types';
import { DataContainer } from './data-container';
import { DataContainerEventType } from './data-container.events';
import { DataContainerExtension } from './data-container.extension';

export const TOOLTIP_EXTENSION = 'DataContainerTooltipExtension';

type TooltipEvent = { snap: SnapValuesMatch, match: YValuesMatch };
export type TooltipEventHandler = (event: TooltipEvent) => void;

export class DataContainerTooltipExtension extends DataContainerExtension {
  private dataContainer?: DataContainer<any>;
  private view?: View<any>;
  private onTooltipEvent?: TooltipEventHandler;
  private position: XYPoint = { x: 0, y: 0 };

  constructor() {
    super(TOOLTIP_EXTENSION);
  }

  registerView(view: View<any>) {
    this.view = view;
  }

  registerTooltipEventHandler(tooltipEventHandler: TooltipEventHandler) {
    this.onTooltipEvent = tooltipEventHandler;
  }

  setPosition(pos: XYPoint) {
    this.position = { ...pos };
    this.postTooltipEvent();
  }

  getPosition() {
    return this.position;
  }

  protected onAttach(dataContainer: DataContainer<any>) {
    dataContainer.addEventListener(DataContainerEventType.DATA_CHANGE, this.postTooltipEvent);
    this.dataContainer = dataContainer;
  }

  protected onDetach(dataContainer: DataContainer<any>) {
    dataContainer.removeEventListener(DataContainerEventType.DATA_CHANGE, this.postTooltipEvent);
  }

  private postTooltipEvent = () => {
    const { dataContainer, view } = this;
    if (!view || !dataContainer) {
      return;
    }

    if (this.onTooltipEvent) {
      this.onTooltipEvent(this.getTooltipData());
    }
  };

  private getTooltipData(): { snap: SnapValuesMatch, match: YValuesMatch } {
    const { dataContainer, view } = this;
    let { position } = this;
    const point = (view as any).getPointForCanvasPosition(position);
    const match = dataContainer!.getYValuesMatch(point.x);

    position = (view as any).getCanvasPositionForPoint({ x: match.snapX, y: match.snapY });

    return {
      snap: position,
      match,
    };
  }
}
