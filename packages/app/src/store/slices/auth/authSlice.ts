import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from 'store';
import { addHeader, api } from 'utils';

import { appConfig } from '@config';

import { entityCall, METHOD } from '../entityCall';
import { ILoginData, IToken, IUserRole } from './types';

export interface ILocalStoragePayload extends IToken {
  tenant: string;
}

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

export const getToken = createAsyncThunk(
  'auth/token',
  async ({ code, tenant }: { code: string; tenant: string }, thunkAPI) => {
    try {
      const token = await authorizationCode(code, tenant);

      return { ...token.data, tenant };
    } catch (err) {
      if (err instanceof AxiosError) return thunkAPI.rejectWithValue(err.response);
    }
  },
);

export const login = createAsyncThunk('auth/login', async (data: ILoginData, thunkAPI) => {
  const { username, password, tenant } = data;
  thunkAPI.dispatch(setTenant(tenant));
  thunkAPI.dispatch(setUserEmail(username));

  try {
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

    if (code) return thunkAPI.dispatch(getToken({ code, tenant }));
    else if (error) {
      return thunkAPI.rejectWithValue({
        message: 'Invalid username / password combination',
      });
    }

    return null;
  } catch (err) {
    if (err instanceof AxiosError) return thunkAPI.rejectWithValue(err.response);
  }
});

export const refreshToken = createAsyncThunk<any, undefined, { state: RootState }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const {
      auth: { token, tenant },
    } = thunkAPI.getState();

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
          thunkAPI.dispatch(logout());

          return thunkAPI.rejectWithValue(err.response);
        }
      }
    }

    return;
  },
);

export const resetPassword = createAsyncThunk<
  any,
  { email: string; tenant: string },
  { state: RootState }
>('auth/resetPassword', async ({ email, tenant }, thunkAPI) => {
  try {
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
    thunkAPI.dispatch(setResetFinished(true));
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response;
    }
  }

  return;
});

export const getUserRole = createAsyncThunk<any, undefined, { state: RootState }>(
  'onboarding/getUserRole',
  async (_, thunkAPI) => {
    return thunkAPI.dispatch(
      entityCall({
        method: METHOD.GET,
        baseEntity: 'accounts',
        entity: 'UserRoles',
      }),
    );
  },
);

interface AuthData {
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
  updateComponent: boolean;
}

const initialState: AuthData = {
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
  updateComponent: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setToken(state, action: PayloadAction<ILocalStoragePayload>) {
      state.token = action.payload;
      state.tenant = action.payload.tenant;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
      localStorage.setItem('userEmail', JSON.stringify(action.payload));
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTenant(state, action: PayloadAction<string>) {
      state.tenant = action.payload;
    },
    setResetFinished(state, action: PayloadAction<boolean>) {
      state.resetFinished = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setUserRole(
      state,
      action: PayloadAction<{
        AccountType: string;
        SellerId: string | null;
        IsSuperuser: boolean;
      } | null>,
    ) {
      state.userRole = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.token = null;
      state.userRole = null;
      state.userEmail = null;
      localStorage.clear();
    },
    setUpdateSession(state, action) {
      state.updateSession = action.payload;
    },
    componentDidUpdate(state, action: PayloadAction<boolean>) {
      state.updateComponent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuth = true;
      state.error = null;
      localStorage.setItem('token', JSON.stringify(action.payload));
      state.loading = false;
      state.updateSession = true;
      state.isActiveToken = true;
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      if (action.payload?.status != 500) {
        state.token = action.payload;
        state.isAuth = true;
        localStorage.setItem('token', JSON.stringify(action.payload));
        state.loading = false;
        state.updateSession = true;
        state.isActiveToken = true;
      }
    });
    builder.addCase(refreshToken.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action?.payload?.data?.message || '';
      authSlice.caseReducers.logout(state);
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = (action.payload as any).message;
        state.loading = false;
      }
    });
    builder.addCase(getUserRole.fulfilled, (state, action) => {
      state.userRole = action.payload.payload;
      localStorage.setItem('userRole', JSON.stringify(action.payload.payload));
    });
  },
});

export const getAuthStore = createSelector(
  (state: RootState) => state.auth,
  (authState: AuthData) => authState,
);

export const getUserRoleSelector = createSelector(
  getAuthStore,
  (authState: AuthData) => authState.userRole,
);
export const getUserEmail = createSelector(
  getAuthStore,
  (authState: AuthData) => authState.userEmail,
);
export const selectAuthToken = createSelector(
  getAuthStore,
  (authState: AuthData) => authState.token,
);

export const {
  setAuth,
  setToken,
  logout,
  setLoading,
  setTenant,
  setUserRole,
  setUserEmail,
  setResetFinished,
  setUpdateSession,
  setError,
  componentDidUpdate,
} = authSlice.actions;

export default authSlice.reducer;
