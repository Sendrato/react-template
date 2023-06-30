import { Grid } from '@mui/material';
import { useNotificationsContext } from 'contexts/NotificationsContext';
import { ReactNode } from 'react';
import styled from 'styled-components';

import RecordMessage from './RecordMessage';

interface IProps {
  withRecord?: boolean;
  children: ReactNode;
}

const PageHeader = ({ withRecord = false, children }: IProps) => {
  const { record } = useNotificationsContext();

  return (
    <Container>
      {withRecord && <RecordMessage open={record.open} message={record.message} />}
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
