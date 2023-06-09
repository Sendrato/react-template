import { Meta, StoryObj } from '@storybook/react';

import BreadCrumbs from '@modules/common/BreadCrumbs';

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Common/BreadCrumbs',
  component: BreadCrumbs,
  tags: ['autodocs'],
  argTypes: {
    breadcrumbs: {
      description: 'The breadcrumbs is array of JSX.Element like Link',
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
