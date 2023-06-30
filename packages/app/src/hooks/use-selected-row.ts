import { useState } from 'react';

const useSelectedRow = <T extends { [key: string]: any }>(data: T[], selectedKey: string) => {
  const [selected, setSelected] = useState<T[]>([]);

  const onSelect = (row: T) => {
    setSelected((prev) => {
      return prev.find((item) => item[selectedKey] === row[selectedKey])
        ? prev.filter((item) => item[selectedKey] !== row[selectedKey])
        : [...prev, row];
    });
  };

  const selectAll = () => {
    data && setSelected((prev) => (prev.length === data.length ? [] : data));
  };

  return { selected, setSelected, onSelect, selectAll, selectedKey };
};

export default useSelectedRow;
