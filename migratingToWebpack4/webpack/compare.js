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
