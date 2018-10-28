'use strict'
const packageInfo = require('../package.json')

module.exports = {
  options: {
    env: 'dev'
  },
  plugins: [
    'vux-ui',
    'inline-manifest',
    {
      name: 'duplicate-style',
      envs: ['production']
    },
    {
      name: 'progress-bar',
      envs: ['development']
    },
    {
      name: 'less-theme',
      path: 'examples/assets/vux/vux-theme.less'
    },
    {
      name: 'build-done-callback',
      fn: function () {
        console.log('======== ' + packageInfo.name + ' v: ' + packageInfo.version + ' build success! ========')
      }
    }
  ]
}
