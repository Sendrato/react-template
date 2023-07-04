import { ILoginData, IToken, IUserRole } from '@interfaces/auth';
import { NullFunction } from '@interfaces/generated/functions';
import axios, { AxiosError } from 'axios';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { addAuthHeader, addHeader, api } from 'utils';

import { appConfig } from '@config';

interface ITokenPayload {
  code: string;
  tenant: string;
}

interface IResetPayload {
  email: string;
  tenant: string;
}

export interface IAuthContext {
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
  setToken: Dispatch<SetStateAction<IToken | null>> | NullFunction;
  setUserEmail: Dispatch<SetStateAction<string | null>> | NullFunction;
  setError: Dispatch<SetStateAction<string | null>> | NullFunction;
  setUpdateSession: Dispatch<SetStateAction<boolean>> | NullFunction;
  setActiveToken: Dispatch<SetStateAction<boolean>> | NullFunction;
  getToken: ((payload: ITokenPayload) => Promise<IToken | void>) | NullFunction;
  login: ((payload: ILoginData) => Promise<void>) | NullFunction;
  logout: VoidFunction | NullFunction;
  refreshToken: ((payload: IToken | null) => Promise<IToken | void>) | NullFunction;
  resetPassword: ((payload: IResetPayload) => Promise<any>) | NullFunction;
  getUserRole: ((access_token: string, tenant: string) => Promise<IUserRole>) | NullFunction;
}

export const initialValues: IAuthContext = {
  token: null,
  isAuth: false,
  loading: false,
  error: null,
  tenant: 'senduku',
  userRole: null,
  resetFinished: false,
  userEmail: null,
  updateSession: false,
  isActiveToken: false,
  setToken: () => null,
  setUserEmail: () => null,
  setError: () => null,
  setUpdateSession: () => null,
  setActiveToken: () => null,
  getToken: () => null,
  login: () => null,
  logout: () => null,
  refreshToken: () => null,
  resetPassword: () => null,
  getUserRole: () => null,
};

export const AuthContext = createContext(initialValues);

interface IProps {
  children: ReactNode;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const [token, setToken] = useState<IToken | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tenant, setTenant] = useState<string>('ras2023');
  const [userRole, setUserRole] = useState<IUserRole | null>(null);
  const [resetFinished, setResetFinished] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [updateSession, setUpdateSession] = useState<boolean>(false);
  const [isActiveToken, setActiveToken] = useState<boolean>(false);

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

  const getToken = async ({ code, tenant }: ITokenPayload): Promise<IToken | void> => {
    try {
      const token = await authorizationCode(code, tenant);
      setToken(token.data);
      setIsAuth(true);
      localStorage.setItem('token', JSON.stringify(token.data));
      setUpdateSession(true);
      setActiveToken(true);
      return { ...token.data, tenant };
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
      }
    }
  };

  const login = async (data: ILoginData): Promise<void> => {
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
        const res = await getToken({ code, tenant });
        localStorage.setItem('userEmail', JSON.stringify(username));

        if (res) {
          await getUserRole(res.access_token, res.tenant);
        }
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

  const logout = (): void => {
    setIsAuth(false);
    setToken(null);
    setUserRole(null);
    setUserEmail(null);
    localStorage.clear();
  };

  const refreshToken = async (token: IToken | null): Promise<IToken | void> => {
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

        setLoading(false);
        setToken(res.data);
        setIsAuth(true);
        setUpdateSession(true);
        setActiveToken(true);
        localStorage.setItem('token', JSON.stringify(res.data));

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

  const resetPassword = async ({ email, tenant }: IResetPayload): Promise<any> => {
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

  const getUserRole = async (access_token: string, tenant: string): Promise<IUserRole> => {
    setLoading(true);
    const { data } = await api.get('entity/common/backoffice/accounts/UserRoles', {
      headers: addAuthHeader(access_token, tenant),
    });

    setLoading(false);
    setUserRole(data);
    localStorage.setItem('userRole', JSON.stringify(data));

    return data;
  };

  const value = {
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
    setUpdateSession,
    setToken,
    setUserEmail,
    setError,
    setActiveToken,
    getToken,
    login,
    logout,
    refreshToken,
    resetPassword,
    getUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
