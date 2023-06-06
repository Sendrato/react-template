import { useState } from 'react';

interface IProps {
  initialPage: number;
  initialRows: number;
}

const usePagination = ({ initialPage, initialRows }: IProps) => {
  const [page, setPage] = useState(initialPage);
  const [rows, setRows] = useState(initialRows);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRows = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
