import { ListSellers } from '@interfaces/common/backoffice/onboarding';
import { usePagination } from 'hooks';
import useEntity from 'hooks/use-entity';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement, useState } from 'react';

import PageHeader from '@components/common/PageHeader';
import SearchPanel from '@components/common/SearchPanel';
import { PageTitle } from '@components/styled-mui';
import GenericTable from '@components/Table/GenericTable';
import { ITableDataKeys } from '@components/Table/types';

const sellersTableConfig: ITableDataKeys[] = [
  { key: 'SellerId', type: 'text', label: 'Seller Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Email', type: 'text', label: 'Email' },
];

const DashboardPage = () => {
  const [search, setSearch] = useState('');
  const paginationConfig = usePagination();
  const { page, rows } = paginationConfig;
  const params = `Start=${page * rows}&PageSize=${rows}`;

  const [data, loading, error] = useEntity<ListSellers>(
    'common/backoffice/onboarding/ListSellers',
    params,
  );

  const handleSearchQuery = (v: string) => setSearch(v);

  return (
    <>
      <PageHeader>
        <PageTitle variant="h4">Sellers</PageTitle>
      </PageHeader>

      <SearchPanel
        title="Search Sellers"
        onChange={handleSearchQuery}
        value={search}
        placeholder="Find sellers by name, location or contact information"
      />

      <GenericTable
        paginationConfig={{ ...paginationConfig, totalPage: data?.Total || 0 }}
        title="Sellers"
        data={data?.Seller || []}
        config={sellersTableConfig}
        noDataMessage={error || undefined}
        loading={loading}
      />
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
