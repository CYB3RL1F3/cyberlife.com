const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); 
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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

const optimizeCss = new OptimizeCSSAssetsPlugin({})

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
    mangle: true,
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
        'react': {
          name: 'react',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]react[\\/]/
        },
        'react-lottie': {
          name: 'react-lottie',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]react\-lottie[\\/]/
        },
        'mobx-react-router': {
          name: 'mobx-react-router',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]mobx-react-router[\\/]/
        },
        'mobx-react': {
          name: 'mobx-react',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]mobx-react[\\/]/
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
        '@mapbox': {
          name: '@mapbox',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@mapbox[\\/]/
        },
        '@sentry': {
          name: '@sentry',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry[\\/]/
        },
        '@sentry/hub': {
          name: '@sentry/hub',
          chunks: 'all',
          minChunks: 2,
          test: /[\\/]node_modules[\\/]@sentry\/hub[\\/]/
        },
        '@sentry/minimal': {
          name: '@sentry/minimal',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry\/minimal[\\/]/
        },
        '@sentry/types': {
          name: '@sentry/types',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry\/types[\\/]/
        },
        '@sentry/utils': {
          name: '@sentry/utils',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry\/utils[\\/]/
        },
        'react-mapbox-gl': {
          name: 'react-mapbox-gl',
          chunks: 'all',
          enforce: true,
          test: /[\\/]node_modules[\\/]react-mapbox-gl[\\/]/
        },
        'date-fns': {
          name: 'date-fns',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]date-fns[\\/]/
        },
        '@sentry/core': {
          name: '@sentry/core',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@sentry\/core[\\/]/
        },
        'formik': {
          name: 'formik',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]formik[\\/]/
        },
        'lottie-web': {
          name: 'lottie-web',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]lottie-web[\\/]/
        },
        'sanitize-html': {
          name: 'sanitize-html',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]sanitize-html[\\/]/
        },
        'react-dom': {
          name: 'react-dom',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]react-dom[\\/]/
        },
        'react-backdrop-filter': {
          name: 'react-backdrop-filter',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]react-backdrop-filter[\\/]/
        },
        node_modules: {
          /*
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return packageName && `npm.${packageName.replace('@', '')}`;
          },*/
          name: 'node_modules',
          chunks: 'all',
          enforce: true,
          test: /[\\/]node_modules[\\/](?!(@mapbox|react-mapbox-gl|formik|date-fns|react|react-lottie|lottie-web|mobx-react-router|react-mobx|mobx|sanitize-html|react-backdrop-filter|@sentry|@sentry\/core|@sentry\/hub|@sentry\/minimal|@sentry\/browser)[\\/])/
        }
      }
    }
  },
  plugins: [
    terser,
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
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
      threshold: 100,
      minRatio: 0.9
    })
  ]
});

module.exports = config;
