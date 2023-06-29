import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

export const NavbarUserDropdown: React.FC = () => {
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
  const router = useRouter();
  const { userRole, logout } = useAuthContext();

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = () => {
    logout();
    router.push('/login');
  };

  const goToProfile = () => {
    if (!userRole?.IsSuperuser && userRole?.SellerId) {
      router.replace(`/seller-details/${userRole.SellerId}`);
    }

    closeMenu();
  };

  return (
    <React.Fragment>
      <IconButton sx={{ marginLeft: '1rem' }}>
        <Tooltip title="Account">
          <Avatar
            sx={{ width: 25, height: 25 }}
            onClick={toggleMenu}
            aria-owns={Boolean(anchorMenu) ? 'menu-appbar' : undefined}
            aria-haspopup="true"
          />
        </Tooltip>
      </IconButton>
      <Menu id="menu-appbar" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
        <MenuItem onClick={goToProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
};
