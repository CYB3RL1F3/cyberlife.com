const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const uglify = new UglifyJsPlugin({
  parallel: true,
  sourceMap: true,
  cache: true,
  extractComments: true
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
        'mapbox-gl': {
          name: 'mapbox-gl',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]mapbox-gl[\\/]/
        },
        node_modules: {
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return packageName && `npm.${packageName.replace('@', '')}`;
          },
          chunks: 'all',
          enforce: true,
          test: /[\\/]node_modules[\\/](?!(mapbox-gl)[\\/])/
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
console.log(config);

module.exports = config;
