const path = require('path');
const generalEntries = require('./generalEntries');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = 'development';
const version = require('./package.json').version;

const modules = ['./node_modules'];

module.exports = {
  mode: NODE_ENV,
  resolve: { modules, extensions: ['.js', '.jsx'] },
  context: process.cwd(),
  node: { __filename: true },
  entry: generalEntries,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
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
  output: {
    filename: `fdjgs/${version}/j/[name]-[chunkhash:8].js`,
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    jsonpFunction: 'fdjgsJsonp',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
      exclude: /(node_modules|bower_components|dist)/,
      include: __dirname,
    }),
    new HtmlWebpackPlugin({
      title: 'FDJ Gaming Solutions (UK) Widgets',
      template: './src/index.ejs',
      filename: 'index.html',
      excludeAssets: [/\.css$/],
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel-loader',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [path.join(__dirname, 'src', 'betslip', 'templates')],
          helperDirs: [path.join(__dirname, 'src', 'betslip', 'helpers')],
          knownHelpers: [
            'ifEq',
            'ifNotEq',
            'ifGt',
            'ifLt',
            'debug',
            'ifNotEmpty',
            'ifIncluded',
            'ifOR',
            'getElement',
            'link',
            'console',
            'mapProps',
            'IfCond',
            'eachWayCheckBox',
            'selectionEachWayIsSet',
            'getAllSpShowingDecimal',
            'ifAllIsStartingPrice',
            'spHasDecimalValue',
            'displayDecimalForSp',
            'spToggleDropDown',
            'spPotentialReturn',
            'singleAvailableForOutcome',
            'singlesAvailable',
            'singlesAvailableCount',
            'multipleAvailableForType',
            'bet',
            'subbet',
            'transaction',
            'rejectedTransaction',
            'allSinglesRejected',
            'errorClasses',
            'fakeArray',
            'offers',
            'isOffers',
            'anyOffer',
            'canPlace',
            'selectionIndices',
            'messageTransactionOutcomes',
            'restrictionsOutcomes',
            'maxStakeNotAvailableSingle',
            'ifShouldDisableMaxStake',
            'restrictedTransaction',
            'subBetErrors',
            'betCount',
            'selectionUsed',
            'subBetsUsedForSystemSingles',
            'notUsedForSingle',
            'priceChangeClass',
            'handicapChangeClass',
            'totalPriceChangeClass',
            'unitStakeChangeClass',
            'isSpread',
            'originalTransaction',
            'isRestricted',
            'allSubBets',
            'nonRestrictedBetCount',
            'namedDisabled',
            'showBet',
            'globalSingleMaxStake',
            'changedOdds',
            'translate',
            'formatDate',
            'formatExpiryTime',
            'cropReference',
            'tooltip',
            'count',
            'prettifyNumber',
            'addDecimal',
            'formatOfferCurrency',
            'currency',
            'acceptOffer',
            'linkToAccount',
          ],
          runtime: path.join(__dirname, 'src', 'betslip', 'handlebars'),
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: `fdjgs/${version}/i/[sha256:hash:base62:7].[ext]`,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images',
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
              name: 'fonts',
            },
          },
        ],
      },
    ],
  },
};


----
const path = require('path');
const generalEntries = require('./generalEntries');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const NODE_ENV = 'production';
const SOURCE_MAP = process.env.SOURCE_MAP === 'true';
const WEBPACK_DEV_SERVER_PORT = 8080;
const version = require('./package.json').version;

const modules = ['./node_modules'];

