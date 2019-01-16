import { ViewCanvas } from '../canvas';
import { Context, RequiredViewChanges, View } from '../view';
import { WRAP_CONTENT } from '../view/layout-params';

export enum TextAlign {
  START = 'start',
  END = 'end',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TextBaseline {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

export interface TextViewProps {
  fontSize?: number;
  fontFamily?: string;
  text?: string;
  textAlign?: TextAlign;
  textBaseline?: TextBaseline;
  textColor?: string;
}

export class TextView extends View<TextViewProps> {
  private fontSize: number = 12;
  private fontFamily: string = 'Arial';
  private text: string = '';
  private textAlign: TextAlign = TextAlign.START;
  private textBaseline: TextBaseline = TextBaseline.TOP;
  private textColor: string = '#000';
  private y: number = 0;

  constructor(context: Context) {
    super(context, 'TextView');
  }

  getFontSize() {
    return this.fontSize;
  }

  setFontSize(fontSize: number) {
    this.fontSize = fontSize;
  }

  getFontFamily() {
    return this.fontFamily;
  }

  setFontFamily(fontFamily: string) {
    this.fontFamily = fontFamily;
  }

  getText() {
    return this.text;
  }

  setText(text: string) {
    this.text = text;
    this.refresh();
  }

  getTextAlign() {
    return this.textAlign;
  }

  setTextAlign(textAlign: TextAlign) {
    this.textAlign = textAlign;
  }

  getTextBaseline() {
    return this.textBaseline;
  }

  setTextBaseline(textBaseline: TextBaseline) {
    if (textBaseline !== this.textBaseline) {
      switch (textBaseline) {
        case TextBaseline.BOTTOM:
          this.y = 0;
          break;
        case TextBaseline.MIDDLE:
          this.y = this.innerHeight / 2;
          break;
        case TextBaseline.TOP:
        default:
          this.y = this.innerHeight;
          break;
      }
      this.textBaseline = textBaseline;
      this.require(RequiredViewChanges.DRAW);
    }
  }

  getTextColor() {
    return this.textColor;
  }

  setTextColor(color: string) {
    this.textColor = color;
    this.require(RequiredViewChanges.DRAW);
  }

  getInternalWrappedWidth(canvas: ViewCanvas) {
    const { fontFamily, fontSize, text, textAlign, textBaseline } = this;
    return canvas
      ? canvas.measureText({
        fontFamily,
        fontSize,
        text,
        textBaseline,
        textAlign,
      }).width
      : undefined;
  }

  getInternalWrappedHeight() {
    return this.fontSize;
  }

  onDraw(canvas: ViewCanvas) {
    const { fontSize, fontFamily, textAlign, textBaseline, width, text, textColor, y } = this;
    canvas.drawText({
      x: 0,
      y,
      fontSize,
      fontFamily,
      text,
      maxWidth: width,
      textAlign,
      textBaseline,
      fillStyle: textColor,
    });
  }

  onSnapshot() {
    return {
      text: this.text,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      textColor: this.textColor,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
    };
  }

  private refresh() {
    if (this.lp.w === WRAP_CONTENT || this.lp.h === WRAP_CONTENT) {
      this.require(RequiredViewChanges.MEASURE);
    } else {
      this.require(RequiredViewChanges.DRAW);
    }
  }
}
