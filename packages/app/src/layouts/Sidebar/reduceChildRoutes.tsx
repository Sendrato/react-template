import { UserRole } from '@interfaces/auth';
import React from 'react';

import SidebarNavList from './SidebarNavList';
import SidebarNavListItem from './SidebarNavListItem';
import { SidebarItemsType } from './types';

interface ReduceChildRoutesProps {
  depth: number;
  page: SidebarItemsType;
  items: any[];
  currentRoute: string;
  userRole: string;
}

const reduceChildRoutes = ({
  items,
  page: { children, title, icon, access, pathname },
  depth,
  currentRoute,
  userRole,
}: ReduceChildRoutesProps) => {
  const rest = { title, icon, access, pathname };

  if (children) {
    const open = children.reduce((acc, p) => {
      if (p.pathname && currentRoute.includes(p.pathname)) {
        acc = true;
      }

      return acc;
    }, false);

    items.push(
      userRole !== UserRole.ADMIN ? (
        access && access.includes(userRole) ? (
          <SidebarNavListItem key={title} depth={depth} open={!!open} {...rest}>
            <SidebarNavList depth={depth + 1} pages={children} />
          </SidebarNavListItem>
        ) : null
      ) : (
        <SidebarNavListItem key={title} depth={depth} open={!!open} {...rest}>
          <SidebarNavList depth={depth + 1} pages={children} />
        </SidebarNavListItem>
      ),
    );
  } else {
    items.push(
      userRole !== UserRole.ADMIN ? (
        access && access.includes(userRole) ? (
          <SidebarNavListItem key={title} depth={depth} {...rest} />
        ) : null
      ) : (
        <SidebarNavListItem key={title} depth={depth} {...rest} />
      ),
    );
  }

  return items;
};

export default reduceChildRoutes;
