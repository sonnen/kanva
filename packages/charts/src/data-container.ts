import { ScaleContinuousNumeric } from 'd3-scale';
import {
  AxisLabelAccessor,
  AxisPoint,
  DataScaleType,
  DataSeries,
  PointAccessor,
  ViewPoint,
  XYPoint,
} from './chart.types';
import { getContinuousNumericScale, isXYArray, roundToNearest } from './utils';

const DefaultAxisParameters = {
  TICK_COUNT: 10,
  ROUND_TO: 1,
  LABEL_ACCESSOR: (value: number) => String(value),
};

export interface AxisParameters {
  tickCount?: number;
  roundTo?: number;
  labelAccessor?: AxisLabelAccessor;
}

export enum DataContainerEvent {
  DATA_CHANGE,
  CALCULATION,
}

export type DataContainerEventListener = (event: DataContainerEvent) => void;

export class DataContainer<DataPoint = XYPoint> {
  // Data properties
  private rawData?: DataSeries<DataPoint>[];
  private namedData: Record<string, number> = {};
  private pointAccessor?: PointAccessor;
  private xScaleType: DataScaleType = DataScaleType.LINEAR;
  private yScaleType: DataScaleType = DataScaleType.LINEAR;
  private xBounds: number[] = [];
  private yBounds: number[] = [];
  private xAxisParameters: AxisParameters = {};
  private yAxisParameters: AxisParameters = {};

  // Data processing properties
  private hasChanged = false;
  private eventListeners: DataContainerEventListener[] = [];

  // Computed values
  private forWidth: number = 0;
  private forHeight: number = 0;
  private series: DataSeries<XYPoint & ViewPoint>[] = [];
  private xScale?: ScaleContinuousNumeric<number, number>;
  private yScale?: ScaleContinuousNumeric<number, number>;
  private xAxis: AxisPoint[] = [];
  private yAxis: AxisPoint[] = [];

  getData() {
    return this.rawData;
  }

  setData(data: DataSeries<DataPoint>[]) {
    if (this.rawData === data) {
      return this;
    }
    this.rawData = data;
    this.namedData = {};
    this.rawData.forEach((data, index) => this.namedData[data.name] = index);
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  addEventListener(listener: DataContainerEventListener) {
    this.eventListeners.push(listener);
  }

  removeEventListener(listener: DataContainerEventListener) {
    const index = this.eventListeners.indexOf(listener);
    if (index < 0) {
      return;
    }
    this.eventListeners.splice(index, 1);
  }

  getPointAccessor() {
    return this.pointAccessor;
  }

  setPointAccessor(pointAccessor: PointAccessor | undefined) {
    this.pointAccessor = pointAccessor;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getXScaleType() {
    return this.xScaleType;
  }

  setXScaleType(scaleType: DataScaleType) {
    this.xScaleType = scaleType;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getYScaleType() {
    return this.yScaleType;
  }

  setYScaleType(scaleType: DataScaleType) {
    this.yScaleType = scaleType;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getXAxisParameters() {
    return this.xAxisParameters;
  }

  setXAxisParameters(xAxisParameters: AxisParameters) {
    this.xAxisParameters = xAxisParameters;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getYAxisParameters() {
    return this.yAxisParameters;
  }

  setYAxisParameters(yAxisParameters: AxisParameters) {
    this.yAxisParameters = yAxisParameters;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getXBounds() {
    return this.xBounds;
  }

  setXBounds(xBounds: number[]) {
    this.xBounds = xBounds;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getYBounds() {
    return this.yBounds;
  }

  setYBounds(yBounds: number[]) {
    this.yBounds = yBounds;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  calculate(width: number, height: number) {
    this.processData();
    if (this.forWidth === width && this.forHeight === height) {
      return;
    }
    this.forWidth = width;
    this.forHeight = height;

    const { series, xAxisParameters, yAxisParameters } = this;

    const xScale = this.xScale!
      .range([0, width]);
    const yScale = this.yScale!
      .range([height, 0]);

    for (let i = 0, l = series.length; i < l; i++) {
      const singleSeries = series[i].data;
      for (let j = 0, jl = singleSeries.length; j < jl; j++) {
        const point = singleSeries[j];
        point.vx = xScale(point.x);
        point.vy = yScale(point.y);
      }
    }

    this.xAxis = this.prepareAxisValues(xAxisParameters, xScale);
    this.yAxis = this.prepareAxisValues(yAxisParameters, yScale);
    this.series = series;
    this.postEvent(DataContainerEvent.CALCULATION);
  }

  getDataSeries(width: number, height: number, name: string | undefined): DataSeries<XYPoint & ViewPoint> | undefined {
    if (!name) {
      return undefined;
    }
    this.calculate(width, height);
    return this.series[this.namedData[name]];
  }

  getXAxisData(): AxisPoint[] {
    return this.xAxis;
  }

  getYAxisData(): AxisPoint[] {
    return this.yAxis;
  }

  private processData() {
    if (!this.hasChanged) {
      return;
    }
    const { rawData, pointAccessor } = this;
    this.hasChanged = false;
    if (!rawData || !rawData.length) {
      this.series = [];
      return;
    }

    const series: DataSeries<XYPoint & ViewPoint>[] = new Array(rawData.length);
    let minX: number = Math.min(...this.xBounds);
    let maxX: number = Math.max(...this.xBounds);
    let minY: number = Math.min(...this.yBounds);
    let maxY: number = Math.max(...this.yBounds);

    for (let i = 0, l = rawData.length; i < l; i++) {
      const rawSeries = rawData[i];
      const data: XYPoint[] = pointAccessor
        ? rawSeries.data.map(pointAccessor)
        : isXYArray(rawSeries.data) ? rawSeries.data.map(({ x, y }: XYPoint) => ({ x, y })) : [];

      if (data.length) {
        for (let i = 0, l = data.length; i < l; i++) {
          const { x, y } = data[i];
          if (y < minY) {
            minY = y;
          }
          if (y > maxY) {
            maxY = y;
          }
          if (x < minX) {
            minX = x;
          }
          if (x > maxX) {
            maxX = x;
          }
        }
      }

      series[i] = {
        name: rawSeries.name,
        data: data as (XYPoint & ViewPoint)[],
      };
    }

    // Set the data for render processing
    this.series = series;
    this.xScale = getContinuousNumericScale(this.xScaleType)
      .domain([minX, maxX]);
    this.yScale = getContinuousNumericScale(this.yScaleType)
      .domain([minY, maxY]);
    // Reset size in order to force render
    this.forWidth = 0;
    this.forHeight = 0;
  }

  private postEvent(change: DataContainerEvent) {
    const listeners = this.eventListeners;
    for (let i = 0, l = listeners.length; i < l; i++) {
      listeners[i](change);
    }
  }

  private prepareAxisValues(
    {
      labelAccessor = DefaultAxisParameters.LABEL_ACCESSOR,
      tickCount = DefaultAxisParameters.TICK_COUNT,
      roundTo = DefaultAxisParameters.ROUND_TO,
    }: AxisParameters,
    scale: ScaleContinuousNumeric<number, number>,
  ): AxisPoint[] {
    const axis: AxisPoint[] = new Array(tickCount);
    const [min, max] = scale.domain();
    const tickDistance = (max - min) / (tickCount - 1);

    for (let i = 0; i < tickCount; i++) {
      const rawValue = min + tickDistance * i;
      const value = roundToNearest(rawValue, roundTo);

      axis[i] = {
        value: labelAccessor(value, i),
        position: Math.round(scale(rawValue)),
      };
    }

    return axis;
  }
}
