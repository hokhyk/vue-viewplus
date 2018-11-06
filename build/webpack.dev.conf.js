'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const devAddEntryWebpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './examples/main.js',
    vendors: ['vue', 'vue-router']
  }
})

// 修改：Object.keys(baseWebpackConfig.entry) 初始化模板为devAddEntryWebpackConfig
// add hot-reload related code to entry chunks
Object.keys(devAddEntryWebpackConfig.entry).forEach(function (name) {
  devAddEntryWebpackConfig.entry[name] = ['./build/dev-client'].concat(devAddEntryWebpackConfig.entry[name])
})

const webpackConfig = merge(devAddEntryWebpackConfig, {
  // 由上面动态生成entry：devAddEntryWebpackConfig
  // entry: {
  //   app: './src/main.js'
  // },
  output: {
    path: config.dev.assetsRoot,
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name]/index.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendor.bundle.js'}),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../examples/dist/index.html'),
      template: path.join(__dirname, '../examples/index.html'),
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

const vuxLoader = require('vux-loader')
const vuxConfig = require('./vux-config')
module.exports = vuxLoader.merge(webpackConfig, vuxConfig)
