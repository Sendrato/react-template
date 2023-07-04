import { IUserRole } from '@interfaces/auth';
import { DashboardOutlined } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import MenuIcon from '@mui/icons-material/Menu';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsIcon from '@mui/icons-material/Settings';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Grid, IconButton } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import useToggle from 'hooks/use-toggle';
import Sidebar from 'layouts/Sidebar';
import { SidebarItemsType } from 'layouts/Sidebar/types';
import { authDecorator } from 'stories/decorators';

const admin = {
  userRole: { AccountType: 'administrator', SellerId: null, IsSuperuser: true } as IUserRole,
};

const seller = {
  userRole: { AccountType: 'seller', SellerId: null, IsSuperuser: true } as IUserRole,
};

const helpdesk = {
  userRole: { AccountType: 'helpdesk', SellerId: null, IsSuperuser: true } as IUserRole,
};

const pagesSection: SidebarItemsType[] = [
  {
    title: 'Overview',
    pathname: '/',
    access: ['administrator', 'seller', 'helpdesk'],
    icon: DashboardOutlined,
  },
  {
    title: 'Sellers',
    pathname: '/sellers',
    access: ['administrator'],
    icon: StorefrontIcon,
  },
  {
    title: 'Visitor Help',
    pathname: '/help',
    access: ['administrator', 'seller', 'helpdesk'],
    icon: LiveHelpIcon,
  },
  {
    title: 'Transactions',
    pathname: '/transactions',
    access: ['administrator', 'seller'],
    icon: PaymentsIcon,
    children: [
      { title: 'Purchses', pathname: '/purchases', access: ['administrator', 'seller'] },
      { title: 'Redeems', pathname: '/redeems', access: ['administrator', 'seller'] },
      { title: 'Top Ups', pathname: '/top-ups', access: ['administrator', 'seller'] },
    ],
  },
  {
    title: 'Settings',
    pathname: '/settings',
    access: ['administrator'],
    icon: SettingsIcon,
  },
  {
    title: 'Chat',
    pathname: '/chat',
    access: ['administrator', 'seller', 'helpdesk'],
    icon: ChatIcon,
  },
];

const navItems = [
  {
    title: 'Pages',
    pages: pagesSection,
  },
];

const meta: Meta<typeof Sidebar> = {
  decorators: [authDecorator(admin)],
  title: 'Common/Sidebar',
  component: Sidebar,
  argTypes: {
    items: {
      description: 'The object with title and pages.',
    },
    open: {
      description: 'The indicator for persistnat and temporery Sidebar.',
    },
    variant: {
      description: 'The type of Sidebar.',
    },
    PaperProps: {
      description: 'The Sidebar styles.',
    },
    onClose: {
      description: 'Function for the closing Sidebar.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Sidebar component is part of DashboardLayout that allows you to display a navigation menu for conveniently accessing different pages within your application. It also provides the ability to adjust access to specific pages based on user roles, ensuring appropriate visibility and control.',
      },
    },
  },
};

const Template: StoryFn<typeof Sidebar> = (args) => {
  const [open, toggle] = useToggle(false);
  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid container sx={{ justifyContent: 'flex-end', alignContent: 'flex-start' }}>
        <IconButton onClick={toggle}>
          <MenuIcon color="info" />
        </IconButton>
      </Grid>
      <Sidebar
        variant="permanent"
        open={open}
        onClose={toggle}
        {...args}
        PaperProps={{
          style: { width: 256 },
        }}
      />
    </Grid>
  );
};

export const Permanent = Template.bind({});

Permanent.args = {
  items: navItems,
  variant: 'permanent',
};

export const Persistent = Template.bind({});

Persistent.args = {
  items: navItems,
  variant: 'persistent',
};

export const Temporary = Template.bind({});

Temporary.args = {
  items: navItems,
  variant: 'temporary',
};

export const PermanentForSeller = Template.bind({});

PermanentForSeller.decorators = [authDecorator(seller)];
PermanentForSeller.args = {
  items: navItems,
  variant: 'permanent',
};

export const PermanentForHelpdesk = Template.bind({});

PermanentForHelpdesk.decorators = [authDecorator(helpdesk)];
PermanentForHelpdesk.args = {
  items: navItems,
  variant: 'permanent',
};

export default meta;
