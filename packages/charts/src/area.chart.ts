import { Context, RequiredViewChanges, View, ViewCanvas } from '@kanva/core';
import { createReactView } from '@kanva/react';
import { DataDisplayType, DataScaleType, DataSeries, PointAccessor } from './chart.types';
import { getContinuousNumericScale, isXYArray } from './utils';

export interface AreaChartProps<DataPoint> {
  data: DataPoint[][];
  pointAccessor?: PointAccessor<DataPoint>;
  xScaleType?: DataScaleType;
  yScaletype?: DataScaleType;
}

export class AreaChartView<DataPoint> extends View<AreaChartProps<DataPoint>> {
  // Data properties
  private rawData?: DataPoint[][];
  private pointAccessor?: PointAccessor<DataPoint>;
  private xScaleType: DataScaleType = DataScaleType.LINEAR;
  private yScaleType: DataScaleType = DataScaleType.LINEAR;

  // Style properties
  private type: DataDisplayType = DataDisplayType.LINE;
  private strokeColor?: string;
  private lineThickness?: number;
  private fillColor?: string;

  // Computed values
  private series: DataSeries[] = [];

  constructor(context: Context) {
    super(context, 'AreaChartView');
  }

  getData() {
    return this.rawData;
  }

  setData(data: DataPoint[][]) {
    this.rawData = data;
    this.require(RequiredViewChanges.LAYOUT);
  }

  getPointAccessor() {
    return this.pointAccessor;
  }

  setPointAccessor(pointAccessor: PointAccessor<DataPoint> | undefined) {
    this.pointAccessor = pointAccessor;
    this.require(RequiredViewChanges.LAYOUT);
  }

  getXScaleType() {
    return this.xScaleType;
  }

  setXScaleType(scaleType: DataScaleType) {
    this.xScaleType = scaleType;
    this.require(RequiredViewChanges.LAYOUT);
  }

  getYScaleType() {
    return this.yScaleType;
  }

  setYScaleType(scaleType: DataScaleType) {
    this.yScaleType = scaleType;
    this.require(RequiredViewChanges.LAYOUT);
  }

  onLayout() {
    const { pointAccessor, rawData, innerHeight, innerWidth, xScaleType, yScaleType } = this;
    if (!rawData) {
      this.series = [];
      return;
    }

    const series = new Array(rawData.length);
    let minX: number | undefined;
    let maxX: number | undefined;
    let minY: number | undefined;
    let maxY: number | undefined;
    for (let i = 0, l = rawData.length; i < l; i++) {
      const rawSeries = rawData[i];
      const data = pointAccessor ? rawSeries.map(pointAccessor) : isXYArray(rawSeries) ? rawSeries : [];

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

      this.series[i] = {
        data,
      };
    }

    const xScale = getContinuousNumericScale(xScaleType)
      .range([0, innerWidth])
      .domain([minX || 0, maxX || 1]);
    const yScale = getContinuousNumericScale(yScaleType)
      .range([0, innerHeight])
      .domain([minY || 0, maxY || 1]);

  }

  onDraw(canvas: ViewCanvas) {
    /*
    const { series } = this;
    const ctx = canvas.context;

    for(let i=0, l=series.length; i<l;i++) {
      ctx.beginPath();

      ctx.lineTo();
      ctx.closePath();
      ctx.fill();
    }
    */
  }

}

export const AreaChartReactView = createReactView<AreaChartProps<unknown>>(AreaChartView);
