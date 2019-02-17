import { Context, RequiredViewChanges, View, ViewCanvas } from '@kanva/core';
import { DataContainer, DataContainerEvent } from '../data-container';
import { AxisPoint, prepareAxisPoints } from '../utils';
import { ChartViewProps } from './chart.view';

export enum GridLines {
  HORIZONTAL,
  VERTICAL,
  BOTH,
}

export interface ChartGridViewStyle {
  strokeStyle?: string;
  lineCap?: CanvasLineCap;
  lineWidth?: number;
}

export interface ChartGridViewProps extends ChartViewProps<ChartGridViewStyle> {
  gridLines: GridLines;
}

const defaultStyle = {
  strokeStyle: '#000',
  thickness: 1,
};

export class ChartGridView extends View<ChartGridViewProps> {
  private dataContainer?: DataContainer<any>;
  private gridLines: GridLines = GridLines.BOTH;
  private style: ChartGridViewStyle = defaultStyle;
  // Calculated values
  private xAxis: AxisPoint[] = [];
  private yAxis: AxisPoint[] = [];

  constructor(context: Context) {
    super(context, 'ChartGridView');
  }

  onLayout(): void {
    if (!this.dataContainer) {
      this.xAxis = this.yAxis = [];
      return;
    }
    const scales = this.dataContainer.getScales(this.innerWidth, this.innerHeight);
    this.xAxis = prepareAxisPoints(
      this.dataContainer.getXAxisData(),
      scales.xScale,
    );
    this.yAxis = prepareAxisPoints(
      this.dataContainer.getYAxisData(),
      scales.yScale,
    );
  }

  onDataContainerEvent = (event: DataContainerEvent) => {
    if (event === DataContainerEvent.DATA_CHANGE) {
      this.require(RequiredViewChanges.DRAW);
    }
  };

  getGridLines() {
    return this.gridLines;
  }

  setGridLines(gridLines: GridLines) {
    this.gridLines = gridLines;
    this.require(RequiredViewChanges.DRAW);
  }

  getStyle() {
    return this.style;
  }

  setStyle(style: ChartGridViewStyle | undefined) {
    this.style = style || defaultStyle;
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
    this.require(RequiredViewChanges.DRAW);
  }

  onDestroy() {
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(this.onDataContainerEvent);
    }
  }

  onDraw(canvas: ViewCanvas) {
    const {
      gridLines,
      innerWidth, innerHeight,
      dataContainer,
      style: { strokeStyle, lineCap, lineWidth = 1 },
      xAxis,
      yAxis,
    } = this;
    if (!strokeStyle) {
      return;
    }

    const ctx = canvas.context;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = lineCap || 'butt';
    ctx.lineWidth = lineWidth;
    const halfLineWidth = ctx.lineWidth / 2;

    ctx.translate(lineWidth / 2, lineWidth / 2);
    ctx.beginPath();
    if (gridLines !== GridLines.HORIZONTAL) {
      for (let i = 0, l = xAxis.length; i < l; i++) {
        const position = xAxis[i].position;
        ctx.moveTo(position, 0);
        ctx.lineTo(position, innerHeight);
      }
    }
    if (gridLines !== GridLines.VERTICAL) {
      for (let i = 0, l = yAxis.length; i < l; i++) {
        const position = yAxis[i].position;
        ctx.moveTo(0, position);
        ctx.lineTo(innerWidth, position);
      }
    }
    ctx.stroke();
  }
}
