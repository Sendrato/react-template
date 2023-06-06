import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Grid,
  IconButton as MuiIconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import useMedia from 'hooks/use-media';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { getFormattedTime } from 'utils';

import MobileLogo from '@sendrato/design-system/vendor/MobileLogo';

import { NavbarUserDropdown } from './NavbarUserDropdown';
import WeatherWidget from './WeatherWidget';

const AppBar = styled(MuiAppBar)`
  background: #fff;
  color: #9e9e9e;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    display: block;
    width: 22px;
    height: 22px;
  }
`;

const NavMenu = styled(Grid)`
  width: 100%;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

interface INavbarProps {
  onDrawerToggle: React.MouseEventHandler<HTMLElement>;
  logout: () => void;
}

export const Navbar = ({ onDrawerToggle, logout }: INavbarProps) => {
  const [time, setTime] = useState('');

  const { isMobile } = useMedia();

  const startTimer = useCallback(() => {
    setTime(getFormattedTime(new Date().toString()));
  }, []);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    setInterval(() => startTimer(), 20000);
  }, [startTimer]);

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ backgroundColor: isMobile ? '#1e293b' : 'auto' }}>
          {isMobile ? (
            <NavMenu sx={{ display: { xs: 'block', md: 'none' } }}>
              <Link href="/">
                <Button>
                  <MobileLogo />
                </Button>
              </Link>
              <Grid container width="auto" alignItems="center" columnGap="1rem">
                <NavbarUserDropdown logout={logout} />
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </NavMenu>
          ) : (
            <Grid
              container
              justifyContent={'space-between'}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Box>
                <Typography variant="body1">Sydney, NSW {time}</Typography>
                <WeatherWidget />
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <IconButton>
                  <SettingsOutlinedIcon />
                </IconButton>
                <IconButton sx={{ margin: '0 1rem' }}>
                  <MessageOutlinedIcon />
                </IconButton>
                <IconButton>
                  <NotificationsOutlinedIcon />
                </IconButton>
                <NavbarUserDropdown logout={logout} />
              </Box>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
