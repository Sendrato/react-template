/* eslint-disable react/display-name */
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ThemeProvider } from 'styled-components';

import muiTheme from '@sendrato/design-system/theme/muiTheme';
import { GlobalStyle, theme } from '@sendrato/design-system/theme/styledTheme';

export const createReduxProvider =
  (reduxStore: ToolkitStore = store) =>
  (story: any) =>
    <Provider store={reduxStore}>{story()}</Provider>;

export const createThemeProvider = () => {
  return (story: any) => (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {story()}
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};
