import { PLUGIN_VM_PREFIX_VIEWPLUS, PLUGIN_WINDOW_PREFIX_VIEWPLUS } from '../gloabl-dict'
import { info } from './warn'
import { inBrowser } from '../util/dom'
import _ from 'lodash'
export default class MixinPlugin {
  static mixin(Vue, plugin, modelName = 'defPlugin', options) {
    if (_.isFunction(plugin.install)) {
      // 为了支持自定义混合可以在默认模块之前，这里不绑定this为$vp
      try { plugin.install(Vue, options) } catch (e) {
        throw new Error(`on call plugin install err: ${e.message}`)
      } finally {
        delete plugin.install
      }
    }
    if (!Vue.prototype.hasOwnProperty(PLUGIN_VM_PREFIX_VIEWPLUS)) {
      info(`安装${modelName}模块...`)
      Object.defineProperty(Vue.prototype, PLUGIN_VM_PREFIX_VIEWPLUS, {
        get: function () {
          return plugin
        },
        set: function (newValue) {
          plugin = newValue
        }
      })
    } else {
      Vue.prototype[PLUGIN_VM_PREFIX_VIEWPLUS] = {...Vue.prototype[PLUGIN_VM_PREFIX_VIEWPLUS], ...plugin}
      // 以便在一些应用的非组件或视图文件中直接使用
      info(`混合${modelName}模块完成`)
    }
    if (_.isFunction(plugin.installed)) {
      try {
        Vue.prototype[PLUGIN_VM_PREFIX_VIEWPLUS]::plugin.installed()
      } catch (e) {
        throw new Error(`on call plugin installed err: ${e.message}`)
      }
      // finally {
      //   delete Vue.prototype[PLUGIN_VM_PREFIX_VIEWPLUS].installed
      // }
    }
    MixinPlugin._mixin2Window(plugin)
  }

  static _mixin2Window(plugin) {
    if (inBrowser) {
      let _temp = window[PLUGIN_WINDOW_PREFIX_VIEWPLUS]
      if (!_temp) {
        _temp = {...plugin}
      } else {
        _temp = {...plugin, ..._temp}
      }
      window[PLUGIN_WINDOW_PREFIX_VIEWPLUS] = _temp
    }
  }
}
