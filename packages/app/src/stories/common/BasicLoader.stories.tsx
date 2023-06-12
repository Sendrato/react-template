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
};

type Story = StoryObj<typeof BasicLoader>;

export const Default: Story = {
  args: {
    size: '2rem',
  },
};

export default meta;
