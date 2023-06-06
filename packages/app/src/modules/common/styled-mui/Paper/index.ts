import { Paper } from '@mui/material';
import styled from 'styled-components';

export const StyledPaper = styled(Paper)<{
  $stretch?: boolean;
  $padding?: string;
}>`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  padding: ${({ $padding }) => `${$padding} !important`};
  ${({ $stretch }) =>
    $stretch
      ? `
  width: 100%;
  height: 100%;
  `
      : ''};
`;

export const TablePaper = styled(StyledPaper)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1.5rem;
  border-radius: 10px;
`;

export const ModalPaper = styled(StyledPaper)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
