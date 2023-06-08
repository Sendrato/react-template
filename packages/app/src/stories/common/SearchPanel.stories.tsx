import { Meta, StoryObj } from '@storybook/react';

import SearchPanel from '@modules/common/SearchPanel';

const meta: Meta<typeof SearchPanel> = {
  title: 'Common/SearchPanel',
  component: SearchPanel,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title above input.',
    },
    placeholder: {
      description: 'The placeholder of input.',
    },
    onChange: {
      description: 'Function for change value from input.',
    },
    value: {
      description: 'The current value.',
    },
  },
};

type Story = StoryObj<typeof SearchPanel>;

export const Default: Story = {
  args: {
    title: 'Search',
    placeholder: 'Search by id, name, email...',
  },
};

export default meta;
