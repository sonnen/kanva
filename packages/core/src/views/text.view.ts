import { Paint, TextBaseline, ViewCanvas, WRAP_CONTENT } from '../canvas';
import { Context, RequiredViewChanges, View } from '../view';

export interface TextViewProps {
  text: string;
  textPaint: Paint;
}

export class TextView extends View<TextViewProps> {
  private textPaint: Paint = new Paint();
  private textString = '';
  private text: string[] = [];

  constructor(context: Context) {
    super(context, 'TextView');
  }

  getTextPaint() {
    return this.textPaint.font;
  }

  setTextPaint(paint: Paint) {
    this.textPaint = paint;
    this.refresh();
  }

  getText() {
    return this.textString;
  }

  setText(text: string) {
    if (text === this.textString) {
      return;
    }
    this.textString = text;
    this.text = text ? text.split('\n') : [];
    this.refresh();
  }

  getY(textBaseline: TextBaseline) {
    const lineHeight = this.getLineHeight();
    const textHeight = this.text.length * lineHeight;
    switch (textBaseline) {
      case TextBaseline.BOTTOM:
        return this.innerHeight - textHeight + lineHeight;
      case TextBaseline.MIDDLE:
        return (this.innerHeight - textHeight + lineHeight) / 2;
      case TextBaseline.TOP:
      default:
        return 0;
    }
  }

  getInternalWrappedWidth(canvas: ViewCanvas) {
    const { text, textPaint } = this;
    return canvas
      ? text.reduce((maxWidth, line) => Math.max(maxWidth, canvas.measureText(line, textPaint).width), 0)
      : undefined;
  }

  getInternalWrappedHeight() {
    return this.getLineHeight() * this.text.length;
  }

  onDraw(canvas: ViewCanvas) {
    const { width, text, textPaint } = this;
    const lineHeight = this.getLineHeight();
    const y = this.getY(this.textPaint.textBaseline);
    for (let i = 0, l = text.length; i < l; i++) {
      canvas.drawText(0, y + i * lineHeight, text[i], textPaint, undefined, width);
    }
  }

  onSnapshot() {
    return {
      text: this.textString,
      textPaint: this.textPaint.snapshot(),
    };
  }

  private refresh() {
    if (this.lp.w === WRAP_CONTENT || this.lp.h === WRAP_CONTENT) {
      this.require(RequiredViewChanges.MEASURE);
    } else {
      this.require(RequiredViewChanges.DRAW);
    }
  }

  private getLineHeight() {
    return this.textPaint && this.textPaint.getLineHeight();
  }
}
