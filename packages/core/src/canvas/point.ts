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

  /**
   * Copies all of this Point's properties to a Point specified in an argument.
   * Returns the point passed as argument.
   */
  cloneTo(point: Point) {
    point.x = this.x;
    point.y = this.y;
    return point;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
