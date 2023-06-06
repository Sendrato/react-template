/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button as MuiButton, Paper, Typography } from '@mui/material';
import { spacing } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { getAuthStore } from 'store/slices/auth/authSlice';

import DesktopImageView from '../components/DesktopImageView';
import MobileImageView from '../components/MobileImageView';
import Reset from '../components/Reset';

const Button = styled(MuiButton)<{ mt?: number }>(spacing);

const Wrapper = styled(Paper)`
  width: 50vw;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;

  > div {
    height: fit-content;
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

const Title = styled(Typography)`
  width: 100%;
  font-size: 24px;
  line-height: 32px;
  text-align: start;
  margin-bottom: 1.5rem;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

const Message = styled(Box)`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  margin-bottom: 1rem;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #2e7d32;
  border-radius: 6px;
  h5 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #059669;
  }
`;

const ResetPasswordPage = () => {
  const { resetFinished } = useAppSelector(getAuthStore);
  return (
    <>
      <MobileImageView />
      <Container>
        <DesktopImageView />
        <Wrapper>
          <div>
            <Title variant="h1">Forgot Password</Title>
            {resetFinished ? (
              <>
                <Message>
                  <CheckCircleOutlineIcon
                    sx={{ marginRight: '14px', fill: '#059669' }}
                  />
                  <Typography variant="h5">
                    You will receive an email with reset instructions
                  </Typography>
                </Message>
                <Link href="/login">
                  <Button
                    type="button"
                    variant="text"
                    fullWidth
                    color="primary"
                    mt={2}
                  >
                    Back to Login
                  </Button>
                </Link>
              </>
            ) : (
              <Reset />
            )}
          </div>
        </Wrapper>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
