import { Context, ViewCanvas } from '@kanva/core';
import { DataContainer } from '../data-container';
import { ChartView, ChartViewProps } from './chart.view';

export interface PieChartViewStyle {
  strokeColor?: string;
  lineThickness?: number;
  fillColor?: string;
  innerRadius?: number;
  lineCap: CanvasLineCap;
}

export interface PieChartViewProps extends ChartViewProps<PieChartViewStyle> {
  dataContainer?: DataContainer<any>;
  dataSeries: string;
  style?: PieChartViewStyle;
}

const DEFAULT_STYLE: PieChartViewStyle = {
  strokeColor: '#000',
  lineThickness: 1.5,
  innerRadius: 0,
  lineCap: 'butt',
};

export class PieChartView<DataPoint> extends ChartView<PieChartViewProps> {
  constructor(context: Context) {
    super(context, 'PieChartView', DEFAULT_STYLE);
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    const series = dataContainer && dataContainer.getDataSeries(innerWidth, innerHeight, dataSeries);
    const { fillColor, lineThickness, strokeColor } = style;

    if (!series || !series.data.length) {
      return;
    }

    const ctx = canvas.context;
    const data = series.data;

    ctx.beginPath();
    ctx.moveTo(data[0].x, innerHeight);
    for (let i = 0, l = data.length; i < l; i++) {
      ctx.lineTo(data[i].vx, data[i].vy);
    }
    ctx.lineTo(data[data.length - 1].vx, innerHeight);
    ctx.closePath();
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineThickness || 1;
      ctx.stroke();
    }
  }
}
