import { SELLERS_ROUTE } from 'routes/routes';

import { SidebarItemsType } from './types';

const pagesSection: SidebarItemsType[] = [
  {
    ...SELLERS_ROUTE,
  },
];

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
];

export default navItems;
