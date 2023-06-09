import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import PageHeader from '@modules/common/PageHeader';

const MockedState = {
  addedRecord: {
    message: null,
    open: false,
    type: 'success',
  },
};

const MockedStateSuccess = {
  addedRecord: {
    message: 'Successfuly created',
    open: true,
    type: 'success',
  },
};

const Mockstore = ({
  children,
  recordState,
}: {
  children: ReactNode;
  recordState: any;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        design: combineReducers({
          modals: createSlice({
            name: 'taskbox',
            initialState: recordState,
            reducers: {},
          }).reducer,
        }),
      },
    })}
  >
    {children}
  </Provider>
);

import { Button } from '@mui/material';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

import { PageTitle } from '@modules/common/styled-mui';

const withProvider = (story: any) => (
  <Mockstore recordState={MockedState}>{story()}</Mockstore>
);

const withProvideRecord = (story: any) => (
  <Mockstore recordState={MockedStateSuccess}>{story()}</Mockstore>
);

const meta: Meta<typeof PageHeader> = {
  title: 'Common/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [withProvider],
  argTypes: {},
};

type Story = StoryObj<typeof PageHeader>;

export const OnlyTitle: Story = {
  decorators: [withProvider],
  args: {
    children: (
      <>
        <PageTitle>PageTitle</PageTitle>
      </>
    ),
  },
};

export const WithButton: Story = {
  decorators: [withProvider],
  args: {
    children: (
      <>
        <PageTitle>PageTitle</PageTitle>
        <Button variant="contained">Add new</Button>
      </>
    ),
  },
};

export const withRecord: Story = {
  decorators: [withProvideRecord],
  args: {
    withRecord: true,
    children: (
      <>
        <PageTitle>PageTitle</PageTitle>
        <Button variant="contained">Add new</Button>
      </>
    ),
  },
};

export default meta;
