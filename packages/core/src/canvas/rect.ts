import { Point } from './point';

export interface RectObjectInput {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  vertical?: number;
  horizontal?: number;
}

export type RectInput = RectObjectInput | number;

export type RectLike = Rect | RectInput;

export class Rect {
  static from(rectLike: RectLike): Rect {
    if (rectLike instanceof Rect) {
      return rectLike;
    } else {
      return new Rect(rectLike);
    }
  }

  l: number;
  t: number;
  r: number;
  b: number;

  constructor(
    value: RectInput,
  ) {
    if (typeof value === 'number') {
      this.l = this.t = this.r = this.b = value;
    } else {
      this.l = this.t = this.r = this.b = 0;
      if (value.horizontal) {
        this.l = this.r = value.horizontal;
      } else {
        if (value.left) {
          this.l = value.left;
        }
        if (value.right) {
          this.r = value.right;
        }
      }
      if (value.vertical) {
        this.t = this.b = value.vertical;
      } else {
        if (value.top) {
          this.t = value.top;
        }
        if (value.bottom) {
          this.b = value.bottom;
        }
      }
    }
  }

  get width() {
    return Math.abs(this.r - this.l);
  }

  get height() {
    return Math.abs(this.b - this.t);
  }

  /**
   * Shrinks this Rect by other Rect's dimensions (i.e. to apply padding) 
   * or by a constant numeric value from each side.
   * Resulting Rect is the same, mutated Rect.
   */
  inset(shrink: Rect | number) {
    if (typeof shrink === 'number') {
      this.r -= shrink;
      this.l += shrink;
      this.t += shrink;
      this.b -= shrink;
    } else {
      this.r -= shrink.r;
      this.l += shrink.l;
      this.t += shrink.t;
      this.b -= shrink.b;
    }
    return this;
  }

  /**
   * Moves this Rect by left top position of passed rect or by XY coordinates of a Point.
   * Resulting Rect is the same, mutated Rect.
   */
  offset(offset: Rect | Point): this;
  /**
   * Moves this Rect by passed x and y coordinates.
   * Resulting Rect is the same, mutated Rect.
   */
  offset(x: number, y: number): this;
  offset(offset: Rect | Point | number, yOffset?: number): this {
    let x = 0;
    let y = 0;
    if (typeof offset === 'number') {
      x = offset;
      y = yOffset || 0;
    } else if (offset instanceof Rect) {
      x = offset.l;
      y = offset.t;
    } else {
      x = offset.x;
      y = offset.y;
    }
    this.l += x;
    this.r += x;
    this.t += y;
    this.b += y;
    return this;
  }

  /**
   * Expands this Rect by other Rect's dimensions (i.e. to reduce padding)
   * or by a constant numeric value from each side.
   * Resulting Rect is the same, mutated Rect.
   */
  expand(expansion: Rect|number) {
    if (typeof expansion === 'number') {
      this.r += expansion;
      this.l -= expansion;
      this.t -= expansion;
      this.b += expansion;
    } else {
      this.r += expansion.r;
      this.l -= expansion.l;
      this.t -= expansion.t;
      this.b += expansion.b;
    }
    return this;
  }

  intersects(rect: Rect) {
    return (
      this.l < rect.r && this.r > rect.l &&
      this.t > rect.b && this.b < rect.t
    );
  }

  contains(x: number, y: number) {
    return (
      this.l <= x && x <= this.r &&
      this.t <= y && y <= this.b
    );
  }

  /**
   * Returns a copy of Rect that can be mutated separately.
   */
  clone() {
    return new Rect({
      top: this.t,
      left: this.l,
      bottom: this.b,
      right: this.r,
    });
  }

  toString() {
    return `(↑${this.t} →${this.r} ↓${this.b} ←${this.l})`;
  }
}
