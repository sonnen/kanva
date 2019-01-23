import { LayoutParamsProps, MATCH_PARENT, PARENT_ID, WRAP_CONTENT } from '@kanva/core';

export const Views = {
  CHART: 'chartWrapper',
  X_AXIS: 'xAxis',
  Y_AXIS: 'yAxis',
};

const topDistance = 40;
const endDistance = 40;

const createLayoutMap = <T extends Record<string, LayoutParamsProps>>(t: T): T => t;

export const layout = createLayoutMap({
  areaChartWrapper: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
    alignTop: PARENT_ID,
    above: Views.X_AXIS,
    toEndOf: Views.Y_AXIS,
    alignEnd: PARENT_ID,
    margin: { right: endDistance, top: topDistance },
  },
  areaChart: {
    alignTop: PARENT_ID,
    alignBottom: PARENT_ID,
    alignStart: PARENT_ID,
    alignEnd: PARENT_ID,
  },
  xAxis: {
    width: MATCH_PARENT,
    height: 40,
    alignEnd: PARENT_ID,
    alignBottom: PARENT_ID,
    toEndOf: Views.Y_AXIS,
    padding: { right: endDistance },
  },
  yAxis: {
    width: WRAP_CONTENT,
    height: MATCH_PARENT,
    alignTop: PARENT_ID,
    alignBottom: PARENT_ID,
    above: Views.X_AXIS,
    padding: { top: topDistance, right: 4 },
  },
});