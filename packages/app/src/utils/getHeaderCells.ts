import { IHeaderCell, ITableDataKeys } from '@components/Table/types';

export const getHeaderCells = (data: ITableDataKeys[]): IHeaderCell[] => {
  return data.map(({ label, key: id, align }) => ({
    label,
    id,
    align,
  }));
};
