import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import ViewPlus from 'vue-viewplus'
import { sync } from 'vuex-router-sync'
import './styles/index.less'
import './assets/fonts/font_316022_dszrev6slx6/iconfont.css'
import './assets/css/highlight/styles/darcula.css'
import VueHighlightJS from 'vue-highlightjs'
import jsComponents from './util/js-commponent'
import Icon from 'vue-svg-icon/Icon.vue'
import _ from 'lodash'

Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.component('icon', Icon)

sync(store, router)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', true)
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', false)
})

Vue.use(VueHighlightJS)

Vue.mixin({
  mounted() {
    if (this.$refs.topProgress) {
      this.$refs.topProgress.start()
    }
  }
})

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
    // baseURL: 'http://localhost:7000',
    baseURL: 'https://www.easy-mock.com/mock/5abc903ff5c35b191f472d79/example',
    // 这里的data key，请查看mock server的jsonp输出配置
    dataKey: 'data',
    statusCodeKey: 'code',
    statusCode: '1',
    msgKey: 'msg',
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

// 演示混合自定义模块到$vp
ViewPlus.mixin(Vue, jsComponents)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    // 可以从客户端返回一个标识或者检测设备是否为移动设备上运行
    const appClientCondition = false
    store.commit('updateRunNativeStatus', appClientCondition)
    console.log('ViewPlus -> ', ViewPlus)
    console.log('vp -> ', window._VP, this.$vp)
    console.log('$bus -> ', this.$bus)
  }
})
