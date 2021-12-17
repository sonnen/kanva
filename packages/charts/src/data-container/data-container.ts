import { CanvasPointerEvent, Rect, RectLike } from '@kanva/core';
import { ScaleContinuousNumeric } from 'd3-scale';
import { isEmpty, isNil, isNumber } from 'lodash';
import { DataScaleType, DataSeries, PointAccessor, ViewPoint, XYPoint, YValuesMatch } from '../chart.types';
import {
  AxisParameters,
  AxisPoint,
  findBestMatchInSortedArray,
  getContinuousNumericScale,
  isXYArray,
  isTupleOfNumbers,
  prepareAxisValues,
  ScaleFunctions,
} from '../utils';
import { DataContainerEventListener, DataContainerEventType } from './data-container.events';
import { DataContainerExtension } from './data-container.extension';

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
  private eventListeners = Object.values(DataContainerEventType)
      .reduce((listeners, id) => {
        listeners[id] = [];
        return listeners;
      }, {} as Record<DataContainerEventType, DataContainerEventListener<any>[]>);

  // Extensions
  private extensions: DataContainerExtension[] = [];

  // Computed values
  private series: DataSeries<XYPoint<any>>[] = [];
  private total = 0;
  private seriesLength = 0;
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
      if (this.extensions.indexOf(extension) >= 0) {
        continue;
      }
      this.extensions.push(extension);
      extension.attach(this);
    }

    return this;
  }

  getExtension<Extension extends DataContainerExtension>(name: string): Extension | undefined {
    return this.extensions.find(extension => extension.name === name) as Extension | undefined;
  }

  removeExtension(...extensions: DataContainerExtension[]) {
    for (const extension of extensions) {
      const index = this.extensions.indexOf(extension);
      if (index < 0) {
        continue;
      }
      extension.detach(this);
      this.extensions.splice(index, 1);
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

  getDataSeries(name: string | undefined): DataSeries<XYPoint<any>> | undefined {
    if (!name) {
      return undefined;
    }
    this.processData();
    return this.series[this.namedData[name]];
  }

  getAllDataSeries(): DataSeries<XYPoint<any>>[] {
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
    const matcher = (element: XYPoint) => element.x - x;
    let primary: XYPoint | undefined = match && match.primary;

    const values = this.series.reduce((yValues, series) => {
      if (isNil(series) || isEmpty(series.data)) {
        return yValues;
      }

      const filteredData = series.data.filter(Boolean);

      if (filteredData.length
        && (x < filteredData[0].x || x > filteredData[series.data.length - 1].x)
      ) {
        yValues[series.name] = undefined;
      } else {
        const match = findBestMatchInSortedArray(filteredData, matcher);
        yValues[series.name] = match;
      }

      return yValues;
    }, {});

    primary = this.findBestMatch(primary, values, matcher);

    if (!primary) {
      return undefined;
    }

    if (isNil(match)) {
      return {
        x,
        primary,
        values,
      };
    }

    Object.assign(match.values, values);
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

  onChartPointerEvent(event: CanvasPointerEvent): boolean {
    const extensions = this.extensions;
    for (let i = 0, l = extensions.length; i < l; i++) {
      if (extensions[i].onChartPointerEvent(event)) {
        return true;
      }
    }
    return false;
  }

  private findBestMatch(
    primary: XYPoint | undefined,
    values: object,
    matcher: (element: XYPoint) => number,
  ) {
    const matchValuesArray: XYPoint[] = [];
    Object.keys(values).forEach(key => values[key] && matchValuesArray.push(values[key]));
    if (primary) {
      matchValuesArray.push(primary);
    }

    return findBestMatchInSortedArray(matchValuesArray.sort(), matcher);
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

    const series: DataSeries<XYPoint<any> & ViewPoint>[] = new Array(rawData.length);
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

          if (x < minX) {
            minX = x;
          }
          if (x > maxX) {
            maxX = x;
          }

          if (isNumber(y)) {
            if (y < minY) {
              minY = y;
            }
            if (y > maxY) {
              maxY = y;
            }
            sum += y;
          }

          if (isTupleOfNumbers(y)) {
            const [y1, y2] = y;
            if (y1 < minY) {
              minY = y1;
            }
            if (y2 > maxY) {
              maxY = y2;
            }
          }
        }
        if (seriesLength < data.length) {
          seriesLength = data.length;
        }
      }

      series[i] = {
        name: rawSeries.name,
        sum,
        data: data as (XYPoint<any> & ViewPoint)[],
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

  private getNormalizedData(rawSeries: DataSeries<DataPoint>): XYPoint<any>[] {
    if (this.pointAccessor) {
      return rawSeries.data.map(this.pointAccessor);
    }
    if (isXYArray(rawSeries.data)) {
      return rawSeries.data.map(({ x, y }: XYPoint<any>) => ({ x, y }));
    }
    console.warn('You are probably missing PointAccessor in your DataContainer configuration.');
    return [];
  }
}
