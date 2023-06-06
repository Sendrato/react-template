import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

export enum TipType {
  ERROR,
  INFO,
}

interface IProps {
  onClick: () => void;
  message: string;
  actionMessage: string;
  type?: TipType;
}

const Tip = ({ onClick, message, actionMessage }: IProps) => {
  return (
    <Message container>
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
        <ReportProblemOutlinedIcon
          color="error"
          sx={{ margin: { xs: '0 auto', md: '0' } }}
        />
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

const Message = styled(Grid)`
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding: 0.375rem 1rem;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #ed6c02;
  border-radius: 4px;

  @media (max-width: 900px) {
    justify-content: center;
    row-gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
`;

export default Tip;
