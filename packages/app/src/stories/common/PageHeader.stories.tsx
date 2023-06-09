import { Button } from '@mui/material';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { Meta, StoryObj } from '@storybook/react';
import { createReduxProvider } from 'stories/utils';

import PageHeader from '@modules/common/PageHeader';
import { PageTitle } from '@modules/common/styled-mui';

const createModalsStore = (mockState: any): any =>
  configureStore({
    reducer: {
      design: combineReducers({
        modals: createSlice({
          name: 'modal',
          initialState: mockState,
          reducers: {},
        }).reducer,
      }),
    },
  });

const MockedStateSuccessRecord = createModalsStore({
  addedRecord: {
    message: 'Successfuly created.',
    open: true,
    type: 'success',
  },
});

const MockedStateErrorRecord = createModalsStore({
  addedRecord: {
    message: 'Something went wrong.',
    open: true,
    type: 'error',
  },
});

const MockedStateInfoRecord = createModalsStore({
  addedRecord: {
    message: 'User already exist.',
    open: true,
    type: 'info',
  },
});

const meta: Meta<typeof PageHeader> = {
  title: 'Common/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {},
};

type Story = StoryObj<typeof PageHeader>;

export const OnlyTitle: Story = {
  args: {
    children: (
      <>
        <PageTitle>PageTitle</PageTitle>
      </>
    ),
  },
};

export const WithButton: Story = {
  args: {
    children: (
      <>
        <PageTitle>PageTitle</PageTitle>
        <Button variant="contained">Add new</Button>
      </>
    ),
  },
};

export const withSuccessRecord: Story = {
  decorators: [createReduxProvider(MockedStateSuccessRecord)],
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

export const withErrorRecord: Story = {
  decorators: [createReduxProvider(MockedStateErrorRecord)],
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

export const withInfoRecord: Story = {
  decorators: [createReduxProvider(MockedStateInfoRecord)],
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
