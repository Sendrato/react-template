import { Meta, StoryObj } from '@storybook/react';

import BreadCrumbs from '@components/common/BreadCrumbs';

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Common/BreadCrumbs',
  component: BreadCrumbs,
  tags: ['autodocs'],
  argTypes: {
    breadcrumbs: {
      description: 'The breadcrumbs is array of JSX.Element like Link',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Breadcrumbs component is a flexible component that allows you to create a visual representation of hierarchical navigation paths within your application. It takes an array of breadcrumb items and renders them in a visually pleasing and user-friendly manner. The Breadcrumbs component is particularly useful when you want to provide users with an easy way to navigate back or traverse through different levels of a website or application. Each breadcrumb item represents a specific page or section, allowing users to understand their current location within the overall structure.',
      },
    },
  },
};

type Story = StoryObj<typeof BreadCrumbs>;

export const Default: Story = {
  args: {
    breadcrumbs: [<>Overview</>, <>Details</>],
  },
};

export default meta;
