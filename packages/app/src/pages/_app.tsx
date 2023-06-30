import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import ContextProvider from 'contexts';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import AuthGuard from 'routes/AuthGuard';
import RoleGuard from 'routes/RoleGuard';
import { store } from 'store';
import { ThemeProvider } from 'styled-components';

import muiTheme from '@sendrato/design-system/theme/muiTheme';
import { GlobalStyle, theme } from '@sendrato/design-system/theme/styledTheme';
type AppProps = {
  Component: any;
  pageProps: any;
  store: any;
};

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  return (
    <>
      <NextSeo title="Sendrato" description="" />
      <Head>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <ContextProvider>
                  <AuthGuard>
                    <RoleGuard>{getLayout(<Component {...pageProps} />)}</RoleGuard>
                  </AuthGuard>
                </ContextProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </Provider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
