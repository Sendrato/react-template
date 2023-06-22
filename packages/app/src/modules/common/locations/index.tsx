import { ListSellers } from '@interfaces/common/backoffice/onboarding';
import { Button } from '@mui/material';
import { usePagination } from 'hooks';
import useEntityMutationQuery from 'hooks/use-entity-mutation-query';
import useEntityQuery from 'hooks/use-entity-query';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement } from 'react';
import { METHOD } from 'store/slices/entityCall';

import PageHeader from '@components/common/PageHeader';
import { PageTitle } from '@components/styled-mui';
import GenericTable from '@components/Table/GenericTable';
import { ITableDataKeys } from '@components/Table/types';

const mockSeller = {
  Address: '',
  BankAccountBranch: '',
  BankAccountName: '',
  BankAccountNumber: '',
  City: '',
  Email: 'test.test.dev.2@test.com',
  FirstName: 'test.test.dev.2',
  LastName: 'test.test.dev.2',
  Name: 'test.test.dev.2',
  Phone: '',
  Zipcode: '',
  moveNext: false,
  submit: false,
};

const sellersTableConfig: ITableDataKeys[] = [
  { key: 'SellerId', type: 'text', label: 'Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Email', type: 'text', label: 'Email' },
];

const LocationPage = () => {
  const paginationConfig = usePagination();
  const { page, rows } = paginationConfig;
  const {
    data,
    isFetching,
    refetch: fetchListSellers,
  } = useEntityQuery<ListSellers>({
    entity: 'common/backoffice/onboarding/ListSellers',
    params: `Start=${page * rows}&PageSize=${rows}`,
    deps: [page * rows, rows],
  });

  const { mutateAsync } = useEntityMutationQuery({
    entity: 'common/backoffice/onboarding/Seller',
    method: METHOD.POST,
  });

  const handleCreateSeller = async (body: unknown) => {
    await mutateAsync({ body });
    await fetchListSellers();
  };

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
        tooltipComponent={
          <Button variant="contained" onClick={() => handleCreateSeller(mockSeller)}>
            Add Seller
          </Button>
        }
      />
    </>
  );
};

LocationPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LocationPage;
