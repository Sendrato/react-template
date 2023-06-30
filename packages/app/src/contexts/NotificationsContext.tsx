import { NullFunction } from '@interfaces/generated/functions';
import { IRecord } from '@interfaces/UI/record';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

type RecordPayload = Omit<IRecord, 'open'> & { timeout?: number };

type NotificationsContext = {
  record: IRecord;
  openAutoCloseRecord: ((payload: RecordPayload) => void) | NullFunction;
};

const initialState: NotificationsContext = {
  record: {
    message: null,
    open: false,
    type: 'success',
  },
  openAutoCloseRecord: () => null,
};

const NotificationsContext = createContext(initialState);

interface IProps {
  children: ReactNode;
}

const NotificationsProvider: FC<IProps> = ({ children }) => {
  const [record, setRecord] = useState<IRecord>(initialState.record);

  const openAutoCloseRecord = ({
    message,
    timeout = 3000,
    type = 'success',
  }: RecordPayload): void => {
    setRecord({ message, open: true, type });

    setTimeout(() => {
      setRecord({ message: null, open: false, type: 'success' });
    }, timeout);
  };

  const value = {
    record,
    openAutoCloseRecord,
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export default NotificationsProvider;

export const useNotificationsContext = () => useContext(NotificationsContext);
