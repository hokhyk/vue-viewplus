import {
  PLUGIN_VM_PREFIX_EVENTBUS
} from '../gloabl-dict'
import {
  info,
  checkVp
} from '../util/warn'
import _ from 'lodash'

const modelName = 'event-bus'
let _installed
// noinspection JSUnusedGlobalSymbols
export default class EventBus {
  constructor(Vue) {
    this.instance = new Vue()
    Object.defineProperty(Vue.prototype, PLUGIN_VM_PREFIX_EVENTBUS, {
      value: this.instance
    })
    // this::callFunc2(_onInitComplete, `${modelName} onInitComplete钩子函数未定义。`)
    info(`引入${modelName}模块：[vm.${PLUGIN_VM_PREFIX_EVENTBUS}]完成`)
    if (_.isFunction(_installed)) {
      checkVp()::_installed()
    }
  }

  static install(Vue, {
    debug = false,
    store = null,
    eventBus: {
      installed = null
    } = {}
  } = {}) {
    if (!Vue.prototype.hasOwnProperty(PLUGIN_VM_PREFIX_EVENTBUS)) {
      _installed = installed
      /* eslint-disable no-new */
      new EventBus(Vue)
    } else {
      info(`${modelName}模块安装完成`)
    }
  }
}
