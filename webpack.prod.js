const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); 
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const terser = new TerserPlugin({
  parallel: true,
  sourceMap: true,
  cache: true,
  extractComments: true,
  terserOptions: {
    toplevel: true,
    warnings: false,
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
    nameCache: null,
    ie8: false,
    keep_fnames: false,
  },
});


const config = merge(common, {
  mode: 'production',
  externals: {
    "mapbox-gl": "mapboxgl"
  },
  optimization: {
    minimizer: [terser],
    runtimeChunk: 'single',
    minimize: true,
    usedExports: true,
    providedExports: true,
    concatenateModules: true,
    flagIncludedChunks: true,
    mergeDuplicateChunks: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      name: true,
      cacheGroups: {
        common: {
          chunks: 'async'
        },
        'react': {
          name: 'react',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]react[\\/]/
        },
        'react-audio-player': {
          name: 'react-audio-player',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]react\-audio-player[\\/]/
        },
        'react-responsive': {
          name: 'react-responsive',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]react\-responsive[\\/]/
        },
        'react-router': {
          name: 'react-router',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]react\-router[\\/]/
        },
        'react-lottie': {
          name: 'react-lottie',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]react\-lottie[\\/]/
        },
        'mobx-react-router': {
          name: 'mobx-react-router',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]mobx-react-router[\\/]/
        },
        'mobx-react': {
          name: 'mobx-react',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]mobx-react[\\/]/
        },
        'mobx': {
          name: 'mobx',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]mobx[\\/]/
        },
        '@sentry/browser': {
          name: '@sentry/browser',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry\/browser[\\/]/
        },
        '@mapbox': {
          name: '@mapbox',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@mapbox[\\/]/
        },
        '@sentry': {
          name: '@sentry',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]@sentry[\\/]/
        },
        '@sentry/hub': {
          name: '@sentry/hub',
          chunks: 'async',
          minChunks: 2,
          test: /[\\/]node_modules[\\/]@sentry\/hub[\\/]/
        },
        '@sentry/minimal': {
          name: '@sentry/minimal',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]@sentry\/minimal[\\/]/
        },
        '@sentry/types': {
          name: '@sentry/types',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]@sentry\/types[\\/]/
        },
        '@sentry/utils': {
          name: '@sentry/utils',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]@sentry\/utils[\\/]/
        },
        'react-mapbox-gl': {
          name: 'react-mapbox-gl',
          chunks: 'async',
          enforce: true,
          test: /[\\/]node_modules[\\/]react-mapbox-gl[\\/]/
        },
        'date-fns': {
          name: 'date-fns',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]date-fns[\\/]/
        },
        '@sentry/core': {
          name: '@sentry/core',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry\/core[\\/]/
        },
        'formik': {
          name: 'formik',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]formik[\\/]/
        },
        'lottie-web': {
          name: 'lottie-web',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]lottie-web[\\/]/
        },
        'react-dom': {
          name: 'react-dom',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]react-dom[\\/]/
        },
        'dompurify': {
          name: 'dompurify',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]dompurify[\\/]/
        },
        'react-backdrop-filter': {
          name: 'react-backdrop-filter',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]react-backdrop-filter[\\/]/
        },
        'styled-components': {
          name: 'styled-components',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]styled-components[\\/]/
        },
        'react-html-parser': {
          name: 'react-html-parser',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]react-html-parser[\\/]/
        },
        node_modules: {
          name: 'node_modules',
          chunks: 'async',
          enforce: true,
          test: /[\\/]node_modules[\\/](?!(@mapbox|mapbox-gl|dompurify|react-responsive|react-mapbox-gl|react-audio-player|react-html-parser|formik|date-fns|react|react-lottie|lottie-web|mobx-react-router|react-mobx|mobx|sanitize-html|react-backdrop-filter|@sentry|@sentry\/core|@sentry\/hub|@sentry\/minimal|@sentry\/browser)[\\/])/
        }
      }
    }
  },
  plugins: [
    terser,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'babel-plugin-styled-components': {
        pure: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    /*
    new BundleAnalyzerPlugin({
      analyzerPort: 8886,
    }),
    */
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$/,
      minRatio: 1
    })
  ]
});

module.exports = config;
