import styled from '@emotion/styled';
import { Drawer as MuiDrawer, ListItemButton } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import Logo from '@sendrato/design-system/vendor/Logo';

import SidebarNav from './SidebarNav';
import { SidebarItemsType } from './types';

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)`
  font-size: ${(props) => (props as any).theme.typography.h5.fontSize};
  font-weight: ${(props) => (props as any).theme.typography.fontWeightMedium};
  font-family: ${(props) => (props as any).theme.typography.fontFamily};
  max-height: 64px;
  min-height: 64px;
  background-color: #1e293b;
  color: #fff;
  padding-left: ${(props) => (props as any).theme.spacing(6)};
  padding-right: ${(props) => (props as any).theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => (props as any).theme.breakpoints.up('sm')} {
    min-height: 64px;
  }

  &:hover {
    background-color: #1e293b;
    color: #fff;
  }
`;

export interface SidebarProps {
  PaperProps: {
    style: {
      width: number;
    };
  };
  variant?: 'permanent' | 'persistent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
}

const Sidebar = ({ items, ...rest }: SidebarProps) => {
  return (
    <Drawer {...rest}>
      <Link href="/">
        <Brand>
          <Logo />
        </Brand>
      </Link>
      <SidebarNav items={items} />
    </Drawer>
  );
};

export default Sidebar;
