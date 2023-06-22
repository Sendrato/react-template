import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { AlertContainer, AlertType } from '../styled-mui';

interface IProps {
  onClick: () => void;
  message: string;
  actionMessage: string;
  type?: AlertType;
}

const Tip = ({ onClick, message, actionMessage, type = 'info' }: IProps) => {
  return (
    <Message $type={type} container>
      <Grid
        item
        container
        xs={12}
        md={10}
        sx={{
          alignItems: 'center',
          columnGap: '0.75rem',
          rowGap: '0.5rem',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <ReportProblemOutlinedIcon color={type} sx={{ margin: { xs: '0 auto', md: '0' } }} />
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{ textAlign: { xs: 'center', md: 'initial' } }}
        >
          {message}
        </Typography>
      </Grid>
      <Button color="inherit" onClick={onClick}>
        {actionMessage}
      </Button>
    </Message>
  );
};

const Message = styled(AlertContainer)`
  justify-content: space-between;
  margin-top: 0.75rem;
  padding: 0.375rem 1rem;
  position: relative;

  @media (max-width: 900px) {
    justify-content: center;
    row-gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
`;

export default Tip;
