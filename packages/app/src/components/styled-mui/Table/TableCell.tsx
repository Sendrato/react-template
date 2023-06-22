import { TableCell as MuiTableCell } from '@mui/material';
import styled from 'styled-components';

export const MediumCell = styled(MuiTableCell)`
  padding: 1rem 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  display: flex;
  word-break: word;
  justify-content: end;
  color: #1e293b;
`;

export const LabelCell = styled(MuiTableCell)<{
  $width?: string;
}>`
  padding: 1rem 0;
  color: #475569;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  width: ${(props) => props.$width || '30%'};
`;

export const LinkCell = styled(MediumCell)`
  color: #6183e4;
  cursor: pointer;
`;

export const TableHeadCell = styled(MuiTableCell)`
  border: none;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
  color: #64748b;
`;
