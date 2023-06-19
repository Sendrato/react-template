import { Button } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { usePaginationState, useSelectedRow, useSortState } from 'hooks';
import { useEffect } from 'react';

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
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'The data to display in the table.',
    },
    config: {
      description:
        "The config property of the table component allows you to define the configuration for each column in the table. It should be an array of objects, where each object represents the configuration for a column. Each configuration object in the config array can have the following properties: 1) label (string, required): The label or header text to be displayed for the column in the table. 2) key (string, required): The key or property name from the data array to retrieve the corresponding value for the column in each row. 3) type (string, required): The type of data to be displayed in the column. Supported types are: 'text': Renders the value as plain text (default if not specified). 'link': Renders the value as a clickable link. Requires the baseHref property to be specified. 'timestamp': Assumes the value is a UNIX timestamp and formats it as a human-readable date. 'component': Renders a custom React component for the value. Requires the component property to be specified. 4)baseHref (string, required for 'link' type): The base href to be prepended to the value when rendering it as a link. Useful for email addresses, URLs, etc. 5) component (React component, required for 'component' type): The custom React component to be rendered for the value. This component should accept the row data as props. 6) align (string, optional): The alignment of the content within the column. Supported values are 'left', 'center', and 'right'. Defaults to 'left'. By providing the config property, you can define the structure and appearance.",
    },
    title: {
      description: 'The title of the Table.',
    },
    headerCells: {
      description:
        'Use it prop with bodyRows if you need to create a table with many custom components. HeaderCells is an array of objects with a label(required, string), id(required, string) should be the key for data in this column and align(default: "left").',
    },
    bodyRows: {
      description: 'It is array of TableBodyRows',
    },
    loading: {
      description: 'Data loading indicator.',
      control: {
        type: 'boolean',
      },
    },
    tooltipComponent: {
      description:
        'The tooltipComponent is a React component in top right corner.',
    },
    selectedKey: {
      description:
        'The selectedKey is property for create table with selectedRow.',
    },
    onSelect: {
      description: 'Function for select one row by selectedKey.',
    },
    selectAll: {
      description: 'Function for select all rows.',
    },
    selected: {
      description: 'The selected property is array of selected rows.',
    },
    selectedComponent: {
      description:
        'The selectedComponent is a React component that will be display when user select some rows.',
    },
    page: {
      description: 'The current page number.',
    },
    rows: {
      description: 'The number of rows per page.',
    },
    handleChangePage: {
      description: 'Function for change page.',
    },
    handleChangeRows: {
      description: 'Function for change rows per page.',
    },
    setPage: {
      description: 'Function for set page.',
    },
    setRows: {
      description: 'Function for change page.',
    },
    totalPage: {
      description: 'The total number of pages.',
    },
    sortBy: {
      description: 'The column to sort by.',
    },
    setSortBy: {
      description: 'Function for setting the sort column.',
    },
    sortDirection: {
      description: 'The sort direction ("asc" or "desc").',
    },
    setSortDirection: {
      description: 'Function for setting the sort direction.',
    },
    noDataMessage: {
      description:
        'The message which will be displayed if the component gets an empty data array.',
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
          'The GenericTable component is a powerful and versatile component that enables you to quickly create tables with customizable configurations, offering essential features such as pagination, data sorting, row selection. It leverages the EnhancedTableCell component to display the content within each table cell according to type from config. The GenericTable component simplifies the process of generating tables by providing a high-level configuration approach. It supports the use of hooks, such as usePagination, useSort, and useSelectedRow, which facilitate the fast creation of configurations for pagination, sorting, and row selection features.',
      },
    },
  },
};

type Story = StoryFn<typeof GenericTable>;

const Template: Story = (args) => {
  const sortConfig = useSortState(data);
  const { sortItems, sortBy, sortDirection, handleSort } = sortConfig;
  const paginationConfig = usePaginationState(sortItems);
  const { page, rows, handlePaginate, showData } = paginationConfig;
  const seletedConfig = useSelectedRow(sortItems, 'Id');

  useEffect(() => {
    handleSort(sortBy, sortDirection);
  }, [sortBy, sortDirection, handleSort]);

  useEffect(() => {
    handlePaginate(page, rows);
  }, [page, rows, handlePaginate]);

  return (
    <GenericTable
      {...args}
      {...paginationConfig}
      {...sortConfig}
      {...seletedConfig}
      title="Users"
      data={showData}
      totalPage={data.length}
      config={config}
      tooltipComponent={<Button variant="outlined">Add new</Button>}
      selectedComponent={
        <Button variant="contained" color="error" sx={{ mb: '0.5rem' }}>
          Delete
        </Button>
      }
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  loading: false,
  withContainer: true,
};

export default meta;
