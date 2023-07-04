import { Meta, StoryObj } from '@storybook/react';

import ErrorComponent from '@components/404/404';

const meta: Meta<typeof ErrorComponent> = {
  title: 'Common/ErrorComponent',
  component: ErrorComponent,
  tags: ['autodocs'],
  argTypes: {
    message: {
      description: 'The error message.',
    },
    title: {
      description: 'The title of Error component',
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

type Story = StoryObj<typeof ErrorComponent>;

export const NotFound: Story = {
  args: {
    title: '404 Error',
    message: ' Page Not Found.The server could not find the page with this address.',
  },
};

export const ServerError: Story = {
  args: {
    title: '500 Error',
    message: 'Internal server error.',
  },
};

export default meta;
