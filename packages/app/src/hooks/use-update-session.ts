import { useAuthContext } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';

const useUpdateSession = () => {
  const { updateSession, token, setUpdateSession, refreshToken } = useAuthContext();
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);

  const refreshInterval = token?.expires_in
    ? token.expires_in * 1000 - 5 * 60 * 1000
    : 55 * 60 * 1000;

  useEffect(() => {
    if (updateSession) {
      const interval = setTimeout(() => {
        refreshToken(token);

        setUpdateSession(false);
      }, refreshInterval);

      setTimeInterval(interval);
    }

    return () => {
      timeInterval && clearInterval(timeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSession]);
};

export default useUpdateSession;
