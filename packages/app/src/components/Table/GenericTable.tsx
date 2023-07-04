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
import React, { cloneElement, Dispatch, ReactElement, SetStateAction, useMemo } from 'react';

import { NoDataMessage } from '../common/NoData';
import { ITableBlockProps, TableBlock } from './EnhancedTableBlock';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableTooltip from './EnhancedTableTooltip';
import { bootstrap } from './helpers';
import PureTableHead from './PureTableHead';
import { IHeaderCell, ITableDataKeys } from './types';

interface IPaginationConfig {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rows: number;
  setRows: Dispatch<SetStateAction<number>>;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => void;
  handleChangeRows: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  totalPage: number;
}

interface ISortConfig {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  sortDirection: 'ASC' | 'DESC';
  setSortDirection: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
}

interface ISelectedConfig<TData> {
  selectedKey: string;
  onSelect: (value: TData) => void;
  selectAll: () => void;
  selected: TData[];
}

interface BasicTableProps<TData> extends Omit<ITableBlockProps, 'children'> {
  title?: string;
  loading?: boolean;
  tooltipComponent?: ReactElement;
  paginationConfig?: IPaginationConfig;
  sortConfig?: ISortConfig;
  selectedConfig?: ISelectedConfig<TData>;
  noDataMessage?: string;
  selectedComponent?: ReactElement;
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
export type TableProps<TData> = TableWithConfig<TData> | TableWithCustomContent<TData>;

const GenericTable = <TData extends Record<string, any>>({
  title,
  data,
  config,
  tooltipComponent,
  headerCells,
  bodyRows,
  selectedConfig,
  loading = false,
  paginationConfig,
  sortConfig,
  withContainer = true,
  selectedComponent,
  gap,
  sx,
  noDataMessage = 'Data isn`t available yet.',
}: TableProps<TData>) => {
  const { isMobile } = useMedia();

  const { bodyRows: tableRows, headerCells: labels } = useMemo(() => {
    return bootstrap(data || [], config || [], {
      hasSelectedRow: !!selectedConfig,
    });
  }, [config, data, selectedConfig]);

  const content = bodyRows ? bodyRows : tableRows;

  const children = useMemo(() => {
    if (selectedConfig) {
      const { selected, selectedKey, onSelect } = selectedConfig;
      return content.map((row) => {
        const rowWithCheckbox = cloneElement(row, {
          ...row.props,
          children: [
            <TableCell key={row.props.children.length + 1} align="left">
              <Checkbox
                checked={
                  !!selected.filter((sel) => sel[selectedKey] === row.props.value[selectedKey])
                    .length
                }
                onChange={() => onSelect(row.props.value)}
              />
            </TableCell>,
            ...row.props.children,
          ],
        });

        return rowWithCheckbox;
      });
    }
    return content;
  }, [content, selectedConfig]);

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
        hasSelect={!!selectedConfig}
        selected={selectedConfig?.selected}
      />
      {children.length > 1 || loading ? (
        <TableContainer sx={{ position: 'relative', overflow: loading ? 'hidden' : 'auto' }}>
          {loading && <LoadingLayout />}
          <MuiTable
            sx={{
              opacity: loading ? 0.5 : 1,
              minHeight: '10rem',
            }}
          >
            {sortConfig ? (
              <EnhancedTableHead
                labels={headerCells || labels}
                sortHandler={sortConfig.setSortBy}
                sortBy={sortConfig.sortBy || ''}
                sortDirection={sortConfig.sortDirection}
                setSortDirection={sortConfig.setSortDirection}
                hasSelect={!!selectedConfig}
                selectAll={selectedConfig?.selectAll}
                checked={children?.length === selectedConfig?.selected?.length}
                noWrapCell
              />
            ) : (
              <PureTableHead
                headerCells={headerCells || labels}
                hasSelect={!!selectedConfig}
                selectAll={selectedConfig?.selectAll}
                checked={children?.length === selectedConfig?.selected?.length}
              />
            )}
            <TableBody>{children}</TableBody>
          </MuiTable>
        </TableContainer>
      ) : (
        <NoDataMessage message={noDataMessage} />
      )}
      {!children || !paginationConfig ? null : (
        <TablePagination
          backIconButtonProps={{
            disabled: loading || paginationConfig.page === 0,
          }}
          nextIconButtonProps={{
            disabled:
              loading ||
              paginationConfig.page >=
                Math.floor(paginationConfig.totalPage / paginationConfig.rows),
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={paginationConfig.totalPage}
          rowsPerPage={paginationConfig.rows || 10}
          page={paginationConfig.page || 0}
          onPageChange={paginationConfig.handleChangePage}
          onRowsPerPageChange={paginationConfig.handleChangeRows}
        />
      )}
    </TableBlock>
  );
};

export default GenericTable;
