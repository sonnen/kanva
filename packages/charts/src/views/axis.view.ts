import { Context, RequiredViewChanges, View, ViewCanvas } from '@kanva/core';
import { DataContainer } from '../data-container';

export interface AxisViewStyle {
  strokeColor?: string;
  lineThickness?: number;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
}

export enum AxisOrientation {
  HORIZONTAL,
  VERTICAL,
}

export interface AxisViewProps {
  orientation: AxisOrientation;
  dataContainer?: DataContainer<any>;
  style?: AxisViewStyle;
}

const DEFAULT_STYLE = {
  strokeColor: '#000',
  textColor: '#000',
  fontFamily: 'Arial',
  fontSize: 12,
  lineThickness: 1.5,
};

export class AxisView<DataPoint> extends View<AxisViewProps> {
  private dataContainer?: DataContainer<any>;
  private style: AxisViewStyle = DEFAULT_STYLE;
  private orientation: AxisOrientation = AxisOrientation.HORIZONTAL;

  constructor(context: Context) {
    super(context, 'AreaChartView');
  }

  getStyle() {
    return this.style;
  }

  setStyle(style: AxisViewStyle | undefined) {
    this.style = style || DEFAULT_STYLE;
    this.require(RequiredViewChanges.DRAW);
  }

  getOrientation() {
    return this.orientation;
  }

  setOrientation(orientation: AxisOrientation) {
    this.orientation = orientation;
    this.require(RequiredViewChanges.DRAW);
  }

  getDataContainer() {
    return this.dataContainer;
  }

  setDataContainer(dataContainer: DataContainer<any>) {
    this.dataContainer = dataContainer;
    this.require(RequiredViewChanges.DRAW);
  }

  getInternalWrappedHeight() {
    if (this.orientation === AxisOrientation.HORIZONTAL) {
      if (!this.style.fontSize) {
        return 0;
      }
      return this.style.fontSize + (this.style.lineThickness || 0);
    }
    if (!this.dataContainer) {
      return 0;
    }
    const axisData = this.dataContainer.getYAxisData();
    return Math.max(axisData[0].position, axisData[axisData.length - 1].position);
  }

  getInternalWrappedWidth(canvas: ViewCanvas) {
    if (!this.dataContainer) {
      return 0;
    }
    if (this.orientation === AxisOrientation.VERTICAL) {
      const axisData = this.dataContainer.getXAxisData()
        .map(point => canvas.measureText({
          text: point.value,
          fontFamily: this.style.fontFamily || DEFAULT_STYLE.fontFamily,
          fontSize: this.style.fontSize || DEFAULT_STYLE.fontSize,
        }));
    }
    const axisData = this.dataContainer.getXAxisData();
    return Math.max(axisData[0].position, axisData[axisData.length - 1].position);
  }

  onDraw(canvas: ViewCanvas) {
    const {
      innerWidth, innerHeight,
      dataContainer,
      style: { strokeColor, lineThickness, fontSize, fontFamily, textColor },
      orientation,
    } = this;
    const axisData = dataContainer && (orientation === AxisOrientation.HORIZONTAL
        ? dataContainer.getXAxisData()
        : dataContainer.getYAxisData()
    );
    if (!axisData || !axisData.length) {
      return;
    }
    const ctx = canvas.context;

    if (strokeColor && lineThickness) {
      ctx.strokeStyle = strokeColor;
      ctx.strokeRect(0, 0, innerWidth, lineThickness);
    }
    ctx.fillStyle = textColor || DEFAULT_STYLE.textColor;
    ctx.font = `${fontSize}px ${fontFamily}`;
    if (AxisOrientation.HORIZONTAL) {
      for (let i = 0, l = axisData.length; i < l; i++) {
        ctx.fillText(axisData[i].value, innerWidth / 2, axisData[i].position);
      }
    } else {
      for (let i = 0, l = axisData.length; i < l; i++) {
        ctx.fillText(axisData[i].value, axisData[i].position, innerHeight / 2);
      }
    }
  }

  onSnapshot() {
    return {
      style: this.style,
      dataContainer: this.dataContainer,
      orientation: this.orientation,
    };
  }

}
