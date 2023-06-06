import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

export interface IProps {
  size?: string;
}

const BasicLoader = ({ size = '2rem' }: IProps) => {
  return (
    <Root>
      <CircularProgress size={size} />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default BasicLoader;
