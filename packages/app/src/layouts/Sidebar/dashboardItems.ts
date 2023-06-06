import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { HOME_ROUTE } from 'routes/routes';

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
];

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
];

export default navItems;
