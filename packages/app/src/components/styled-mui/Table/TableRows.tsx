import { TableRow } from '@mui/material';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { withForwardProps } from 'utils';

export const TableHeadRow = ({
  children,
  noWrapCell = false,
}: {
  children: ReactNode;
  noWrapCell?: boolean;
}) => {
  return <HeadRow noWrap={noWrapCell}>{children}</HeadRow>;
};

export const TableBodyRow = ({
  children,
}: {
  children: ReactNode;
  value?: Record<string, any>;
}) => {
  return <Row>{children}</Row>;
};

export const TableBorderRow = styled(TableRow)`
  border-bottom: 1px solid rgba(224, 224, 224, 1);

  & > td,
  span,
  th {
    border: none;
  }
`;

type HeadRow = { noWrap?: boolean };

const HeadRow = styled(TableRow).withConfig(withForwardProps(['noWrap']))<HeadRow>`
  background-color: #f8fafc;
  > th,
  span {
    border: none;
    font-weight: 600;
    font-size: 12px;
    line-height: 24px;
    text-transform: uppercase;
    color: #64748b;
    white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'normal')};
  }
`;

const Row = styled(TableRow)`
  > th,
  span,
  td {
    font-weight: 400;
    font-size: 14px;
    line-height: 143%;
    color: #475569;
  }
`;
