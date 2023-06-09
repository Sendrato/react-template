/** @type { import('@storybook/react').Preview } */

import { createThemeProvider, createReduxProvider } from 'stories/utils';

const preview = {
  decorators: [createThemeProvider(), createReduxProvider()],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
