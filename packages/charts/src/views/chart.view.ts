import { CanvasPointerEvent, Context, DeepReadonly, RequiredViewChanges, View } from '@kanva/core';
import { removeUndefinedProps } from '@kanva/core';
import { CanvasPosition, XYPoint, YValuesMatch } from '../chart.types';
import { DataContainer } from '../data-container';
import { DataContainerEventType } from '../data-container/data-container.events';
import { ScaleFunctions } from '../utils';

export interface ChartViewProps<Style> {
  dataContainer?: DataContainer<any>;
  dataSeries?: string | string[];
  style?: Style;
}

export interface ChartPointerEvent {
  pointerEvent: DeepReadonly<CanvasPointerEvent>;
  x: number;
  y: number;
  match: YValuesMatch;
  snap: XYPoint;
}

export abstract class ChartView<ChartProps extends ChartViewProps<any>,
  Style = NonNullable<ChartProps['style']>> extends View<ChartProps> {
  protected dataContainer?: DataContainer<any>;
  protected dataSeries: string[] = [];
  protected style: Style;

  protected constructor(context: Context, name: string, private readonly defaultStyle: Style) {
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

  abstract getCanvasPositionForPoint(point: XYPoint<any>): CanvasPosition;

  abstract getPointForCanvasPosition(position: XYPoint<number>): XYPoint<number> | undefined;

  onPointerEvent(event: CanvasPointerEvent): boolean {
    return !!this.dataContainer && this.dataContainer.onChartPointerEvent(event);
  }

  getScales(): ScaleFunctions {
    return this.dataContainer!.getScales(
      this.innerWidth,
      this.innerHeight,
    );
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
    this.onDataContainerChanged(dataContainer, this.dataContainer);
    this.dataContainer = dataContainer;
    dataContainer.addEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    this.require(RequiredViewChanges.LAYOUT);
  }

  onDataContainerChanged(_dataContainer: DataContainer<any>, _oldDataContainer: DataContainer<any> | undefined) {
    // Can be implemented by deriving view.
  }

  onDestroy() {
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    }
  }

  onSnapshot() {
    return {
      style: removeUndefinedProps(this.style),
      dataSeries: this.dataSeries,
    };
  }

}
