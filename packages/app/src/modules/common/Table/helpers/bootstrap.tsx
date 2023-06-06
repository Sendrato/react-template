import { TableCell } from '@mui/material';
import { ReactElement } from 'react';
import { getHeaderCells } from 'utils';

import { TableBodyRow } from '@modules/common/styled-mui';

import { EnhancedTableCell } from '../EnhancedTableCell';
import { IHeaderCell, ITableDataKeys } from '../types';

interface ITableComponent {
  headerCells: IHeaderCell[];
  bodyRows: ReactElement[];
}

interface IBootstrapOption {
  hasSelectedRow: boolean;
}

const bootstrap = <T extends Record<string, any>>(
  data: T[],
  config: ITableDataKeys[],
  options?: IBootstrapOption,
): ITableComponent => {
  const headerCells = getHeaderCells(config);

  const bodyRows: ReactElement[] = data.map((row, index) => (
    <TableBodyRow key={index} value={options?.hasSelectedRow ? row : undefined}>
      {config.map((cell, index) => (
        <TableCell key={index} align={cell.align}>
          <EnhancedTableCell
            {...cell}
            value={!!cell.key ? row[cell.key as keyof T] : row}
          />
        </TableCell>
      ))}
    </TableBodyRow>
  ));

  return {
    headerCells,
    bodyRows,
  };
};

export default bootstrap;
