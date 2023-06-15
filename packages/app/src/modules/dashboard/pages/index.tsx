import { Button } from '@mui/material';
import { useCopyToClipboard } from 'hooks';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement, useState } from 'react';

import PageHeader from '@modules/common/PageHeader';
import SearchPanel from '@modules/common/SearchPanel';
import { PageTitle } from '@modules/common/styled-mui';
import GenericTable from '@modules/common/Table/GenericTable';
import { ITableDataKeys } from '@modules/common/Table/types';

const sellersTableConfig: ITableDataKeys[] = [
  { key: 'SellerId', type: 'text', label: 'Seller Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Email', type: 'text', label: 'Email' },
  { key: 'Phone', type: 'text', label: 'Phone' },
];

const data = [
  { SellerId: 'test.1', Name: 'test.1', Email: 'test.1', Phone: 'test.1' },
  { SellerId: 'test.2', Name: 'test.2', Email: 'test.2', Phone: 'test.2' },
  { SellerId: 'test.3', Name: 'test.3', Email: 'test.3', Phone: 'test.3' },
  { SellerId: 'test.4', Name: 'test.4', Email: 'test.4', Phone: 'test.4' },
  { SellerId: 'test.5', Name: 'test.5', Email: 'test.5', Phone: 'test.5' },
  { SellerId: 'test.6', Name: 'test.6', Email: 'test.6', Phone: 'test.6' },
  { SellerId: 'test.7', Name: 'test.7', Email: 'test.7', Phone: 'test.7' },
  { SellerId: 'test.8', Name: 'test.8', Email: 'test.8', Phone: 'test.8' },
  { SellerId: 'test.9', Name: 'test.9', Email: 'test.9', Phone: 'test.9' },
];

const DashboardPage = () => {
  const [search, setSearch] = useState('');
  const [copied, copy] = useCopyToClipboard('Sellers');

  const handleSearchQuery = (v: string) => setSearch(v);

  return (
    <>
      <PageHeader>
        <PageTitle variant="h4">Sellers</PageTitle>
        <Button
          variant="contained"
          color={copied ? 'success' : 'primary'}
          onClick={copy}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </PageHeader>

      <SearchPanel
        title="Search Sellers"
        onChange={handleSearchQuery}
        value={search}
        placeholder="Find sellers by name, location or contact information"
      />

      <GenericTable title="Sellers" data={data} config={sellersTableConfig} />
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
