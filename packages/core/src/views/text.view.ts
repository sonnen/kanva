import { font, Font, TextAlign, TextBaseline, ViewCanvas } from '../canvas';
import { Context, RequiredViewChanges, View, WRAP_CONTENT } from '../view';

export interface TextViewProps {
  font?: Font;
  text?: string;
  textAlign?: TextAlign;
  textBaseline?: TextBaseline;
  textColor?: string;
}

export class TextView extends View<TextViewProps> {
  private fontString: string = '12 Arial';
  private font?: Font;
  private text: string = '';
  private textAlign: TextAlign = TextAlign.START;
  private textBaseline: TextBaseline = TextBaseline.TOP;
  private textColor: string = '#000';
  private y: number = 0;

  constructor(context: Context) {
    super(context, 'TextView');
  }

  getFont() {
    return this.font;
  }

  setFont(f: Font) {
    if (this.font === f) {
      return;
    }
    this.font = f;
    this.fontString = font(f);
    this.require(RequiredViewChanges.MEASURE);
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
    const { fontString, text, textAlign, textBaseline } = this;
    return canvas
      ? canvas.measureText({
        fontString,
        text,
        textBaseline,
        textAlign,
      }).width
      : undefined;
  }

  getInternalWrappedHeight() {
    return this.font ? this.font.fontSize : 12;
  }

  onDraw(canvas: ViewCanvas) {
    const { fontString, textAlign, textBaseline, width, text, textColor, y } = this;
    canvas.drawText({
      x: 0,
      y,
      fontString,
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
      fontString: this.fontString,
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
