import { createLayoutMap, MATCH_PARENT, PARENT_ID, WRAP_CONTENT } from '@kanva/core';

export const Views = {
  LINE_CHART: 'lineChart',
  X_AXIS: 'xAxis',
};

export const layout = createLayoutMap({
  lineChart: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
    alignEnd: PARENT_ID,
    alignStart: PARENT_ID,
    alignBottom: PARENT_ID,
    padding: { vertical: 10 },
    above: Views.X_AXIS,
  },
  xAxis: {
    width: MATCH_PARENT,
    height: WRAP_CONTENT,
    alignEnd: PARENT_ID,
    alignStart: PARENT_ID,
    alignBottom: PARENT_ID,
    minHeight: 30,
  },
});
