import { Context, RequiredViewChanges, View, ViewCanvas } from '@kanva/core';
import { DataDisplayType } from '../chart.types';
import { DataContainer, DataContainerEvent } from '../data-container';

export interface AreaChartViewStyle {
  type: DataDisplayType;
  strokeColor?: string;
  lineThickness?: number;
  fillColor?: string;
}

export interface AreaChartViewProps {
  dataContainer?: DataContainer<any>;
  dataSeries: string;
  style?: AreaChartViewStyle;
}

const DEFAULT_STYLE: AreaChartViewStyle = {
  type: DataDisplayType.LINE,
  strokeColor: '#000',
  lineThickness: 1.5,
};

export class AreaChartView<DataPoint> extends View<AreaChartViewProps> {
  private dataContainer?: DataContainer<any>;
  private dataSeries?: string;
  private style: AreaChartViewStyle = DEFAULT_STYLE;

  constructor(context: Context) {
    super(context, 'AreaChartView');
  }

  onDataContainerEvent = (event: DataContainerEvent) => {
    if (event === DataContainerEvent.DATA_CHANGE) {
      this.require(RequiredViewChanges.LAYOUT);
    }
  };

  getStyle() {
    return this.style;
  }

  setStyle(style: AreaChartViewStyle | undefined) {
    this.style = style || DEFAULT_STYLE;
    this.require(RequiredViewChanges.DRAW);
  }

  getDataSeries() {
    return this.dataSeries;
  }

  setDataSeries(series: string) {
    this.dataSeries = series;
    this.require(RequiredViewChanges.DRAW);
  }

  getDataContainer() {
    return this.dataContainer;
  }

  setDataContainer(dataContainer: DataContainer<any>) {
    if (this.dataContainer === dataContainer) {
      return;
    }
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(this.onDataContainerEvent);
    }
    this.dataContainer = dataContainer;
    dataContainer.addEventListener(this.onDataContainerEvent);
    this.require(RequiredViewChanges.LAYOUT);
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

  onSizeChanged(w: number, h: number, ow: number, oh: number) {
    if (this.dataContainer) {
      this.dataContainer.calculate(this.innerWidth, this.innerHeight);
    }
  }

  onDestroy() {
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(this.onDataContainerEvent);
    }
  }

  onSnapshot() {
    return {
      style: this.style,
      dataContainer: this.dataContainer,
      dataSeries: this.dataSeries,
    };
  }

}
