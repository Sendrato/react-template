import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import usePagination from './use-pagination';

interface IResponce<T> {
  showData: T[];
  setShowData: Dispatch<SetStateAction<T[]>>;
  handlePaginate: (page: number, rowsPerPage: number) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rows: number;
  setRows: Dispatch<SetStateAction<number>>;
  handleChangeRows: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChangePage: (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

const usePaginationState = <T>(data: T[]): IResponce<T> => {
  const [showData, setShowData] = useState<T[]>([]);
  const { page, rows, handleChangePage, handleChangeRows, setPage, setRows } = usePagination();

  const handlePaginate = useCallback(
    (page: number, rowsPerPage: number) => {
      const start = page * rowsPerPage;
      const tempEnd = start + rowsPerPage;

      const end = tempEnd > (data?.length || 0) ? data?.length : tempEnd;

      if (start === end) {
        setPage(0);
      } else {
        setShowData([...data?.slice(start, end)] || []);
      }
    },
    [data, setPage],
  );

  return {
    showData,
    setShowData,
    handlePaginate,
    page,
    setPage,
    setRows,
    rows,
    handleChangePage,
    handleChangeRows,
  };
};

export default usePaginationState;
