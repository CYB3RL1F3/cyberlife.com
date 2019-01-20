const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        cache: true,
        extractComments: true
      })
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
      cache: true,
      extractComments: true
    }),
    new webpack.DefinePlugin({
      'babel-plugin-styled-components': {
        pure: true
      }
    }),
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
