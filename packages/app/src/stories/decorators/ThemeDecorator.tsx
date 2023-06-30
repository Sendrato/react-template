/* eslint-disable react/display-name */
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

import muiTheme from '@sendrato/design-system/theme/muiTheme';
import { GlobalStyle, theme } from '@sendrato/design-system/theme/styledTheme';

export const ThemeDecorator = (story: any) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {story()}
      </ThemeProvider>
    </MuiThemeProvider>
  </StyledEngineProvider>
);
