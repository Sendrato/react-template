import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from 'store';

import PageHeader from '@modules/common/PageHeader';

const withProvider = (story: any) => (
  <Provider store={store}>{story()}</Provider>
);

const meta: Meta<typeof PageHeader> = {
  title: 'Common/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [withProvider],
  argTypes: {},
};

type Story = StoryObj<typeof PageHeader>;

export const Default = <PageHeader>Title</PageHeader>;

export default meta;
