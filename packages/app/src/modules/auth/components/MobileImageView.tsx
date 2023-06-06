import { Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import loginLogo from '../assets/loginLogo.png';

const ImagesContainer = styled(Box)`
  background-color: #171c33;
  padding: 1rem 0;
  display: none;
  justify-content: center;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const Image = styled.img`
  width: 179px;
  height: 49px;
`;

const MobileImageView = () => {
  return (
    <ImagesContainer>
      <Image src={loginLogo.src} alt="EventOS" />
    </ImagesContainer>
  );
};

export default MobileImageView;
