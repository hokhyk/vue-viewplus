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

以上配置是为了获得`[后编译](https://didi.github.io/cube-ui/#/zh-CN/docs/post-compile)`的好处，这里借助了[cube-ui](https://didi.github.io/cube-ui/#/zh-CN)对这个概念的解释。
更多我自己的理解可以看这里，[说说我的入坑记录](https://github.com/Jiiiiiin/vue-viewplus/issues/1#issuecomment-450270175)，这个是一个插件使用者，对我们这个插件在使用过程中的困惑，我做了一些解释；

## 插件依赖

因为加入了后编译的缘故，我们插件目前的依赖结构如下：
```js
"dependencies": {
    "vue-navigation": "^1.1.4",
    "web-storage-cache": "^1.0.3",
  },
"peerDependencies": {
    "axios": "^0.18.0",
    "lodash": "^4.17.11",
    "qs": "^6.5.2"
 }
```
也就是说，`peerDependencies`，需要大家手动安装，因为lodash很大，所以建议大家自行安装和配置[`babel-plugin-lodash`](https://github.com/lodash/babel-plugin-lodash)。
另外我们插件源码使用了`babel-plugin-transform-function-bind`，大家可能也需要手动安装并配置：

```js
"plugins": [
    //...
    "transform-function-bind",
    "lodash"
  ]
```
至于为什么要使用，我再这里做了简单解释，[说说我的入坑记录](https://github.com/Jiiiiiin/vue-viewplus/issues/1#issuecomment-450269572)

## 插件配置

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
  // 注意：所有模块都不是不许要使用，所以不是必须要配置，这里只是以http模块为示例
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

另外`ViewPlus.mixin(Vue, jsComponents)`为插件添加了一个[js ui component自定义模块](https://github.com/Jiiiiiin/vue-viewplus/blob/8afc27d8c026ec91691517f40fec34fb11cb8356/examples/util/js-commponent.js)，即插件默认提供的模块如不满足或者你有更好的idea，即可使用该[ViewPlus.mixin api](/global_api?id=mixin-)在“需要的时候（一般在main.js中）”进行安装，至于为什么要这样做，我也在[说说我的入坑记录](https://github.com/Jiiiiiin/vue-viewplus/issues/1)，这个是一个插件使用者，对我们这个插件在使用过程中的困惑，我做了一些解释；
也就是说，我们这个插件主要还是针对帮助大家更快的完成业务开发而写，所以针对UI我们并没有做封装，我们预留了钩子，如`util-http`模块配置中需要配置的`loading`方法，你可以不定义js-ui-component这样一个模块，而是只实现这个loading方法，
直接使用你应用已经有的UI组件对应loading控件。

但是我们为什么建议大家自己mixin一个jsComponents模块，是因为我们项目的初衷是：
> 只用一种方式解决一个问题

如果大家在上手过程中，有什么疑问，可以开[issue](https://github.com/Jiiiiiin/vue-viewplus/issues)讨论
