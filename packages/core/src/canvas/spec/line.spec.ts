import { Line } from '../line';
import { Point } from '../point';

describe('Line', () => {
  describe('#move()', () => {
    it('moves the line by a specified distance', () => {
      const line = new Line(0, 0, 3, 4);
      line.move(5);
      expect(line.startX).toEqual(3);
      expect(line.startY).toEqual(4);
      expect(line.endX).toEqual(6);
      expect(line.endY).toEqual(8);
      expect(line.length()).toEqual(5);
    });
    it('moves the line horizontally (x coordinate) if it\'s initial length is 0', () => {
      const line = new Line(1, 1, 1, 1);
      line.move(2);
      expect(line.startX).toEqual(3);
      expect(line.startY).toEqual(1);
      expect(line.endX).toEqual(3);
      expect(line.endY).toEqual(1);
      expect(line.length()).toEqual(0);
    });
  });

  describe('#extend()', () => {
    it('extends the line by a specified distance', () => {
      const line = new Line(0, 0, 3, 4);
      line.extend(5);
      expect(line.startX).toEqual(0);
      expect(line.startY).toEqual(0);
      expect(line.endX).toEqual(6);
      expect(line.endY).toEqual(8);
      expect(line.length()).toEqual(10);
    });
    it('extends the line horizontally (x coordinate) if it\'s initial length is 0', () => {
      const line = new Line(1, 1, 1, 1);
      line.extend(2);
      expect(line.startX).toEqual(1);
      expect(line.startY).toEqual(1);
      expect(line.endX).toEqual(3);
      expect(line.endY).toEqual(1);
      expect(line.length()).toEqual(2);
    });
  });

  describe('#add()', () => {
    it('adds a line to the end of this line', () => {
      const line = new Line(1, 1, 2, 2);
      const line2 = new Line(0, 0, 1, -2);
      line.add(line2);
      expect(line.startX).toEqual(1);
      expect(line.startY).toEqual(1);
      expect(line.endX).toEqual(3);
      expect(line.endY).toEqual(0);
    });
    it('adds a point to the end of this line', () => {
      const line = new Line(1, 1, 2, 2);
      const point = new Point( 1, -2);
      line.add(point);
      expect(line.startX).toEqual(1);
      expect(line.startY).toEqual(1);
      expect(line.endX).toEqual(3);
      expect(line.endY).toEqual(0);
    });
    it('adds a raw coordinates to the end of this line', () => {
      const line = new Line(1, 1, 2, 2);
      const point = new Point( );
      line.add(1, -2);
      expect(line.startX).toEqual(1);
      expect(line.startY).toEqual(1);
      expect(line.endX).toEqual(3);
      expect(line.endY).toEqual(0);
    });
  });

});
