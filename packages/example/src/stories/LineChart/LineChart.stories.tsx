import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { simpleLineChartNotes, simpleLineChartStory } from './LineChart.simple.story';

const stories = storiesOf('LineChart', module);
stories.addDecorator(withKnobs);

stories.add('Simple', simpleLineChartStory, { notes: simpleLineChartNotes });
