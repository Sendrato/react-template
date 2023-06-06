import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { routes } from 'routes/routes';
import { useAppDispatch } from 'store/hooks';
import { setHistory, updateHistory } from 'store/slices/historySlice';

const useHistory = ({ exclude }: { exclude: string[] }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const route = routes.find((item) => item.pathname === router.pathname);

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem('historyRoutes') || JSON.stringify(''),
    );

    if (Array.isArray(history)) {
      dispatch(setHistory(history));
    }
  }, [dispatch]);

  useEffect(() => {
    if (route && !exclude.includes(route.pathname)) {
      dispatch(updateHistory({ ...route, pathname: router.asPath }));
    }
  }, [exclude, dispatch, route, router]);
};

export default useHistory;
