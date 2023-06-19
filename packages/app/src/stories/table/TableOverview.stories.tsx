import { Meta, StoryObj } from '@storybook/react';

import OverviewTable, {
  IObjectTableRow,
} from '@modules/common/Table/OverviewTable';

import { data } from './assets/data';

const rows: IObjectTableRow[] = [
  { key: 'Id', type: 'text', label: 'Seller Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Surname', type: 'text', label: 'Surname' },
  { key: 'Country', type: 'text', label: 'Country' },
  { key: 'Company', type: 'text', label: 'Company' },
  { key: 'Email', type: 'text', label: 'Email' },
  { key: 'CreatedOn', label: 'Date & Time', type: 'timestamp' },
];

const meta: Meta<typeof OverviewTable> = {
  title: 'Tables/Overview',
  component: OverviewTable,
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: 'The title of the Table.',
    },
    data: {
      description: 'The data to display in the table.',
    },
    gap: {
      description:
        'The padding CSS shorthand property sets the padding area on all four sides of an element.',
    },
    withContainer: {
      description: 'Use it if needed wrap table in TablePaper',
    },
    sx: {
      description: 'The CSS styles',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The TableOverview component is a versatile and customizable component that provides a clear and organized representation of tabular data within your application. It offers an efficient way to present and summarize sets of data in a structured and user-friendly format.',
      },
    },
  },
};

type Story = StoryObj<typeof OverviewTable>;

export const WithContainer: Story = {
  args: {
    name: 'User',
    data: data[1],
    withContainer: true,
    gap: '1rem 1.5rem',
    rows,
  },
};

export default meta;
