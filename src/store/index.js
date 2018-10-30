import { PLUGIN_VUEX_DEF_MODULE_NAME } from '../gloabl-dict'

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
       * 注意如果调用`state.commit('modifyParams', {})`修改参数栈，因为vue2针对
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
      },
      /**
       * 入栈
       * @param state
       * @param {Object} [params={}]
       */
      'pushParams': (state, params) => {
        state.paramsStack.push(params)
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
        state.paramsStack.pop()
        state.paramsStack.push(params)
      },
      /**
       * 出栈
       * @param state
       */
      'popParams': (state) => {
        state.paramsStack.pop()
      },
      /**
       * 清空参数栈
       * @param state
       */
      'clearParamsStack': (state) => {
        state.paramsStack = []
        // state.backParams = {}
      },
      /**
       * 设置是否是出栈|是否是返回状态（点击返回页面）
       * @param state
       * @param bckState
       */
      'setBackState': (state, bckState) => {
        state.backState = bckState
      },
      'navigation/FORWARD': (state, { to }) => {
        state.backState = false
      },
      'navigation/REPLACE': (state, { to }) => {
        state.backState = false
      },
      'navigation/BACK': (state, { to, from }) => {
        state.backState = true
      },
      'navigation/REFRESH': (state, { to }) => {
        state.backState = false
      }
    }
  })
}
