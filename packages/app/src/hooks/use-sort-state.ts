import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { sortHelper } from 'utils';

import useSort from './use-sort';

interface IResponce<T> {
  sortItems: T[];
  setSortItems: Dispatch<SetStateAction<T[]>>;
  handleSort: (sortBy: string, direction: SetStateAction<'ASC' | 'DESC'>) => void;
  sortDirection: 'ASC' | 'DESC';
  setSortDirection: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

const useSortState = <T extends Record<string, any>>(initialState: T[]): IResponce<T> => {
  const [sortItems, setSortItems] = useState<T[]>(initialState);
  const { sortBy, sortDirection, setSortBy, setSortDirection } = useSort();

  const handleSort = useCallback(
    (currentSort: string, direction: SetStateAction<'ASC' | 'DESC'>) => {
      if (sortBy !== currentSort) {
        setSortItems((data) =>
          [...data].sort((a, b) => sortHelper(a[currentSort], b[currentSort])),
        );

        return;
      }

      if (direction === 'ASC') {
        setSortItems((data) =>
          [...data].sort((a, b) => sortHelper(a[currentSort], b[currentSort])),
        );
      } else {
        setSortItems((data) =>
          [...data].sort((a, b) => sortHelper(b[currentSort], a[currentSort])),
        );
      }
    },
    [sortBy, setSortItems],
  );

  return {
    sortItems,
    setSortItems,
    sortDirection,
    setSortDirection,
    sortBy,
    setSortBy,
    handleSort,
  };
};

export default useSortState;
