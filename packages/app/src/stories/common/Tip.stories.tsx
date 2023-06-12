import { Meta, StoryObj } from '@storybook/react';

import Tip from '@modules/common/Tip';

const meta: Meta<typeof Tip> = {
  title: 'Common/Tip',
  component: Tip,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'The Tip type.',
    },
    message: {
      description: 'The Tip message.',
    },
    actionMessage: {
      description: 'The message for button inside Tip.',
    },
    onClick: {
      description: 'The function by click on the button.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Tip component offers different styles for displaying messages, including informational, success, and error styles. It can be easily integrated into any part of your application where you need to provide visual feedback or important information to users.',
      },
    },
  },
};

type Story = StoryObj<typeof Tip>;

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Card is locked.',
    actionMessage: 'Unlock',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Last activity 12-05-2023.',
    actionMessage: 'Ok',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Card is unlocked.',
    actionMessage: 'Lock',
  },
};

export default meta;
