import { METHOD } from '@interfaces/generated/api';
import { DependencyList, useCallback, useEffect } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { useAppSelector } from 'store/hooks';
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
  const { token, tenant, isActiveToken } = useAppSelector((store) => store.auth);

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
    enabled: isActiveToken,
    ...options,
  });

  useEffect(() => {
    response.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (isActiveToken) {
      response.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveToken]);

  return response;
};

export default useEntityQuery;
