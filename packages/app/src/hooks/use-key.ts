import { useEffect } from 'react';

const useKey = (callback: () => void, key: string) => {
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (isBrowser) {
      const handler = (event: KeyboardEvent) => {
        if (event.code === key) {
          callback();
        }
      };

      window.addEventListener('keydown', handler);

      return () => {
        window.removeEventListener('keydown', handler);
      };
    }
  }, [isBrowser, key, callback]);
};

export default useKey;
