import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getAuthStore,
  refreshToken,
  setUpdateSession,
} from 'store/slices/auth/authSlice';

const useUpdateSession = () => {
  const { updateSession, token } = useAppSelector(getAuthStore);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();

  const refreshInterval = token?.expires_in
    ? token.expires_in * 1000 - 5 * 60 * 1000
    : 55 * 60 * 1000;

  useEffect(() => {
    if (updateSession) {
      const interval = setTimeout(() => {
        dispatch(refreshToken());

        dispatch(setUpdateSession(false));
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
