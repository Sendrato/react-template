import { Meta, StoryObj } from '@storybook/react';

import SearchPanel from '@components/common/SearchPanel';

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
  parameters: {
    docs: {
      description: {
        component:
          'The SearchPanel component is a versatile and reusable component that provides a common user interface element for search functionality. It presents a search input field along with other components that can be customized to suit the overall design and requirements of your project.',
      },
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
