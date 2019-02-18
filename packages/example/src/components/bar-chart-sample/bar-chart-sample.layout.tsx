import { createLayoutMap, MATCH_PARENT, PARENT_ID, WRAP_CONTENT } from '@kanva/core';

export const Views = {
  LEGEND: 'legend',
  X_AXIS: 'xAxis',
  Y_AXIS: 'yAxis',
};

export const layout = createLayoutMap({
  chartWrapper: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
    below: Views.LEGEND,
    above: Views.X_AXIS,
    toEndOf: Views.Y_AXIS,
    alignEnd: PARENT_ID,
  },
  legend: {
    width: MATCH_PARENT,
    alignTop: PARENT_ID,
  },
  barChart: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
  },
  xAxis: {
    width: MATCH_PARENT,
    height: 40,
    alignEnd: PARENT_ID,
    alignBottom: PARENT_ID,
    toEndOf: Views.Y_AXIS,
  },
  yAxis: {
    width: WRAP_CONTENT,
    height: MATCH_PARENT,
    below: Views.LEGEND,
    alignBottom: PARENT_ID,
    above: Views.X_AXIS,
    padding: { right: 4 },
  },
});
