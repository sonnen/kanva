import { createLayoutMap, MATCH_PARENT, PARENT_ID, WRAP_CONTENT } from '@kanva/core';

export const Views = {
  X_AXIS: 'xAxis',
  Y_AXIS: 'yAxis',
};

export const layout = createLayoutMap({
  areaChartWrapper: {
    alignTop: PARENT_ID,
    above: Views.X_AXIS,
    toEndOf: Views.Y_AXIS,
    alignEnd: PARENT_ID,
  },
  areaChart: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
  },
  xAxis: {
    width: MATCH_PARENT,
    alignBottom: PARENT_ID,
    height: WRAP_CONTENT,
    alignEnd: PARENT_ID,
    toEndOf: Views.Y_AXIS,
    padding: { top: 4 },
  },
  yAxis: {
    width: WRAP_CONTENT,
    alignTop: PARENT_ID,
    above: Views.X_AXIS,
    padding: { right: 4 },
  },
});
