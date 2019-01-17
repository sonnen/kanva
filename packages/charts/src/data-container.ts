import { DataScaleType, DataSeries, PointAccessor, XYPoint } from './chart.types';
import { getContinuousNumericScale, isXYArray } from './utils';

export class DataContainer<DataPoint> {
  // Data properties
  private rawData?: DataSeries<DataPoint>[];
  private namedData: Record<string, number> = {};
  private pointAccessor?: PointAccessor;
  private xScaleType: DataScaleType = DataScaleType.LINEAR;
  private yScaleType: DataScaleType = DataScaleType.LINEAR;
  private hasChanged = false;

  // Computed values
  private forWidth: number = 0;
  private forHeight: number = 0;
  private series: DataSeries<XYPoint>[] = [];

  getData() {
    return this.rawData;
  }

  setData(data: DataSeries<DataPoint>[]) {
    if (this.rawData === data) {
      return;
    }
    this.rawData = data;
    this.namedData = {};
    this.rawData.forEach((data, index) => this.namedData[data.name] = index);
    this.hasChanged = true;
    return this;
  }

  getPointAccessor() {
    return this.pointAccessor;
  }

  setPointAccessor(pointAccessor: PointAccessor | undefined) {
    this.pointAccessor = pointAccessor;
    this.hasChanged = true;
    return this;
  }

  getXScaleType() {
    return this.xScaleType;
  }

  setXScaleType(scaleType: DataScaleType) {
    this.xScaleType = scaleType;
    this.hasChanged = true;
    return this;
  }

  getYScaleType() {
    return this.yScaleType;
  }

  setYScaleType(scaleType: DataScaleType) {
    this.yScaleType = scaleType;
    this.hasChanged = true;
    return this;
  }

  calculate(width: number, height: number) {
    const { pointAccessor, rawData, xScaleType, yScaleType, hasChanged, forWidth, forHeight } = this;
    if (!hasChanged && forWidth === width && forHeight === height) {
      return;
    }
    this.hasChanged = false;
    this.forWidth = width;
    this.forHeight = height;
    if (!rawData || !rawData.length) {
      this.series = [];
      return;
    }

    const series: DataSeries<XYPoint>[] = new Array(rawData.length);
    let minX: number | undefined;
    let maxX: number | undefined;
    let minY: number | undefined;
    let maxY: number | undefined;

    for (let i = 0, l = rawData.length; i < l; i++) {
      const rawSeries = rawData[i];
      const data: XYPoint[] = pointAccessor
        ? rawSeries.data.map(pointAccessor)
        : isXYArray(rawSeries.data) ? rawSeries.data.map(({ x, y }: XYPoint) => ({ x, y })) : [];

      if (data.length) {
        if (minX === undefined || maxX === undefined || minY === undefined || maxY === undefined) {
          minX = maxX = data[0].x;
          minY = maxY = data[0].y;
        }
        for (let i = 1, l = data.length; i < l; i++) {
          const point = data[i];
          if (point.y < minY) {
            minY = point.y;
          }
          if (point.y > maxY) {
            maxY = point.y;
          }
          if (point.x < minX) {
            minX = point.x;
          }
          if (point.x > maxX) {
            maxX = point.x;
          }
        }
      }

      series[i] = {
        name: rawSeries.name,
        data,
      };
    }

    const xScale = getContinuousNumericScale(xScaleType)
      .range([0, width])
      .domain([minX || 0, maxX || 1]);
    const yScale = getContinuousNumericScale(yScaleType)
      .range([height, 0])
      .domain([minY || 0, maxY || 1]);

    for (let i = 0, l = series.length; i < l; i++) {
      const singleSeries = series[i].data;
      for (let j = 0, jl = singleSeries.length; j < jl; j++) {
        const point = singleSeries[j];
        point.x = xScale(point.x);
        point.y = yScale(point.y);
      }
    }

    this.series = series;
  }

  getDataSeries(width: number, height: number, name: string | undefined): DataSeries<XYPoint> | undefined {
    if (!name) {
      return undefined;
    }
    this.calculate(width, height);
    return this.series[this.namedData[name]];
  }
}
