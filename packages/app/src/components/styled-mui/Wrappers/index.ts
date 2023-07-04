import { RecordType } from '@interfaces/UI/notification';
import { Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { withForwardProps } from 'utils';

type StatusProps = {
  backgroundColor: string;
  textColor: string;
};
const statusProps = ['backgroundColor', 'textColor'];

export const Status = styled(Box).withConfig(withForwardProps(statusProps))<StatusProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  font-size: 13px;
  padding: 0.25rem 0.5rem;
  text-align: center;
  border-radius: 1rem;
  width: fit-content;
`;

export const Details = styled(Box)`
  color: #3460dc;
  cursor: pointer;
  font-weight: 500;
`;

type AlertProps = {
  top?: string;
  left?: string;
  type: RecordType;
};

const alertProps = ['top', 'left', 'type'];

export const AlertContainer = styled(Grid).withConfig(withForwardProps(alertProps))<AlertProps>`
  padding: 1rem 1.5rem;
  border-radius: 6px;
  position: absolute;
  top: ${({ top }) => top || 0};
  left: ${({ left }) => left || 0};
  display: flex;
  align-items: center;
  z-index: 99999;

  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9)
            ),
            #2e7d32;
        `;
      case 'info':
        return `
          background: linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9)
            ),
            #0288d1;
        `;
      case 'error':
        return `
          background: linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9)
            ),
            #d32f2f;
        `;
      default:
        return ``;
    }
  }}

  svg {
    margin-right: 0.5rem;
  }
`;
