/* eslint-disable react/display-name */
import { TRecord } from '@interfaces/UI/notification';
import { Button } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { notificationsDecorator } from 'stories/decorators';

import PageHeader from '@components/common/PageHeader';
import { PageTitle } from '@components/styled-mui';

const successRecord = {
  record: { message: 'Success!', open: true, type: 'success' } as TRecord,
};

const errorRecord = {
  record: { message: 'Something went wrong!', open: true, type: 'error' } as TRecord,
};

const infoRecord = {
  record: { message: 'You have new message!', open: true, type: 'info' } as TRecord,
};

const meta: Meta<typeof PageHeader> = {
  title: 'Common/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The ReactNode',
    },
    withRecord: {
      description: 'Boolean value indicating whether to display the record.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The PageHeader component is a versatile container designed to neatly organize content at the top of the DashboardLayout. It acts as a container for its child components, providing a consistent layout for a typical page header. And passed the withRecord props as true, the PageHeader component becomes a central hub for displaying records related to requests. This ensures that important information is readily visible to users.',
      },
    },
  },
};

const Template: StoryFn<typeof PageHeader> = (args) => {
  return (
    <PageHeader {...args}>
      <PageTitle>PageTitle</PageTitle>
      <Button variant="contained">Click</Button>
    </PageHeader>
  );
};

export const Default = Template.bind({});

export const withSuccessRecord = Template.bind({});

withSuccessRecord.decorators = [notificationsDecorator(successRecord)];
withSuccessRecord.args = {
  withRecord: true,
};

export const withErrorRecord = Template.bind({});

withErrorRecord.decorators = [notificationsDecorator(errorRecord)];
withErrorRecord.args = {
  withRecord: true,
};

export const withInfoRecord = Template.bind({});

withInfoRecord.decorators = [notificationsDecorator(infoRecord)];
withInfoRecord.args = {
  withRecord: true,
};

export default meta;
