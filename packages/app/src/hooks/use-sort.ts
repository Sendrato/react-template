import { useState } from 'react';

interface IProps {
  initialSortBy?: string;
  initialSortDirection?: 'ASC' | 'DESC';
}

const useSort = (params?: IProps) => {
  const [sortBy, setSortBy] = useState<string>(params?.initialSortBy || '');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>(
    params?.initialSortDirection || 'ASC',
  );

  return {
    sortBy,
    sortDirection,
    setSortBy,
    setSortDirection,
  };
};

export default useSort;
