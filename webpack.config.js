const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');
const mode = isProduction ? 'production' : 'development';
// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;

const domain = process.env.domain || 'localhost:3000';

const robotsOptions = {
  policy: [
    {
      userAgent: '*',
      allow: '/',
      crawlDelay: 3
    }
  ],
  host: 'https://' + domain,
  sitemap: 'https://' + domain + '/sitemap.xml'
};

const paths = [
  {
    path: '/',
    lastMod: true,
    priority: '1',
    changeFreq: 'daily'
  },
  {
    path: '/events',
    lastMod: true,
    priority: '1',
    changeFreq: 'daily'
  },
  {
    path: '/charts',
    lastMod: true,
    priority: '0.5',
    changeFreq: 'monthly'
  },
  {
    path: '/releases',
    lastMod: true,
    priority: '0.8',
    changeFreq: 'daily'
  },
  {
    path: '/contact',
    lastMod: true,
    priority: '0.8',
    changeFreq: 'monthly'
  }
];

module.exports = {
  context: sourcePath,
  mode,
  entry: {
    main: './main.tsx'
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
      types: path.resolve(__dirname, 'types/'),
      assets: path.resolve(__dirname, 'src/assets/')
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'ts-loader'
          : ['babel-loader?plugins=react-hot-loader/babel', 'ts-loader']
      },
      // css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')({ addDependencyTo: webpack }),
                  require('postcss-url')(),
                  require('postcss-cssnext')(),
                  require('postcss-reporter')(),
                  require('postcss-browser-reporter')({
                    disabled: isProduction
                  })
                ]
              }
            }
          ]
        })
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.svg$/, use: 'file-loader' },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]'
      },
      {
        test: /\.webm$/,
        use: 'file-loader?name=videos/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    new RobotstxtPlugin(robotsOptions),
    new SitemapWebpackPlugin('http:' + domain, paths, {
      fileName: 'sitemap.xml',
      lastMod: true,
      changeFreq: 'monthly',
      priority: '0.5'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  },
  devtool: 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};
