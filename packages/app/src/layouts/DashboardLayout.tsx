import styled from '@emotion/styled';
import {
  Alert,
  Box,
  CssBaseline,
  Paper as MuiPaper,
  Snackbar,
} from '@mui/material';
import { spacing } from '@mui/system';
import useMedia from 'hooks/use-media';
import { Navbar } from 'layouts/Navbar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout } from 'store/slices/auth/authSlice';
import { closeSnackbar, getSnackBarStore } from 'store/slices/design/snackBar';

import dashboardItems from './Sidebar/dashboardItems';
import Sidebar from './Sidebar/index';
import MiniSideBar from './Sidebar/MiniSideBar';

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => (props as any).theme.breakpoints.up('lg')} {
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @media (max-width: 1200px) and (min-width: 900px) {
    width: calc(100% - 64px);
  }
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  position: relative;
  flex: 1;
  background-color: #f7f9fc;

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const DashboardLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { open, message } = useAppSelector(getSnackBarStore);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { pathname } = useRouter();

  const handleSnackbarClose = () => dispatch(closeSnackbar());

  const { isLgUp, isMd, isMobile } = useMedia();

  const handleLogout = () => {
    dispatch(logout());
  };

  const calcDrawerWidth = (): number => {
    if (isLgUp) {
      return drawerWidth;
    }
    if (isMd) {
      return 64;
    }

    return 0;
  };

  useEffect(() => {
    if (isMobile || isMd) {
      setMobileOpen(false);
    }
  }, [pathname, isMobile, isMd]);

  return (
    <Root>
      <CssBaseline />
      <Drawer style={{ width: calcDrawerWidth() }}>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={dashboardItems}
          />
        </Box>
        {isMd && (
          <Box sx={{ display: { md: 'block', lg: 'none' } }}>
            {mobileOpen ? (
              <Sidebar
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                items={dashboardItems}
              />
            ) : (
              <MiniSideBar
                handleDrawerToggle={handleDrawerToggle}
                items={dashboardItems}
              />
            )}
          </Box>
        )}
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={dashboardItems}
            variant="permanent"
          />
        </Box>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} logout={handleLogout} />
        <MainContent p={isLgUp ? 4 : 2}>{children}</MainContent>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleSnackbarClose}
        >
          <Alert severity="error">{message}</Alert>
        </Snackbar>
      </AppContent>
    </Root>
  );
};

export default DashboardLayout;
