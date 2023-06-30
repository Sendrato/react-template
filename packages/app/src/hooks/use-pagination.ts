import { useState } from 'react';

const usePagination = (initialPage?: number, initialRows?: number) => {
  const [page, setPage] = useState(initialPage || 0);
  const [rows, setRows] = useState(initialRows || 10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRows = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsAmount = Number(event.target.value);
    setRows(newRowsAmount);
    setPage(0);
  };

  return {
    page,
    rows,
    setPage,
    setRows,
    handleChangePage,
    handleChangeRows,
  };
};

export default usePagination;
