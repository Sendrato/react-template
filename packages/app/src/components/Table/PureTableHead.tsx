import { Checkbox, TableCell, TableHead } from '@mui/material';
import React from 'react';

import { TableHeadCell, TableHeadRow } from '../styled-mui';
import { IHeaderCell } from './types';

interface IProps {
  headerCells: IHeaderCell[];
  selectAll?: () => void;
  hasSelect?: boolean;
  checked?: boolean;
}

const PureTableHead = ({ headerCells, hasSelect, selectAll, checked }: IProps) => {
  return (
    <TableHead>
      <TableHeadRow noWrapCell>
        {hasSelect && (
          <TableCell align="left" sx={{ width: '2rem' }}>
            <Checkbox checked={checked} onChange={selectAll} />
          </TableCell>
        )}
        {headerCells.map(({ label, align = 'left' }, index) => (
          <TableHeadCell key={index} align={align}>
            {label}
          </TableHeadCell>
        ))}
      </TableHeadRow>
    </TableHead>
  );
};

export default PureTableHead;
