import {
  Context,
  Paint,
  removeUndefinedProps,
  RequiredViewChanges,
  TextAlign,
  TextBaseline,
  View,
  ViewCanvas,
} from '@kanva/core';
import { DataContainer } from '../data-container';
import { DataContainerEventType } from '../data-container/data-container.events';
import { AxisPoint, prepareAxisPoints } from '../utils';
import { ChartViewProps } from './chart.view';

export interface AxisViewStyle {
  labelPaint?: Paint;
  labelPadding?: number;
}

export enum AxisOrientation {
  HORIZONTAL,
  VERTICAL,
}

export interface AxisViewProps extends ChartViewProps<AxisViewStyle> {
  orientation: AxisOrientation;
}

const defaultStyle = {
  labelPaint: new Paint().setFillStyle('#000'),
  labelPadding: 4,
};

export class AxisView<DataPoint> extends View<AxisViewProps> {
  private dataContainer?: DataContainer<any>;
  private style: AxisViewStyle = defaultStyle;
  private orientation: AxisOrientation = AxisOrientation.HORIZONTAL;
  // Calculated values
  private data: AxisPoint[] = [];

  constructor(context: Context) {
    super(context, 'AxisView');
  }

  onLayout(): void {
    this.data = this.getPoints();
  }

  onDataChange = () => {
    this.require(RequiredViewChanges.LAYOUT);
  };

  getStyle() {
    return this.style;
  }

  setStyle(style: AxisViewStyle | undefined) {
    this.style = style || defaultStyle;
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
      this.dataContainer.removeEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    }
    this.dataContainer = dataContainer;
    dataContainer.addEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    this.require(RequiredViewChanges.DRAW);
  }

  getInternalWrappedHeight(canvas: ViewCanvas) {
    if (!this.dataContainer) {
      return 0;
    }

    const labelPaint = this.style.labelPaint || defaultStyle.labelPaint;
    const lineHeight = labelPaint.getLineHeight();
    switch (this.orientation) {
      case AxisOrientation.VERTICAL: {
        const axisData = this.dataContainer.getYAxisData();
        const position = axisData.length * lineHeight;
        switch (labelPaint.textBaseline) {
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
        const axisData = this.dataContainer.getYAxisData().map(point => this.getPointTextWidth(canvas, point));
        return Math.max(...axisData);
      }
      case AxisOrientation.HORIZONTAL:
      default: {
        const axisData = this.dataContainer.getXAxisData();
        const point = axisData[axisData.length - 1];
        const position = axisData.length;
        const width = this.getPointTextWidth(canvas, point);
        switch ((this.style.labelPaint || defaultStyle.labelPaint).textAlign) {
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
      this.dataContainer.removeEventListener(DataContainerEventType.DATA_CHANGE, this.onDataChange);
    }
  }

  onDraw(canvas: ViewCanvas) {
    const {
      innerWidth, innerHeight,
      dataContainer,
      style: {
        labelPaint = defaultStyle.labelPaint,
        labelPadding = defaultStyle.labelPadding,
      } = defaultStyle,
      orientation,
    } = this;
    const axisData = this.data;
    if (!axisData.length) {
      return;
    }
    const ctx = canvas.context;
    canvas.setPaint(labelPaint);
    if (orientation === AxisOrientation.HORIZONTAL) {
      const maxWidth = (axisData[0] && axisData[1])
        ? Math.abs(axisData[0].position - axisData[1].position)
        : innerWidth;
      let y: number;
      switch (labelPaint.textBaseline) {
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
      let lastEnd = -this.lp.paddingRect.l;
      for (let i = 0, l = axisData.length; i < l; i++) {
        const point = axisData[i];
        const width = ctx.measureText(point.value).width;
        // TODO RTL support
        const start = (ctx.textAlign === 'start' || ctx.textAlign === 'left')
          ? point.position
          : (ctx.textAlign === 'center')
            ? (point.position - width / 2)
            : (point.position - width);
        if (lastEnd <= start) {
          ctx.fillText(point.value, point.position, y, maxWidth);
          lastEnd = start + width + labelPadding;
        }
      }
    } else {
      const maxWidth = innerWidth;
      let x: number;
      switch (labelPaint.textAlign) {
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
      const height = labelPaint.getLineHeight();
      let lastEnd = innerHeight + this.lp.paddingRect.b;
      for (let i = 0, l = axisData.length; i < l; i++) {
        const point = axisData[i];
        const start = (ctx.textBaseline === 'bottom')
          ? (point.position - height)
          : (ctx.textBaseline === 'middle')
            ? (point.position - height / 2)
            : point.position;
        if (lastEnd >= start) {
          ctx.fillText(point.value, x, point.position, maxWidth);
          lastEnd = start - height - labelPadding;
        }
      }
    }
  }

  onSnapshot() {
    return {
      style: removeUndefinedProps(this.style),
      orientation: AxisOrientation[this.orientation],
    };
  }

  private getPointTextWidth(canvas: ViewCanvas, point: AxisPoint) {
    return canvas.measureText(point.value, this.style.labelPaint || defaultStyle.labelPaint).width;
  }

  private getPoints(): AxisPoint[] {
    if (!this.dataContainer) {
      return [];
    }
    const scales = this.dataContainer.getScales(this.innerWidth, this.innerHeight);
    switch (this.orientation) {
      case AxisOrientation.HORIZONTAL:
        return prepareAxisPoints(
          this.dataContainer.getXAxisData(),
          scales.xScale,
        );
      case AxisOrientation.VERTICAL:
      default:
        return prepareAxisPoints(
          this.dataContainer.getYAxisData(),
          scales.yScale,
        );
    }
  }
}
