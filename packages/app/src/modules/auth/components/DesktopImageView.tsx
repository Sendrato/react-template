import { Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import graphics from '../assets/graphics.png';
import loginLogo from '../assets/loginLogo.png';

const Image = styled.img`
  width: 179px;
  height: 49px;
`;

const Graphics = styled.img`
  width: 90%;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50vw;
  height: 100%;
  background-color: #171c33;
  padding: 2rem 0 0 1rem;

  > div {
    flex-basis: fit-content;
    height: fit-content;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Title = styled(Typography)`
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Description = styled(Typography)`
  color: white;
  font-weight: 400;
`;

const DesktopImageView = () => {
  return (
    <ImagesContainer>
      <Image src={loginLogo.src} alt="EventOS" />

      <Grid container item lg={9} md={9} justifyContent={'center'}>
        <Grid item container lg={9} md={11} flexDirection={'column'} height={'fit-content'}>
          <Title variant="h5">Next Generation EventOS</Title>
          <Description variant="h6">
            Digital experiences, expertly crafted for any event that unify commerce, analytics and
            visitor experience.
          </Description>
        </Grid>
      </Grid>
      <Grid container justifyContent={'end'}>
        <Graphics src={graphics.src} alt="Next Generation EventOS" />
      </Grid>
    </ImagesContainer>
  );
};

export default DesktopImageView;
