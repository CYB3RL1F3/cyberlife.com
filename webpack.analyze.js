const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.prod.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8886,
    }),
  ]
});

module.exports = config;