import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

interface IEntityCall {
  entity: string;
  method?: METHOD;
  params?: string;
}

const useEntityMutationQuery = ({ entity, method, params }: IEntityCall) => {
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

  const mutation = useMutation(handleFetch);

  return mutation;
};

export default useEntityMutationQuery;
