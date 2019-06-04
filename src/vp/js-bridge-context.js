import MixinPlugin from '../util/mixin-plugin'
import {
  info,
  emitErr
} from '../util/warn'
import device from '../util/device'
import _ from 'lodash'

export const modelName = 'js-bridge-context'

export class JsBridgeError extends Error {
  constructor(message, code) {
    super()
    this.message = message
    this.stack = (new Error()).stack
    this.name = this.constructor.name
    this.code = code
  }
}

let _jsContext,
  _onParseClientResp,
  _installed

let _mixinPreCheck = true

/**
 * js-bridge-context JSBridge桥接模块，用于简化前端和客户端（Android && IOS）直接的交互。
 */
const plugin = {
  installed() {
    if (_.isFunction(_installed)) {
      this::_installed()
    }
  },
  /**
   * $vp.onParseClientResp()
   * 方便应用调用该方法判断`command#listener`的返回结果，直接代理到`js-bridge-context`配置项`onParseClientResp`
   * @returns {Boolean} true 标识业务级别成功，否则为失败
   */
  onParseClientResp(res) {
    if (_.isFunction(_onParseClientResp)) {
      return this::_onParseClientResp(res)
    } else {
      emitErr(new Error('on_parse_client_resp_func_not_config'))
    }
  },
  /**
   * $vp.fireEvent(command = null)
   * 应用可以直接调用该方法完成和客户端的交互
   * <p>
   * 协议方式请求客户端
   * command的格式：
   *  const command = {
   *  // [*] event用来标识请求那个客户端的模块，方便客户端根据业务组织“内部JSBridge接口”
   *  event: 'UIEvent',
   *  // action标识请求对应模块的那个方法或者说交易，客户端据此去调用该方法
   *  action: 'toast',
   *  // 【可选】params用来传递对应action需要的参数
   *  params: {
   *      // 自定义参数
   *      msg: 'hello world'
   *    }
   *  // 【可选】listener用来告诉客户端执行完（一般而言是异步操作）方法只会需要回调该方法通知前端
   *  listener: ([客户端传递]) => {}
   * }
   * <p>
   *  @param  {Object} [command=null] 客户端所需的调用消息
   */
  fireEvent(command = null) {
    const that = this
    return new Promise((resolve, reject) => {
      if (!_.isPlainObject(command)) {
        emitErr(new JsBridgeError('指令不是一个有效的对象', 'COMMAND_IS_NOT_AN_OBJ'), reject)
      } else {
        info(`发送到客户端指令 -> ${JSON.stringify(command)}`)
        try {
          if (device.isAndroid || device.isAndroidPad) {
            // event 是硬编码, android 参考webView.evaluateJavascript方法
            const data = _jsContext.event(JSON.stringify(command))
            info(`fireEvent ${command.event}: ${command.action} -> android 客户端返回的信息: ${data}`)
            try {
              const res = JSON.parse(data)
              if (_.isFunction(_onParseClientResp)) {
                const busiErrFlag = that::_onParseClientResp(res)
                if (busiErrFlag) {
                  reject(res)
                } else {
                  resolve(res)
                }
              } else {
                resolve(res)
              }
            } catch (e) {
              emitErr(new JsBridgeError(`解析安卓客户端返回的结果出错[${e.message}]`, 'PARSE_ANDROID_RES_ERR'), reject, true)
            }
          } else if (device.isIphone || device.isIpod || device.isIpad) {
            const callBackName = `__callback__${new Date().getTime() + (Math.random() * 10).toFixed(5).toString().replace('.', '')}`
            window[callBackName] = function (data) {
              try {
                info(`fireEvent ${command.event}: ${command.action} -> ios 客户端返回的信息: ${data}`)
                const res = JSON.parse(data)
                if (_.isFunction(_onParseClientResp)) {
                  const busiErrFlag = that::_onParseClientResp(res)
                  if (busiErrFlag) {
                    reject(res)
                  } else {
                    resolve(res)
                  }
                } else {
                  resolve(res)
                }
                window[callBackName] = undefined
              } catch (e) {
                emitErr(new JsBridgeError(`解析安卓客户端返回的结果出错[${e.message}]`, 'PARSE_ANDROID_RES_ERR'), reject, true)
              }
            }
            const p = { ...{
              callback: callBackName
            },
            ...command
            }
            // postMessage 是硬编码
            _jsContext.postMessage(JSON.stringify(p))
          } else if (command.mode === 'ELECTRON') {
            // For node todo something  node-sending-service.js
            if (!_.isNil(that.sendingService)) {
              that.sendingService(command).then((res) => {
                resolve(res)
              }).catch(error => {
                if (_.isNil(error) || JSON.stringify(error) === '{}') {
                  emitErr(new JsBridgeError('ELECTRON客户端发送交易错误', 'ELECTRON_SERVICE_ERROR'), reject, true)
                } else {
                  emitErr(new JsBridgeError(error.message, error.code), reject, true)
                }
              })
            } else {
              emitErr(new JsBridgeError('没有找到ELECTRON环境下对应sendingService方法', 'ELECTRON_ERROR_SERVICE_UNDEFINED'), reject, true)
            }
          } else {
            emitErr(new JsBridgeError('不支持当前运行环境', 'RUN_EVN_NOT_SUPPORT'), reject, true)
          }
        } catch (e) {
          // 这里需要捕获一些，客户端没有捕获到的抛出来的异常：
          // 如：[INFO:CONSOLE(90)] "Uncaught Error: Java exception was raised during method invocation", source: file:///android_asset/test.html (90)
          switch (e.message) {
            case 'Cannot read property \'event\' of undefined':
              _mixinPreCheck = false
              break
            default:
          }
          emitErr(new JsBridgeError(`请求客户端出错[${e.message}]`, `FIRE_EVENT_ERROR`), reject)
        }
      }
    })
  }
}

