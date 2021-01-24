const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); 

const terser = new TerserPlugin({
  parallel: false,
  extractComments: "all",
  terserOptions: {
    toplevel: true,
    keep_classnames: false,
    keep_fnames: false,
    parse: {},
    compress: {
      dead_code: true,
      directives: true,
      drop_console: true,
      inline: true,
      ecma: 5,
      if_return: true,
      join_vars: true,
      reduce_vars: true,
      evaluate: true
    },
    mangle: {
      toplevel: true,
      module: true
    },
    output: {
      beautify: false,
      // code: false,
      ast: true,
    },
    ie8: false
  },
});


const config = merge(common, {
  mode: 'production',
  externals: {
    "mapbox-gl": "mapboxgl"
  },
  cache: false,
  performance: {
    maxAssetSize: 100000000,
    hints: false
  },
  optimization: {
    minimizer: [terser],
    runtimeChunk: 'single',
    minimize: true,
    usedExports: true,
    providedExports: true,
    concatenateModules: true,
    moduleIds: 'deterministic',
    flagIncludedChunks: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    chunkIds: 'deterministic', 
    moduleIds: 'deterministic',
    emitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        common: {
          chunks: 'async',
          reuseExistingChunk: true
        },
        'app/containers/App': {
          name: 'app/containers/App',
          filename: '[name].[fullhash].bundle.js',
          chunks: 'async',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]App[\\/]/
        },
        'app/containers/Bio': {
          name: 'app/containers/Bio',
          filename: '[name].[fullhash].bundle.js',
          chunks: 'async',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]Bio[\\/]/
        },
        'app/containers/Charts': {
          name: 'app/containers/Charts',
          filename: '[name].[fullhash].bundle.js',
          chunks: 'async',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]Charts[\\/]/
        },
        'app/containers/Contact': {
          name: 'app/containers/Contact',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]Contact[\\/]/
        },
        'app/containers/Err404': {
          name: 'app/containers/Err404',
          filename: '[name].[fullhash].bundle.js',
          chunks: 'async',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]Err404[\\/]/
        },
        'app/containers/EventDetails': {
          name: 'app/containers/EventDetails',
          filename: '[name].[fullhash].bundle.js',
          chunks: 'async',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]EventDetails[\\/]/
        },
        'app/containers/Events': {
          name: 'app/containers/Events',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]Events[\\/]/
        },
        'app/containers/FallbackEvents': {
          name: 'app/containers/FallbackEvents',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]FallbackEvents[\\/]/
        },
        'app/containers/PodcastDetails': {
          name: 'app/containers/PodcastDetails',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]PodcastDetails[\\/]/
        },
        'app/containers/Podcasts': {
          name: 'app/containers/Podcasts',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]Podcasts[\\/]/
        },
        'app/containers/ReleaseDetails': {
          name: 'app/containers/ReleaseDetails',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]ReleaseDetails[\\/]/
        },
        'app/containers/Releases': {
          name: 'app/containers/Releases',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]Releases[\\/]/
        },
        'app/containers/About': {
          name: 'app/containers/About',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]src[\\/]app[\\/]containers[\\/]About[\\/]/
        },

        'react': {
          name: 'react',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react[\\/]/
        },
        'react-audio-player': {
          name: 'react-audio-player',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-audio-player[\\/]/
        },
        'react-responsive': {
          name: 'react-responsive',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-responsive[\\/]/
        },
        'react-router': {
          name: 'react-router',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-router[\\/]/
        },
        'react-lottie': {
          name: 'react-lottie',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-lottie[\\/]/
        },
        'mobx-react-router': {
          name: 'mobx-react-router',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]mobx-react-router[\\/]/
        },
        'mobx-react': {
          name: 'mobx-react',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]mobx-react[\\/]/
        },
        'react-helmet': {
          name: 'react-helmet',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-helmet[\\/]/
        },
        'react-popupbox': {
          name: 'react-popupbox',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-popupbox[\\/]/
        },
        'mobx': {
          name: 'mobx',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/](mobx)[\\/]/
        },
        'htmlparser2': {
          name: 'htmlparser2',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/](htmlparser2)[\\/]/
        },
        '@sentry/browser': {
          name: '@sentry/browser',
          chunks: 'all',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]@sentry\/browser[\\/]/
        },
        '@mapbox': {
          name: '@mapbox',
          chunks: 'all',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]@mapbox[\\/]/
        },
        '@sentry': {
          name: '@sentry',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]@sentry[\\/]/
        },
        '@sentry/hub': {
          name: '@sentry/hub',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          minChunks: 2,
          enforce: true,
          test: /[\\/]node_modules[\\/]@sentry\/hub[\\/]/
        },
        '@sentry/minimal': {
          name: '@sentry/minimal',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]@sentry\/minimal[\\/]/
        },
        '@sentry/types': {
          name: '@sentry/types',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]@sentry\/types[\\/]/
        },
        '@sentry/utils': {
          name: '@sentry/utils',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]@sentry\/utils[\\/]/
        },
        'react-mapbox-gl': {
          name: 'react-mapbox-gl',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-mapbox-gl[\\/]/
        },
        'date-fns': {
          name: 'date-fns',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]date-fns[\\/]/
        },
        '@sentry/core': {
          name: '@sentry/core',
          chunks: 'all',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]@sentry\/core[\\/]/
        },
        'formik': {
          name: 'formik',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]formik[\\/]/
        },
        'lottie-web': {
          name: 'lottie-web',
          chunks: 'initial',
          enforce: true,
          filename: '[name].bundle.js',
          test:  /[\\/]node_modules[\\/]lottie-web[\\/]/
        },
        'react-dom': {
          name: 'react-dom',
          chunks: 'all',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-dom[\\/]/
        },
        'dompurify': {
          name: 'dompurify',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]dompurify[\\/]/
        },
        'react-backdrop-filter': {
          name: 'react-backdrop-filter',
          chunks: 'async',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-backdrop-filter[\\/]/
        },
        'styled-components': {
          name: 'styled-components',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]styled-components[\\/]/
        },
        'axios': {
          name: 'axios',
          chunks: 'initial',
          enforce: true,
          filename: '[name].bundle.js',
          test: /[\\/]node_modules[\\/]axios[\\/]/
        },
        'react-html-parser': {
          name: 'react-html-parser',
          chunks: 'initial',
          enforce: true,
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/]react-html-parser[\\/]/
        },
        node_modules: {
          name: 'node_modules',
          chunks: 'async',
          filename: '[name].[fullhash].bundle.js',
          test: /[\\/]node_modules[\\/](?!(@mapbox|mapbox-gl|styled-components|axios|htmlparser2|react-popupbox|dompurify|react-responsive|react-mapbox-gl|react-audio-player|react-html-parser|formik|date-fns|react|react-lottie|lottie-web\/build\/player|mobx-react|mobx-react-router|react-router|react-mobx|mobx|sanitize-html|react-backdrop-filter|@sentry|@sentry\/core|@sentry\/hub|@sentry\/minimal|@sentry\/browser)[\\/])/
        }
      }
    }
  },
  plugins: [
    terser,
    new webpack.DefinePlugin({
      'babel-plugin-styled-components': {
        pure: true
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LodashModuleReplacementPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: '[name].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$/,
      minRatio: 1
    })
  ]
});

module.exports = config;
