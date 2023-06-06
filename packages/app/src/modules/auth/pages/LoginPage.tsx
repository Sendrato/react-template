/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import DesktopImageView from '../components/DesktopImageView';
import MobileImageView from '../components/MobileImageView';
import SignIn from '../components/SignIn';

const Wrapper = styled(Paper)`
  width: 50vw;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;

  > div {
    height: 100vh;
    width: fit-content;
    min-width: 25vw;
    max-width: 45vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1200px) {
    > div {
      max-width: 35vw;
    }
  }

  @media (max-width: 900px) {
    width: 80vw;

    > div {
      max-width: 100%;
      margin-bottom: 10rem;
    }
  }
`;

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  align-items: center;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const LoginPage = () => (
  <>
    <MobileImageView />
    <Container>
      <DesktopImageView />
      <Wrapper>
        <div>
          <Typography component="h1" variant="h5" marginBottom={'1rem'}>
            Login into eventOS
          </Typography>
          <SignIn />
        </div>
      </Wrapper>
    </Container>
  </>
);

export default LoginPage;
