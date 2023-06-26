/* eslint-disable react-hooks/exhaustive-deps */
import { ERROR_MESSAGE } from '@interfaces/common/backoffice/api';
import { NotificationType } from '@interfaces/UI/alert';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';
import { refreshToken, setActiveToken } from 'store/slices/auth/authSlice';
import { openAutoCloseRecord } from 'store/slices/design/modalsSlice';
import { openAutoCloseSnackBar } from 'store/slices/design/snackBar';

const useErrorBoundary = (type: NotificationType = 'snackbar', errorMessage?: string) => {
  const dispatch = useAppDispatch();
  const throwNotifications = type === 'snackbar' ? openAutoCloseSnackBar : openAutoCloseRecord;

  const handleError = useCallback(
    (err: unknown) => {
      if (err instanceof AxiosError && err.response) {
        const status: number = err.response.status;
        const message = errorMessage || err.response.data.Message || ERROR_MESSAGE[status];

        const violations =
          errorMessage || typeof err.response.data.Violations === 'string'
            ? err.response.data.Violation
            : err.response.data.ViolationCodes || ERROR_MESSAGE[status];

        document.body.style.cursor = 'auto';

        switch (status) {
          case 401:
            dispatch(setActiveToken(false));

            dispatch(refreshToken());
            break;
          case 420:
            dispatch(throwNotifications({ message: violations, type: 'error' }));
            break;
          default:
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
