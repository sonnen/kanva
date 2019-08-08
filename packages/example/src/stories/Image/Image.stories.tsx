import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { simpleImageStory, simpleImageNotes } from './Image.simple.story';

const stories = storiesOf('Image', module);
stories.addDecorator(withKnobs);

stories.add('Simple', simpleImageStory, { notes: simpleImageNotes });
