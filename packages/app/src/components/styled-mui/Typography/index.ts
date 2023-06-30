import { Typography } from '@mui/material';
import styled from 'styled-components';

export const PageTitle = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;

  @media (max-width: 900px) {
    font-size: 20px;
  }
`;

export const SubTitle = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #1e293b;
`;

export const TableTitle = styled(SubTitle)`
  font-size: 16px;
  text-overflow: visible;
  text-align: left;
  white-space: nowrap;
`;

export const ModalSubtitle = styled(Typography)`
  font-weight: 600;
  font-size: 17px;
  line-height: 29px;
  color: #475569;
`;

export const TabTitle = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  color: rgba(0, 0, 0, 0.87);
`;
