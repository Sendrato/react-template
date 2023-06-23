import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Popover as MuiPopover } from '@mui/material';
import React, { MouseEvent, ReactElement, useState } from 'react';

interface IProps {
  children: ReactElement;
  onClick?: () => any;
}

const Popover = ({ children, onClick }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    onClick && onClick();
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="details"
        size="large"
        aria-describedby={'popover'}
        onClick={handlePopoverOpen}
      >
        <MoreHorizIcon />
      </IconButton>
      <MuiPopover
        id="popover"
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {children}
      </MuiPopover>
    </>
  );
};

export default Popover;
