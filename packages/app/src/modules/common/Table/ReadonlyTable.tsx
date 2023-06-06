import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import React, { ReactElement } from 'react';

import { TableHeadCell, TableHeadRow } from '../styled-mui';
import { bootstrap } from './helpers';
import { IHeaderCell, ITableDataKeys } from './types';

interface IProps {
  data?: any;
  config?: ITableDataKeys[];
  bodyRows?: ReactElement[];
  headerCells?: IHeaderCell[];
  loading: boolean;
}

const ReadonlyTable = ({
  bodyRows,
  headerCells,
  loading,
  data,
  config,
}: IProps) => {
  const { headerCells: headerLabels, bodyRows: tableRows } = bootstrap(
    data || [],
    config || [],
    { hasSelectedRow: false },
  );

  const labels = headerCells || headerLabels;

  return (
    <TableContainer>
      <Table sx={{ opacity: loading ? 0.5 : 1, position: 'relative' }}>
        <TableHead>
          <TableHeadRow noWrapCell>
            {labels.map(({ label }, index) => (
              <TableHeadCell key={index}>{label}</TableHeadCell>
            ))}
          </TableHeadRow>
        </TableHead>

        <TableBody>{bodyRows || tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReadonlyTable;
