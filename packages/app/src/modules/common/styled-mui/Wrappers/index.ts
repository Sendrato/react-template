import { Box } from '@mui/material';
import styled from 'styled-components';

type StatusProps = {
  $backgroundColor: string;
  $textColor: string;
};

export const Status = styled(Box)<StatusProps>`
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
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
