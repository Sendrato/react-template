import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store';
import { addAuthHeader, api } from 'utils';

import { EntityViolation } from '@services/types/error/EntityViolation';

import { componentDidUpdate, refreshToken } from './auth/authSlice';
import { openAutoCloseRecord } from './design/modalsSlice';
import { openAutoCloseSnackBar } from './design/snackBar';

type RecordType = 'success' | 'info' | 'error';

type NotificationType = 'snackbar' | 'record';

export enum METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

enum MESSAGE {
  get = 'Successfully loaded',
  post = 'Successfully created',
  put = 'Successfully updated',
  delete = 'Successfully deleted',
}

const ERROR_MESSAGE: { [key: number]: string } = {
  400: 'Bad Request - no valid input provided',
  404: 'The requested entity is not found',
  405: 'Operation not supported',
  406: 'Output not acceptable - requested output format is not available',
  409: 'Conflict - Duplicate entity found on inserts',
  412: 'Etag error - wrong etag provided on PUT or DELETE operation - resource has changed',
  420: 'Input validation exception(s)',
  500: 'Unrecoverable server error',
  602: 'Missing entity ID - the primary identifier fields of this entity are missing',
  603: 'Version Not Found - The requested entity version does not exist',
};

const ERROR: number[] = Object.keys(ERROR_MESSAGE).map((k) => +k);
const SUCCESS = [200, 201];

interface IEntityRequest {
  baseEntity: string;
  entity: string;
  params?: string;
  data?: any;
  method: METHOD;
  token?: string;
  successMessage?: string;
  errorMessage?: string;
  notificationErrorType?: NotificationType;
  notificationSuccessType?: NotificationType;
}

export const entityCall = createAsyncThunk<any, IEntityRequest, { state: RootState }>(
  'entity/entityCall',
  async (data, thunkAPI) => {
    const {
      auth: { token, tenant, isActiveToken, loading },
    } = thunkAPI.getState();

    if (!isActiveToken) {
      return thunkAPI.rejectWithValue(null);
    }

    const {
      baseEntity,
      entity,
      params,
      method,
      data: dto,
      successMessage,
      errorMessage,
      notificationErrorType,
      notificationSuccessType,
    } = data;

    const handleFetch = async ({
      message,
      status,
      type: notificationType,
    }: {
      message: string;
      status: number;
      type: NotificationType;
    }): Promise<void> => {
      const handler = async (message: string, type?: RecordType) => {
        if (notificationType === 'snackbar') {
          thunkAPI.dispatch(
            openAutoCloseSnackBar({
              message,
            }),
          );
        }

        if (notificationType === 'record') {
          thunkAPI.dispatch(
            openAutoCloseRecord({
              message,
              type,
            }),
          );
        }
      };

      if (status === 401) {
        if (!loading) {
          await thunkAPI.dispatch(refreshToken());

          thunkAPI.dispatch(componentDidUpdate(true));

          setTimeout(() => {
            thunkAPI.dispatch(componentDidUpdate(false));
          }, 500);
        }
      }

      if (ERROR.includes(status)) {
        handler(message, 'error');
      }

      if (SUCCESS.includes(status)) {
        handler(message, 'success');
      }
      document.body.style.cursor = 'auto';
    };

    try {
      document.body.style.cursor = 'wait';

      const response = await api(
        `entity/common/backoffice/${baseEntity}/${entity}${params ? `?${params}` : ''}`,
        {
          method,
          data: dto,
          headers: {
            ...addAuthHeader(data.token || token?.access_token || '', tenant),
          },
        },
      );

      if (method !== METHOD.GET) {
        const message = successMessage || MESSAGE[method];

        const status = response.status;

        const type = notificationSuccessType || 'record';

        handleFetch({ message, status, type });
      }

      if (method === METHOD.GET) {
        document.body.style.cursor = 'auto';
      }

      return response.data;
    } catch (err: any) {
      if (err instanceof AxiosError && err.response) {
        const status = err.response.status;
        const message =
          errorMessage || (status === 420 && err.response.data?.Violations)
            ? err.response.data.Violations[Object.keys(err.response.data.Violations)[0]]
            : err.response.data.Message || `Error ${status}: ${ERROR_MESSAGE[status]}`;

        const type = notificationErrorType || 'snackbar';

        handleFetch({
          message,
          status,
          type,
        });

        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

interface IEntity {
  violation: EntityViolation | null;
}

const initialState = {
  violation: null,
} as IEntity;

export const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(entityCall.rejected, (state, action) => {
      if (action.payload) {
        state.violation = action.payload as EntityViolation;
      }
    });
  },
});

export default entitySlice.reducer;
