import { InfoOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { StyledPaper } from '../styled-mui';

export const NoDataMessage = ({ message }: { message: string }) => (
  <Message>
    <InfoOutlined color="disabled" />
    <Typography variant="body1" fontWeight={400}>
      {message}
    </Typography>
  </Message>
);

const NoData = ({ message }: { message: string }) => {
  return (
    <StyledPaper $padding="1rem">
      <NoDataMessage message={message} />
    </StyledPaper>
  );
};

const Message = styled(Grid)`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

export default NoData;
