import {
  Checkbox,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
import React, {
  cloneElement,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
} from 'react';

import { StyledPaper } from '../styled-mui';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableTooltip from './EnhancedTableTooltip';
import { bootstrap } from './helpers';
import PureTableHead from './PureTableHead';
import ReadonlyTable from './ReadonlyTable';
import { IHeaderCell, ITableDataKeys } from './types';

interface BasicTableProps<TData> {
  title?: string;
  loading?: boolean;
  tooltipComponent?: ReactElement;
  selectedKey?: string;
  onSelect?: (value: TData) => void;
  selectAll?: () => void;
  selected?: TData[];
  selectedComponent?: ReactElement;
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  rows?: number;
  setRows?: Dispatch<SetStateAction<number>>;
  totalPage?: number;
  sortBy?: string;
  setSortBy?: Dispatch<SetStateAction<string>>;
  sortDirection?: 'ASC' | 'DESC';
  setSortDirection?: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  handleChangePage?: (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => void;
  handleChangeRows?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly?: boolean;
  disableGap?: boolean;
}

interface TableWithConfig<TData> extends BasicTableProps<TData> {
  data: TData[];
  config: ITableDataKeys[];
  headerCells?: IHeaderCell[];
  bodyRows?: ReactElement[];
}

interface TableWithCustomContent<TData> extends BasicTableProps<TData> {
  data?: TData[];
  config?: ITableDataKeys[];
  headerCells: IHeaderCell[];
  bodyRows: ReactElement[];
}
type TableProps<TData> = TableWithConfig<TData> | TableWithCustomContent<TData>;

const GenericTable = <TData extends Record<string, any>>({
  title,
  data,
  config,
  tooltipComponent,
  headerCells,
  bodyRows,
  selectedKey,
  onSelect,
  selectAll,
  selectedComponent,
  selected,
  loading = false,
  page,
  rows,
  totalPage,
  sortBy,
  sortDirection,
  setSortBy,
  setSortDirection,
  handleChangePage,
  handleChangeRows,
  readonly = false,
  disableGap = false,
}: TableProps<TData>) => {
  const hasPagination = handleChangePage && handleChangeRows && totalPage;

  const hasSort = setSortBy && setSortDirection;

  const hasSelect = onSelect && selectedKey && selected;

  const { bodyRows: tableRows, headerCells: labels } = useMemo(() => {
    return bootstrap(data || [], config || [], {
      hasSelectedRow: !!hasSelect,
    });
  }, [config, data, hasSelect]);

  const content = bodyRows ? bodyRows : tableRows;

  const children = useMemo(() => {
    return selectedKey && hasSelect
      ? content.map((row) => {
          const rowWithCheckbox = cloneElement(row, {
            ...row.props,
            children: [
              <TableCell key={row.props.children.length + 1} align="left">
                <Checkbox
                  checked={
                    !!selected.filter(
                      (sel) =>
                        sel[selectedKey] === row.props.value[selectedKey],
                    ).length
                  }
                  onChange={() => onSelect(row.props.value)}
                />
              </TableCell>,
              ...row.props.children,
            ],
          });

          return rowWithCheckbox;
        })
      : content;
  }, [content, hasSelect, selectedKey, onSelect, selected]);

  if (readonly) {
    return (
      <ReadonlyTable
        data={data}
        config={config}
        bodyRows={bodyRows}
        headerCells={headerCells}
        loading={loading}
      />
    );
  }

  return (
    <StyledPaper $padding={disableGap ? '0' : '1.5rem'}>
      <EnhancedTableTooltip
        title={title}
        tooltipComponent={tooltipComponent}
        selectedComponent={selectedComponent}
        hasSelect={!!hasSelect}
        selected={selected}
      />
      <TableContainer>
        <MuiTable sx={{ opacity: loading ? 0.5 : 1, position: 'relative' }}>
          {hasSort ? (
            <EnhancedTableHead
              labels={headerCells || labels}
              sortHandler={setSortBy}
              sortBy={sortBy || ''}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              hasSelect={!!hasSelect}
              selectAll={selectAll}
              checked={children?.length === selected?.length}
              noWrapCell
            />
          ) : (
            <PureTableHead
              headerCells={headerCells || labels}
              hasSelect={!!hasSelect}
              selectAll={selectAll}
              checked={children?.length === selected?.length}
            />
          )}
          <TableBody>{children}</TableBody>
        </MuiTable>
      </TableContainer>
      {loading || !hasPagination ? null : (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={totalPage}
          rowsPerPage={rows || 10}
          page={page || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRows}
        />
      )}
    </StyledPaper>
  );
};

export default GenericTable;
