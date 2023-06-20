import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getSellerList,
  getSellers,
} from 'store/slices/entities/onboarding/sellersSlice';

interface IEntityConfig {
  [key: string]: { selector: any; fetcher: any };
}

const entityConfig: IEntityConfig = {
  ['common/backoffice/onboarding/ListSellers']: {
    selector: getSellerList,
    fetcher: (params: any) => getSellers(params),
  },
};

const useEntity = <T>(entity: string, params: any): any => {
  const entityFunctions = entityConfig[entity as keyof IEntityConfig];
  const dispatch = useAppDispatch();
  const data: T[] = useAppSelector(entityFunctions.selector);

  console.log(entityFunctions);

  useEffect(() => {
    dispatch(entityFunctions.fetcher(params));
  }, [entityFunctions, dispatch]);

  return [data];
};

export default useEntity;
