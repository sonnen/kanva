import { DataSeries, XYPoint } from '@kanva/charts';

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
  from + (index / (total - 1)) * (to - from);

export class DataSeriesGenerator {

  constructor(private options: Options = {
    xRange: [0, 1],
    yRange: [0, 1],
    series: [],
  }) {
  }

  xRange(from: number, to: number): DataSeriesGenerator {
    return new DataSeriesGenerator({
      ...this.options,
      xRange: [from, to],
    });
  }

  yRange(from: number, to: number): DataSeriesGenerator {
    return new DataSeriesGenerator({
      ...this.options,
      yRange: [from, to],
    });
  }

  addSeries(name: string, elements: number, distribution: Distribution): DataSeriesGenerator {
    const { xRange, yRange, series } = this.options;
    return new DataSeriesGenerator({
      ...this.options,
      series: [
        ...series,
        { name, elements, distribution, xRange, yRange },
      ],
    });
  }

  generate(): DataSeries<XYPoint>[] {
    return this.options.series.map(({
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
    }));
  }

  generateYY(): DataSeries<XYPoint<[number, number]>>[] {
    return this.options.series.map(({
      name,
      elements,
      xRange,
      yRange,
      distribution,
    }) => ({
      name,
      data: new Array(elements)
        .fill(0)
        .map((_, index) => {
          const randomMinY = Math.round(randomNumber(yRange));

          return {
            x: distribution === Distribution.EVEN ? rangedNumber(xRange, index, elements) : randomNumber(xRange),
            y: [randomMinY, randomMinY + 2] as [number, number],
          }
        })
        .sort((a, b) => a.x - b.x),
    }));
  }
}
