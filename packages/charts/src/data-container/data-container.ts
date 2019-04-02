import { Rect, RectLike } from '@kanva/core';
import { ScaleContinuousNumeric } from 'd3-scale';
import { isEmpty, isNil, sortedIndexBy } from 'lodash';
import { clamp } from 'lodash/fp';
import { DataScaleType, DataSeries, PointAccessor, ViewPoint, XYPoint, YValuesMatch } from '../chart.types';
import {
  AxisParameters,
  AxisPoint,
  getContinuousNumericScale,
  isXYArray,
  prepareAxisValues,
  ScaleFunctions,
} from '../utils';
import { DataContainerEventListener, DataContainerEventType } from './data-container.events';
import { DataContainerExtension } from './data-container.extension';

const DefaultAxisParameters = {
  TICK_COUNT: 10,
  ROUND_TO: 1,
  LABEL_ACCESSOR: (value: number) => String(value),
};

/**
 * This is a common base for storing raw point values and converting them to format that can be consumed by ChartViews.
 * In case of one-dimensional data (as for PieChart), a sum of Y values passed to series will be used.
 */
export class DataContainer<DataPoint> {
  // Data properties
  private rawData?: DataSeries<DataPoint>[];
  private namedData: Record<string, number> = {};
  private pointAccessor?: PointAccessor<DataPoint>;

  // Data bounds
  private xBoundsExtension: number[] = [];
  private yBoundsExtension: number[] = [];
  private boundsMargin: Rect = new Rect(0);

  // Scaling
  private xScaleType: DataScaleType = DataScaleType.LINEAR;
  private yScaleType: DataScaleType = DataScaleType.LINEAR;

  // Axes
  private xAxisParameters: AxisParameters = {};
  private yAxisParameters: AxisParameters = {};

  // Data processing properties
  private hasChanged = false;
  private eventListeners: Record<DataContainerEventType, DataContainerEventListener<any, any>[]> =
    Object.values(DataContainerEventType)
      .reduce((listeners, id) => {
        listeners[id] = [];
        return listeners;
      }, {});

  // Extensions
  private extensions: DataContainerExtension[] = [];

  // Computed values
  private series: DataSeries<XYPoint>[] = [];
  private total: number = 0;
  private seriesLength: number = 0;
  private xScale: ScaleContinuousNumeric<number, number> = getContinuousNumericScale(this.xScaleType);
  private yScale: ScaleContinuousNumeric<number, number> = getContinuousNumericScale(this.xScaleType);
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
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  addEventListener<T extends DataContainerEventType, P>(eventType: T, listener: DataContainerEventListener<T, P>) {
    if (this.eventListeners[eventType].includes(listener)) {
      return;
    }
    this.eventListeners[eventType].push(listener);
  }

  removeEventListener<T extends DataContainerEventType, P>(eventType: T, listener: DataContainerEventListener<T, P>) {
    const index = this.eventListeners[eventType].indexOf(listener);
    if (index < 0) {
      return;
    }
    this.eventListeners[eventType].splice(index, 1);
  }

  addExtension(...extensions: DataContainerExtension[]) {
    for (const extension of extensions) {
      if (this.extensions[extension.name]) {
        return this;
      }
      this.extensions[extension.name] = extension;
      extension.attach(this);
    }

    return this;
  }

  getExtension<Extension extends DataContainerExtension>(name: string): Extension | undefined {
    return this.extensions[name];
  }

  removeExtension(...extensions: DataContainerExtension[]) {
    for (const extension of extensions) {
      if (!this.extensions[extension.name]) {
        return this;
      }
      extension.detach(this);
      delete this.extensions[name];
    }

    return this;
  }

  getPointAccessor() {
    return this.pointAccessor;
  }

