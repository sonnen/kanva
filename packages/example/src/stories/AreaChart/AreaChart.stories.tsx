import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { simpleAreaChartNotes, simpleAreaChartStory } from './AreaChart.simple.story';
import { tooltipAreaChartNotes, tooltipAreaChartStory } from './AreaChart.tooltip.story';
import { zoomAreaChartNotes, zoomAreaChartStory } from './AreaChart.zoom.story';

const stories = storiesOf('AreaChart', module);
stories.addDecorator(withKnobs);

stories.add('Simple', simpleAreaChartStory, { notes: simpleAreaChartNotes });
stories.add('Tooltip', tooltipAreaChartStory, { notes: tooltipAreaChartNotes });
stories.add('Zoom', zoomAreaChartStory, { notes: zoomAreaChartNotes });
