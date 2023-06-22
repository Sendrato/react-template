import { Checkbox, TableCell, TableHead, TableSortLabel } from '@mui/material';
import React, { memo, useCallback } from 'react';

import { TableHeadRow } from '../styled-mui/Table/TableRows';
import { IHeaderCell } from './types';

interface IProps {
  sortHandler: (sortBy: string) => void;
  sortBy: string;
  labels: IHeaderCell[];
  sortDirection?: 'ASC' | 'DESC';
  filterExpression?: string;
  setSortDirection?: (dir: 'ASC' | 'DESC' | ((prev: string) => 'ASC' | 'DESC')) => void;
  selectAll?: () => void;
  hasSelect?: boolean;
  checked?: boolean;
  noWrapCell?: boolean;
}

const EnhancedTableHead = memo(
  ({
    sortHandler,
    sortBy,
    labels,
    sortDirection,
    setSortDirection,
    hasSelect,
    selectAll,
    checked,
    noWrapCell = false,
  }: IProps) => {
    const getSortDirection = useCallback(
      (id?: string) =>
        sortBy === id ? (sortDirection?.toLowerCase() as 'asc' | 'desc') || 'asc' : 'asc',
      [sortBy, sortDirection],
    );

    const getIsActive = useCallback((id?: string) => !!(id && sortBy === id), [sortBy]);

    const handleCellClick = useCallback(
      (id?: string) => {
        if (id) {
          setSortDirection &&
            setSortDirection(sortBy === id && sortDirection === 'ASC' ? 'DESC' : 'ASC');
          sortHandler(id);
        }
      },
      [setSortDirection, sortBy, sortHandler, sortDirection],
    );

    return (
      <>
        <TableHead>
          <TableHeadRow noWrapCell={noWrapCell}>
            {hasSelect && (
              <TableCell align="left" sx={{ width: '2rem' }}>
                <Checkbox checked={checked} onChange={selectAll} />
              </TableCell>
            )}
            {labels.map((headCell, index) => (
              <TableCell key={index} align={headCell.align || 'left'}>
                <TableSortLabel
                  active={getIsActive(headCell.id)}
                  direction={getSortDirection(headCell.id)}
                  onClick={() => handleCellClick(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableHeadRow>
        </TableHead>
      </>
    );
  },
);

EnhancedTableHead.displayName = 'EnhancedTableHead';

export default EnhancedTableHead;
