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
}
