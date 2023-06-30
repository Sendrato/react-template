export type NotificationType = 'snackbar' | 'record';

export type RecordType = 'success' | 'error' | 'info';

export interface INotifications {
  message: string | null;
  open: boolean;
  type: RecordType;
}

export type TRecord = INotifications;
export type TSnackbar = INotifications;
