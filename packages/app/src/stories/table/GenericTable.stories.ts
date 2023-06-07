import { Meta, StoryObj } from '@storybook/react';

import GenericTable from '@modules/common/Table/GenericTable';
import { ITableDataKeys } from '@modules/common/Table/types';

import { data } from './assets/data';

const config: ITableDataKeys[] = [
  { key: 'Id', type: 'text', label: 'Seller Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Surname', type: 'text', label: 'Surname' },
  { key: 'Country', type: 'text', label: 'Country' },
  { key: 'Company', type: 'text', label: 'Company' },
  { key: 'Email', type: 'text', label: 'Email' },
  { key: 'CreatedOn', label: 'Date & Time', type: 'timestamp' },
];

const meta: Meta<typeof GenericTable> = {
  title: 'Tables/GenericTable',
  component: GenericTable,
  argTypes: {
    page: {
      description: 'The current page number',
      defaultValue: 1,
    },
    rows: {
      description: 'The number of rows per page',
      defaultValue: 10,
    },
    handleChangePage: {
      description: 'Callback function for page change event',
      defaultValue: () => null,
    },
    handleChangeRows: {
      description: 'Callback function for rows per page change event',
      defaultValue: () => null,
    },
    totalPage: {
      description: 'The total number of pages',
      defaultValue: 5,
    },
    sortBy: {
      description: 'The column to sort by',
      defaultValue: 'columnName',
    },
    setSortBy: {
      description: 'Callback function for setting the sort column',
      defaultValue: () => null,
    },
    sortDirection: {
      description: 'The sort direction ("asc" or "desc")',
      defaultValue: 'asc',
    },
    setSortDirection: {
      description: 'Callback function for setting the sort direction',
      defaultValue: () => null,
    },
    data: {
      description: 'The data to display in the table',
      defaultValue: [],
    },
    config: {
      description: 'Configuration options for the table',
      defaultValue: {},
    },
    title: {
      description: 'The title of the React Table component',
      defaultValue: '',
    },
  },
};

type Story = StoryObj<typeof GenericTable>;

export const Basic: Story = {
  args: {
    data,
    config,
    title: 'Table',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The GenericTable component displays tabular data with various features and customization options.',
      },
    },
    argTypes: meta.argTypes,
  },
};

export default meta;
