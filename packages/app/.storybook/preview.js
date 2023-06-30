/** @type { import('@storybook/react').Preview } */
import { ThemeDecorator, ContextDecorator } from 'stories/decorators';

const preview = {
  decorators: [ThemeDecorator, ContextDecorator],
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
