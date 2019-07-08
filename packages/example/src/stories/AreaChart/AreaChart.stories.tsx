import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { simpleAreaChartNotes, simpleAreaChartStory } from './AreaChart.simple.story';
import { tooltipAreaChartNotes, tooltipAreaChartStory } from './AreaChart.tooltip.stories';

const stories = storiesOf('AreaChart', module);
stories.addDecorator(withKnobs);

stories.add('Simple', simpleAreaChartStory, { notes: simpleAreaChartNotes });
stories.add('Tooltip', tooltipAreaChartStory, { notes: tooltipAreaChartNotes });
