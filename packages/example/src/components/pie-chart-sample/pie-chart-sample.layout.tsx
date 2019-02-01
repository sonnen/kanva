import { createLayoutMap, MATCH_PARENT, PARENT_ID } from '@kanva/core';

export const layout = createLayoutMap({
  pieChart: {
    width: 1 / 3,
    height: MATCH_PARENT,
    margin: 10,
  },
  pieChart2: {
    width: 1 / 3,
    height: MATCH_PARENT,
    margin: 10,
    centerHorizontal: true,
  },
  pieChart3: {
    width: 1 / 3,
    height: MATCH_PARENT,
    margin: 10,
    alignEnd: PARENT_ID,
  },
});
