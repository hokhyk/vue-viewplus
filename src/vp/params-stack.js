import { mapMutations, mapGetters } from 'vuex'
import MixinPlugin from '../util/mixin-plugin'
import _utilHttp from '../vp/util-http'
import _ from 'lodash'
import { PLUGIN_VUEX_DEF_MODULE_NAME as MODULE_NAME } from '../gloabl-dict'
import cache from './util-cache'

export const modelName = 'params-stack'

let _store, _installed

/**
 * 参数栈mixin对象
 * <p>
 *   方便页面组件继承之后操作参数栈
 * @type {Object}
 */
export const paramsStackMixin = {
  data() {
    return {
      /**
       * 声明该页面是栈底部
       */
      isStackBottom: false
    }
  },
  computed: {
    ...mapGetters([
      /**
       * 查看`vuex#vplus.paramsStack[top-length]`栈顶参数
       */
      'params'
    ]),
    /**
     * 查看`vuex#vplus.backParams`回传参数
     */
    backParams() {
      return this.$store.state[MODULE_NAME].backParams
    },
    /**
     * 查看`vuex#vplus.backState`是否是出栈|是否是返回状态
     */
    backState() {
      return this.$store.state[MODULE_NAME].backState
    }
  },
  methods: {
    ...mapMutations([
      /**
       * 入栈
       */
      'pushParams',
      /**
       * 修改栈顶参数
       */
      'modifyParams',
      /**
       * 出栈
       */
      'popParams',
      /**
       * 清空参数栈
       */
      'clearParamsStack',
      /**
       * 设置是否是出栈|是否是返回状态（点击返回页面）
       */
      'setBackState'
    ])
  },
  // 导航离开该组件的对应路由时调用
  beforeRouteLeave(to, from, next) {
    if (this.backState && this.isStackBottom) {
      this.clearParamsStack()
    }
    next()
  }
}

/**
 * 参数栈模块
 */
const plugin = {
  installed() {
    if (_.isFunction(_installed)) {
      this::_installed()
    }
    this.restoreParamsStack()
  },
  /**
   * $vp.restoreParamsStack()
   * 恢复插件中`vuex#$vp.paramsStack` && vuex#$vp.backParams` && vuex#$vp.backState`参数栈所用状态
   * <p>
   * 在当前模块重新安装的时候，一般对应就是插件初始化和页面刷新的时候
   */
  restoreParamsStack() {
    _store.commit('setBackParams', cache.cacheLoadFromSessionStore('__BACK_PARAMS__', {}))
    _store.commit('pushParamsStack', cache.cacheLoadFromSessionStore('__PARAMS_STACK__', []))
  },
  /**
   * $vp.psModifyBackState(bckState)
   * <p>
   * 设置`vuex#vplus.backState`返回状态
   * @param {Boolean} [backState=false]
   */
  psModifyBackState(bckState) {
    _store.commit('setBackState', bckState)
  },
  /**
   * $vp.psClearParamsStack()
   * <p>
   * 清空参数栈
   */
  psClearParamsStack() {
    _store.commit('clearParamsStack')
  },
  /**
   * $vp.(location[, {params = {}, clearParamsStack = false, backState = false} = {}])
   * <p>
   * 页面导航
   * @param location router location对象
   * @param {Object} [params={}] 向下一个页面需要传递的参数
   * @param {Boolean} [clearParamsStack=false] 在进行页面导航的时候，是否清空参数栈，默认为false
   * @param {Boolean} [backState=false] 设置`vuex#vplus.backState`返回状态，默认为false
   */
  psPageNext(location, {params = {}, clearParamsStack = false, backState = false} = {}) {
    _store.commit('pushParams', params)
    _store.commit('setBackParams', {})
    this.psModifyBackState(backState)
    if (clearParamsStack) {
      this.psClearParamsStack()
    }
    _utilHttp.pageNext(location)
  },
  /**
   * $vp.(location[, {params = {}, isPop = true} = {}])
   * <p>
   * 页面导航(基于Router)，移除上一个页面
   * <p>
   *   将会出栈顶对象，并重新设置`params`为参数栈的栈顶参数
   *   注：在调用该方法的页面，必须是要调用`ParamsStack#psPageNext`导航的页面，因为需要保证“弹栈”操作无误，
   *   又或者设置`isPop`为false
   * @param location router location对象
   * @param {Object} [params={}] 向下一个页面需要传递的参数
   * @param {Boolean} [isPop=false] 是否pop当前页面的参数后在进行页面跳转，默认为true，防止当前页面
   * 不是通过`ParamsStack#psPageNext`导航过来的，但是由需要使用当前方法
   */
  psPageReplace(location, {params = {}, isPop = true} = {}) {
    if (isPop) {
      _store.commit('modifyParams', params)
    } else {
      _store.commit('pushParams', params)
    }
    _store.commit('setBackParams', {})
    this.psModifyBackState(false)
    _utilHttp.pageReplace(location)
  },
  /**
   * $vp.psPageGoBack({backParams = {}, clearParamsStack = false, backPopPageNumbs = -1} = {})
   * <p>
   * 页面回退
   * @param {Object} backParams 设置回传参数
   * @param {Boolean} clearParamsStack 是否清空参数栈
   * @param {Number} backPopPageNumbs 出栈页面数
   */
  psPageGoBack({backParams = {}, clearParamsStack = false, backPopPageNumbs = -1} = {}) {
    if (_.gt(backPopPageNumbs, 0)) {
      throw new Error('backPopPageNumbs参数设置错误，出栈页面数必须是负数')
    }
    _store.commit('setBackParams', backParams)
    if (this.isStackBottom || clearParamsStack) {
      this.psClearParamsStack()
    } else {
      _store.commit('popParams')
    }
    this.psModifyBackState(true)
    _utilHttp.pageTo(backPopPageNumbs)
  }
}

export default plugin

export const install = function (Vue, {
  store = null,
  paramsStack: {
    installed = null
  } = {}
} = {}) {
  _store = store
  _installed = installed
  MixinPlugin.mixin(Vue, plugin, modelName)
}
