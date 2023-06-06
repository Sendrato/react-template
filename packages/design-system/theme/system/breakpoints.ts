import { createTheme } from 'styled-breakpoints';

export const breakpoints = createTheme({
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
  xxl: '2560px',
});

export const breakpointsAsNumeric: Record<string, number> = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560,
};
