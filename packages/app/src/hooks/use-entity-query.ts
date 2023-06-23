import { DependencyList, useCallback, useEffect } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

import useErrorBoundary from './use-error-boundary';

interface IEntityQuery<IData> {
  entity: string;
  method?: METHOD;
  params?: string;
  deps?: DependencyList;
  options?: UseQueryOptions<IData, Error>;
}

const useEntityQuery = <TData = unknown>({
  entity,
  method = METHOD.GET,
  params,
  deps = [],
  options,
}: IEntityQuery<TData>) => {
  const { token, tenant } = useAppSelector((store) => store.auth);

  const onError = useErrorBoundary();

  const handleFetch = useCallback(async () => {
    const { data } = await api(`entity/${entity}${params ? `?${params}` : ''}`, {
      method,
      headers: {
        ...addAuthHeader(token?.access_token || '', tenant),
      },
    });

    return data;
  }, [entity, method, params, tenant, token]);

  const response = useQuery<TData, Error>([entity, ...deps], handleFetch, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError,
    ...options,
  });

  useEffect(() => {
    response.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return response;
};

export default useEntityQuery;
