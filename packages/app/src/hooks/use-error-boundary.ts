/* eslint-disable react-hooks/exhaustive-deps */
import { ERROR_MESSAGE } from '@interfaces/common/backoffice/api';
import { NotificationType } from '@interfaces/UI/notification';
import { AxiosError } from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useNotificationsContext } from 'contexts/NotificationsContext';
import { useCallback } from 'react';
import { handleViolations } from 'utils';

const useErrorBoundary = (type: NotificationType = 'snackbar', errorMessage?: string) => {
  const { refreshToken, setActiveToken, token } = useAuthContext();
  const { openAutoCloseSnackBar, openAutoCloseRecord } = useNotificationsContext();
  const throwNotifications = type === 'snackbar' ? openAutoCloseSnackBar : openAutoCloseRecord;

  const handleError = useCallback(
    (err: unknown) => {
      if (err instanceof AxiosError && err.response) {
        const status: number = err.response.status;
        const message = errorMessage || err.response.data.Message || ERROR_MESSAGE[status];

        const violations =
          errorMessage || handleViolations(err.response.data) || ERROR_MESSAGE[status];

        document.body.style.cursor = 'auto';

        switch (status) {
          case 401:
            setActiveToken(false);

            refreshToken(token);
            break;
          case 420:
            throwNotifications({ message: violations, type: 'error' });
            break;
          default:
            throwNotifications({ message, type: 'error' });
            break;
        }
      }
    },
    [throwNotifications, errorMessage, openAutoCloseSnackBar],
  );

  return handleError;
};

export default useErrorBoundary;
