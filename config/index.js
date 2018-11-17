'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    // modify by jiiiiiin: 避免将css等输出到static下面
    // assetsSubDirectory: 'static',
    assetsSubDirectory: 'lib',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  buildDemo: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist-demo/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist-demo'),
    // modify by jiiiiiin: 避免将css等输出到static下面
    // assetsSubDirectory: 'static',
    assetsSubDirectory: 'lib',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    assetsRoot: path.resolve(__dirname, '../examples/dist'),
    port: process.env.PORT || 8888,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // 代理所有的以 /api 开头的请求到 http://jsonplaceholder.typicode.com
      '/mng': {
        target: 'http://192.168.3.43:9090',
        changeOrigin: true,
        pathRewrite: {
          '^/mng': '/mng'
        }
      },
      // '*': {
      //   target: 'http://localhost:3000/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
