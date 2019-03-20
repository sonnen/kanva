import { getElementOffset, Offset, View } from '@kanva/core';
import { SnapValuesMatch, XYPoint, YValuesMatch } from '../chart.types';
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
  private canvasOffset?: Offset;
  private position: XYPoint = { x: 0, y: 0 };

  constructor() {
    super(TOOLTIP_EXTENSION);
  }

  registerView(view: View<any>) {
    this.view = view;
  }

  registerCanvasOffset(canvas: HTMLCanvasElement | null) {
    if (canvas === null) {
      return;
    }
    this.canvasOffset = getElementOffset(canvas);
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
    const { position } = this;
    const point = (view as any).getPointForCanvasPosition({
      x: position.x - this.canvasOffset!.left,
      y: position.y - this.canvasOffset!.top,
    });
    const match = dataContainer!.getYValuesMatch(point.x);

    const { absoluteX, absoluteY } = (view as any).getCanvasPositionForPoint({ x: match.snapX, y: match.snapY });

    return {
      snap: {
        x: absoluteX,
        y: absoluteY,
      },
      match,
    };
  }
}
