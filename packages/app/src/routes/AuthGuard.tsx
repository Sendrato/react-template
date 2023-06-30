/* eslint-disable react-hooks/exhaustive-deps */
import { IToken } from '@interfaces/auth';
import { useAuthContext } from 'contexts/AuthContext';
import { useHistory, useUpdateSession } from 'hooks';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { PageLoader } from '@sendrato/design-system/components/PageLoader';

import { AUTH_ROUTES } from './routes';

interface IProps {
  children: ReactElement;
}

const AuthGuard = ({ children }: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { error, logout, setError, getUserRole, refreshToken, setToken, setUserEmail } =
    useAuthContext();

  const router = useRouter();

  useUpdateSession();
  useHistory({ exclude: AUTH_ROUTES });

  const handleError = () => {
    router.push('/login');
    logout();
    setError('The token has expired or been lost. Please log in again.');
    setLoading(false);
  };

  const refresh = async (token: IToken) => {
    const token_res = await refreshToken(token);

    if (token_res?.access_token) {
      const role_res = await getUserRole(token_res.access_token, token_res.tenant);
      if (role_res?.AccountType) {
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

      setToken(token);
      setUserEmail(userEmail);

      refresh(token);
    } catch (error) {
      handleError();
    }
  }, []);

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
