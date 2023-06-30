import { Paper, Typography } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

import Base64 from '@components/common/Base64';
import { EnhancedTableCell } from '@components/Table/EnhancedTableCell';

import { base64 } from './assets/data';

const meta: Meta<typeof EnhancedTableCell> = {
  title: 'Tables/EnhancedTableCell',
  component: EnhancedTableCell,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'The type of data in EnhancedTableCell.',
    },

    value: {
      description: 'The value passed in EnhancedTableCell.',
    },
    baseHref: {
      description: 'The base href of link, full href will be created as baseHref + value.',
    },
    component: {
      description:
        'The custom component needed display in this cell. Important: custom component must include value property, and value from EnhancedTableCell will pass into a component.',
    },
    onClick: {
      description: 'The function will call by clicking on the EnhancedTableCell.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The EnhancedTableCell component is a powerful and flexible component that allows you to create and customize the content within a table cell in a convenient and consistent manner. It provides enhanced functionality and rendering options for displaying data within TableCell components. The EnhancedTableCell component offers a range of features to enrich the content of table cells. You can leverage these features to format data, apply styling, incorporate interactive elements, or handle specific data types with ease.',
      },
    },
  },
};

type Story = StoryObj<typeof EnhancedTableCell>;

export const Text: Story = {
  args: {
    type: 'text',
    value: 'Test text',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    value: 'tutorials',
    baseHref: 'https://storybook.js.org/',
  },
};

export const Timestamp: Story = {
  args: {
    type: 'timestamp',
    value: '2023-05-26T09:27:19+0100',
  },
};

export const Component: Story = {
  args: {
    type: 'component',
    value: base64,
    component: <Base64 />,
  },
};

export const DetailsLink: Story = {
  args: {
    type: 'details',
    value: 'tutorials',
    baseHref: 'https://storybook.js.org/',
  },
};

export const DetailsDialog: Story = {
  args: {
    type: 'details',
    value: 'tutorials',
    onClick: () => console.log('click'),
  },
};

export const Popover: Story = {
  args: {
    type: 'popover',
    value: '',
    component: (
      <Paper sx={{ p: '0.5rem' }}>
        <Typography>Delete</Typography>
        <Typography>Edit</Typography>
      </Paper>
    ),
  },
};

export default meta;
