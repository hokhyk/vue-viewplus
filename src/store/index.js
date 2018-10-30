import { PLUGIN_VUEX_DEF_MODULE_NAME } from '../gloabl-dict'
import cache from '../vp/util-cache'

export default (store) => {
  store.registerModule(PLUGIN_VUEX_DEF_MODULE_NAME, {
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
