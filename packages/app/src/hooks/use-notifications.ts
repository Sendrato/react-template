import { openAutoCloseRecord } from 'store/slices/design/modalsSlice';
import { openAutoCloseSnackBar } from 'store/slices/design/snackBar';

export type NotificationType = 'snackbar' | 'record';

const useNotifications = (type: NotificationType = 'record') => {
  const throwNotifications = type === 'record' ? openAutoCloseRecord : openAutoCloseSnackBar;

  return throwNotifications;
};

export default useNotifications;
