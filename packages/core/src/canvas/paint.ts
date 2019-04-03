import { removeEqualProps } from '../utils';
import { Font, parseFont } from './font';

const defaultFont: Font = { fontFamily: 'Arial', fontSize: 12 };

const defaultPaintOptions = {
  font: parseFont(defaultFont),
  textDirection: 'ltr' as CanvasDirection,
  textAlign: 'left' as CanvasTextAlign,
  textBaseline: 'bottom' as CanvasTextBaseline,
  lineWidth: 0,
  lineDash: [],
  lineRounding: false,
};

export class Paint {
  // Font options
  fontString: string = defaultPaintOptions.font;
  font: Font = defaultFont;
  textDirection: CanvasDirection = defaultPaintOptions.textDirection;
  textAlign: CanvasTextAlign = defaultPaintOptions.textAlign;
  textBaseline: CanvasTextBaseline = defaultPaintOptions.textBaseline;

  // Fill
  fillStyle?: string;

  // Stroke
  strokeStyle?: string;
  lineWidth: number = defaultPaintOptions.lineWidth;
  lineDash: number[] = defaultPaintOptions.lineDash;
  lineRounding: boolean = defaultPaintOptions.lineRounding;

  setFont(font: Font): this {
    this.font = font;
    this.fontString = parseFont(font);
    return this;
  }

  getLineHeight() {
    return this.font &&
      this.font.lineHeight ||
      this.font.fontSize ||
      defaultFont.lineHeight ||
      defaultFont.fontSize;
  }

  setTextDirection(textDirection: CanvasDirection): this {
    this.textDirection = textDirection;
    return this;
  }

  setTextAlign(textAlign: CanvasTextAlign): this {
    this.textAlign = textAlign;
    return this;
  }

  setTextBaseline(textBaseline: CanvasTextBaseline): this {
    this.textBaseline = textBaseline;
    return this;
  }

  setFillStyle(fill: string): this {
    this.fillStyle = fill;
    return this;
  }

  setStrokeStyle(stroke: string): this {
    this.strokeStyle = stroke;
    return this;
  }

  setLineWidth(lineWidth: number): this {
    if (lineWidth < 0) {
      throw new Error(`Paint's lineWidth property must be greater than or equal 0: got ${lineWidth}`);
    }
    this.lineWidth = lineWidth;
    return this;
  }

  setLineRounding(lineRounding: boolean): this {
    this.lineRounding = lineRounding;
    return this;
  }

  setLineDash(lineDash: number[]): this {
    this.lineDash = lineDash;
    return this;
  }

  canDrawFill(): boolean {
    return !!this.fillStyle;
  }

  canDrawStroke(): boolean {
    return !!(this.strokeStyle && this.lineWidth);
  }

  canDrawText(): boolean {
    return !!this.fontString && (this.canDrawStroke() || this.canDrawFill());
  }

  snapshot(): object {
    return removeEqualProps({
      font: this.font,
      textDirection: this.textDirection,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineDash,
      lineDash: this.lineDash,
      lineRounding: this.lineRounding,
    }, defaultPaintOptions);
  }

}
