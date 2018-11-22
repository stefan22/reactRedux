// npm outdated
// npm update
//options not needed for html loader
//NamedModulesPlugin on by default so not need to be included

// tapable.plugin is deprecated (until html-webpack-plugin)
// entrypoinnt undefined = index.html

const path = require('path');
const webpack = require('webpack');
//const HTMLWebpackPlugin =  require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
 entry: {
  main: [
   'react-hot-loader/patch',
   'babel-runtime/regenerator',
   'webpack-hot-middleware/client?reload=true',
   './src/main.js'
  ]
 },
 mode: 'development',
 output: {
  filename: '[name]-bundle.js',
  chunkFilename: '[name].js'
  path: path.resolve(__dirname, '../dist'),
  publicPath: '/'
 },
 devServer: {
  contentBase: 'dist',
  overlay: true,
 },
 devtool: 'source-map',
 module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel-loader',
        use: [
         {
          loader: 'babel-loader'
         }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: path.images,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: path.fonts,
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
           {
             loader: 'file-loader',
             options: {
              name: '[name].[ext]',
             },
           },
           {
             loader: 'extract-loader',
             options: {
              publicPath: '/',
             },
           },
           {
             loader: 'html-loader',
           },
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [
            path.join(__dirname, 'src', 'betslip', 'templates'),
          ],
          helperDirs: [
            path.join(__dirname, 'src', 'betslip', 'helpers'),
          ],
          knownHelpers: ['ifEq', 'ifNotEq', 'ifGt', 'ifLt', 'debug', 'ifNotEmpty', 'ifIncluded', 'ifOR', 'getElement', 'link', 'console', 'mapProps', 'IfCond', 'eachWayCheckBox', 'selectionEachWayIsSet', 'getAllSpShowingDecimal', 'ifAllIsStartingPrice', 'spHasDecimalValue', 'displayDecimalForSp', 'spToggleDropDown', 'spPotentialReturn', 'singleAvailableForOutcome', 'singlesAvailable', 'singlesAvailableCount', 'multipleAvailableForType', 'bet', 'subbet', 'transaction', 'rejectedTransaction', 'allSinglesRejected', 'errorClasses', 'fakeArray', 'offers', 'isOffers', 'anyOffer', 'canPlace', 'selectionIndices', 'messageTransactionOutcomes', 'restrictionsOutcomes', 'maxStakeNotAvailableSingle', 'ifShouldDisableMaxStake', 'restrictedTransaction', 'subBetErrors', 'betCount', 'selectionUsed', 'subBetsUsedForSystemSingles', 'notUsedForSingle', 'priceChangeClass', 'handicapChangeClass', 'totalPriceChangeClass', 'unitStakeChangeClass', 'isSpread', 'originalTransaction', 'isRestricted', 'allSubBets', 'nonRestrictedBetCount', 'namedDisabled', 'showBet', 'globalSingleMaxStake', 'changedOdds', 'translate', 'formatDate', 'formatExpiryTime', 'cropReference', 'tooltip', 'count', 'prettifyNumber', 'addDecimal', 'formatOfferCurrency', 'currency', 'acceptOffer', 'linkToAccount'],
          runtime: path.join(__dirname, 'src', 'betslip', 'handlebars'),
        },
      },
      // {
      //   test: /\.(css|scss)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         minimize: NODE_ENV !== 'development',
      //         sourceMap: SOURCE_MAP,
      //       },
      //     },
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: SOURCE_MAP,
              minimize: NODE_ENV !== 'development',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,  // Convert images < 8kb to base64 strings
            name: `fdjgs/${version}/i/[sha256:hash:base62:7].[ext]`,
          },
        },
        ],
      },

    ],
  },
  plugins: [
   new webpack.HotModuleReplacementPlugin(), //Enable HMR
   // new webpack.NamedModulesPlugin(),
   // new HTMLWebpackPlugin({
   //  template: './src/index.html'
   // })
  ]
  output: {
    filename: `fdjgs/${version}/j/[name]-[chunkhash:8].js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    jsonpFunction: 'fdjgsJsonp',
  },



};

--------------------------------


// npm outdated
// npm update
//options not needed for html loader
//NamedModulesPlugin on by default so not need to be included

// tapable.plugin is deprecated (until html-webpack-plugin)
// entrypoinnt undefined = index.html
// extract-text-webpack-plugin@next

const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin =  require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimze-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyfs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
 entry: {
  vendor: ['react','lodash'],
  main: [
   './src/main.js'
  ]
 },
 mode: 'production',
 output: {
  filename: 'prod-server-bundle.js',
  chunkFilename: '[name].js'
  path: path.resolve(__dirname, '../build'),
  libraryTarget: 'common.js2'
 },
 module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel-loader',
        use: [
         {
          loader: 'babel-loader'
         }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
             options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'path./[fonts]',
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "images/[name].[ext]",
              emitFile: false
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
           {
             loader: 'file-loader',
             options: {
              name: '[name].[ext]',
             },
           },
           {
             loader: 'extract-loader',
             options: {
              publicPath: '/',
             },
           },
           {
             loader: 'html-loader',
           },
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [
            path.join(__dirname, 'src', 'betslip', 'templates'),
          ],
          helperDirs: [
            path.join(__dirname, 'src', 'betslip', 'helpers'),
          ],
          knownHelpers: ['ifEq', 'ifNotEq', 'ifGt', 'ifLt', 'debug', 'ifNotEmpty', 'ifIncluded', 'ifOR', 'getElement', 'link', 'console', 'mapProps', 'IfCond', 'eachWayCheckBox', 'selectionEachWayIsSet', 'getAllSpShowingDecimal', 'ifAllIsStartingPrice', 'spHasDecimalValue', 'displayDecimalForSp', 'spToggleDropDown', 'spPotentialReturn', 'singleAvailableForOutcome', 'singlesAvailable', 'singlesAvailableCount', 'multipleAvailableForType', 'bet', 'subbet', 'transaction', 'rejectedTransaction', 'allSinglesRejected', 'errorClasses', 'fakeArray', 'offers', 'isOffers', 'anyOffer', 'canPlace', 'selectionIndices', 'messageTransactionOutcomes', 'restrictionsOutcomes', 'maxStakeNotAvailableSingle', 'ifShouldDisableMaxStake', 'restrictedTransaction', 'subBetErrors', 'betCount', 'selectionUsed', 'subBetsUsedForSystemSingles', 'notUsedForSingle', 'priceChangeClass', 'handicapChangeClass', 'totalPriceChangeClass', 'unitStakeChangeClass', 'isSpread', 'originalTransaction', 'isRestricted', 'allSubBets', 'nonRestrictedBetCount', 'namedDisabled', 'showBet', 'globalSingleMaxStake', 'changedOdds', 'translate', 'formatDate', 'formatExpiryTime', 'cropReference', 'tooltip', 'count', 'prettifyNumber', 'addDecimal', 'formatOfferCurrency', 'currency', 'acceptOffer', 'linkToAccount'],
          runtime: path.join(__dirname, 'src', 'betslip', 'handlebars'),
        },
      },
      // {
      //   test: /\.(css|scss)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         minimize: NODE_ENV !== 'development',
      //         sourceMap: SOURCE_MAP,
      //       },
      //     },
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: SOURCE_MAP,
              minimize: NODE_ENV !== 'development',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,  // Convert images < 8kb to base64 strings
            name: `fdjgs/${version}/i/[sha256:hash:base62:7].[ext]`,
          },
        },
        ],
      },

    ],
  },
  plugins: [
   new ExtractTextPlugin('[name].css'),
   new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {
     removeAll: true
    }},
   })
   // new webpack.optimize.CommonsChunkPlugin({
   //  name: 'vendor'
   // }),
   // new webpack.optimize.LimitChunkCountPlugin({
   //  maxChunks: 1
   // }),
   new webpack.DefinePlugin({
    'process.env': {
     NODE_ENV: JSON.stringify('production'),
     WEBPACK: true
    }
   }),

   new UglifyJSPlugin(),
   new CompressionPlugin({
     algorithm: 'gzip'
   }),
   new BrotliPlugin()

  ]
  output: {
    filename: `fdjgs/${version}/j/[name]-[chunkhash:8].js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    jsonpFunction: 'fdjgsJsonp',
  },



};











