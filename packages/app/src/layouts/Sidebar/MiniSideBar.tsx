import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from 'store/hooks';
import { getUserRoleSelector } from 'store/slices/auth/authSlice';

import MiniLogo from '@sendrato/design-system/vendor/MiniLogo';

import { SidebarItemsType } from './types';

interface IProps {
  handleDrawerToggle: Dispatch<SetStateAction<boolean>>;
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
}

const Drawer = styled.div`
  position: fixed;
  background-color: #1e293b;
  min-height: 100vh;
  min-width: 64px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const List = styled.div`
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  svg {
    color: #fff;
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
`;

const MiniSideBar = ({ handleDrawerToggle, items }: IProps) => {
  const userRole = useAppSelector(getUserRoleSelector);

  return (
    <Drawer onClick={() => handleDrawerToggle(true)}>
      {items.map((section, index) => {
        return (
          <List key={index}>
            {index === 0 && (
              <Box height={64}>
                <MiniLogo />
              </Box>
            )}
            {section.pages.map(({ icon: Icon, access }, index) => {
              if (
                (userRole?.AccountType && access.includes(userRole.AccountType)) ||
                userRole?.IsSuperuser
              ) {
                return Icon ? <Icon key={index} /> : null;
              }
            })}
          </List>
        );
      })}
    </Drawer>
  );
};

export default MiniSideBar;
