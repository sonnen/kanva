import { getElementOffset, Offset, View } from '@kanva/core';
import { isNil } from 'lodash';
import { SnapValuesMatch, XYPoint, YValuesMatch } from '../chart.types';
import { ChartView } from '../views';
import { DataContainer } from './data-container';
import { DataContainerEventType } from './data-container.events';
import { DataContainerExtension } from './data-container.extension';

export const TOOLTIP_EXTENSION = 'DataContainerTooltipExtension';

enum TooltipEventType {
  SNAP,
  SMOOTH,
}

export interface TooltipEvent {
  snap: SnapValuesMatch;
  match: YValuesMatch;
  offset: Offset;
}

export type TooltipEventHandler = (event: TooltipEvent) => void;

export class DataContainerTooltipExtension extends DataContainerExtension {
  private view?: View<any>;
  private onTooltipEvent?: TooltipEventHandler;
  private canvasOffset: Offset = { left: 0, top: 0 };
  private position: XYPoint = { x: 0, y: 0 };

  constructor() {
    super(TOOLTIP_EXTENSION);
  }

  setView(view: View<any>) {
    this.view = view;
  }

  setCanvasOffset(canvas: HTMLCanvasElement | null) {
    if (canvas === null) {
      return;
    }

    const offset = getElementOffset(canvas);
    if (this.canvasOffset.left !== offset.left
      || this.canvasOffset.top !== offset.top) {
      this.canvasOffset = offset;
      this.postTooltipEvent(TooltipEventType.SNAP);
    }
  }

  setTooltipEventHandler(tooltipEventHandler: TooltipEventHandler) {
    this.onTooltipEvent = tooltipEventHandler;
  }

  setPosition(pos: XYPoint) {
    this.position = { ...pos };
    this.postTooltipEvent(TooltipEventType.SNAP);
  }

  getPosition() {
    return this.position;
  }

  protected onAttach(dataContainer: DataContainer<any>) {
    dataContainer.addEventListener(
      DataContainerEventType.DATA_CHANGE,
      () => this.postTooltipEvent(TooltipEventType.SMOOTH),
    );
  }

  protected onDetach(dataContainer: DataContainer<any>) {
    dataContainer.removeEventListener(
      DataContainerEventType.DATA_CHANGE,
      () => this.postTooltipEvent(TooltipEventType.SMOOTH),
    );
  }

  private postTooltipEvent = (type: TooltipEventType) => {
    if (!this.view
      || !this.dataContainers.length
      || !this.onTooltipEvent
    ) {
      return;
    }

    const tooltipEvent = this.getTooltipEvent(type);
    if (!isNil(tooltipEvent)) {
      this.onTooltipEvent(tooltipEvent);
    }
  };

  private getTooltipEvent(type: TooltipEventType): TooltipEvent | undefined {
    const { dataContainers, view, position } = this;
    const point = (view as ChartView<any>).getPointForCanvasPosition({
      x: position.x,
      y: position.y,
    });

    if (isNil(point)) {
      return;
    }

    const match = dataContainers.reduce((match, dataContainer) =>
      dataContainer.getYValuesMatch(point.x, match), undefined as YValuesMatch | undefined);

    if (isNil(match)) {
      return;
    }

    const { absoluteX, absoluteY } = (view as ChartView<any>).getCanvasPositionForPoint(
      type === TooltipEventType.SNAP
      ? { x: match.snapX, y: match.snapY }
      : { x: match.x, y: match.snapY },
    );

    return {
      snap: {
        x: absoluteX,
        y: absoluteY,
      },
      match,
      offset: this.canvasOffset,
    };
  }
}
