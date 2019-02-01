import { Context, Font, font, RequiredViewChanges, TextAlign, TextBaseline, View, ViewCanvas } from '@kanva/core';
import { AxisPoint } from '../chart.types';
import { DataContainer, DataContainerEvent } from '../data-container';
import { ChartViewProps } from './chart.view';

export interface AxisViewStyle {
  textColor?: string;
  textBaseline?: TextBaseline;
  textAlign?: TextAlign;
  font?: Font;
}

export enum AxisOrientation {
  HORIZONTAL,
  VERTICAL,
}

export interface AxisViewProps extends ChartViewProps<AxisViewStyle> {
  orientation: AxisOrientation;
  dataContainer?: DataContainer<any>;
  style?: AxisViewStyle;
}

const DefaultAxisViewStyle = {
  strokeColor: '#000',
  textColor: '#000',
  font: { fontSize: 12, fontFamily: 'Arial' },
  textAlign: TextAlign.CENTER,
  textBaseline: TextBaseline.MIDDLE,
  lineThickness: 1.5,
};

export class AxisView<DataPoint> extends View<AxisViewProps> {
  private dataContainer?: DataContainer<any>;
  private style: AxisViewStyle = DefaultAxisViewStyle;
  private orientation: AxisOrientation = AxisOrientation.HORIZONTAL;

  constructor(context: Context) {
    super(context, 'AxisView');
  }

  onDataContainerEvent = (event: DataContainerEvent) => {
    if (event === DataContainerEvent.CALCULATION) {
      this.require(RequiredViewChanges.MEASURE);
    }
  };

  getStyle() {
    return this.style;
  }

  setStyle(style: AxisViewStyle | undefined) {
    this.style = style || DefaultAxisViewStyle;
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

  getInternalWrappedHeight(canvas: ViewCanvas) {
    if (!this.dataContainer) {
      return 0;
    }

    const lineHeight = (this.style.font || DefaultAxisViewStyle.font).fontSize;
    switch (this.orientation) {
      case AxisOrientation.VERTICAL: {
        const axisData = this.dataContainer.getYAxisData();
        const point = axisData[axisData.length - 1];
        const position = point.position;
        switch (this.style.textBaseline || DefaultAxisViewStyle.textBaseline) {
          case TextBaseline.MIDDLE:
            return position + lineHeight / 2;
          case TextBaseline.TOP:
            return position + lineHeight;
          case TextBaseline.BOTTOM:
          default:
            return position;
        }
      }
      case AxisOrientation.HORIZONTAL:
      default: {
        if (!this.style.font) {
          return 0;
        }
        return lineHeight;
      }
    }
  }

  getInternalWrappedWidth(canvas: ViewCanvas) {
    if (!this.dataContainer) {
      return 0;
    }

    switch (this.orientation) {
      case AxisOrientation.VERTICAL: {
        const axisData = this.dataContainer.getYAxisData()
          .map(point => this.getPointTextWidth(canvas, point));
        return Math.max(...axisData);
      }
      case AxisOrientation.HORIZONTAL:
      default: {
        const axisData = this.dataContainer.getXAxisData();
        const point = axisData[axisData.length - 1];
        const position = point.position;
        const width = this.getPointTextWidth(canvas, point);
        switch (this.style.textAlign || DefaultAxisViewStyle.textAlign) {
          case TextAlign.CENTER:
            return position + width / 2;
          case TextAlign.LEFT:
          case TextAlign.START:
            return position + width;
          case TextAlign.RIGHT:
          case TextAlign.END:
          default:
            return position;
        }
      }
    }
  }

  onDestroy() {
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(this.onDataContainerEvent);
    }
  }

  onDraw(canvas: ViewCanvas) {
    const {
      innerWidth, innerHeight,
      dataContainer,
      style: { font: fontStyle, textColor, textBaseline, textAlign },
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
    ctx.fillStyle = textColor || DefaultAxisViewStyle.textColor;
    ctx.font = font(fontStyle || DefaultAxisViewStyle.font);
    ctx.textBaseline = textBaseline || DefaultAxisViewStyle.textBaseline;
    ctx.textAlign = textAlign || DefaultAxisViewStyle.textAlign;
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

  private getPointTextWidth(canvas: ViewCanvas, point: AxisPoint) {
    return canvas.measureText({
      text: point.value,
      fontString: font(this.style.font || DefaultAxisViewStyle.font),
    }).width;
  }
}
