import { useHistoryContext } from 'contexts/HistoryContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { routes } from 'routes/routes';

const useHistory = ({ exclude }: { exclude: string[] }) => {
  const { setHistory, updateHistory } = useHistoryContext();
  const router = useRouter();

  const route = routes.find((item) => item.pathname === router.pathname);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('historyRoutes') || JSON.stringify(''));

    if (Array.isArray(history)) {
      setHistory(history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (route && !exclude.includes(route.pathname)) {
      updateHistory({ ...route, pathname: router.asPath });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exclude, route, router]);
};

export default useHistory;
