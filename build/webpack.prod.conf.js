'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    // modify by jiiiiiin: 为了做组件的按需引用，将不同的entry在构建的时候分离输出修改
    'vue-viewplus': './src/main.js'
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    // modify by jiiiiiin: 为了做组件的按需引用，将不同的entry在构建的时候分离输出修改
    filename: '[name].js',
    // add by jiiiiiin:为需要异步引入的功能模块进行指定命名的方式拆分：[https://doc.webpack-china.org/guides/code-splitting#-dynamic-imports-]
    chunkFilename: '[name].js',
    library: {
      root: 'ViewPlus',
      amd: "view-plus",
      commonjs: "view-plus"
    },
    libraryTarget: 'umd',
    auxiliaryComment: {
      root: 'Root Comment',
      commonjs: 'CommonJS Comment',
      commonjs2: 'CommonJS2 Comment',
      amd: 'AMD Comment'
    },
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'axios': 'axios',
    'qs': 'qs',
    'vux': 'vux'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: false
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new CleanWebpackPlugin([config.build.assetsRoot]),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
