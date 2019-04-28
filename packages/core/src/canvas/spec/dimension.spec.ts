import { DimensionType, MATCH_PARENT, parseDimension, WRAP_CONTENT } from '../dimension';

describe('Dimension', () => {
  describe('#parseDimension()', () => {
    it('parses a raw number 33.2 as PX dimension, rounding it to 33', () => {
      expect(parseDimension(33.2)).toEqual({
        value: 33,
        type: DimensionType.PX,
      });
    });
    it('parses raw negative numbers as RELATIVE dimensions', () => {
      expect(parseDimension(MATCH_PARENT)).toEqual({
        value: MATCH_PARENT,
        type: DimensionType.RELATIVE,
      });
      expect(parseDimension(WRAP_CONTENT)).toEqual({
        value: WRAP_CONTENT,
        type: DimensionType.RELATIVE,
      });
    });
    it('treats null and undefined as 0px', () => {
      expect(parseDimension(null)).toEqual({
        value: 0,
        type: DimensionType.PX,
      });
      expect(parseDimension(undefined)).toEqual({
        value: 0,
        type: DimensionType.PX,
      });
    });
    it('parses a "30px" string as a valid PX dimension', () => {
      expect(parseDimension('30px')).toEqual({
        value: 30,
        type: DimensionType.PX,
      });
    });
    it('parses a "+30px" string as a valid PX dimension', () => {
      expect(parseDimension('+30px')).toEqual({
        value: 30,
        type: DimensionType.PX,
      });
    });
    it('parses a "3.3px" string as a valid PX dimension rounding it to 3px', () => {
      expect(parseDimension('3.3px')).toEqual({
        value: 3,
        type: DimensionType.PX,
      });
    });
    it('parses a ".89px" string as a valid PX dimension rounding it to 1px', () => {
      expect(parseDimension('.89px')).toEqual({
        value: 1,
        type: DimensionType.PX,
      });
    });
    it('parses a "1%" string as a valid PERCENT dimension', () => {
      expect(parseDimension('1%')).toEqual({
        value: 0.01,
        type: DimensionType.PERCENT,
      });
    });
    it('parses a "88.3%" string as a valid PERCENT dimension', () => {
      expect(parseDimension('88.3%')).toEqual({
        value: 0.883,
        type: DimensionType.PERCENT,
      });
    });
    it('parses a "+88.3%" string as a valid PERCENT dimension', () => {
      expect(parseDimension('+88.3%')).toEqual({
        value: 0.883,
        type: DimensionType.PERCENT,
      });
    });
    it('throws an error for "44" string, which does not have a dimension', () => {
      expect(() => parseDimension('44'))
        .toThrow(`Invalid dimension '44'. Enter a valid value, i.e. 100px or 50%.`);
    });
    it('throws an error for "-10px" string, which has a negative value', () => {
      expect(() => parseDimension('-10px'))
        .toThrow('Invalid dimension \'-10px\'. Dimension can not be negative.');
    });
  });
});
