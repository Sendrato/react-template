import OverviewTable from '@modules/common/Table/OverviewTable';

import { data } from './assets/data';

const rows = [
  { key: 'Id', type: 'text', label: 'Seller Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Surname', type: 'text', label: 'Surname' },
  { key: 'Country', type: 'text', label: 'Country' },
  { key: 'Company', type: 'text', label: 'Company' },
  { key: 'Email', type: 'text', label: 'Email' },
  { key: 'CreatedOn', label: 'Date & Time', type: 'timestamp' },
];

export default {
  title: 'Tables/Overview',
  component: OverviewTable,
};

export const Table = {
  args: {
    name: 'User',
    data: data[1],
    rows,
  },
};
