import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useAppSelector } from 'store/hooks';
import { METHOD } from 'store/slices/entityCall';
import { addAuthHeader, api } from 'utils';

interface IEntityMutation {
  entity: string;
  method?: METHOD;
}

const useEntityMutationQuery = <TBody>({ entity, method }: IEntityMutation) => {
  const { token, tenant } = useAppSelector((store) => store.auth);

  const handleFetch = useCallback(
    async ({ body, params: query = '' }: { body?: TBody; params?: string }) => {
      const response = await api(`entity/${entity}${query ? `?${query}` : ''}`, {
        method,
        data: body && JSON.stringify(body),
        headers: {
          ...addAuthHeader(token?.access_token || '', tenant),
        },
      });

      return response.data;
    },
    [entity, method, tenant, token],
  );

  const mutation = useMutation(handleFetch);

  return mutation;
};

export default useEntityMutationQuery;
