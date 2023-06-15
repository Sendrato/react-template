import { useState } from 'react';

type TResponse = [boolean, VoidFunction];

const useToggle = (initialState: boolean): TResponse => {
  const [open, setOpen] = useState<boolean>(initialState);
  const handleToggle = () => setOpen(!open);
  return [open, handleToggle];
};

export default useToggle;
