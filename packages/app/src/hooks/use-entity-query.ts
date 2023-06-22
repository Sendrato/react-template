import { NotificationType } from 'hooks';
import { DependencyList, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

interface IEntityCall {
  entity: string;
  method?: METHOD;
  params?: string;
  deps?: DependencyList;
  errorMessage?: string;
  errorRecordType?: NotificationType;
}

const useEntityQuery = <IRes>({ entity, method = METHOD.GET, params, deps = [] }: IEntityCall) => {
  const { token, tenant } = useAppSelector((store) => store.auth);

  const handleFetch = useCallback(async () => {
    const response = await api(`entity/${entity}${params ? `?${params}` : ''}`, {
      method,
      headers: {
        ...addAuthHeader(token?.access_token || '', tenant),
      },
    });

    return response.data;
  }, [entity, method, params, tenant, token]);

  const response = useQuery<IRes>([entity, ...deps], handleFetch, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  useEffect(() => {
    response.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return response;
};

export default useEntityQuery;
