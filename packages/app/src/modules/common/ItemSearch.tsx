import { Button, Grid } from '@mui/material';
import { MuiChipsInput, MuiChipsInputChip } from 'mui-chips-input';
import { useState } from 'react';
import styled from 'styled-components';

import { StyledPaper, SubTitle } from './styled-mui';

interface IProps {
  title: string;
  placeholder?: string;
  handleInput: (val: string) => void;
}

const ItemSearch = ({ title, handleInput, placeholder }: IProps) => {
  const [value, setValue] = useState<MuiChipsInputChip[]>([]);

  const handleChange = (newValue: MuiChipsInputChip[]) => {
    const arr = [];
    for (const val of newValue) {
      arr.push(...val.split(',').map((str) => str.trim()));
    }
    setValue(arr);

    handleInput(arr.join(' '));
  };

  return (
    <StyledPaper $padding="1rem" sx={{ mb: '1rem' }}>
      <SubTitle variant="h5">{title}</SubTitle>
      <Grid container columnSpacing={1} alignItems={'center'}>
        <Grid item xs={12} md={10.5} lg={11}>
          <SearchBar
            value={value}
            onChange={handleChange}
            size="small"
            hideClearAll
            color="primary"
            placeholder={placeholder}
          />
        </Grid>
        <Grid item xs={12} md={1} lg={1}>
          <Button
            sx={{ height: '100%', width: { xs: '100%', md: 'auto' } }}
            variant="contained"
            color="secondary"
            onClick={() => handleChange(value)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

const SearchBar = styled(MuiChipsInput)`
  width: 100%;
  .MuiChipsInput-Chip {
    background-color: #3460dc;
    color: white;

    svg {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;
export default ItemSearch;
