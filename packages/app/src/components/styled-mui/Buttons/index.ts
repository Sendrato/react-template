import { TJustifyContent } from '@interfaces/css';
import { Button, Grid } from '@mui/material';
import styled from 'styled-components';
import { withForwardProps } from 'utils';

export const GreyButton = styled(Button)`
  color: #f8fafc;
  background-color: #475569;
  display: flex;
  align-items: center;
  font-weight: 600;
  border: 1px solid #475569;

  &:hover {
    background-color: #475569;
  }
`;

export const OutlinedGrayButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #475569;
  color: #475569;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &:hover {
    background-color: transparent;
  }

  &:disabled {
    border-color: transparent;
  }
`;

type ButtonGroupProps = {
  justify?: {
    sm?: TJustifyContent;
    md?: TJustifyContent;
  };
  columnGap?: string;
};

const buttonGroupProps = ['justify', 'columnGap'];

export const ButtonGroup = styled(Grid).withConfig(
  withForwardProps(buttonGroupProps),
)<ButtonGroupProps>`
  align-items: center;
  display: flex;
  column-gap: 1rem;
  justify-content: ${({ justify }) => justify?.md || 'flex-start'};

  @media (max-width: 900px) {
    justify-content: ${({ justify }) => justify?.sm || 'flex-start'};
  }
`;
