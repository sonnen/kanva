import { CanvasPointerEvent, PointerAction } from '@kanva/core';
import defaultsDeep from 'lodash/defaultsDeep';
import { XYPoint, YValuesMatch } from '../chart.types';
import { DeepPartial } from '../utils';
import { ChartView } from '../views';
import { DataContainer } from './data-container';
import { DataContainerEventType } from './data-container.events';
import { DataContainerExtension } from './data-container.extension';

export const TOOLTIP_EXTENSION = 'DataContainerTooltipExtension';

export interface TooltipEvent {
  pointerEvent: CanvasPointerEvent;
  snap: XYPoint;
  match: YValuesMatch;
}

export interface DataContainerTooltipExtensionOptions {
  enableOnHover: boolean;
  onTooltipEvent?: (tooltipEvent: TooltipEvent) => void;
}

export type TooltipEventHandler = (event: TooltipEvent) => void;

export class DataContainerTooltipExtension extends DataContainerExtension {
  private readonly options: DataContainerTooltipExtensionOptions;
  private onTooltipEvent?: TooltipEventHandler;
  private lastPointerEvent = new CanvasPointerEvent();
  private position: XYPoint = { x: 0, y: 0 };

  constructor(options: DeepPartial<DataContainerTooltipExtensionOptions>) {
    super(TOOLTIP_EXTENSION);
    this.options = defaultsDeep(options, {
      enableOnHover: true,
    });
  }

  onChartPointerEvent(event: CanvasPointerEvent): boolean {
    const isSupportedPressure = this.options.enableOnHover &&
      event.primaryPointer.pressure === 0 || event.primaryPointer.pressure > 0;
    const isSupportedEventType = event.action === PointerAction.MOVE || event.action === PointerAction.OVER;
    const isTargetPresent = !!event.target;
    if (!isSupportedPressure || !isSupportedEventType || !isTargetPresent) {
      return false;
    }
    event.cloneTo(this.lastPointerEvent);

    const chartView = event.target as ChartView<any, any>;

    const point = chartView.getPointForCanvasPosition(event.primaryPointer);
    if (!point) {
      return false;
    }

    const match = this.dataContainers.reduce((match, dataContainer) =>
      dataContainer.getYValuesMatch(point.x, match), undefined as YValuesMatch | undefined);

    if (!match) {
      return false;
    }

    const position = chartView.getCanvasPositionForPoint(match.primary);
    const snap = {
      x: position.absoluteX,
      y: position.absoluteY,
    };

    if (this.options.onTooltipEvent) {
      this.options.onTooltipEvent({
        pointerEvent: event,
        ...point,
        match,
        snap,
      });
    }
    return true;
  }

  simulateAbsoluteCanvasPosition(view: ChartView<any, any>, absolutePosition: XYPoint) {
    const event = this.lastPointerEvent || new CanvasPointerEvent();
    event.target = view;
    event.pointerCount = 1;
    event.primaryPointer.pressure = .5;
    event.primaryPointer.x = absolutePosition.x - view.offsetRect.l;
    event.primaryPointer.y = absolutePosition.y - view.offsetRect.t;
    event.action = PointerAction.MOVE;
    this.onChartPointerEvent(event);
  }

  protected onAttach(dataContainer: DataContainer<any>) {
    dataContainer.addEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
  }

  protected onDetach(dataContainer: DataContainer<any>) {
    dataContainer.removeEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
  }

  private onDataChange = () => this.onChartPointerEvent(this.lastPointerEvent);

}
