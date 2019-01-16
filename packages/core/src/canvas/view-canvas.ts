import { DrawLineOptions, DrawOptions, DrawRectOptions, DrawTextOptions, MeasureTextOptions } from './canvas.types';
import { normalizeRadius } from './radius.helper';

export interface Canvas {
  getContext(contextId: '2d'): CanvasRenderingContext2D | null;
}

export class ViewCanvas {
  public readonly context: CanvasRenderingContext2D;
  public debugEnabled: boolean = false;

  constructor(protected readonly canvas: Canvas) {
    this.context = this.canvas.getContext('2d')!;
    if (!this.context) {
      throw new Error('Could not create ViewCanvas - 2D context is not available');
    }
  }

  drawRect(options: DrawRectOptions) {
    const { x, y, w, h, radius } = options;
    const c = this.context;

    if (!radius) {
      c.rect(x, y, w, h);
    } else {
      const r = normalizeRadius(radius);
      c.beginPath();
      c.moveTo(x + r.tl, y);
      c.arcTo(x + w, y, x + w, y + h, r.tr);
      c.arcTo(x + w, y + h, x, y + h, r.br);
      c.arcTo(x, y + h, x, y, r.bl);
      c.arcTo(x, y, x + w, y, r.tl);
      c.closePath();
    }

    this.draw(options);
  }

  measureText({
    text,
    fontFamily,
    fontSize,
    direction = 'inherit',
    textAlign = 'left',
    textBaseline = 'bottom',
  }: MeasureTextOptions): TextMetrics {
    const c = this.context;

    c.font = `${fontSize}px "${fontFamily}"`;
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
    fontFamily,
    fontSize,
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

    c.font = `${fontSize}px "${fontFamily}"`;
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

  debug(enable: boolean) {
    this.debugEnabled = enable;
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