export default plugin

export const install = function (Vue, {
  /**
   * 标识当前是否运行在客户端环境，一般都是订制的客户端环境，可以进行JSBridge交互的环境，而非微信客户端这样的意思
   * [*] {Boolean}
   * <p>
   * + 方便应用手动控制是否加载当前模块，如果插件直接检测客户端运行环境，那么交互mock势必更加困难
   * + runNative属性将会被注入到`$vp`对象上，方便应用在开发过程中根据`$vp.runNative`去区别运行环境
   */
  runNative = false,
  jsBridge: {
    /**
     * [*] `$vp#onParseClientResp(res)`
     * 当客户端返回结果之后会回调该钩子，应用可以通过该函数来判断客户端返回的消息是否正确，意思就和`util-http.js`模块一样，这里的是否正确，
     * 是业务级别的；
     * return true 标识业务级别成功，否则为失败，这里的判断直接影响`$vp#fireEvent`返回的Promise是调用失败还是成功处理流程，如果不定义该配置项，那么`$vp#fireEvent`将会直接返回成功
     */
    onParseClientResp,
    /**
     * 客户端暴露给前端的全局对象名称
     * [*] {String}
     * <p>
     * 模块安装的时候回检测当前运行环境中是否存在这样一个名称的上下文对象
     */
    name = 'ViewPlus',
    /**
     * 标识是否启用当前模块
     * [可选] {Boolean}
     * <p>
     * + 有一种情况，应用希望手动设置`$vp.runNative`标识，以便程序可以方便知道自己的运行环境，但是又不想使用当前模块，这种情况，就可以单独把这里配置为false
     * 当然如果`$vp.runNative`已经被设置为false，那么还需要这个模块干嘛呢？
     */
    enable = runNative,
    installed = null
  } = {}
} = {}) {
  if (runNative && enable) {
    _onParseClientResp = onParseClientResp
    if (device.isIpad || device.isIphone || device.isIpod) {
      if (!global.webkit || !global.webkit.messageHandlers) {
        _mixinPreCheck = false
      } else {
        _jsContext = global.webkit.messageHandlers[name]
        if (!_.isObject(_jsContext)) {
          _mixinPreCheck = false
        }
      }
    } else if (device.isAndroid || device.isAndroidPad) {
      _jsContext = global[name]
      if (!_.isObject(_jsContext)) {
        _mixinPreCheck = false
      }
    } else {
      _mixinPreCheck = false
    }
  } else {
    _mixinPreCheck = false
  }
  if (!_mixinPreCheck) {
    emitErr(new JsBridgeError(`JsBridge检测失败，不支持当前运行环境，无法添加${modelName}模块！`, 'RUN_EVN_NOT_SUPPORT'), null, true)
  }
  _installed = installed
  MixinPlugin.mixin(Vue, plugin, modelName)
}
