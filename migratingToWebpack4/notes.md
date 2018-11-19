Plugins/Dependencies:
clean-webpack-plugin -u
compression-webpack-plugin -u

extract-text-webpack-plugin

npm-install-webpack-plugin -u
html-webpack-plugin -u
webpack-hot-middleware -u
image-webpack-loader -u


======

- webpack v3 adds webpack-cli automatically, in version 4 the cli is a separate package and
  needs to be added separately.
- webpack v4 no longer lets you pass a -p flag in your to run a production build. You need to
  pass 'mode' option instead (--mode production, --mode development).
- These plugins have been removed from Webpack 4
   + NoEmitOnErrorsPlugin
   + ModuleConcatenationPlugin
   + NamedModulesPlugin
   + CommonsChunkPlugin
- Also, to configure these plugins, need to use 'optimization' key in the config file.


- UglifyJsPlugin for production builds have to be moved from plugins to optimization in the
  config file.

- CommonsChunkPlugin has been deprecated but there's a built-in replacement,
  optimization.splitChunks

- ExtraTextPlugin for creating css files is been deprecated, need to switch to
  MiniCssExtraPlugin

- memory exposure - tunnel-agent (npm audit) remains



 "pretty": "prettier --write lib/*.js lib/__tests__/*.js"

https://github.com/webpack/tapable

https://github.com/flexdinesh/react-redux-boilerplate
https://github.com/flexdinesh/react-redux-boilerplate/commit/69dc839ad84c37b170e4c3d6f1f8ecb735fc2791

https://github.com/HashemKhalifa/webpack-react-boilerplate