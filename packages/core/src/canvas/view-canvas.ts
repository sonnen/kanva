import { Canvas } from './canvas';
import { TextAlign } from './font';
import { Paint, PaintOverrides } from './paint';
import { Radius } from './radius';
import { Rect } from './rect';
import { Line } from './line';

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

  setPaint(paint: Paint, paintOverrides?: PaintOverrides) {
    // TODO Probably there is a better way to handle PaintOverrides...
    const c = this.context;

    if (paintOverrides && paintOverrides.fillStyle) {
      c.fillStyle = paintOverrides.fillStyle;
    } else if (paint.canDrawFill()) {
      c.fillStyle = paint.fillStyle!;
    }

    if (paint.canDrawStroke()) {
      c.lineWidth = paint.lineWidth;
      c.strokeStyle = paint.strokeStyle!;
      c.setLineDash(paint.lineDash);
      if (paintOverrides && paintOverrides.lineRounding || paint.lineRounding) {
        c.lineJoin = 'round';
        c.lineCap = 'round';
      } else {
        c.lineJoin = 'miter';
        c.lineCap = 'square';
      }
    }

    if (paint.canDrawText()) {
      c.font = paint.fontString!;
      c.direction = paintOverrides && paintOverrides.textDirection || paint.textDirection;
      c.textAlign = paintOverrides && paintOverrides.textAlign || paint.textAlign;
      c.textBaseline = paintOverrides && paintOverrides.textBaseline || paint.textBaseline;
    }
  }

  drawText(x: number, y: number, text: string, paint: Paint, paintOverrides?: PaintOverrides, maxWidth = 0) {
    if (!paint.canDrawText()) {
      return;
    }

    const c = this.context;
    this.setPaint(paint, paintOverrides);
    if (maxWidth) {
      switch (paint.textAlign) {
        case TextAlign.CENTER:
          x = x + maxWidth / 2;
          break;
        case TextAlign.RIGHT:
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

  line(line: Line) {
    const c = this.context;
    c.moveTo(line.startX, line.startY);
    c.lineTo(line.endX, line.endY);
  }

  drawRect(
    rect: Rect,
    paint: Paint,
    borders?: Rect,
  ) {
    const c = this.context;

    // TODO: resolve the issue of lineWidth set initially to 0 
    paint.setLineWidth(1);

    this.setPaint(paint);
    if (paint.canDrawFill()) {
      c.fillRect(rect.l, rect.t, rect.width, rect.height);
    }

    if (!borders || !paint.canDrawStroke()) {
      return;
    }

    if (borders.l) {
      c.beginPath();
      this.line(new Line(rect.l, rect.t, rect.l, rect.b));
      c.lineWidth = borders.l;
      c.stroke();
    }

    if (borders.t) {
      c.beginPath();
      this.line(new Line(rect.l, rect.t, rect.r, rect.t));
      c.lineWidth = borders.t;
      c.stroke();
    }

    if (borders.r) {
      c.beginPath();
      this.line(new Line(rect.r, rect.t, rect.r, rect.b));
      c.lineWidth = borders.r;
      c.stroke();
    }

    if (borders.b) {
      c.beginPath();
      this.line(new Line(rect.l, rect.b, rect.r, rect.b));
      c.lineWidth = borders.b;
      c.stroke();
    }
  }

}