  setPointAccessor(pointAccessor: PointAccessor<DataPoint> | undefined) {
    this.pointAccessor = pointAccessor;
    this.hasChanged = true;
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  getXScaleType() {
    return this.xScaleType;
  }

  setXScaleType(scaleType: DataScaleType) {
    this.xScaleType = scaleType;
    this.hasChanged = true;
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  getYScaleType() {
    return this.yScaleType;
  }

  setYScaleType(scaleType: DataScaleType) {
    this.yScaleType = scaleType;
    this.hasChanged = true;
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  getXAxisParameters() {
    return this.xAxisParameters;
  }

  setXAxisParameters(xAxisParameters: AxisParameters) {
    this.xAxisParameters = xAxisParameters;
    this.hasChanged = true;
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  getYAxisParameters() {
    return this.yAxisParameters;
  }

  setYAxisParameters(yAxisParameters: AxisParameters) {
    this.yAxisParameters = yAxisParameters;
    this.hasChanged = true;
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  getXBoundsExtension() {
    return this.xBoundsExtension;
  }

  setXBoundsExtension(xBounds: number[]) {
    this.xBoundsExtension = xBounds;
    this.hasChanged = true;
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  getYBoundsExtension() {
    return this.yBoundsExtension;
  }

  setYBoundsExtension(yBounds: number[]) {
    this.yBoundsExtension = yBounds;
    this.hasChanged = true;
    this.postEvent(DataContainerEventType.DATA_CHANGE);
    return this;
  }

  getBoundsMargin() {
    return this.boundsMargin;
  }

  setBoundsMargin(boundsMargin: RectLike) {
    this.boundsMargin = Rect.from(boundsMargin);
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

  getScales(width: number, height: number): ScaleFunctions {
    this.processData();
    return this.postEvent(DataContainerEventType.GET_SCALES, {
      xScale: this.xScale.range([0, width]),
      yScale: this.yScale.range([height, 0]),
    });
  }

  getYValuesMatch(x: number, match?: YValuesMatch): YValuesMatch | undefined {
    this.processData();
    const primarySeries = this.series[0];
    if (isNil(primarySeries) || isEmpty(primarySeries.data)) {
      return match;
    }

    const { data } = primarySeries;
    const clampX = clamp(data[0].x, data[data.length - 1].x);
    const delta = data.length >= 2 ? Math.abs(data[0].x - data[1].x) : 0;
    const index = Math.max(
      0,
      sortedIndexBy(data, { x, y: 0 }, point => point.x - delta / 2) - 1,
    );
    const selectedValue = data[index] || { x: 0, y: 0 };

    const yValues = this.series.reduce((result, series) => {
      result[series.name] = series.data[index]
        ? series.data[index].y
        : undefined;

      return result;
    }, {});

    if (isNil(match)) {
      return {
        x: clampX(x),
        snapX: selectedValue.x,
        snapY: selectedValue.y,
        y: yValues,
      };
    }

    Object.assign(match.y, yValues);
    return match;
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

  postEvent<T extends DataContainerEventType, P>(eventType: T, payload?: P): P {
    const listeners = this.eventListeners[eventType];
    const event = { type: eventType, payload };
    for (let i = 0, l = listeners.length; i < l; i++) {
      event.payload = listeners[i](event);
    }
    return event.payload!;
  }

  private processData() {
    if (!this.hasChanged) {
      return;
    }
    const { rawData } = this;
    this.hasChanged = false;
    if (!rawData || !rawData.length) {
      this.series = [];
      return;
    }

    const series: DataSeries<XYPoint & ViewPoint>[] = new Array(rawData.length);
    let minX: number = Math.min(...this.xBoundsExtension);
    let maxX: number = Math.max(...this.xBoundsExtension);
    let minY: number = Math.min(...this.yBoundsExtension);
    let maxY: number = Math.max(...this.yBoundsExtension);

    let total = 0;
    let seriesLength = 0;
    for (let i = 0, l = rawData.length; i < l; i++) {
      const rawSeries = rawData[i];
      const data = this.getNormalizedData(rawSeries);

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
      .domain([minX - this.boundsMargin.l, maxX + this.boundsMargin.r]);
    this.yScale = getContinuousNumericScale(this.yScaleType)
      .domain([minY - this.boundsMargin.b, maxY + this.boundsMargin.t]);

    this.xAxis = prepareAxisValues(this.xScale, this.xAxisParameters, seriesLength);
    this.yAxis = prepareAxisValues(this.yScale, this.yAxisParameters, seriesLength);
  }

  private getNormalizedData(rawSeries: DataSeries<DataPoint>): XYPoint[] {
    if (this.pointAccessor) {
      return rawSeries.data.map(this.pointAccessor);
    }
    if (isXYArray(rawSeries.data)) {
      return rawSeries.data.map(({ x, y }: XYPoint) => ({ x, y }));
    }
    console.warn('You are probably missing PointAccessor in your DataContainer configuration.');
    return [];
  }
}
