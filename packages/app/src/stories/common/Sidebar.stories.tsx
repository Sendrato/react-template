import { Meta, StoryObj } from '@storybook/react';
import Sidebar from 'layouts/Sidebar';
import navItems from 'layouts/Sidebar/dashboardItems';

const meta: Meta<typeof Sidebar> = {
  title: 'Common/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'The object with title and pages.',
    },
    open: {
      description: 'The indicator for persistnat and temporery Sidebar.',
    },
    variant: {
      description: 'The type of Sidebar.',
    },
    PaperProps: {
      description: 'The Sidebar styles.',
    },
    onClose: {
      description: 'Function for the closing Sidebar.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Sidebar component is part of DashboardLayout that allows you to display a navigation menu for conveniently accessing different pages within your application. It also provides the ability to adjust access to specific pages based on user roles, ensuring appropriate visibility and control.',
      },
    },
  },
};

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    items: navItems,
    PaperProps: {
      style: { width: 256 },
    },
    variant: 'persistent',
    open: false,
  },
};

export default meta;
