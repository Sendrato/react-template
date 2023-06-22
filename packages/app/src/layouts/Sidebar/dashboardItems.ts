import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { HOME_ROUTE, LOCATIONS_KIND_ROUTE, ONBOARDING_ROUTE } from 'routes/routes';

import { SidebarItemsType } from './types';

const pagesSection: SidebarItemsType[] = [
  {
    title: 'Dashboard',
    access: ['organiser', 'administrator', 'seller'],
    icon: DashboardOutlinedIcon,
    children: [
      {
        ...HOME_ROUTE,
      },
    ],
  },
  {
    ...ONBOARDING_ROUTE,
    access: ['organiser', 'administrator', 'seller'],
  },
  {
    ...LOCATIONS_KIND_ROUTE,
    access: ['organiser', 'administrator', 'seller'],
  },
];

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
];

export default navItems;
