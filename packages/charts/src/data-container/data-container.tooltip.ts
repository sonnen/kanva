import { getElementOffset, Offset, View } from '@kanva/core';
import { SnapValuesMatch, XYPoint, YValuesMatch } from '../chart.types';
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

    this.onTooltipEvent(this.getTooltipData(type));
  };

  private getTooltipData(type: TooltipEventType): TooltipEvent {
    const { dataContainers, view, position } = this;
    const point = (view as any).getPointForCanvasPosition({
      x: position.x,
      y: position.y,
    });
    const match = dataContainers.reduce((match, dataContainer, index) => {
      if (index === 0) {
        return dataContainer.getYValuesMatch(point.x);
      }
      Object.assign(match.y, dataContainer.getYValuesMatch(point.x).y);
      return match;
    }, {} as YValuesMatch);

    const { absoluteX, absoluteY } = (view as any).getCanvasPositionForPoint(
      type === TooltipEventType.SNAP
      ? { x: match.snapX, y: match.snapY }
      : { x: match.x, y: match.y },
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
