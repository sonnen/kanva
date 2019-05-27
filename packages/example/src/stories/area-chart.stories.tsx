import { DataContainer, DataDisplayType, XYPoint } from '@kanva/charts';
import { Paint } from '@kanva/core';
import { button, object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AreaChart } from '../components/area-chart';
import { DataContainerGenerator, Distribution } from '../utils/data-container.generator';

const stories = storiesOf('AreaChart', module);
stories.addDecorator(withKnobs);

const paintKnobs = (paintName: string, value: Paint, groupId?: string): Paint => {
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

const useDataContainer = () => {
  let dataContainer: DataContainer<XYPoint>;
  const generate = () => dataContainer = new DataContainerGenerator()
    .xRange(0, 100)
    .yRange(-100, 100)
    .addSeries('sample series', 20, Distribution.RANDOM)
    .generate();
  generate();
  return (): [DataContainer<XYPoint>, () => void] => [dataContainer, generate];
};

const dataContainerState = useDataContainer();

stories.add('simple', () => {
  const [dataContainer, generateDataContainer] = dataContainerState();

  const seriesPaint = paintKnobs('seriesPaint', new Paint().setStrokeStyle('#90ca52').setLineWidth(1.5));
  const xAxisPaint = paintKnobs('xAxisPaint', new Paint().setFillStyle('#333'));
  const yAxisPaint = paintKnobs('yAxisPaint', new Paint().setFillStyle('#333'));

  const generateData = button('generate', generateDataContainer, 'DataContainer');
  return (
    <AreaChart
      dataContainer={dataContainer}
      seriesStyles={{
        'sample series': {
          type: DataDisplayType.LINE,
          paint: seriesPaint,
        },
      }}
      xAxisStyle={{
        labelPaint: xAxisPaint,
      }}
      yAxisStyle={{
        labelPaint: yAxisPaint,
      }}
    />
  );
});
