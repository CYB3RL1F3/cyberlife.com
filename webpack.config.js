const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.resolve(__dirname, 'src');
const outPath = path.resolve(__dirname, 'dist');
const mode = isProduction ? 'production' : 'development';
// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const dotenv = require('dotenv');
const manifest = require('./manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const domain = process.env.domain || 'localhost:3000';

const cyberlife = {
  description: "Inspired by a wide range of electronic genres, between dub techno, IDM, drum and bass, dubstep, tribalistic world music, ambient, trip hop, psychedelic rock & goa trance, Cyberlife, who got rooted years ago in the techno culture, brings the ambition to shape a very personal style, surfing on forward thinking, psychedelic, hypnotic and melancholic vibes. By applying layers of effects on stretched field recordings or destructured analog synths jams on a large scale of tempos, the exploration of the meanders of the matrix of electronic music defines his director line, with an aim to find transcendance and reveal a futuristic and organic universe. As both DJ and producer, he gets a natural attraction for modern and organic sounds, mixing with old school influences. Don't look for the nerd behind this name, keep the mystery and unpredictability, and share a musical mindtrip.",
  title: "Cyberlife",
  url: `https://cyberlife-music.com`,
  image: "https://res.cloudinary.com/hw2jydiif/image/upload/v1592758419/android-icon-512x512_rd0xq8.png"
}

let env = dotenv.config().parsed;
if (!env) env = process.env;
const configFromEnv = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
configFromEnv['process.env.MODE'] = JSON.stringify(mode);

const meta = (type, content) => {
  const d = (type.indexOf('og:') > -1 || type.indexOf('fb:') > -1) ? "property" : "name";
  return ({
    [`${d}`]: type,
    content,
    "data-react-helmet": true
  });
}

const index = {
  template: 'assets/index.html',
  inject: "body",
  scriptLoading: "defer",
  hash: true,
  cache: false,
  title: 'Cyberlife',
  links: {
    api: env.API_URL,
    infos: `${env.API_URL}/infos`,
    playlist: `${env.API_URL}/playlist?name=dj-sets`,
    url: cyberlife.url
  },
  meta: {
    'robots': 'all',
    'theme-color': '#36595C',
    'Content-Type': 'text/html; charset=utf-8',
    
    'description': meta('description', cyberlife.description),
    'og:description': meta('og:description', cyberlife.description),
    'twitter:description': meta('twitter:description', cyberlife.description),

    'title': meta('title', cyberlife.title),
    'locale': meta('locale', 'en_US'),
    'og:title': meta('og:title', cyberlife.title),
    'twitter:title': meta('twitter:title', cyberlife.title),

    'og:url': meta('og:url', cyberlife.url),
    'twitter:image': meta('twitter:image', cyberlife.image),
    'og:image': meta('og:image', cyberlife.image),
    'og:image:secure_url': meta('og:image:secure_url', cyberlife.image),
    'og:locale': meta('og:locale', 'en_US'),
    'twitter:card': meta('twitter:card', 'summary'),
    'twitter:url': meta('twitter:url', cyberlife.url),
    'twitter:site': meta('twitter:site', '@cyberlife-music'),
    'fb:app_id': meta('fb:app_id', env.FB_APP_ID),
    'fb:page_id': meta('fb:page_id', env.FB_PAGE_ID),
    'og:type': meta('og:type', 'website')
  },
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  }
};
console.log(configFromEnv);

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
    priority: 1,
    changeFreq: 'daily'
  },
  {
    path: '/events',
    lastMod: true,
    priority: 1,
    changeFreq: 'daily'
  },
  {
    path: '/charts',
    lastMod: true,
    priority: 0.5,
    changeFreq: 'monthly'
  },
  {
    path: '/releases',
    lastMod: true,
    priority: 0.8,
    changeFreq: 'daily'
  },
  {
    path: '/contact',
    lastMod: true,
    priority: 0.8,
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
    filename: '[name].[fullhash].js',
    sourceMapFilename: '[name].[fullhash].map',
    chunkFilename: '[name].[fullhash].js',
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
    },
    fallback: {
      fs: false,
      net: false
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction
          ? ['ts-loader']
          : [
              {
                loader: 'babel-loader',
                options: {
                  plugins: ['react-hot-loader/babel']
                }
              },
              'ts-loader'
            ]
      },
      // css
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              fallback: 'style-loader',
              esModule: false,
              modules: {
                localIdentName: '[local]__[fullhash:base64:5]'
              },
              sourceMap: !isProduction,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
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
          }
        ],
        sideEffects: true,
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.svg$/, use: 'file-loader' },
      {
        test: /\.(webm|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'videos/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            limit: 1
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
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
  },
  plugins: [
    // new FixStyleOnlyEntriesPlugin(),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      chunkFilename: '[name].[fullhash].css'
    }),
    new HtmlWebpackPlugin(index),
    new RobotstxtPlugin(robotsOptions),
    new SitemapWebpackPlugin({
      base: 'https://' + domain, 
      paths, 
      options: {
        fileName: 'sitemap.xml',
        lastMod: true,
        changeFreq: 'monthly',
        priority: 0.5
      }
    }),
    new webpack.DefinePlugin(
      configFromEnv
    ),
    /*
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 20 * 1024 * 1024
    }),
    */
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/pwa/manifest.json', to: 'pwa/manifest.json' },
        { from: 'assets/pwa/**/*', to: '[name].[ext]' },
        { from: 'assets/main.css', to: 'main.css' },
        { from: 'assets/fonts/**.*', to: 'fonts/[name].[ext]' },
        
      ],
    }),
    new WebpackPwaManifest(manifest),
    new WorkboxPlugin.InjectManifest({
      swSrc: manifest.serviceworker, // './assets/pwa/service_worker.js',
      swDest: 'service-worker.js'
    }),
    new FaviconsWebpackPlugin(
      path.resolve(__dirname, 'src/assets/pwa/favicon-96x96.png')
    )
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
  devtool: 'eval-source-map',
};
