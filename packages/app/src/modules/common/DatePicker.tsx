import { Grid, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { getCurrentDate } from 'utils';

interface IDate {
  value: string;
  label: string;
  name?: string;
  error?: boolean;
}

interface IProps {
  minDate: IDate;
  handleChangeMinDate: Dispatch<SetStateAction<string>>;
  maxDate: IDate;
  handleChangeMaxDate: Dispatch<SetStateAction<string>>;
}

const DateFilter = ({
  handleChangeMinDate,
  handleChangeMaxDate,
  minDate,
  maxDate,
}: IProps) => {
  const CURRENT_DATE = getCurrentDate();

  return (
    <Grid container columnGap={2} flexWrap="nowrap">
      <TextField
        name={minDate.name}
        size="small"
        label={minDate.label}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ width: '48%' }}
        value={minDate.value || CURRENT_DATE}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChangeMinDate(e.target.value)
        }
        error={minDate.error}
      />
      <TextField
        name={maxDate.name}
        size="small"
        label={maxDate.label}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ width: '48%' }}
        value={maxDate.value || CURRENT_DATE}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChangeMaxDate(e.target.value)
        }
        error={minDate.error}
      />
    </Grid>
  );
};

export default DateFilter;
