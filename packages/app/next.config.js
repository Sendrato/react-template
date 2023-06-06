/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_PRODUCTION_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const withTM = require('next-transpile-modules')(['@sendrato/design-system']);

  const plugins = [withTM];

  const config = {
    webpack: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });

      webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
        if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') {
          return false;
        }

        return true;
      });

      webpackConfig.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };

      return webpackConfig;
    },
    images: {
      formats: ['image/avif', 'image/webp'],
    },
    compiler: {
      styledComponents: true,
    },
  };

  return plugins.reduce((acc, plugin) => plugin(acc), { ...config });
};
