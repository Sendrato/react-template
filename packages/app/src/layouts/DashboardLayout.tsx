import styled from '@emotion/styled';
import { Alert, Box, CssBaseline, Paper as MuiPaper, Snackbar } from '@mui/material';
import { spacing } from '@mui/system';
import { useNotificationsContext } from 'contexts/NotificationsContext';
import useMedia from 'hooks/use-media';
import { Navbar } from 'layouts/Navbar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Sidebar from './Sidebar/index';
import MiniSideBar from './Sidebar/MiniSideBar';
import dashboardItems from './Sidebar/sidebarItems';

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

const DashboardLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { snackBar, closeSnackbar } = useNotificationsContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { pathname } = useRouter();

  const { isLgUp, isMd, isMobile } = useMedia();

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
              <MiniSideBar handleDrawerToggle={handleDrawerToggle} items={dashboardItems} />
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
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 4 : 2}>{children}</MainContent>
        <Snackbar
          open={snackBar.open}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={closeSnackbar}
        >
          <Alert severity={snackBar.type}>{snackBar.message}</Alert>
        </Snackbar>
      </AppContent>
    </Root>
  );
};

export default DashboardLayout;
