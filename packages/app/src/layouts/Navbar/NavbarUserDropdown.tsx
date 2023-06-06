import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { getUserRoleSelector } from 'store/slices/auth/authSlice';

export const NavbarUserDropdown: React.FC<{ logout: () => void }> = ({
  logout,
}) => {
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
  const router = useRouter();
  const userRole = useAppSelector(getUserRoleSelector);

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await logout();
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
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={goToProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
};
