import { Context, ViewCanvas } from '@kanva/core';
import { DataDisplayType } from '../chart.types';
import { ChartView, ChartViewProps } from './chart.view';

export interface AreaChartViewStyle {
  type: DataDisplayType;
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
}

export interface AreaChartViewProps extends ChartViewProps<AreaChartViewStyle> {
  dataSeries: string;
}

const defaultStyle = {
  type: DataDisplayType.LINE,
  lineThickness: 1.5,
};

export class AreaChartView extends ChartView<AreaChartViewProps> {
  constructor(context: Context) {
    super(context, 'AreaChartView', defaultStyle);
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    const series = dataContainer && dataContainer.getDataSeries(innerWidth, innerHeight, dataSeries);
    const { type, fillStyle, lineWidth, strokeStyle } = style;

    if (!series || !series.data.length) {
      return;
    }

    const ctx = canvas.context;
    const data = series.data;

    ctx.beginPath();
    switch (type) {
      case DataDisplayType.AREA:
        ctx.moveTo(data[0].vx, innerHeight);
        for (let i = 0, l = data.length; i < l; i++) {
          ctx.lineTo(data[i].vx, data[i].vy);
        }
        ctx.lineTo(data[data.length - 1].vx, innerHeight);
        ctx.closePath();
        if (fillStyle) {
          ctx.fillStyle = fillStyle;
          ctx.fill();
        }
        break;
      case DataDisplayType.POINTS:
        const size = lineWidth || 1;
        const radius = size / 2;
        if (fillStyle) {
          ctx.fillStyle = fillStyle;
          for (let i = 0, l = data.length; i < l; i++) {
            ctx.fillRect(data[i].vx - radius, data[i].vy - radius, size, size);
          }
        }
        break;
      default:
      case DataDisplayType.LINE:
        ctx.moveTo(data[0].vx, data[0].vy);
        for (let i = 1, l = data.length; i < l; i++) {
          ctx.lineTo(data[i].vx, data[i].vy);
        }
        break;
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth || 1;
      ctx.stroke();
    }
  }
}
