import { DataContainer, DataSeries, XYPoint } from '@kanva/charts';
import { DataSeriesGenerator, Distribution } from '../../utils/dataSeries.generator';

export const baseTickCount = 9;

const dataSeries: DataSeries<XYPoint>[] = new DataSeriesGenerator()
  .xRange(0, 1000)
  .yRange(0, 1300)
  .addSeries('Series 1', 40, Distribution.EVEN)
  .yRange(-200, -40)
  .addSeries('Series 2', 40, Distribution.EVEN)
  .generate();

export const dataContainer = new DataContainer<XYPoint<number | null>>()
  .setData(dataSeries)
  .setXAxisParameters({
    useApproximateValues: true,
    tickCount: baseTickCount,
    labelAccessor: String,
  })
  .setYAxisParameters({
    useApproximateValues: true,
    tickCount: 8,
    labelAccessor: String,
  });
