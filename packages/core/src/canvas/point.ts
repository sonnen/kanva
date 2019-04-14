export class Point {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns a copy of Point that can be mutated separately.
   */
  clone() {
    return new Point(this.x, this.y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
