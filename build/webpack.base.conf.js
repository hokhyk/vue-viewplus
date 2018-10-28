'use strict'
const packageInfo = require('../package.json')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('examples'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('examples'), resolve('test')],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      '@': resolve('examples'),
      '@src': resolve('src'),
      'vue-viewplus': path.join(__dirname, '../src/main.js'),
      // 'vue-viewplus': '../dist/vue-viewplus.js',
      // 'event-bus': '../dist/event-bus.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${packageInfo.version}'`
    }),
    new LodashModuleReplacementPlugin
  ]
}
