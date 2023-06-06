import { Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export type ThemeProps = {
  theme: Theme & { palette: any };
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#376fd0',
      dark: '#233044',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: 'none',
    },
  },
}) as Theme & { palette: any };

export default theme;
