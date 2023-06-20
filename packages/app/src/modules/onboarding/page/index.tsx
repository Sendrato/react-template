import { Button } from '@mui/material';
import { usePagination } from 'hooks';
import useEntityCall from 'hooks/use-entity-call';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement, useState } from 'react';
import { ListSellers } from 'store/slices/entities/onboarding/types';
import { METHOD } from 'store/slices/entityCall';

import PageHeader from '@modules/common/PageHeader';
import SearchPanel from '@modules/common/SearchPanel';
import { PageTitle } from '@modules/common/styled-mui';
import GenericTable from '@modules/common/Table/GenericTable';
import { ITableDataKeys } from '@modules/common/Table/types';

const sellersTableConfig: ITableDataKeys[] = [
  { key: 'SellerId', type: 'text', label: 'Seller Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Email', type: 'text', label: 'Email' },
];

const OnboardingPage = () => {
  const [search, setSearch] = useState('');
  const paginationConfig = usePagination({ initialPage: 0, initialRows: 10 });
  const { page, rows } = paginationConfig;

  const { response, isLoading, error, refetch } = useEntityCall<ListSellers>({
    entity: 'common/backoffice/onboarding/ListSellers',
    method: METHOD.GET,
    params: `Start=${page * rows}&PageSize=${rows}`,
    deps: [page, rows],
  });

  const handleSearchQuery = (v: string) => setSearch(v);

  return (
    <>
      <PageHeader>
        <PageTitle variant="h4">Onboarding</PageTitle>
        <Button onClick={refetch} variant="contained">
          refetch
        </Button>
      </PageHeader>

      <SearchPanel
        title="Search Sellers"
        onChange={handleSearchQuery}
        value={search}
        placeholder="Find sellers by name, location or contact information"
      />

      <GenericTable
        paginationConfig={{
          ...paginationConfig,
          totalPage: response?.Total || 0,
        }}
        title="Onboarding"
        data={response?.Seller || []}
        config={sellersTableConfig}
        noDataMessage={error || undefined}
        loading={isLoading}
      />
    </>
  );
};

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default OnboardingPage;
