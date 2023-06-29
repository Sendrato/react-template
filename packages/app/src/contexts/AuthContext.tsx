import { ILoginData, IToken, IUserRole } from '@interfaces/auth';
import axios, { AxiosError } from 'axios';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { addAuthHeader, addHeader, api } from 'utils';

import { appConfig } from '@config';

interface AuthContext {
  token: IToken | null;
  isAuth: boolean;
  loading: boolean;
  error: null | string;
  tenant: string;
  userRole: null | IUserRole;
  resetFinished: boolean;
  userEmail: null | string;
  updateSession: boolean;
  isActiveToken: boolean;
}

const AuthContext = createContext<unknown | null>(null);

interface IProps {
  children: ReactNode;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const [token, setToken] = useState<IToken | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tenant, setTenant] = useState<string>('senduku');
  const [userRole, setUserRole] = useState<IUserRole | null>(null);
  const [resetFinished, setResetFinished] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [updateSession, setUpdateSession] = useState<boolean>(false);
  const [isActiveToken, setIsActiveToken] = useState<boolean>(false);

  const authorizationCode = async (code: string, tenant: string) => {
    const data = {
      code: code,
      redirect_url: `${appConfig.baseUrl}/login`,
      grant_type: 'authorization_code',
      client_id: appConfig.clientId,
      tenant,
    };

    return axios.post(appConfig.apiUrl + 'webstore/token', new URLSearchParams(data), {
      headers: { ...addHeader() },
    });
  };

  const getToken = async ({ code, tenant }: { code: string; tenant: string }) => {
    try {
      setLoading(true);
      const token = await authorizationCode(code, tenant);

      setLoading(false);
      setToken(token.data);
      setIsAuth(true);
      localStorage.setItem('token', JSON.stringify(token.data));
      setUpdateSession(true);
      setIsActiveToken(true);
      return { ...token.data, tenant };
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const login = async (data: ILoginData) => {
    const { username, password, tenant } = data;
    setTenant(tenant);
    setUserEmail(username);

    try {
      setLoading(true);
      const urlWithCode = await axios.post(
        `${appConfig.apiUrl}oauth/login?redirect_url=${appConfig.baseUrl}/login&response_type=token&client_id=${appConfig.clientId}&state=ras&tenant=${tenant}`,
        new URLSearchParams({ username, password }),
        {
          headers: {
            ...addHeader(),
          },
        },
      );

      const params = new URLSearchParams(urlWithCode.request.responseURL.split('?')[1]);

      const code = params.get('code');
      const error = params.get('error');

      if (code) {
        getToken({ code, tenant });
      } else if (error) {
        setError('Invalid username / password combination');
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const logout = () => {
    setIsAuth(false);
    setToken(null);
    setUserRole(null);
    setUserEmail(null);
    localStorage.clear();
  };

  const refreshToken = async () => {
    if (token) {
      try {
        const data = {
          refresh_token: token.refresh_token,
          client_id: appConfig.clientId,
          tenant,
        };

        const res = await axios.post(
          appConfig.apiUrl + 'webstore/refresh',
          new URLSearchParams(data),
          {
            headers: { ...addHeader() },
          },
        );

        return { ...res.data, tenant };
      } catch (err) {
        if (err instanceof AxiosError) {
          logout();
          setError(err.message);
          setLoading(false);
        }
      }
    }
  };

  const resetPassword = async ({ email, tenant }: { email: string; tenant: string }) => {
    try {
      setLoading(true);
      const response = await api(`entity/common/backoffice/accounts/ForgotPassword`, {
        method: 'POST',
        data: {
          Username: email,
          ApplicationName: 'backoffice-app',
        },
        headers: {
          ...addHeader(),
          Authorization: 'clientid backoffice-app',
          'x-navajo-tenant': tenant,
        },
      });
      setResetFinished(true);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const getUserRole = async () => {
    setLoading(true);
    const { data } = await api.get('entity/common/backoffice/accounts/UserRoles', {
      headers: addAuthHeader(token?.access_token || '', tenant),
    });

    setLoading(false);
    setUserRole(data);
  };

  const initialState = {
    token,
    isAuth,
    error,
    tenant,
    loading,
    userRole,
    resetFinished,
    userEmail,
    updateSession,
    isActiveToken,
    getToken,
    login,
    logout,
    refreshToken,
    resetPassword,
    getUserRole,
  };

  return <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
