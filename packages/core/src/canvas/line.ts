import { isNil } from 'lodash';
import { Point } from './point';

export class Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;

  constructor();
  constructor(startX: number, startY: number, endX: number, endY: number);
  constructor(startX?: number, startY?: number, endX?: number, endY?: number) {
    this.startX = startX || 0;
    this.startY = startY || 0;
    this.endX = endX || 0;
    this.endY = endY || 0;
  }

  /**
   * Returns a point on this line, at specified position (ranged from 0 to 1).
   * I.e. to get the center of line, pass 0.5.
   * Creates a new Point, but in order to reuse the existing one, you can pass it as a second argument.
   */
  pointAt(position: number, result: Point = new Point()): Point {
    if (position > 1 || position < 0) {
      throw new Error(`Invalid position. Expected position=${position} to be in range <0,1>.`);
    }
    result.x = this.startX + (this.endX - this.startX) * position;
    result.y = this.startY + (this.endY - this.startY) * position;
    return result;
  }

  /** Moves this line by a specified distance on the same angle.
   * Acting similarly to {@link Line#extend}, but modifies both starting and ending points by a specified distance.
   * If current line has the length of 0, it's moved horizontally.
   * Resulting Line is the same, mutated Line.
   */
  move(distance: number): this {
    const currentLength = this.length();
    if (currentLength) {
      const xOffset = (this.endX - this.startX) / currentLength * distance;
      const yOffset = (this.endY - this.startY) / currentLength * distance;

      this.startX += xOffset;
      this.endX += xOffset;
      this.startY += yOffset;
      this.endY += yOffset;
    } else {
      this.startX += distance;
      this.endX += distance;
    }
    return this;
  }

  /**
   * Extends this line by a specified distance. Starting point remains the same,
   * ending point changes it's place by the distance.
   * If current line has the length of 0, it's extended horizontally.
   * Resulting Line is the same, mutated Line.
   */
  extend(distance: number): this {
    const currentLength = this.length();
    if (currentLength) {
      this.endX += (this.endX - this.startX) / currentLength * distance;
      this.endY += (this.endY - this.startY) / currentLength * distance;
    } else {
      this.endX += distance;
    }
    return this;
  }

  add(line: Line | Point): this;
  add(x: number, y: number): this;
  add(xOrLineOrPoint: Line | Point | number, y?: number): this {
    let x: number;
    if (typeof xOrLineOrPoint === 'number') {
      x = xOrLineOrPoint;
      if (isNil(y)) {
        return this;
      }
    } else if (xOrLineOrPoint instanceof Point) {
      x = xOrLineOrPoint.x;
      y = xOrLineOrPoint.y;
    } else {
      x = xOrLineOrPoint.endX - xOrLineOrPoint.startX;
      y = xOrLineOrPoint.endY - xOrLineOrPoint.startY;
    }
    this.endX += x;
    this.endY += y;
    return this;
  }

  offset(line: Line | Point): this;
  offset(x: number, y: number): this;
  offset(xOrLineOrPoint: Line | Point | number, y?: number): this {
    let x: number;
    if (typeof xOrLineOrPoint === 'number') {
      x = xOrLineOrPoint;
      if (isNil(y)) {
        return this;
      }
    } else if (xOrLineOrPoint instanceof Point) {
      x = xOrLineOrPoint.x;
      y = xOrLineOrPoint.y;
    } else {
      x = xOrLineOrPoint.endX - xOrLineOrPoint.startX;
      y = xOrLineOrPoint.endY - xOrLineOrPoint.startY;
    }

    this.startX += x;
    this.endX += x;
    this.startY += y;
    this.endY += y;
    return this;
  }

  length(): number {
    const x = this.endX - this.startX;
    const y = this.endY - this.startY;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Returns a copy of Line that can be mutated separately.
   */
  clone() {
    return new Line(
      this.startX,
      this.startY,
      this.endX,
      this.endY,
    );
  }

  /**
   * Copies all of this Line's properties to a Line specified in an argument.
   * Returns the line passed as argument.
   */
  cloneTo(line: Line) {
    line.startX = this.startX;
    line.startY = this.startY;
    line.endX = this.endX;
    line.endY = this.endY;
    return line;
  }

  toString() {
    return `(${this.startX},${this.startY} -> ${this.endX}, ${this.endY})`;
  }
}
