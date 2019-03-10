import { CanvasPointerEvent, Context, DeepReadonly, RequiredViewChanges, View } from '@kanva/core';
import { CanvasPosition, SnapValuesMatch, XYPoint, YValuesMatch } from '../chart.types';
import { DataContainer } from '../data-container';
import { DataContainerEventType } from '../data-container/data-container.events';

export interface ChartViewProps<Style> {
  dataContainer?: DataContainer<any>;
  style?: Style;
  onChartPointerEvent?: OnChartPointerEvent;
}

export interface ChartPointerEvent {
  pointerEvent: DeepReadonly<CanvasPointerEvent>;
  x: number;
  y: number;
  match: YValuesMatch;
  snap: SnapValuesMatch;
}

export type OnChartPointerEvent = (event: ChartPointerEvent) => void;

export class ChartView<ChartProps extends ChartViewProps<any>,
  Style = NonNullable<ChartProps['style']>> extends View<ChartProps> {
  protected dataContainer?: DataContainer<any>;
  protected dataSeries: string[] = [];
  protected onChartPointerEvent?: OnChartPointerEvent;
  protected style: Style;

  constructor(context: Context, name: string, private readonly defaultStyle: Style) {
    super(context, name);
    this.style = defaultStyle;
  }

  onDataChange = () => {
    this.require(RequiredViewChanges.LAYOUT);
  };

  getStyle() {
    return this.style;
  }

  setStyle(style: Style | undefined) {
    this.style = style || this.defaultStyle;
    this.require(RequiredViewChanges.DRAW);
  }

  getOnChartPointerEvent() {
    return this.onChartPointerEvent;
  }

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
    return {
      x: 0,
      y: 0,
      absoluteX: this.offsetRect.l,
      absoluteY: this.offsetRect.t,
    };
  }

  setOnChartPointerEvent(onChartPointerEvent: OnChartPointerEvent) {
    this.onChartPointerEvent = onChartPointerEvent;
  }

  getDataSeries() {
    return this.dataSeries;
  }

  setDataSeries(series: string | string[]) {
    this.dataSeries = !series ? [] : Array.isArray(series) ? series : [series];
    this.require(RequiredViewChanges.DRAW);
  }

  getDataContainer() {
    return this.dataContainer;
  }

  setDataContainer(dataContainer: DataContainer<any>) {
    if (this.dataContainer === dataContainer) {
      return;
    }
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    }
    this.dataContainer = dataContainer;
    dataContainer.addEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    this.require(RequiredViewChanges.LAYOUT);
  }

  onDestroy() {
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    }
  }

  onSnapshot() {
    return {
      style: this.style,
      dataContainer: this.dataContainer,
      dataSeries: this.dataSeries,
    };
  }

}
