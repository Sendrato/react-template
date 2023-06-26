import { METHOD } from '@interfaces/common/backoffice/api';
import { ListSellers, SellerDTO } from '@interfaces/common/backoffice/onboarding';
import { Button } from '@mui/material';
import { useEntityMutation, useEntityQuery, usePagination } from 'hooks';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement } from 'react';

import PageHeader from '@components/common/PageHeader';
import { PageTitle } from '@components/styled-mui';
import GenericTable from '@components/Table/GenericTable';
import { ITableDataKeys } from '@components/Table/types';

const mockSeller: SellerDTO = {
  Address: '',
  BankAccountBranch: '',
  BankAccountName: '',
  BankAccountNumber: '',
  City: '',
  Email: 'test.test.dev.5@test.com',
  FirstName: 'test.test.dev.5',
  LastName: 'test.test.dev.5',
  Name: 'test.test.dev.5',
  Phone: '',
  Zipcode: '',
};

const sellersTableConfig: ITableDataKeys[] = [
  { key: 'SellerId', type: 'text', label: 'Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'Email', type: 'text', label: 'Email' },
];

const SellersPage = () => {
  const paginationConfig = usePagination();
  const { page, rows } = paginationConfig;

  const { data, isFetching, refetch } = useEntityQuery<ListSellers>({
    entity: 'entity/common/backoffice/onboarding/ListSellers',
    params: `Start=${page * rows}&PageSize=${rows}`,
    deps: [page * rows, rows],
  });

  const { mutateAsync } = useEntityMutation<unknown, SellerDTO>({
    entity: 'entity/common/backoffice/onboarding/Seller',
    method: METHOD.POST,
  });

  const handleCreateSeller = async (body: SellerDTO) => {
    await mutateAsync({ body });
    await refetch();
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

SellersPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SellersPage;
