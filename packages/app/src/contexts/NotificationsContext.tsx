import { NullFunction } from '@interfaces/generated/functions';
import { RecordType, TRecord, TSnackbar } from '@interfaces/UI/notification';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

export type RecordPayload = { message: string; timeout?: number; type?: RecordType };
export type SnackBarPayload = { message: string; timeout?: number; type?: RecordType };

export interface INotificationsContext {
  record: TRecord;
  snackBar: TSnackbar;
  openAutoCloseRecord: ((payload: RecordPayload) => void) | NullFunction;
  closeRecord: VoidFunction | NullFunction;
  openAutoCloseSnackBar: ((payload: SnackBarPayload) => void) | NullFunction;
  closeSnackbar: VoidFunction | NullFunction;
}

export const initialState: INotificationsContext = {
  record: {
    message: null,
    open: false,
    type: 'success',
  },
  snackBar: {
    message: null,
    open: false,
    type: 'success',
  },
  openAutoCloseRecord: () => null,
  closeRecord: () => null,
  openAutoCloseSnackBar: () => null,
  closeSnackbar: () => null,
};

export const NotificationsContext = createContext(initialState);

interface IProps {
  children: ReactNode;
}

const NotificationsProvider: FC<IProps> = ({ children }) => {
  const [record, setRecord] = useState<TRecord>(initialState.record);
  const [snackBar, setSnackBar] = useState<TSnackbar>(initialState.record);

  const closeSnackbar = () => setSnackBar({ message: null, open: false, type: 'error' });
  const closeRecord = () => setRecord({ message: null, open: false, type: 'success' });

  const openAutoCloseRecord = ({
    message,
    timeout = 3000,
    type = 'success',
  }: RecordPayload): void => {
    setRecord({ message, open: true, type });

    setTimeout(closeRecord, timeout);
  };

  const openAutoCloseSnackBar = ({
    message,
    timeout = 2000,
    type = 'error',
  }: RecordPayload): void => {
    setSnackBar({ message, open: true, type });

    setTimeout(closeSnackbar, timeout);
  };

  const value = {
    record,
    snackBar,
    openAutoCloseRecord,
    closeRecord,
    openAutoCloseSnackBar,
    closeSnackbar,
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export default NotificationsProvider;

export const useNotificationsContext = () => useContext(NotificationsContext);
