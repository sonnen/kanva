interface RectObjectInput {
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

  inset(rect: Rect) {
    return new Rect({
      right: this.r - rect.r,
      left: this.l + rect.l,
      top: this.t + rect.t,
      bottom: this.b - rect.b,
    });
  }

  expand(rect: Rect) {
    return new Rect({
      right: this.r + rect.r,
      left: this.l - rect.l,
      top: this.t - rect.t,
      bottom: this.b + rect.b,
    });
  }

  setRight(right: number) {
    return new Rect({
      right,
      left: this.l,
      top: this.t,
      bottom: this.b,
    });
  }

  setLeft(left: number) {
    return new Rect({
      right: this.r,
      left,
      top: this.t,
      bottom: this.b,
    });
  }

  setTop(top: number) {
    return new Rect({
      right: this.r,
      left: this.l,
      top,
      bottom: this.b,
    });
  }

  setBottom(bottom: number) {
    return new Rect({
      right: this.r,
      left: this.l,
      top: this.t,
      bottom,
    });
  }

  intersects(rect: Rect) {
    return (
      this.l < rect.r && this.r > rect.l &&
      this.t > rect.b && this.b < rect.t
    );
  }
}

export const ZERO_RECT = new Rect(0);
