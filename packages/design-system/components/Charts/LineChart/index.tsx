import { withTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Card as MuiCard, CardContent, Theme, Typography } from '@mui/material';
import { spacing } from '@mui/system';
import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any;

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
`;

const LineChart = ({
  data,
  theme,
  categories,
}: {
  data: any;
  theme: Theme & { palette: any };
  categories: string[];
}) => {
  const options = {
    chart: {
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5],
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      categories,
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: any) {
              return val + ' (mins)';
            },
          },
        },
        {
          title: {
            formatter: function (val: any) {
              return val + ' per session';
            },
          },
        },
        {
          title: {
            formatter: function (val: any) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    colors: [
      theme.palette.primary.light,
      theme.palette.success.light,
      theme.palette.warning.light,
      theme.palette.error.light,
      theme.palette.info.light,
    ],
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Line Chart
        </Typography>
        <Typography variant="body2" gutterBottom>
          Line charts are a typical pictorial representation that depicts trends and behaviors over
          time.
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Chart options={options} series={data} type="line" height="350" />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(LineChart);
