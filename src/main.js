import Navigation from 'vue-navigation'
import { PLUGIN_VM_PREFIX_VIEWPLUS } from './gloabl-dict'
import MixinPlugin from './util/mixin-plugin'
import { install as utilCacheInstall } from './vp/util-cache'
import { install as jsBridgeContextInstall } from './vp/js-bridge-context'
import { install as cacheUserInfoInstall } from './vp/cache-userinfo'
import { install as loginStateCheckInstall } from './vp/login-state-check'
import { install as utilHttpInstall } from './vp/util-http'
import { install as paramsStackInstall, paramsStackMixin } from './vp/params-stack'
import { emitErr, init as registErrorHandlerConfigMethod, checkVp } from './util/warn'
import EventBus from './vp/event-bus.js'
import device from './util/device'
import _ from 'lodash'
import registerCustomModule from './store'

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return
  install.installed = true

  const {
    router, store,
    /**
     * 插件全局错误回调函数，插件中捕获的异常都将会调用该方法，并传递`Error`类型错误消息；
     */
    errorHandler, debug = false, runNative = true
  } = opts
  opts = {...{debug, runNative}, ...opts}
  if (_.isUndefined(router)) {
    emitErr(new Error(`router必须配置！`))
  }
  if (_.isUndefined(store)) {
    emitErr(new Error(`store必须配置！`))
  }
  Vue.use(Navigation, {router, store})
  registErrorHandlerConfigMethod(Vue, debug, errorHandler)
  registerCustomModule(store)

  const defPlugin = new class {
    constructor(options) {
      this.options = options
      this.debug = options.debug
      this.device = device
      this.runNative = runNative
      this.checkVp = checkVp
    }
  }(opts)
  MixinPlugin.mixin(Vue, defPlugin, '初始化模块')
  utilCacheInstall(Vue, opts)
  cacheUserInfoInstall(Vue, opts)
  jsBridgeContextInstall(Vue, opts)
  loginStateCheckInstall(Vue, opts)
  utilHttpInstall(Vue, opts)
  paramsStackInstall(Vue, opts)
  Vue.use(EventBus, opts)
  const plugin = Vue.prototype[PLUGIN_VM_PREFIX_VIEWPLUS]
  Object.defineProperty(plugin, 'version', {
    value: process.env.VERSION
  })
}

export default {
  install,
  mixin(Vue, plugin, options) {
    if (!Vue || _.isEmpty(plugin)) {
      throw new Error('插件定义失败')
    }
    try {
      const {errorHandler, debug = false} = options
      registErrorHandlerConfigMethod(Vue, debug, errorHandler)
      MixinPlugin.mixin(Vue, plugin, _.has(options, 'moduleName') ? options.moduleName : '未命名混合模块', options)
    } catch (e) {
      console.log('err', e)
      emitErr(new Error(`mixin err ${e.message}`), null, true)
    }
  }
}

export const paramsStack = paramsStackMixin
