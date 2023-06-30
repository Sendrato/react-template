import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import useMedia from '../../app/src/hooks/use-media';

interface IAlertDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirm: () => void;
  alertText: string;
  title?: string;
  yes?: string;
  width?: string;
}

export const AlertDialog: React.FC<IAlertDialog> = ({
  open,
  setOpen,
  confirm,
  alertText,
  title,
  yes,
  width,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { isMobile } = useMedia();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title ? title : 'Are you sure?'}</DialogTitle>
        <DialogContent
          sx={isMobile ? { width: 'auto' } : width ? { minWidth: width, maxWidth: width } : {}}
        >
          <DialogContentText id="alert-dialog-description">{alertText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirm} autoFocus>
            {yes ? yes : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
