import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Meta, StoryObj } from '@storybook/react';
import Sidebar from 'layouts/Sidebar';
import navItems from 'layouts/Sidebar/dashboardItems';
import { createReduxProvider } from 'stories/utils';

const createAuthStore = (mockState: Record<string, any>): ToolkitStore =>
  configureStore({
    reducer: {
      auth: createSlice({
        name: 'auth',
        initialState: mockState,
        reducers: {},
      }).reducer,
    },
  });

const mockAdminUser = createAuthStore({
  userRole: {
    isAdmin: true,
    AccountType: 'administrator',
    SellerId: null,
  },
});

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
};

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  decorators: [createReduxProvider(mockAdminUser)],
  args: {
    items: navItems,
    PaperProps: {
      style: { width: 256 },
    },
    variant: 'permanent',
    open: false,
  },
};

export default meta;
