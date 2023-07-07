export interface IRoute {
  pathname: string;
  access: string[];
  basePath?: string;
  title: string;
}

export const HOME_ROUTE = {
  pathname: '/',
  access: ['organiser', 'administrator', 'seller'],
  title: 'Sellers',
};

export const AUTH_ROUTES = ['/login', '/reset-password'];

export const routes: IRoute[] = [HOME_ROUTE];
