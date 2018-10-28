# 快速开始

安装依赖

```
  npm install --save vue-viewplus
```

## webpack配置

+  项目构建方式 == vue cli 3

```bash
module.exports = {
  // ...
  transpileDependencies: [
    '@babel/plugin-proposal-function-bind',
    'vue-viewplus/src/'
  ],
}
```

+  项目构建方式 = vue cli 2

```bash

const webpackConfig = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: createJsLoaders(),
        include: [
            //...
            resolve('node_modules/vue-viewplus/src/')
          ]
      },
```

## 配置

```js
import ViewPlus from 'vue-viewplus'
import jsComponents from './util/js-commponent'

Vue.use(ViewPlus, {
  router,
  store,
  debug: process.env.NODE_ENV !== 'production',
  errorHandler(err) {
    if (_.isError(err)) {
      if (err.code) {
        switch (err.code) {
          case 'RUN_EVN_NOT_SUPPORT':
          case 'NOT_SUPPORT_AJAX_JSBRIDGE':
            console.warn(err)
            break
          default:
            console.warn(err)
        }
      } else {
        console.error(err.message)
      }
    } else {
      console.error(`err参数错误 ${err}`)
    }
  },
  jsBridge: {
    onParseClientResp(res) {
      // 自行判断自己客户端返回的“同步结果”
      return !_.isEmpty(res) && res.code === '1'
    }
  },
  loginStateCheck: {
    checkPaths: [
      /Manage/
    ],
    onLoginStateCheckFail(to, from, next) {
      this.dialog(`onLoginStateCheckFail被回调：待访问资源【${to.path}】是需要登录才能访问，请先登录`, {
        action() {
          next(false)
        }
      })
      // 更新状态进度条
      store.commit('updateLoadingStatus', false)
    }
  },
  utilHttp: {
    baseURL: 'http://localhost:7000',
    timeout: '3000',
    dataKey: 'data',
    statusCodeKey: 'code',
    statusCode: '1',
    msgKey: 'msg',
    needBase64DecodeMsg: false,
    loading(loadingHintText) {
      this.uiLoading(loadingHintText)
    },
    hideLoading() {
      this.uiHideLoading()
    },
    errDialog(content = '错误消息未定义') {
      this.dialog(content)
      return this
    },
    accessRules: {
      sessionTimeOut: ['role.invalid_user', 'validation.user.force.logout.exception'],
      onSessionTimeOut(response) {
        this.dialog(`onSessionTimeOut回调：${response.msg}`, {
          title: '回调通知'
        })
      },
      unauthorized: ['core_error_unauthorized'],
      onUnauthorized(response) {
        this.dialog(`onUnauthorized回调应用处理：${response.msg}`, {
          title: '回调通知'
        })
      }
    }
  }
})

// 混合自定义模块到$vp
ViewPlus.mixin(Vue, jsComponents)
```

插件有一些[通用配置（debug|router|store|errorHandler...）](global_configuration.md);

另外根据不同的模块来划分配置，详细配置请查看各模块(util-http.js模块...)的配置文档；

另外`ViewPlus.mixin(Vue, jsComponents)`为插件添加了一个[js ui componets自定义模块](https://github.com/Jiiiiiin/vue-viewplus/blob/8afc27d8c026ec91691517f40fec34fb11cb8356/examples/util/js-commponent.js)，即插件默认提供的模块如不满足或者你有更好的idea，即可使用该[ViewPlus.mixin api](/global_api?id=mixin-)在“需要的时候（一般在main.js中）”进行安装；
