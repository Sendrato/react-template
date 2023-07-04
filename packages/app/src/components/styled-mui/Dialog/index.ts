import {
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
} from '@mui/material';
import styled from 'styled-components';
import { withForwardProps } from 'utils';

export const Dialog = styled(MuiDialog);

export const DialogTitle = styled(MuiDialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  padding: 2rem 2rem 1rem 2rem;
`;

type DialogContentProps = { width?: string };

export const DialogContent = styled(MuiDialogContent).withConfig(
  withForwardProps(['width']),
)<DialogContentProps>`
  width: ${({ width }) => width || '580px'};
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const DialogActions = styled(MuiDialogActions)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 2rem 2rem;
  row-gap: 0.25rem;

  & > * {
    margin: 0 !important;
  }
`;
