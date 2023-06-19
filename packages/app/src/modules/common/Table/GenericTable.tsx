import {
  Checkbox,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useMedia } from 'hooks';
import LoadingLayout from 'layouts/LoadingLayout';
import React, {
  cloneElement,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
} from 'react';

import { NoDataMessage } from '../NoData';
import { ITableBlockProps, TableBlock } from './EnhancedTableBlock';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableTooltip from './EnhancedTableTooltip';
import { bootstrap } from './helpers';
import PureTableHead from './PureTableHead';
import { IHeaderCell, ITableDataKeys } from './types';

interface BasicTableProps<TData> extends Omit<ITableBlockProps, 'children'> {
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
  noDataMessage?: string;
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
  withContainer = true,
  gap,
  sx,
  noDataMessage = 'Data isn`t available yet.',
}: TableProps<TData>) => {
  const { isMobile } = useMedia();
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

  return (
    <TableBlock
      withContainer={withContainer}
      gap={gap ? gap : isMobile ? '1rem' : '1.5rem'}
      sx={sx}
    >
      <EnhancedTableTooltip
        title={title}
        tooltipComponent={tooltipComponent}
        selectedComponent={selectedComponent}
        hasSelect={!!hasSelect}
        selected={selected}
      />
      {children.length > 1 || loading ? (
        <TableContainer
          sx={{ position: 'relative', overflow: loading ? 'hidden' : 'auto' }}
        >
          {loading && <LoadingLayout />}
          <MuiTable
            sx={{
              opacity: loading ? 0.5 : 1,
              minHeight: '10rem',
            }}
          >
            {!loading ? (
              hasSort ? (
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
              )
            ) : null}
            <TableBody>{children}</TableBody>
          </MuiTable>
        </TableContainer>
      ) : (
        <NoDataMessage message={noDataMessage} />
      )}
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
    </TableBlock>
  );
};

export default GenericTable;
