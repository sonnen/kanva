import { DrawLineOptions, DrawOptions, DrawTextOptions, MeasureTextOptions } from './canvas.types';
import { Radius } from './radius';

export interface Canvas {
  getContext(contextId: '2d'): CanvasRenderingContext2D | null;
}

export class ViewCanvas {
  public readonly context: CanvasRenderingContext2D;

  constructor(protected readonly canvas: Canvas) {
    this.context = this.canvas.getContext('2d')!;
    if (!this.context) {
      throw new Error('Could not create ViewCanvas - 2D context is not available');
    }
  }

  roundRect(x: number, y: number, w: number, h: number, r: Radius) {
    const c = this.context;
    c.moveTo(x + (r.tl <= w ? r.tl : w), y);
    c.arcTo(x + w, y, x + w, y + h, (r.tr <= h ? r.tr : h));
    c.arcTo(x + w, y + h, x, y + h, (r.br <= w ? r.br : w));
    c.arcTo(x, y + h, x, y, (r.bl <= h ? r.bl : h));
    c.arcTo(x, y, x + w, y, (r.tl <= h ? r.tl : h));
  }

  measureText({
    text,
    fontString,
    direction = 'inherit',
    textAlign = 'left',
    textBaseline = 'bottom',
  }: MeasureTextOptions): TextMetrics {
    const c = this.context;

    c.font = fontString;
    c.direction = direction;
    c.textAlign = textAlign;
    c.textBaseline = textBaseline;

    return c.measureText(text);
  }

  drawLine(options: DrawLineOptions) {
    const { x, y, x2, y2 } = options;
    const c = this.context;

    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x2, y2);

    this.draw(options);
  }

  drawText({
    text,
    fontString,
    direction = 'inherit',
    textAlign = 'left',
    textBaseline = 'bottom',
    x, y,
    strokeStyle,
    maxWidth,
    fillStyle,
    lineWidth,
    lineDash,
  }: DrawTextOptions) {
    const c = this.context;

    c.font = fontString;
    c.direction = direction;
    c.textAlign = textAlign;
    c.textBaseline = textBaseline;

    if (maxWidth) {
      switch (textAlign) {
        case 'center':
          x = x + maxWidth / 2;
          break;
        case 'right':
          x = x + maxWidth;
          break;
        default:
          break;
      }
    }

    if (fillStyle !== undefined) {
      c.fillStyle = fillStyle;
      if (maxWidth) {
        c.fillText(text, x, y, maxWidth);
      } else {
        c.fillText(text, x, y);
      }
    }

    if (lineWidth !== undefined && strokeStyle !== undefined) {
      c.lineWidth = lineWidth;
      c.strokeStyle = strokeStyle;
      if (!lineDash) {
        lineDash = [];
      }
      c.setLineDash(lineDash);
      if (maxWidth) {
        c.strokeText(text, x, y, maxWidth);
      } else {
        c.strokeText(text, x, y);
      }
    }
  }

  private draw({
    fillStyle,
    strokeStyle,
    lineWidth,
    lineDash,
  }: DrawOptions) {
    const c = this.context;

    if (fillStyle !== undefined) {
      c.fillStyle = fillStyle;
      c.fill();
    }

    if (lineWidth !== undefined && strokeStyle !== undefined) {
      c.lineWidth = lineWidth;
      c.strokeStyle = strokeStyle;
      if (!lineDash) {
        lineDash = [];
      }
      c.setLineDash(lineDash);
      c.stroke();
    }
  }
}
