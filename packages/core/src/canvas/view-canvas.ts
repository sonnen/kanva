import { MeasureTextOptions } from './canvas.types';
import { Paint } from './paint';
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
    const d = Math.min(w, h);

    const tl = (r.tl + r.bl > d) || (r.tl + r.tr > d) ? d / 2 : r.tl;
    const br = (r.br + r.bl > d) || (r.tr + r.br > d) ? d / 2 : r.br;
    const tr = (tl + r.tr > d) || (r.tr + br > d) ? d / 2 : r.tr;
    const bl = (tl + r.bl > d) || (r.bl + br > d) ? d / 2 : r.bl;

    c.moveTo(x + tl, y);
    c.arcTo(x + w, y, x + w, y + h, tr);
    c.arcTo(x + w, y + h, x, y + h, br);
    c.arcTo(x, y + h, x, y, bl);
    c.arcTo(x, y, x + w, y, tl);
  }

  measureText(text: string, paint: Paint): TextMetrics {
    const c = this.context;
    c.font = paint.fontString || '';
    c.direction = paint.textDirection;
    c.textAlign = paint.textAlign;
    c.textBaseline = paint.textBaseline;

    return c.measureText(text);
  }

  setPaint(paint: Paint) {
    const c = this.context;

    if (paint.canDrawFill()) {
      c.fillStyle = paint.fillStyle!;
    }

    if (paint.canDrawStroke()) {
      c.lineWidth = paint.lineWidth;
      c.strokeStyle = paint.strokeStyle!;
      c.setLineDash(paint.lineDash);
      if (paint.lineRounding) {
        c.lineJoin = 'round';
        c.lineCap = 'round';
      } else {
        c.lineJoin = 'miter';
        c.lineCap = 'square';
      }
    }

    if (paint.canDrawText()) {
      c.font = paint.fontString!;
      c.direction = paint.textDirection;
      c.textAlign = paint.textAlign;
      c.textBaseline = paint.textBaseline;
    }
  }

  drawText(x: number, y: number, text: string, paint: Paint, maxWidth: number = 0) {
    if (!paint.canDrawText()) {
      return;
    }

    const c = this.context;
    this.setPaint(paint);
    if (maxWidth) {
      switch (paint.textAlign) {
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

    if (paint.canDrawFill()) {
      if (maxWidth) {
        c.fillText(text, x, y, maxWidth);
      } else {
        c.fillText(text, x, y);
      }
    }

    if (paint.canDrawStroke()) {
      if (maxWidth) {
        c.strokeText(text, x, y, maxWidth);
      } else {
        c.strokeText(text, x, y);
      }
    }
  }

  drawPath(paint: Paint) {
    const c = this.context;
    this.setPaint(paint);

    if (paint.canDrawFill()) {
      c.fill();
    }

    if (paint.canDrawStroke()) {
      c.stroke();
    }
  }
}
