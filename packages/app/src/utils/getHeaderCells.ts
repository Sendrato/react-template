import { IHeaderCell, ITableDataKeys } from '@modules/common/Table/types';

export const getHeaderCells = (data: ITableDataKeys[]): IHeaderCell[] => {
  return data.map(({ label, key: id, align }) => ({
    label,
    id,
    align,
  }));
};
