import { Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import loginImage from '../assets/LoginImg.png';
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

const DesktopImageView = () => {
  return (
    <ImagesContainer>
      <Image src={loginLogo.src} alt="EventOS" />

      <Grid container item lg={9} md={9} justifyContent={'center'}>
        <Grid
          item
          container
          lg={9}
          md={11}
          flexDirection={'column'}
          height={'fit-content'}
        >
          <Typography variant="h5" color="white" fontWeight={600} mb={'1rem'}>
            Next Generation EventOS
          </Typography>
          <Typography variant="h6" color="white" fontWeight={400}>
            Digital experiences, expertly crafted for any event that unify
            commerce, analytics and visitor experience.
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={'end'}>
        <Graphics src={loginImage.src} alt="Next Generation EventOS" />
      </Grid>
    </ImagesContainer>
  );
};

export default DesktopImageView;
