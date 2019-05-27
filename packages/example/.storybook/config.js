import { addParameters, configure } from '@storybook/react';
import { theme } from './theme';

import './base.css';

addParameters({
  options: {
    theme,
  },
});

function importAll(req) {
  req.keys().forEach(req);
}

function loadStories() {
  importAll(require.context('../src', true, /.stories.tsx$/));
}

configure(loadStories, module);

