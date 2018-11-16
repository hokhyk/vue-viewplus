import { PLUGIN_CONSOLE_LOG_FLAG, PLUGIN_VM_PREFIX_VIEWPLUS } from '../gloabl-dict'
import _ from 'lodash'

let _isdebug, _errorHandler, _vp, _Vue

export function checkVp(Vue) {
  if (!_vp) {
    _vp = Vue.prototype[PLUGIN_VM_PREFIX_VIEWPLUS]
  }
  return _vp
}

export function emitErr(err, reject = null, isInstall = false) {
  if (_.isFunction(reject)) {
    reject(err)
  }
  if (_.isFunction(_errorHandler)) {
    checkVp(_Vue)
    _vp::_errorHandler(_.isError(err) ? err : new Error(err))
  } else {
    if (isInstall) {
      warn(_.isString(err) ? err : err.message)
    } else {
      assert(_.isString(err) ? err : err.message)
    }
  }
}

export function assert(message) {
  if (_.isFunction(_errorHandler)) {
    _errorHandler(new Error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`))
  }
  if (_isdebug) {
    throw new Error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function info(message) {
  if (_isdebug) {
    typeof console !== 'undefined' && console.info(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function warn(message) {
  if (_isdebug) {
    typeof console !== 'undefined' && console.warn(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function debug(message) {
  if (_isdebug) {
    typeof console !== 'undefined' && console.debug(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function init(
  Vue,
  isdebug,
  /* 指定和客户端交互过程中抛出的错误的处理函数。应用可以使用该函数来统一处理非业务级别的公共错误消息。 */
  errorHandler) {
  _Vue = Vue
  _isdebug = isdebug
  _errorHandler = errorHandler
  if (_isdebug) {
    warn('您配置为debug模式，插件将会输出一些调试信息，建议上线前关闭调试')
  }
}
