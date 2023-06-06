import { withTheme } from '@emotion/react';
import dynamic from 'next/dynamic';

import { ThemeProps } from '../../../theme/muiTheme';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any;

const PieChart = ({
  theme,
  labels,
  data,
}: { labels?: string[]; data: number[] } & ThemeProps) => {
  const options = {
    labels,
    colors: [
      theme.palette.primary.light,
      theme.palette.success.light,
      theme.palette.warning.light,
      theme.palette.error.light,
      theme.palette.info.light,
    ],
  };

  return <Chart options={options} height="150" series={data} type="pie" />;
};

export default withTheme(PieChart);
