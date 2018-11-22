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