https://medium.com/@hpux/webpack-4-in-production-how-make-your-life-easier-4d03e2e5b081
https://www.reddit.com/r/javascript/comments/6jbg2f/one_does_not_simply_use_websockets_with_webpack/



http://www.christianalfoni.com/articles/2015_10_01_Taking-the-next-step-with-react-and-webpack
https://github.com/christianalfoni/webpack-express-boilerplate/blob/master/webpack.config.js





{
  "name": "fdj-gaming-widgets",
  "version": "1.4.11",
  "description": "FDJ",
  "private": true,
  "repository": {
    "type": "git",
    "url": ""
  },
  "main": "index.js",
  "scripts": {
    "start": "NODE_ENV=development ./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    "build": "./node_modules/.bin/webpack -p --config webpack.config.js",
    "test": "./node_modules/eslint/bin/eslint.js --ext .jsx --ext .js . && npm audit && NODE_ENV=development ./node_modules/karma/bin/karma start && ./node_modules/jest/bin/jest.js",
    "format": "./node_modules/eslint/bin/eslint.js --ext .jsx --ext .js --fix .",
    "watch": "./node_modules/.bin/webpack --watch --config webpack.config.js"
  },
  "dependencies": {
    "babel-core": "^6.26.3",
    "babel-plugin-array-includes": "^2.0.3",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-react": "^6.24.1",
    "babel-runtime": "^6.26.0",
    "capitalize": "^1.0.0",
    "classnames": "^2.2.5",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "eslint": "^3.19.0",
    "eslint-config": "^0.3.0",
    "eslint-config-airbnb": "^15.1.0",
    "eslint-plugin-import": "^2.9.0",
    "eslint-plugin-jsx-a11y": "^5.0.1",
    "eslint-plugin-react": "^7.7.0",
    "form-serialize": "^0.7.2",
    "handlebars": "^4.0.11",
    "handlebars-loader": "^1.6.0",
    "hawk": "^7.0.7",
    "humanize-string": "^1.0.2",
    "jasmine": "^2.99.0",
    "jasmine-core": "^2.99.1",
    "jasmine-promises": "^0.4.1",
    "jest": "^23.6.0",
    "jest-cli": "^23.6.0",
    "jquery": "^3.3.1",
    "karma": "^3.0.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^1.1.1",
    "karma-webpack": "^2.0.13",
    "moment": "^2.21.0",
    "moment-timezone": "^0.5.21",
    "numeral": "^2.0.6",
    "prop-types": "^15.6.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-responsive": "^1.3.4",
    "react-router": "^4.2.0",
    "react-router-dom": "^4.2.2",
    "react-test-renderer": "^16.2.0",
    "react-transition-group": "^1.2.1",
    "uuid": "^3.2.1",
    "webpack": "^4.25.1",
    "webpack-dev-middleware": "^3.4.0",
    "webpack-dev-server": "^3.1.10"
  },
  "jest": {
    "setupFiles": [
      "./utils/jest.shim.js",
      "./jest.config.jsx"
    ],
    "snapshotSerializers": [
      "jest-serializer-html-string"
    ]
  },
  "engines": {
    "node": ">=8.1.0"
  },
  "os": [
    "!win32"
  ],
  "devDependencies": {
    "ajv-errors": "^1.0.0",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "clean-webpack-plugin": "^1.0.0",
    "compression-webpack-plugin": "^2.0.0",
    "css-loader": "^1.0.1",
    "enzyme-to-json": "^3.3.4",
    "file-loader": "^2.0.0",
    "html-webpack-exclude-assets-plugin": "0.0.7",
    "html-webpack-plugin": "^3.2.0",
    "jest-serializer-html-string": "^1.0.1",
    "mini-css-extract-plugin": "^0.4.4",
    "node-sass": "^4.10.0",
    "npm-install-webpack-plugin": "^4.0.5",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack-cli": "^3.1.2",
    "webpack-core": "^0.6.9"
  }
}



