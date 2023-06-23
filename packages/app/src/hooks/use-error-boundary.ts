import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';
import { refreshToken } from 'store/slices/auth/authSlice';
import { openAutoCloseSnackBar } from 'store/slices/design/snackBar';

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

export type RecordType = 'success' | 'info' | 'error';

const useErrorBoundary = () => {
  const dispatch = useAppDispatch();

  const handleError = useCallback(
    (err: unknown) => {
      if (err instanceof AxiosError && err.response) {
        const status: number = err.response.status;

        const message: string = err.response.data.Message || ERROR_MESSAGE[status];

        const violations: string = err.response.data.Violations || ERROR_MESSAGE[status];

        switch (status) {
          case 401:
            dispatch(refreshToken());
            break;
          case 420:
            dispatch(openAutoCloseSnackBar({ message: violations }));
            break;
          default:
            dispatch(openAutoCloseSnackBar({ message }));
            break;
        }
      }
    },
    [dispatch],
  );

  return handleError;
};

export default useErrorBoundary;
