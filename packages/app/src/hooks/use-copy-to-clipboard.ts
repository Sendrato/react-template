import { useCallback, useState } from 'react';

const useCopyToClipboard = (str: string): [boolean, VoidFunction] => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(() => {
    if (!navigator.clipboard) return;

    navigator.clipboard
      .writeText(str)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error);
      });
  }, [str]);

  return [isCopied, copy];
};

export default useCopyToClipboard;
