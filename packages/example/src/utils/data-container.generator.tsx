import { DataContainer, XYPoint } from '@kanva/charts';

export enum Distribution {
  EVEN,
  RANDOM,
}

interface Options {
  xRange: [number, number];
  yRange: [number, number];
  series: {
    name: string;
    elements: number;
    distribution: Distribution;
    xRange: [number, number];
    yRange: [number, number];
  }[];
}

const randomNumber = ([from, to]: [number, number]) => from + Math.random() * (to - from);
const rangedNumber = ([from, to]: [number, number], index: number, total: number) =>
  from + (index / total) * (to - from);

export class DataContainerGenerator {

  constructor(private options: Options = {
    xRange: [0, 1],
    yRange: [0, 1],
    series: [],
  }) {
  }

  xRange(from: number, to: number): DataContainerGenerator {
    return new DataContainerGenerator({
      ...this.options,
      xRange: [from, to],
    });
  }

  yRange(from: number, to: number): DataContainerGenerator {
    return new DataContainerGenerator({
      ...this.options,
      yRange: [from, to],
    });
  }

  addSeries(name: string, elements: number, distribution: Distribution): DataContainerGenerator {
    const { xRange, yRange, series } = this.options;
    return new DataContainerGenerator({
      ...this.options,
      series: [
        ...series,
        { name, elements, distribution, xRange, yRange },
      ],
    });
  }

  generate(): DataContainer<XYPoint> {
    return new DataContainer<XYPoint>()
      .setData(this.options.series.map(({
        name,
        elements,
        xRange,
        yRange,
        distribution,
      }) => ({
        name,
        data: new Array(elements)
          .fill(0)
          .map((_, index) => ({
            x: distribution === Distribution.EVEN ? rangedNumber(xRange, index, elements) : randomNumber(xRange),
            y: randomNumber(yRange),
          }))
          .sort((a, b) => a.x - b.x),
      })));
  }
}
