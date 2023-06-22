import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import { useAppSelector } from 'store/hooks';
import { getModalsStore } from 'store/slices/design/modalsSlice';
import styled from 'styled-components';

import RecordMessage from './MessageModals';

interface IProps {
  withRecord?: boolean;
  children: ReactNode;
}

const PageHeader = ({ withRecord = false, children }: IProps) => {
  const { addedRecord } = useAppSelector(getModalsStore);

  return (
    <Container>
      {withRecord && <RecordMessage open={addedRecord.open} message={addedRecord.message} />}
      {children}
    </Container>
  );
};

const Container = styled(Grid)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export default PageHeader;
