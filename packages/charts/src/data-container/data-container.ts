import { ScaleContinuousNumeric } from 'd3-scale';
import { DataScaleType, DataSeries, PointAccessor, ViewPoint, XYPoint } from '../chart.types';
import {
  AxisParameters,
  AxisPoint,
  getContinuousNumericScale,
  isXYArray,
  prepareAxisValues,
  ScaleFunction,
} from '../utils';

const DefaultAxisParameters = {
  TICK_COUNT: 10,
  ROUND_TO: 1,
  LABEL_ACCESSOR: (value: number) => String(value),
};

export enum DataContainerEvent {
  DATA_CHANGE,
}

export type DataContainerEventListener = (event: DataContainerEvent) => void;

/**
 * This is a common base for storing raw point values and converting them to format that can be consumed by ChartViews.
 * In case of one-dimensional data (as for PieChart), a sum of Y values passed to series will be used.
 */
export class DataContainer<DataPoint> {
  // Data properties
  private rawData?: DataSeries<DataPoint>[];
  private namedData: Record<string, number> = {};
  private pointAccessor?: PointAccessor<DataPoint>;
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
  private series: DataSeries<XYPoint>[] = [];
  private total: number = 0;
  private seriesLength: number = 0;
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

  setPointAccessor(pointAccessor: PointAccessor<DataPoint> | undefined) {
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

  getXBoundsExtension() {
    return this.xBounds;
  }

  setXBoundsExtension(xBounds: number[]) {
    this.xBounds = xBounds;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getYBoundsExtension() {
    return this.yBounds;
  }

  setYBoundsExtension(yBounds: number[]) {
    this.yBounds = yBounds;
    this.hasChanged = true;
    this.postEvent(DataContainerEvent.DATA_CHANGE);
    return this;
  }

  getDataSeries(name: string | undefined): DataSeries<XYPoint> | undefined {
    if (!name) {
      return undefined;
    }
    this.processData();
    return this.series[this.namedData[name]];
  }

  getAllDataSeries(): DataSeries<XYPoint>[] {
    this.processData();
    return this.series;
  }

  getScales(width: number, height: number): { xScale: ScaleFunction, yScale: ScaleFunction } {
    this.processData();
    return {
      xScale: this.xScale!.range([0, width]),
      yScale: this.yScale!.range([height, 0]),
    };
  }

  getTotal(): number {
    this.processData();
    return this.total;
  }

  getSeriesLength(): number {
    this.processData();
    return this.seriesLength;
  }

  getXAxisData(): AxisPoint[] {
    this.processData();
    return this.xAxis;
  }

  getYAxisData(): AxisPoint[] {
    this.processData();
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

    let total = 0;
    let seriesLength = 0;
    for (let i = 0, l = rawData.length; i < l; i++) {
      const rawSeries = rawData[i];
      const data: XYPoint[] = pointAccessor
        ? rawSeries.data.map(pointAccessor)
        : isXYArray(rawSeries.data) ? rawSeries.data.map(({ x, y }: XYPoint) => ({ x, y })) : [];
      let sum = 0;

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
          sum += y;
        }
        if (seriesLength < data.length) {
          seriesLength = data.length;
        }
      }

      series[i] = {
        name: rawSeries.name,
        sum,
        data: data as (XYPoint & ViewPoint)[],
      };
      total += sum;
    }

    // Set the data for render processing
    this.series = series;
    this.total = total;
    this.seriesLength = seriesLength;
    this.xScale = getContinuousNumericScale(this.xScaleType)
      .domain([minX, maxX]);
    this.yScale = getContinuousNumericScale(this.yScaleType)
      .domain([minY, maxY]);

    this.xAxis = prepareAxisValues(this.xScale, this.xAxisParameters, seriesLength);
    this.yAxis = prepareAxisValues(this.yScale, this.yAxisParameters, seriesLength);
  }

  private postEvent(change: DataContainerEvent) {
    const listeners = this.eventListeners;
    for (let i = 0, l = listeners.length; i < l; i++) {
      listeners[i](change);
    }
  }
}
