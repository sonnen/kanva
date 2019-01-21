import { Context, Font, font, RequiredViewChanges, TextAlign, TextBaseline, View, ViewCanvas } from '@kanva/core';
import { DataContainer } from '../data-container';

export interface AxisViewStyle {
  strokeColor?: string;
  lineThickness?: number;
  textColor?: string;
  textBaseline?: TextBaseline;
  textAlign?: TextAlign;
  font?: Font;
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
  font: { fontSize: 12, fontFamily: 'Arial' },
  textAlign: TextAlign.CENTER,
  textBaseline: TextBaseline.MIDDLE,
  lineThickness: 1.5,
};

export class AxisView<DataPoint> extends View<AxisViewProps> {
  private dataContainer?: DataContainer<any>;
  private style: AxisViewStyle = DEFAULT_STYLE;
  private orientation: AxisOrientation = AxisOrientation.HORIZONTAL;

  constructor(context: Context) {
    super(context, 'AxisView');
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
      if (!this.style.font) {
        return 0;
      }
      return this.style.font.fontSize + (this.style.lineThickness || 0);
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
          fontString: font(this.style.font || DEFAULT_STYLE.font),
        }).width);
      return Math.max(...axisData);
    }
    const axisData = this.dataContainer.getXAxisData();
    return Math.max(axisData[0].position, axisData[axisData.length - 1].position);
  }

  onDraw(canvas: ViewCanvas) {
    const {
      innerWidth, innerHeight,
      dataContainer,
      style: { strokeColor, lineThickness, font: fontStyle, textColor, textBaseline, textAlign },
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
    ctx.font = font(fontStyle || DEFAULT_STYLE.font);
    ctx.textBaseline = textBaseline || DEFAULT_STYLE.textBaseline;
    ctx.textAlign = textAlign || DEFAULT_STYLE.textAlign;
    if (orientation === AxisOrientation.HORIZONTAL) {
      const maxWidth = (axisData[0] && axisData[1])
        ? Math.abs(axisData[0].position - axisData[1].position)
        : innerWidth;
      let y: number;
      switch (ctx.textBaseline) {
        case TextBaseline.TOP:
          y = 0;
          break;
        case TextBaseline.BOTTOM:
          y = innerHeight;
          break;
        default:
        case TextBaseline.MIDDLE:
          y = innerHeight / 2;
          break;
      }
      for (let i = 0, l = axisData.length; i < l; i++) {
        ctx.fillText(axisData[i].value, axisData[i].position, y, maxWidth);
      }
    } else {
      const maxWidth = this.innerWidth;
      let x: number;
      switch (ctx.textAlign) {
        case TextAlign.START:
        case TextAlign.LEFT:
          x = 0;
          break;
        case TextAlign.END:
        case TextAlign.RIGHT:
          x = innerWidth;
          break;
        default:
        case TextAlign.CENTER:
          x = innerWidth / 2;
          break;
      }
      for (let i = 0, l = axisData.length; i < l; i++) {
        ctx.fillText(axisData[i].value, x, axisData[i].position, maxWidth);
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
