import { Dialog } from '@mui/material';
import { useMedia } from 'hooks';
import { ReactNode } from 'react';

import CloseIconModal from './icons/CloseIconModal';
import { DialogActions, DialogContent, DialogTitle } from './styled-mui/Dialog';

interface IProps {
  open: boolean;
  title: string;
  close: VoidFunction;
  mobileScreen?: boolean;
  children: ReactNode;
  actions?: ReactNode;
  width?: string;
}

const Modal = ({
  title,
  open,
  close,
  mobileScreen = true,
  children,
  actions,
  width,
}: IProps) => {
  const { isMobile } = useMedia();

  const fullWidth = isMobile && mobileScreen;

  return (
    <Dialog fullWidth={fullWidth} open={open} onClose={close}>
      <DialogTitle>
        {title}
        <CloseIconModal onClick={close} />
      </DialogTitle>
      <DialogContent $width={width}>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
};

export default Modal;
