import { createLayoutMap, MATCH_PARENT, PARENT_ID, WRAP_CONTENT } from '@kanva/core';

export const Views = {
  X_AXIS: 'xAxis',
  Y_AXIS: 'yAxis',
  LINE_CHART: 'lineChart',
};

const topDistance = 40;
const endDistance = 40;

export const layout = createLayoutMap({
  areaChartWrapper: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
    alignTop: PARENT_ID,
    above: Views.X_AXIS,
    alignStart: PARENT_ID,
    alignEnd: PARENT_ID,
    margin: { right: endDistance, top: topDistance },
  },
  areaChart: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
  },
  lineChart: {
    width: MATCH_PARENT,
    height: WRAP_CONTENT,
    alignEnd: PARENT_ID,
    alignStart: PARENT_ID,
    alignBottom: PARENT_ID,
    padding: { vertical: 40 },
  },
  xAxis: {
    width: MATCH_PARENT,
    height: 40,
    alignEnd: PARENT_ID,
    alignStart: PARENT_ID,
    above: Views.LINE_CHART,
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
