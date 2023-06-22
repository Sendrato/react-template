/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { getAuthStore } from 'store/slices/auth/authSlice';
import { UserRole } from 'store/slices/auth/types';

import { PageLoader } from '@sendrato/design-system/components/PageLoader';

import { AUTH_ROUTES, HOME_ROUTE, routes } from './routes';

interface IProps {
  children: ReactElement;
}

enum Access {
  UNKNOWN,
  ALLOW,
  FORBIDDEN,
}

const RoleGuard = ({ children }: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [access, setAccess] = useState<Access>(Access.UNKNOWN);
  const { userRole } = useAppSelector(getAuthStore);
  const router = useRouter();

  const currentRoute = routes.find((route) => route.pathname === router.pathname);

  const isAuthPath: boolean = AUTH_ROUTES.includes(router.asPath);

  useEffect(() => {
    if (userRole) {
      const hasAccess =
        userRole?.IsSuperuser || currentRoute?.access.includes(userRole?.AccountType || '');

      setAccess(hasAccess ? Access.ALLOW : Access.FORBIDDEN);
    }

    if (isAuthPath) {
      setAccess(Access.ALLOW);
    }
  }, [userRole, router.pathname]);

  useEffect(() => {
    if (access === Access.ALLOW) {
      setLoading(false);
    }

    if (access === Access.FORBIDDEN && !isAuthPath && userRole) {
      switch (userRole?.AccountType) {
        case UserRole.SELLER:
          router.push(HOME_ROUTE.pathname);
          break;
        case UserRole.HELPDESK:
          router.push(HOME_ROUTE.pathname);
          break;
      }

      setLoading(false);
    }
  }, [access]);

  if (loading || access !== Access.ALLOW) {
    return <PageLoader />;
  }

  return children;
};

export default RoleGuard;
