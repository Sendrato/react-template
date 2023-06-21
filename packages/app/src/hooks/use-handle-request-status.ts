import { useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';
import { refreshToken } from 'store/slices/auth/authSlice';
import { openAutoCloseRecord } from 'store/slices/design/modalsSlice';
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
export type NotificationType = 'snackbar' | 'record';

const ERROR: number[] = Object.keys(ERROR_MESSAGE).map((k) => +k);
const SUCCESS = [200, 201];

const useHandleRequestStatus = (
  notificationErrorType: NotificationType,
  notificationSuccessType: NotificationType,
) => {
  const dispatch = useAppDispatch();

  const throwRecord = useCallback(
    (message: string, record: NotificationType, type?: RecordType) => {
      if (record === 'snackbar') {
        dispatch(
          openAutoCloseSnackBar({
            message,
          }),
        );
      }

      if (record === 'record') {
        dispatch(
          openAutoCloseRecord({
            message,
            type,
          }),
        );
      }
    },
    [dispatch],
  );

  const handleRequest = (message: string, status: number) => {
    if (status === 401) {
      dispatch(refreshToken());
    }
    if (ERROR.includes(status)) {
      throwRecord(message, notificationErrorType, 'error');
    }

    if (SUCCESS.includes(status)) {
      throwRecord(message, notificationSuccessType, 'success');
    }
  };

  return handleRequest;
};

export default useHandleRequestStatus;
