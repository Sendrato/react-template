import { Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { GreyButton } from '../styled-mui';
import { StyledPaper } from '../styled-mui/Paper';
import SearchBar from './SearchBar';

interface IProps {
  title: string;
  placeholder: string;
  onChange: (e: string) => void;
  value: string;
}

const SearchContainer = styled(StyledPaper)`
  padding: 1.5rem 2rem 2rem 2rem;
  margin-bottom: 20px;
`;

const SearchPanel = ({ title, placeholder, value, onChange }: IProps) => {
  return (
    <SearchContainer>
      <Typography variant="body1" fontWeight={600} mb={'1rem'}>
        {title}
      </Typography>
      <Grid container alignItems={'center'} spacing={1}>
        <Grid item xs={12} md={11}>
          <SearchBar value={value} placeholder={placeholder} onChangeText={onChange} />
        </Grid>
        <Grid item xs={12} md={1}>
          <GreyButton color="inherit" variant="contained" fullWidth>
            Search
          </GreyButton>
        </Grid>
      </Grid>
    </SearchContainer>
  );
};

export default SearchPanel;