const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

const SOURCE_MAP = process.env.SOURCE_MAP === 'true';

const WEBPACK_DEV_SERVER_PORT = 8080;

const version = require('./package.json').version;

/* Default plugins */

const plugins = [
  new CleanWebpackPlugin([path.resolve(__dirname, '../', 'build').split('/').pop()], {
    root: path.resolve(__dirname, '../'),
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
    ASSET_URL_PLACEHOLDER: JSON.stringify(`/fdjgs/${version}/c/`),
  }),
  new HtmlWebpackPlugin({
    title: 'FDJ Gaming Solutions (UK) Widgets',
    template: './src/index.ejs',
    filename: 'index.html',
    excludeAssets: [/\.css$/],
  }),
  new webpack.SourceMapDevToolPlugin({
    test: /\.js$/,
    exclude: /(node_modules|bower_components|dist)/,
    include: __dirname,
  }),
  new MiniCssExtractPlugin({
    filename: `fdjgs/${version}/c/[name]-[chunkhash:8].css`,
  }),
];

/* Non-development plugins */

if (NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: SOURCE_MAP,
      comments: false,
    }),
  );
  plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
    }),
  );
  // plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'common',
  //     filename: `fdjgs/${version}/j/common-[chunkhash:8].js`,
  //   }),
  // );
}
module.exports = {
  mode: NODE_ENV,
  entry: {
    common: ['./src/common/index.js', './src/common/theme.scss', 'react', 'react-dom'],
    betslip: ['./src/betslip/index.js', './src/betslip/style.scss'],
    navigation: ['./src/navigation/index.jsx', './src/navigation/style.scss'],
    competition: ['./src/competition/index.jsx', './src/competition/style.scss'],
    'market-display': ['./src/market_display/index.jsx', './src/market_display/style.scss'],
    'in-play-calendar': ['./src/in_play_calendar/index.jsx', './src/in_play_calendar/style.scss'],
    'in-play': ['./src/in_play/index.jsx', './src/in_play/style.scss'],
    'cash-out': ['./src/cash_out/index.jsx', './src/cash_out/style.scss'],
    'settled-bets': ['./src/settled_bets/index.jsx', './src/settled_bets/style.scss'],
    login: ['./src/login/index.jsx', './src/login/style.scss'],
    'horse-racing': ['./src/horse_racing/index.jsx', './src/horse_racing/style.scss'],
    'dog-racing': ['./src/dog_racing/index.jsx', './src/dog_racing/style.scss'],
  },
  devtool: SOURCE_MAP ? 'inline-source-map' : '',
  devServer: {
    port: WEBPACK_DEV_SERVER_PORT,
    contentBase: path.resolve(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, X-LVS-PriceFormat, X-LVS-HSToken',
      'Access-Control-Expose-Headers': 'X-LVS-HSToken',
    },
    proxy: {
      '/fdjgs/api': {
        target: 'https://mex-master-test.lvs.co.uk:8443',
        pathRewrite: { '^/fdjgs/api': '/abp/m' },
        secure: false,
      },
    },
    disableHostCheck: true,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: path.images,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: path.fonts,
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [
            path.join(__dirname, 'src', 'betslip', 'templates'),
          ],
          helperDirs: [
            path.join(__dirname, 'src', 'betslip', 'helpers'),
          ],
          knownHelpers: ['ifEq', 'ifNotEq', 'ifGt', 'ifLt', 'debug', 'ifNotEmpty', 'ifIncluded', 'ifOR', 'getElement', 'link', 'console', 'mapProps', 'IfCond', 'eachWayCheckBox', 'selectionEachWayIsSet', 'getAllSpShowingDecimal', 'ifAllIsStartingPrice', 'spHasDecimalValue', 'displayDecimalForSp', 'spToggleDropDown', 'spPotentialReturn', 'singleAvailableForOutcome', 'singlesAvailable', 'singlesAvailableCount', 'multipleAvailableForType', 'bet', 'subbet', 'transaction', 'rejectedTransaction', 'allSinglesRejected', 'errorClasses', 'fakeArray', 'offers', 'isOffers', 'anyOffer', 'canPlace', 'selectionIndices', 'messageTransactionOutcomes', 'restrictionsOutcomes', 'maxStakeNotAvailableSingle', 'ifShouldDisableMaxStake', 'restrictedTransaction', 'subBetErrors', 'betCount', 'selectionUsed', 'subBetsUsedForSystemSingles', 'notUsedForSingle', 'priceChangeClass', 'handicapChangeClass', 'totalPriceChangeClass', 'unitStakeChangeClass', 'isSpread', 'originalTransaction', 'isRestricted', 'allSubBets', 'nonRestrictedBetCount', 'namedDisabled', 'showBet', 'globalSingleMaxStake', 'changedOdds', 'translate', 'formatDate', 'formatExpiryTime', 'cropReference', 'tooltip', 'count', 'prettifyNumber', 'addDecimal', 'formatOfferCurrency', 'currency', 'acceptOffer', 'linkToAccount'],
          runtime: path.join(__dirname, 'src', 'betslip', 'handlebars'),
        },
      },
      // {
      //   test: /\.(css|scss)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         minimize: NODE_ENV !== 'development',
      //         sourceMap: SOURCE_MAP,
      //       },
      //     },
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: SOURCE_MAP,
              minimize: NODE_ENV !== 'development',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,  // Convert images < 8kb to base64 strings
            name: `fdjgs/${version}/i/[sha256:hash:base62:7].[ext]`,
          },
        },
        ],
      },

    ],
  },
  output: {
    filename: `fdjgs/${version}/j/[name]-[chunkhash:8].js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    jsonpFunction: 'fdjgsJsonp',
  },
};

