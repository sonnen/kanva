import { Paint, TextBaseline, ViewCanvas } from '../canvas';
import { Context, RequiredViewChanges, View, WRAP_CONTENT } from '../view';

export interface TextViewProps {
  textPaint: Paint;
}

export class TextView extends View<TextViewProps> {
  private textPaint: Paint = new Paint();
  private text: string[] = [];
  private y: number = 0;

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
    return this.text;
  }

  setText(text: string) {
    this.text = text.split('\n');
    this.refresh();
  }

  setTextBaseline(textBaseline: TextBaseline) {
    if (textBaseline !== this.textPaint.textBaseline) {
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
      this.textPaint.setTextBaseline(textBaseline);
      this.require(RequiredViewChanges.DRAW);
    }
  }

  getInternalWrappedWidth(canvas: ViewCanvas) {
    const { text, textPaint } = this;
    return canvas
      ? text.reduce((maxWidth, line) => Math.max(maxWidth, canvas.measureText(line, this.textPaint).width), 0)
      : undefined;
  }

  getInternalWrappedHeight() {
    return this.getLineHeight() * this.text.length;
  }

  onDraw(canvas: ViewCanvas) {
    const { width, text, textPaint, y } = this;
    const lineHeight = this.getLineHeight();
    for (let i = 0, l = text.length; i < l; i++) {
      canvas.drawText(0, y + i * lineHeight, text[i], textPaint, width);
    }
  }

  onSnapshot() {
    return {
      text: this.text,
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
