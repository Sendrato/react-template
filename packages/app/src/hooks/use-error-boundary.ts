import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';
import { refreshToken } from 'store/slices/auth/authSlice';
import { openAutoCloseRecord } from 'store/slices/design/modalsSlice';
import { openAutoCloseSnackBar } from 'store/slices/design/snackBar';

export type NotificationType = 'snackbar' | 'record';

export enum MESSAGE {
  get = 'Successfully loaded',
  post = 'Successfully created',
  put = 'Successfully updated',
  delete = 'Successfully deleted',
}

export const ERROR_MESSAGE: { [key: number]: string } = {
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

const useErrorBoundary = (type: NotificationType = 'snackbar', errorMessage?: string) => {
  const dispatch = useAppDispatch();
  const throwNotifications = type === 'snackbar' ? openAutoCloseSnackBar : openAutoCloseRecord;

  const handleError = useCallback(
    (err: unknown) => {
      if (err instanceof AxiosError && err.response) {
        const status: number = err.response.status;
        const message = errorMessage || err.response.data.Message || ERROR_MESSAGE[status];

        const violations = errorMessage || err.response.data.Violations || ERROR_MESSAGE[status];

        switch (status) {
          case 401:
            dispatch(refreshToken());
            break;
          case 420:
            dispatch(throwNotifications({ message: violations, type: 'error' }));
            break;
          default:
            console.log(status);
            dispatch(throwNotifications({ message, type: 'error' }));
            break;
        }
      }
    },
    [dispatch, throwNotifications, errorMessage],
  );

  return handleError;
};

export default useErrorBoundary;
