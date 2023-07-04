import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Card = styled(MuiCard)<{ illustration?: string }>`
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
`;

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => (props as any).theme.spacing(4)};
  }
`;

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => (props as any).theme.palette.secondary.main};
  color: ${(props) => (props as any).theme.palette.common.white};
  margin-bottom: ${(props) => (props as any).theme.spacing(4)};

  span {
    padding-left: ${(props) => (props as any).theme.spacing(2)};
    padding-right: ${(props) => (props as any).theme.spacing(2)};
  }
`;

const Percentage = styled(Typography)<{
  percentagecolor: string;
  illustration?: string;
}>`
  span {
    color: ${({ percentagecolor }) => percentagecolor};
    font-weight: ${(props) => (props as any).theme.typography.fontWeightBold};
    padding: 2px;
    border-radius: 3px;
    margin-right: ${(props) => (props as any).theme.spacing(2)};
  }
`;

interface StatsProps {
  title: string;
  amount: string | number;
  chip?: string;
  percentageText?: string;
  percentageColor?: string;
  illustration?: string;
}

const Stats = ({
  title,
  amount,
  chip,
  percentageColor,
  percentageText,
  illustration,
}: StatsProps) => {
  return (
    <Card illustration={illustration}>
      <CardContent>
        <Typography variant="h6" mb={1}>
          {title}
        </Typography>
        <Typography component={'span'} variant="h6" mb={1}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        {!!percentageColor && !!percentageText && (
          <Percentage
            variant="subtitle2"
            color="textSecondary"
            percentagecolor={percentageColor}
            illustration={illustration}
          >
            <span>{percentageText}</span> Since last week
          </Percentage>
        )}
        {!illustration && !!chip && <Chip label={chip} />}
      </CardContent>
    </Card>
  );
};

export default Stats;
