import { Meta, StoryObj } from '@storybook/react';

import BasicLoader from '@modules/common/BasicLoader';

const meta: Meta<typeof BasicLoader> = {
  title: 'Common/BasicLoader',
  component: BasicLoader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'The loader size.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The BasicLoader component is a versatile and reusable component that provides a simple and consistent way to display loading indicators within your application. It offers a straightforward solution for indicating ongoing processes or waiting periods to users. The BasicLoader component can be easily integrated into any part of your application where loading feedback is required. Whether it`s fetching data from an API, performing calculations, or any other asynchronous operations.',
      },
    },
  },
};

type Story = StoryObj<typeof BasicLoader>;

export const Default: Story = {
  args: {
    size: '2rem',
  },
};

export default meta;
