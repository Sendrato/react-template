/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useUpdateSession } from 'hooks';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuthStore, logout, setError } from 'store/slices/auth/authSlice';
import { getUserRole } from 'store/slices/auth/authSlice';
import { refreshToken, setToken, setUserEmail } from 'store/slices/auth/authSlice';

import { PageLoader } from '@sendrato/design-system/components/PageLoader';

import { AUTH_ROUTES } from './routes';

interface IProps {
  children: ReactElement;
}

const AuthGuard = ({ children }: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(getAuthStore);
  const router = useRouter();

  useUpdateSession();
  useHistory({ exclude: AUTH_ROUTES });

  const handleError = () => {
    router.push('/login');
    dispatch(logout());
    dispatch(setError(error || 'The token has expired or been lost. Please log in again.'));
    setLoading(false);
  };

  const refresh = async () => {
    const token_res = await dispatch(refreshToken());
    if (token_res.payload?.access_token) {
      const role_res = await dispatch(getUserRole());

      if (role_res.payload?.AccountType) {
        setLoading(false);
      } else {
        handleError();
      }
    } else {
      handleError();
    }
  };

  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem('token') || JSON.stringify(''));

      const userEmail = JSON.parse(localStorage.getItem('userEmail') || JSON.stringify(''));

      dispatch(setToken(token));
      dispatch(setUserEmail(userEmail));

      refresh();
    } catch (error) {
      handleError();
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      handleError();
    }
  }, [error]);

  if (loading) {
    return <PageLoader />;
  }

  return children;
};

export default AuthGuard;
