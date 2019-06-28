import { object } from '@storybook/addon-knobs';
import { Paint } from '@kanva/core';

export const paintKnobs = (paintName: string, value: Paint, groupId?: string): Paint => {
  const paintOptions = object(paintName, {
    lineWidth: value.lineWidth,
    strokeStyle: value.strokeStyle,
    fillStyle: value.fillStyle || 'transparent',
    lineDash: value.lineDash,
    lineRounding: value.lineRounding,
    font: value.font,
    textAlign: value.textAlign,
    textBaseline: value.textBaseline,
    textDirection: value.textDirection,
  }, groupId);

  return new Paint()
    .setFillStyle(paintOptions.fillStyle!)
    .setStrokeStyle(paintOptions.strokeStyle!)
    .setLineWidth(paintOptions.lineWidth!)
    .setLineDash(paintOptions.lineDash)
    .setLineRounding(paintOptions.lineRounding)
    .setFont(paintOptions.font)
    .setTextAlign(paintOptions.textAlign)
    .setTextBaseline(paintOptions.textBaseline)
    .setTextDirection(paintOptions.textDirection);
};
