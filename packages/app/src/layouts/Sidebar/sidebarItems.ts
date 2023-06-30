import { HOME_ROUTE, ONBOARDING_ROUTE } from 'routes/routes';

import { SidebarItemsType } from './types';

const pagesSection: SidebarItemsType[] = [
  {
    ...HOME_ROUTE,
  },
  {
    ...ONBOARDING_ROUTE,
  },
];

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
];

export default navItems;
