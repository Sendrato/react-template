import { Button } from '@mui/material';
import { useSelectedRow } from 'hooks';
import useEntityCall from 'hooks/use-entity-call';
import useEntityMutation from 'hooks/use-entity-mutation';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement, useState } from 'react';
import { METHOD } from 'store/slices/entityCall';

import Base64 from '@modules/common/Base64';
import PageHeader from '@modules/common/PageHeader';
import SearchPanel from '@modules/common/SearchPanel';
import { PageTitle } from '@modules/common/styled-mui';
import GenericTable from '@modules/common/Table/GenericTable';
import { ITableDataKeys } from '@modules/common/Table/types';

const mockProduct = {
  Id: `test.product.5`,
  Name: `test.name.product.5`,
  SellerId: 'b7f8f1f76ab7',
  Coupons: 10,
};

const sellersTableConfig: ITableDataKeys[] = [
  { key: 'Id', type: 'text', label: 'Seller Id' },
  { key: 'Name', type: 'text', label: 'Name' },
  { key: 'ImageLarge', type: 'component', label: 'Icon', component: <Base64 /> },
  { key: 'Coupons', type: 'text', label: 'Coupons' },
];

const OnboardingPage = () => {
  const [search, setSearch] = useState('');

  const { response, isLoading, error, refetch } = useEntityCall<any>({
    entity: 'common/backoffice/onboarding/ListSellerProducts',
    method: METHOD.GET,
    params: `SellerId=b7f8f1f76ab7`,
    deps: [],
  });

  const selectedConfig = useSelectedRow(response?.Product || [], 'Id');

  const { mutate: addProduct } = useEntityMutation({
    entity: 'common/backoffice/onboarding/Product',
    method: METHOD.POST,
  });

  const { mutate: deleteProduct } = useEntityMutation({
    entity: 'common/backoffice/onboarding/Product',
    method: METHOD.DELETE,
  });

  const handleCreateProduct = async () => {
    await addProduct({ body: mockProduct });
    await refetch();
  };

  const handleDeleteProduct = async () => {
    for (const product of selectedConfig.selected) {
      await deleteProduct({ params: `Id=${product.Id}` });
    }
    await refetch();
  };

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
        title="Seller Products"
        onChange={handleSearchQuery}
        value={search}
        placeholder="Find sellers by name, location or contact information"
      />

      <GenericTable
        selectedConfig={selectedConfig}
        title="Products"
        data={response?.Product || []}
        config={sellersTableConfig}
        noDataMessage={error || undefined}
        loading={isLoading}
        tooltipComponent={
          <Button variant="outlined" onClick={handleCreateProduct}>
            Add row
          </Button>
        }
        selectedComponent={
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteProduct}
            sx={{ mb: '0.5rem' }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default OnboardingPage;
