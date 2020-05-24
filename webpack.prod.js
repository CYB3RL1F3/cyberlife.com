const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const uglify = new UglifyJsPlugin({
  parallel: true,
  sourceMap: true,
  cache: true,
  extractComments: true,
  uglifyOptions: {
    toplevel: true,
    warnings: false,
    parse: {},
    compress: {},
    mangle: true, // Note `mangle.properties` is `false` by default.
    output: {
      beautify: false,
      preamble: "/* UGL1F13D CYB3RL1F3 */"
    },
    nameCache: null,
    ie8: false,
    keep_fnames: false,
    
  },
});


const config = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [uglify],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      name: true,
      cacheGroups: {
        'react': {
          name: 'react',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]react[\\/]/
        },
        'mobx': {
          name: 'mobx',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]mobx[\\/]/
        },
        '@sentry/browser': {
          name: '@sentry/browser',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry\/browser[\\/]/
        },
        'mapbox-gl': {
          name: 'mapbox-gl',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]mapbox-gl[\\/]/
        },
        'date-fns': {
          name: 'date-fns',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]date-fns[\\/]/
        },
        node_modules: {
          /*
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return packageName && `npm.${packageName.replace('@', '')}`;
          },*/
          name: 'node_modules_[chunkhash]',
          chunks: 'all',
          enforce: true,
          test: /[\\/]node_modules[\\/](?!(mapbox-gl|date-fns|react|mobx|@sentry\/browser)[\\/])/
        }
      }
    }
  },
  plugins: [
    uglify,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'babel-plugin-styled-components': {
        pure: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.tsx$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});

module.exports = config;
