import { DataContainer, DataSeries, XYPoint } from '@kanva/charts';
import { DataSeriesGenerator, Distribution } from '../../utils/dataSeries.generator';

export const baseTickCount = 11;


const dataSeries: DataSeries<XYPoint<[number, number]>>[] = new DataSeriesGenerator()
  .xRange(0, 1440)
  .yRange(20, 25)
  .addSeries('Series 1', 100, Distribution.EVEN)
  .generateYY();

export const createDataContainer = () => new DataContainer<any>()
  .setData(dataSeries)
  .setXAxisParameters({
    tickCount: baseTickCount,
    labelAccessor: String,
  })
  .setYAxisParameters({
    useApproximateValues: true,
    tickCount: 10,
    labelAccessor: String,
  })
  .setYBoundsExtension([0, 40])
