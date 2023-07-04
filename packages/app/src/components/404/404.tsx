/* eslint-disable @next/next/no-img-element */
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { StyledPaper } from '../styled-mui';
import logoImage from './assets/logo.png';

interface IProps {
  title?: string;
  message?: string;
}

const ErrorComponent = ({ title = 'Not Found', message = 'Something went wrong' }: IProps) => {
  const router = useRouter();

  return (
    <BoxStyled>
      <StyledPaper padding="1rem">
        <InnerContainer>
          <Image src={logoImage.src} alt="EventOS" />

          <Typography variant="h4" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body2" fontWeight={400} color="grey" align="center">
            {message}
          </Typography>
          <Button variant="contained" onClick={() => router.back()}>
            Go Back
          </Button>
        </InnerContainer>
      </StyledPaper>
    </BoxStyled>
  );
};
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 2.5rem;
  text-align: center;

  > * {
    margin: 1rem 0;
  }

  button {
    width: 100%;
    margin-bottom: 0;
  }
`;

const Image = styled.img`
  width: 180px;
  height: 40px;
`;

const BoxStyled = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f9fc;

  > div {
    width: 35vw;
  }
`;
export default ErrorComponent;
