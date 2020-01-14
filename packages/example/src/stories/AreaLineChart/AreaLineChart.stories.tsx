import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { simpleAreaChartNotes, simpleAreaChartStory } from './AreaLineChart.simple.story';
import { tooltipAreaChartNotes, tooltipAreaChartStory } from './AreaLineChart.tooltip.story';
import { zoomAreaChartNotes, zoomAreaChartStory } from './AreaLineChart.zoom.story';

const stories = storiesOf('AreaLineChart', module);
stories.addDecorator(withKnobs);

stories.add('Simple', simpleAreaChartStory, { notes: simpleAreaChartNotes });
stories.add('Tooltip', tooltipAreaChartStory, { notes: tooltipAreaChartNotes });
stories.add('Zoom', zoomAreaChartStory, { notes: zoomAreaChartNotes });
