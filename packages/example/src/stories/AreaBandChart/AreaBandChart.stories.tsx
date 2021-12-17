import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { bandAreaChartNotes, bandAreaChartStory } from './AreaBandChart.story';


const stories = storiesOf('AreaBandChart', module);
stories.addDecorator(withKnobs);

stories.add('Zoom + Tooltip', bandAreaChartStory, { notes: bandAreaChartNotes });

