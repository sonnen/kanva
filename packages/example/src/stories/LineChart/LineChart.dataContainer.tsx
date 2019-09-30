import { DataContainer, DataSeries, XYPoint } from '@kanva/charts';
import { DataSeriesGenerator, Distribution } from '../../utils/dataSeries.generator';

export const baseTickCount = 11;

const dataSeries: DataSeries<XYPoint>[] = new DataSeriesGenerator()
  .xRange(0, 1000)
  .yRange(0, 1300)
  .addSeries('Series 1', 100, Distribution.EVEN)
  .yRange(-200, -40)
  .addSeries('Series 2', 100, Distribution.EVEN)
  .generate();

export const createDataContainer = () => new DataContainer<XYPoint<number | null>>()
  .setXAxisParameters({
    tickCount: baseTickCount,
    labelAccessor: String,
  })
  .setYAxisParameters({
    useApproximateValues: true,
    tickCount: 10,
    labelAccessor: String,
  });
