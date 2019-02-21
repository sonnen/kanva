import { Context, ViewCanvas } from '@kanva/core';
import { DataDisplayType, ViewPoint } from '../chart.types';
import { segmentizePoints } from '../utils';
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
  private data: ViewPoint[][] = [];

  constructor(context: Context) {
    super(context, 'AreaChartView', defaultStyle);
  }

  onLayout(): void {
    const { dataContainer, dataSeries, innerHeight, innerWidth, style } = this;
    if (!dataContainer || !dataSeries) {
      this.data = [];
      return;
    }
    const series = dataContainer.getDataSeries(dataSeries[0]);
    if (!series || !series.data.length) {
      this.data = [];
      return;
    }

    const halfLineWidth = (style.lineWidth || 0);
    const { xScale, yScale } = dataContainer.getScales(
      innerWidth - halfLineWidth,
      innerHeight - halfLineWidth,
    );

    const dataSegments = segmentizePoints(series.data, null);

    this.data = dataSegments.map(
      segment => segment.map(({ x, y }) => ({
        vx: xScale(x),
        vy: yScale(y),
      })),
    );
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    const { type, fillStyle, lineWidth = 0, strokeStyle } = style;
    const ctx = canvas.context;
    const dataSegments = this.data;

    if (!dataSegments.length) {
      return;
    }

    ctx.translate(lineWidth / 2, lineWidth / 2);

    for (let s = 0, sl = dataSegments.length; s < sl; s++) {
      const data = dataSegments.length[s];

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
}
