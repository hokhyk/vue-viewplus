# Vuex

插件维护了一个vuex模块：`vplus`。

+ 其中`loginState`为[login-state-check.js 身份认证权限控制模块使用](login-state-check.md)，来持有用户登录状态，在页面刷新的时候也通过缓存数据来对其进行恢复；
+ `loginUserInfo`为[cache-userinfo.js 缓存用户（登录用户）信息模块](cache-userinfo.md)使用，来持有用户登录信息，在页面刷新的时候也通过缓存数据来对其进行恢复；
+ `paramsStack`、`backParams`、`backState`为[params-stack.js 参数栈模块](params-stack.md)使用，来控制参数栈相关功能

**了解插件的vuex模块为的是大家在使用的是否方便调试，一般不需要应用手动去控制这些模块的状态，各个状态自会有各个插件模块的对应配置或方法去提供大家设置；**

**或者更多的是插件自动控制；**

```js
 export default (store) => {
  store.registerModule('vplus', {
    state: {
      /**
       * 用户登录状态
       */
      loginState: false,
      /**
       * 存储登录用户信息
       */
      loginUserInfo: {},
      /**
       * 参数栈
       */
      paramsStack: [],
      /**
       * 回传参数
       */
      backParams: {},
      /**
       * 是否是出栈|是否是返回状态（点击返回页面）
       */
      backState: false
    },
    getters: {
      /**
       * 查看栈顶参数
       * @param state
       * @returns {*}
       */
      params: state => {
        return state.paramsStack[state.paramsStack.length - 1]
      }
    },
    mutations: {
      /**
       * 修改用户登录状态
       * @param state
       * @param {Boolean} [stateVal=false] 状态
       */
      'modifyLoginState': (state, stateVal = false) => {
        state.loginState = stateVal
      },
      /**
       * 设置（登录）用户信息对象
       * @param state
       * @param {Object} [user={}]
       */
      'setLoginUserInfo': (state, user = {}) => {
        state.loginUserInfo = user
      },
      /**
       * 设置回传参数
       * @param state
       * @param {Object} [params={}]
       */
      'setBackParams': (state, params) => {
        state.backParams = params
        cache.cacheSaveToSessionStore('__BACK_PARAMS__', params)
      },
      /**
       * 入栈
       * @param state
       * @param {Object} [params={}]
       */
      'pushParams': (state, params) => {
        state.paramsStack.push(params)
        cache.cacheSaveToSessionStore('__PARAMS_STACK__', state.paramsStack)
      },
      /**
       * 设置参数栈
       * @param state
       * @param {Array} [paramsArr=[]]
       */
      'pushParamsStack': (state, paramsArr) => {
        state.paramsStack = paramsArr
        cache.cacheSaveToSessionStore('__PARAMS_STACK__', paramsArr)
      },
      /**
       * 出栈
       * @param state
       */
      'popParams': (state) => {
        state.paramsStack.pop()
        cache.cacheSaveToSessionStore('__PARAMS_STACK__', state.paramsStack)
      },
      /**
       * 修改栈顶参数
       * <p>
       * https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95
       * 注: 当前方法修改并会触发`getters#params`的重新更新
       * @param state
       * @param {Object} [params={}]
       */
      'modifyParams': (state, params) => {
        store.commit('popParams')
        store.commit('pushParams', params)
      },
      /**
       * 清空参数栈
       * @param state
       */
      'clearParamsStack': (state) => {
        state.paramsStack = []
        cache.cacheDeleteToSessionStore('__PARAMS_STACK__')
        // state.backParams = {}
      },
      /**
       * 设置是否是出栈|是否是返回状态（点击返回页面）
       * @param state
       * @param bckState
       */
      'setBackState': (state, bckState) => {
        state.backState = bckState
        cache.cacheSaveToSessionStore('__BACK_STATE__', bckState)
      },
      'navigation/FORWARD': (state, { to }) => {
        store.commit('setBackState', false)
      },
      'navigation/REPLACE': (state, { to }) => {
        store.commit('setBackState', false)
      },
      'navigation/BACK': (state, { to, from }) => {
        store.commit('setBackState', true)
      },
      'navigation/REFRESH': (state, { to }) => {
        store.commit('setBackState', false)
      }
    }
  })
}
```

