import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';

import reduceChildRoutes from './reduceChildRoutes';
import { SidebarItemsType } from './types';

interface SidebarNavListProps {
  depth: number;
  pages: SidebarItemsType[];
}

const SidebarNavList = ({ pages, depth }: SidebarNavListProps) => {
  const { pathname } = useRouter();
  const { userRole } = useAuthContext();

  const childRoutes: ReactElement[] = useMemo(
    () =>
      pages.reduce(
        (items, page) =>
          reduceChildRoutes({
            items,
            page,
            currentRoute: pathname,
            depth,
            userRole: userRole?.AccountType || '',
          }),
        [] as ReactElement[],
      ),
    [pages, depth, pathname, userRole],
  );

  return <>{childRoutes}</>;
};

export default SidebarNavList;
