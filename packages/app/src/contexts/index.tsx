import { FC, ReactNode } from 'react';

import { AuthProvider } from './AuthContext';
import HistoryProvider from './HistoryContext';
import NotificationsProvider from './NotificationsContext';

interface IProps {
  children: ReactNode;
}

const ContextProvider: FC<IProps> = ({ children }) => {
  return (
    <NotificationsProvider>
      <HistoryProvider>
        <AuthProvider>{children}</AuthProvider>;
      </HistoryProvider>
    </NotificationsProvider>
  );
};

export default ContextProvider;
