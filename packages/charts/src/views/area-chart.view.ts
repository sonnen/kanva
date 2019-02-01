import { Context, ViewCanvas } from '@kanva/core';
import { DataDisplayType } from '../chart.types';
import { ChartView, ChartViewProps } from './chart.view';

export interface AreaChartViewStyle {
  type: DataDisplayType;
  strokeColor?: string;
  lineThickness?: number;
  fillColor?: string;
}

export interface AreaChartViewProps extends ChartViewProps<AreaChartViewStyle> {
}

const DEFAULT_STYLE: AreaChartViewStyle = {
  type: DataDisplayType.LINE,
  strokeColor: '#000',
  lineThickness: 1.5,
};

export class AreaChartView extends ChartView<AreaChartViewProps> {
  constructor(context: Context) {
    super(context, 'AreaChartView', DEFAULT_STYLE);
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    const series = dataContainer && dataContainer.getDataSeries(innerWidth, innerHeight, dataSeries);
    const { type, fillColor, lineThickness, strokeColor } = style;

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
        if (fillColor) {
          ctx.fillStyle = fillColor;
          ctx.fill();
        }
        break;
      case DataDisplayType.POINTS:
        const size = lineThickness || 1;
        const radius = size / 2;
        if (fillColor) {
          ctx.fillStyle = fillColor;
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
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineThickness || 1;
      ctx.stroke();
    }
  }
}
