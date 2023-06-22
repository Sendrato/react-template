import { ListSellers } from '@interfaces/common/backoffice/onboarding';
import { usePagination } from 'hooks';
import useEntityQuery from 'hooks/use-entity-query';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement } from 'react';

import PageHeader from '@components/common/PageHeader';
import { PageTitle } from '@components/styled-mui';
import GenericTable from '@components/Table/GenericTable';
import { ITableDataKeys } from '@components/Table/types';

const sellersTableConfig: ITableDataKeys[] = [
  { key: 'SellerId', type: 'text', label: 'Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Email', type: 'text', label: 'Email' },
];

const entity = 'common/backoffice/onboarding/ListSellers';

const LocationPage = () => {
  const paginationConfig = usePagination();
  const { page, rows } = paginationConfig;
  const { data, isFetching } = useEntityQuery<ListSellers>({
    entity,
    params: `Start=${page * rows}&PageSize=${rows}`,
    deps: [page * rows, rows],
  });

  return (
    <>
      <PageHeader withRecord>
        <PageTitle variant="h4">Onboarding</PageTitle>
      </PageHeader>

      <GenericTable
        paginationConfig={{ ...paginationConfig, totalPage: data?.Total || 0 }}
        title="Sellers"
        loading={isFetching}
        data={data?.Seller || []}
        config={sellersTableConfig}
      />
    </>
  );
};

LocationPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LocationPage;