module.exports = {
  mode: NODE_ENV,
  resolve: { modules, extensions: ['.js', '.jsx'] },
  context: process.cwd(),
  node: { __filename: true },
  entry: generalEntries,
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
  output: {
    filename: `fdjgs/${version}/j/[name]-[chunkhash:8].js`,
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    jsonpFunction: 'fdjgsJsonp',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
      exclude: /(node_modules|bower_components|dist)/,
      include: __dirname,
    }),
    new HtmlWebpackPlugin({
      title: 'FDJ Gaming Solutions (UK) Widgets',
      template: './src/index.ejs',
      filename: 'index.html',
      excludeAssets: [/\.css$/],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel-loader',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [path.join(__dirname, 'src', 'betslip', 'templates')],
          helperDirs: [path.join(__dirname, 'src', 'betslip', 'helpers')],
          knownHelpers: [
            'ifEq',
            'ifNotEq',
            'ifGt',
            'ifLt',
            'debug',
            'ifNotEmpty',
            'ifIncluded',
            'ifOR',
            'getElement',
            'link',
            'console',
            'mapProps',
            'IfCond',
            'eachWayCheckBox',
            'selectionEachWayIsSet',
            'getAllSpShowingDecimal',
            'ifAllIsStartingPrice',
            'spHasDecimalValue',
            'displayDecimalForSp',
            'spToggleDropDown',
            'spPotentialReturn',
            'singleAvailableForOutcome',
            'singlesAvailable',
            'singlesAvailableCount',
            'multipleAvailableForType',
            'bet',
            'subbet',
            'transaction',
            'rejectedTransaction',
            'allSinglesRejected',
            'errorClasses',
            'fakeArray',
            'offers',
            'isOffers',
            'anyOffer',
            'canPlace',
            'selectionIndices',
            'messageTransactionOutcomes',
            'restrictionsOutcomes',
            'maxStakeNotAvailableSingle',
            'ifShouldDisableMaxStake',
            'restrictedTransaction',
            'subBetErrors',
            'betCount',
            'selectionUsed',
            'subBetsUsedForSystemSingles',
            'notUsedForSingle',
            'priceChangeClass',
            'handicapChangeClass',
            'totalPriceChangeClass',
            'unitStakeChangeClass',
            'isSpread',
            'originalTransaction',
            'isRestricted',
            'allSubBets',
            'nonRestrictedBetCount',
            'namedDisabled',
            'showBet',
            'globalSingleMaxStake',
            'changedOdds',
            'translate',
            'formatDate',
            'formatExpiryTime',
            'cropReference',
            'tooltip',
            'count',
            'prettifyNumber',
            'addDecimal',
            'formatOfferCurrency',
            'currency',
            'acceptOffer',
            'linkToAccount',
          ],
          runtime: path.join(__dirname, 'src', 'betslip', 'handlebars'),
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: `fdjgs/${version}/i/[sha256:hash:base62:7].[ext]`,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images',
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
              name: 'fonts',
            },
          },
        ],
      },
    ],
  },
};



{
  "name": "fdj-gaming-widgets",
  "version": "1.4.11",
  "description": "FDJ Gaming Solution (UK) widgets",
  "private": true,
  "author": {
    "name": "Zircode Ltd",
    "email": "hello@zircode.com",
    "url": "https://zircode.com/"
  },
  "repository": {
    "type": "git",
    "url": "ssh://git@bitbucket.lvs.co.uk/widg/widgets.git"
  },
  "main": "index.js",
  "scripts": {
    "start": "./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    "build": "NODE_ENV=production ./node_modules/.bin/webpack --config webpack.config.js",
    "test": "./node_modules/eslint/bin/eslint.js --ext .jsx --ext .js . && npm audit && NODE_ENV=development ./node_modules/karma/bin/karma start && ./node_modules/jest/bin/jest.js",
    "format": "./node_modules/eslint/bin/eslint.js --ext .jsx --ext .js --fix .",
    "watch": "./node_modules/.bin/webpack --watch --config webpack.config.js",
    "testOne": "NODE_ENV=development ./node_modules/karma/bin/karma start"
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
    "html-webpack-plugin": "^3.2.0",
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
    "ajv": "^6.5.5",
    "ajv-errors": "^1.0.0",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "clean-webpack-plugin": "^1.0.0",
    "compression-webpack-plugin": "^2.0.0",
    "css-loader": "^1.0.1",
    "enzyme-to-json": "^3.3.4",
    "file-loader": "^2.0.0",
    "html-webpack-exclude-assets-plugin": "0.0.7",
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
