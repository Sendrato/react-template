import { METHOD } from '@interfaces/common/backoffice/api';
import { useAuthContext } from 'contexts/AuthContext';
import { DependencyList, useCallback, useEffect } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { addAuthHeader, api } from 'utils';

import useErrorBoundary from './use-error-boundary';

interface IEntityQuery<IData> {
  entity: string;
  params?: string;
  deps?: DependencyList;
  options?: UseQueryOptions<IData, Error>;
}

const useEntityQuery = <TData = unknown>({
  entity,
  params,
  deps = [],
  options,
}: IEntityQuery<TData>) => {
  const { token, tenant, isActiveToken } = useAuthContext();

  const onError = useErrorBoundary();
  const onSuccess = (): void => {
    document.body.style.cursor = 'auto';
  };

  const handleFetch = useCallback(async () => {
    const { data } = await api(`entity/${entity}${params ? `?${params}` : ''}`, {
      method: METHOD.GET,
      headers: {
        ...addAuthHeader(token?.access_token || '', tenant),
      },
    });

    return data;
  }, [entity, params, tenant, token]);

  const response = useQuery<TData, Error>([entity, ...deps], handleFetch, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError,
    onSuccess,
    enabled: isActiveToken,
    ...options,
  });

  useEffect(() => {
    if (response.isFetching) {
      document.body.style.cursor = 'wait';
    }
  }, [response.isFetching]);

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
