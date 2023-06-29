import { NullFunction } from '@interfaces/generated/functions';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { IRoute } from 'routes/routes';

interface HistoryContext {
  history: IRoute[];
  setHistory: Dispatch<SetStateAction<IRoute[]>> | NullFunction;
  updateHistory: ((payload: IRoute) => void) | NullFunction;
}

const initialValues: HistoryContext = {
  history: [],
  setHistory: () => null,
  updateHistory: () => null,
};

const HistoryContext = createContext(initialValues);

interface IProps {
  children: ReactNode;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const [history, setHistory] = useState<IRoute[]>([]);

  const updateHistory = (payload: IRoute) => {
    if ((history[0] && payload.pathname !== history[0].pathname) || !history[0]) {
      const data = [payload, ...history].slice(0, 3);
      setHistory(data);
      localStorage.setItem('historyRoutes', JSON.stringify(data));
    }
  };

  const value = {
    history,
    setHistory,
    updateHistory,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export const useHistoryContext = () => useContext(HistoryContext);
