import axios from 'axios'
import qs from 'qs'
import MixinPlugin from '../util/mixin-plugin'
import { callFunc, callFunc2 } from '../util/funcs'
import loginStateCheck from './login-state-check'
import { assert, info, warn, emitErr, checkVp } from '../util/warn'
import { JsBridgeError } from './js-bridge-context'
import {
  UNRESOLVED_ERROR_MESSAGE,
  ERR_DEFAULT,
  PLUGIN_CONSOLE_LOG_FLAG
} from '../gloabl-dict'
import _ from 'lodash'

export const modelName = 'util-http'
export const GET = 'GET'
export const POST = 'POST'
export const POST_JSON = 'POST_JSON'
export const PUT = 'PUT'
export const DELETE = 'DELETE'
export const NATIVE = 'NATIVE'

let _debug,
  _Vue,
  _router,
  _vp,
  _instance,
  _timeout,
  _withCredentials,
  _defMode,
  _onPageTo,
  _onPageReplace,
  _onPageNext,
  _onPageGoBack,
  _onPageHref,
  _onSendAjaxRespErr,
  _onSendAjaxParamsHandle,
  _onSendAjaxRespHandle,
  _onReqErrParseMsg,
  _onReqErrParseHttpStatusCode,
  _defShowLoading,
  _dataKey,
  _statusCodeKey,
  _statusCode,
  _errCodeKey,
  _errMsgKey,
  _msgKey,
  _errInfoOutDataObj,
  _onParseServerResp,
  _sessionTimeOut,
  _noNeedDialogHandlerErr,
  _onSessionTimeOut,
  _unauthorized,
  _onUnauthorized,
  _eventName,
  _actionName,
  _errDialog,
  _loading,
  _hideLoading,
  _installed

const _getResData = function (response, isRead2DataKey = true) {
  let res = response
  if (_.isObject(response)) {
    // axios 默认resp中是data作为key
    if (_.has(response, 'data')) {
      res = response.data
    }
    if (_.isObject(res) && isRead2DataKey && !_.isEmpty(_dataKey) && _.has(res, _dataKey)) {
      res = res[_dataKey]
      if (!_.isObject(res)) {
        // 返回的业务数据必须是一个对象，以防止下面需要获取的属性时候出错
        warn(`解析响应数据，得到的不是一个对象：${res}`)
      }
    }
  } else {
    warn(`返回数据不是一个对象：${response}`)
  }
  return res
}

const _parseServerResp = function (response) {
  let errflag = true
  if (_.isFunction(_onParseServerResp)) {
    errflag = _onParseServerResp(response)
  } else {
    const data = _getResData(response)
    let scode = ''

    if (_.isObject(data) && _.has(data, _statusCodeKey)) {
      scode = data[_statusCodeKey]
    }
    if (_.isEmpty(scode)) {
      // 如果业务代码不存在，则视为错误返回结果
      warn(`业务代码解析错误,返回数据没有${_statusCodeKey}对应的值！`)
    }
    if (scode === _statusCode) {
      // 业务标识本次请求成功，只有匹配【业务成功】才标识当前请求成功
      errflag = false
    }
  }
  return errflag
}

/**
 * 解析服务端返回业务错误消息数据
 * @private
 */
const _getErrMsg = function (data) {
  // 解析返回业务数据：
  let errmsg = _.isEmpty(_errMsgKey) ? data[_msgKey] : data[_errMsgKey]
  if (_.isEmpty(errmsg)) {
    errmsg = `${UNRESOLVED_ERROR_MESSAGE}`
    warn(`未能解析到错误消息，返回默认错误消息：${errmsg}`)
  }
  return errmsg
}

const _handlerBusinessErrMsg = function (response) {
  // 有些后端返回的消息状态【如statu和错误标识码errcode】是需要分离的
  const errCode = _.isEmpty(_errCodeKey) ? response[_statusCodeKey] : response[_errCodeKey]
  // 需要进行而外处理的错误
  if (Array.isArray(_sessionTimeOut) && _sessionTimeOut.includes(errCode)) {
    loginStateCheck.modifyLoginState(false)
    this::callFunc2(_onSessionTimeOut, '用户登录会话超时！onSessionTimeOut回调函数未定义', response)
  } else if (Array.isArray(_unauthorized) && _unauthorized.includes(errCode)) {
    this::callFunc2(_onUnauthorized, '用户无权访问该资源！onUnauthorized回调函数未定义', response)
  } else {
    // 不需要进行而外处理的错误
    if (!Array.isArray(_noNeedDialogHandlerErr) || !_noNeedDialogHandlerErr.includes(errCode)) {
      // 错误标识符改成可配置
      let errMsg = _getErrMsg(response)
      if (_.isFunction(_onReqErrParseMsg)) {
        // onReqErrParseMsg回调返回非空字符，视为应用自己来解析了本次错误消息，否则还是用插件解析的为准
        const tempErrMsg = this::_onReqErrParseMsg(response, errMsg)
        if (!tempErrMsg || _.isEmpty(tempErrMsg)) {
          warn(`onReqErrParseMsg钩子返回的解析到的错误消息为空`)
        } else {
          errMsg = tempErrMsg
        }
      }
      this::_errDialog(errMsg)
    }
  }
}

/**
 * 处理通用的和服务端交互的错误信息，直接将错误信息解析以dialog的方式弹出，给应用预留了一个钩子 onSendAjaxRespErr，如果该函数（onSendAjaxRespErr）返回true则表示应用已经处理了本次请求的错误，否则交给插件进行处理。
 * onSendAjaxRespErr钩子是针对于没有那么通用的，但是在某些应用看来又是他们的需要统一处理的错误，给应用一次自己消化的机会。
 * @param needHandlerErr 是否需要弹错误提示框
 * @param response 这个值可能是服务端响应的结果&异常对象
 * @private
 */
const _handlerErr = function (needHandlerErr, response) {
  if (_debug) {
    console.log(`${PLUGIN_CONSOLE_LOG_FLAG} handler err: `, response)
  }
  try {
    let selfHandlerErr = false
    if (_.isFunction(_onSendAjaxRespErr)) {
      selfHandlerErr = this::_onSendAjaxRespErr(response)
    }
    if (!selfHandlerErr && needHandlerErr) {
      if (_.isError(response) && response instanceof JsBridgeError) {
        this::_errDialog(`${response.message} [${response.code}]`)
      } else if (_.isError(response)) {
        if (_.has(response, 'response.data') && (_.has(response.response.data, `${_statusCodeKey}`) || (_.has(response.response.data, `${_errCodeKey}`)))) {
          // 某些返回状态码是`500`，但是业务数据还是在`response.data`中
          this::_handlerBusinessErrMsg(response.response.data)
        } else {
          // 细化错误消息
          const errMsg = response.message
          if (/Network Error/.test(errMsg)) {
            this::_errDialog('网络异常，请稍后尝试')
          } else if (/timeout/.test(errMsg)) {
            this::_errDialog('请求超时，请稍后尝试')
          } else {
            let errmsg
            // 检测`http`响应状态码属性
            if (_.has(response, ['response', 'status'])) {
              // 按响应状态码解析错误
              const statusFlag = response.response.status
              this::callFunc2(_onReqErrParseHttpStatusCode, 'onReqErrParseHttpStatusCode Not configured', statusFlag, response)
              switch (statusFlag) {
                case 400:
                  errmsg = '请求错误'
                  break
                case 401:
                  errmsg = '未授权，请登录'
                  break
                case 403:
                  errmsg = '拒绝访问'
                  break
                case 404:
                  errmsg = `404 找不到待请求的资源: ${response.response.config.url}`
                  break
                case 408:
                  errmsg = '请求超时'
                  break
                case 500:
                  errmsg = `500 服务器内部错误 [${errMsg}]`
                  break
                case 501:
                  errmsg = '服务未实现'
                  break
                case 502:
                  errmsg = '网关错误'
                  break
                case 503:
                  errmsg = '服务不可用'
                  break
                case 504:
                  errmsg = '网关超时'
                  break
                case 505:
                  errmsg = 'HTTP版本不受支持'
                  break
                default:
                  errmsg = `请求出错 [${errMsg}]`
                  break
              }
            } else {
              errmsg = `请求出错 [${errMsg}]`
            }
            this::_errDialog(errmsg)
          }
        }
      } else {
        this::_handlerBusinessErrMsg(response)
      }
    } else {
      warn(`不处理默认错误消息，因为请求needHandlerErr设置为true或者onSendAjaxRespErr已经自行处理了本次错误`)
    }
  } catch (e) {
    warn(`处理业务逻辑错误返回数据出错 ${e}`)
    if (needHandlerErr) {
      this::_errDialog(`${ERR_DEFAULT} [${e.message}]`)
    }
  }
}

const _p = function (obj, key, val) {
  if (val) {
    obj[key] = val
  }
}

const _createAxiosInstance = function ({
  utilHttp: {
    baseURL = null,
    timeout = _timeout,
    /**
    * 【可选】`headers` 是即将被发送的自定义请求头
    */
    headers = null,
    /**
    * 【可选】`params` 是即将与请求一起发送的 URL 参数必须是一个无格式对象(plain object)或 URLSearchParams 对象
    */
    params = null,
    withCredentials = _withCredentials
  } = {}
} = {}) {
  const options = {}
  _p(options, 'baseURL', baseURL)
  _p(options, 'timeout', timeout)
  _p(options, 'headers', headers)
  _p(options, 'params', params)
  _p(options, 'withCredentials', withCredentials)
  _instance = axios.create(options)

  _instance.interceptors.request.use(
    config => {
      return config
    },
    error => {
      _vp = checkVp(_Vue)
      _vp::callFunc2(_hideLoading)
      return Promise.reject(error)
    }
  )

  _instance.interceptors.response.use(
    response => {
      try {
        if (_.isFunction(_onSendAjaxRespHandle)) {
          response = _onSendAjaxRespHandle(response)
        }
        const errflag = _parseServerResp(response)
        if (errflag) {
          // 如果错误信息不是在{@link _dataKey}指向的对象中，而是在最外层，那么就不需要读取dataKey
          return Promise.reject(_getResData(response, !_errInfoOutDataObj))
        } else {
          return response
        }
      } catch (e) {
        return Promise.reject(e)
      }
    },
    reqerror => {
      return Promise.reject(reqerror)
    }
  )
}

const _get = function ({url, axiosOptions = {}, params = {}}) {
  const options = {...axiosOptions, params}
  return _instance.get(url, options)
}

const _post = function ({url, axiosOptions = {}, params = {}}) {
  let urlParams = qs.stringify(params)
  return _instance.post(url, urlParams, axiosOptions)
}

const _hLoading = function (showLoading) {
  if (showLoading) {
    this::callFunc2(_hideLoading)
  }
}

/**
 * util-http.js 模块对axios进行了一次封装，目的是为了减少开发人员的工作量，简化和服务器端、客户端（JSBridge 代理请求）的交互，配合login-state-check.js模块进行身份认证权限控制。
 */
const plugin = {
  /**
   * 当前模块安装完毕之后会被回调一次
   */
  installed() {
    if (_.isFunction(_installed)) {
      this::_installed()
    }
  },
  /**
   * 获取插件配置的axios实例对象
   * @returns {*}
   */
  getAjaxInstance() {
    return _instance
  },
  /**
   * 通过自定义axios options配置，重新创建axios实例对象
   * @param options
   */
  ajaxUpdateInstance(options) {
    this::_createAxiosInstance(options)
  },
  /**
   * $vp.onParseServerResp(response)
   * 统一业务级别错误接口
   * <p>
   * 方便应用自己调用该方法判断业务级别错误，如在`$vp#ajaxAll`时候，插件没有帮应用进行业务成功与否的判断，应用可以调用`$vp#$vp.onParseServerResp(response)`来调用统一业务级别错误接口来根据自己的需求对判断进行后续处理
   * @returns {Boolean} true 标识业务级别成功，否则为失败
   */
  onParseServerResp(response) {
    return this::_parseServerResp(response)
  },
  /**
   * 执行多个并发请求，应用需要自行解析返回结果数组
   * @param {Array} [ajaxArr=[]] 每一个item都可以配置为`UtilHttp#ajaxMixin`的参数，排除`showLoading和loadingHintText`
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @returns {Promise} 注意返回的是一个二维数组，每一个item就是一个axios默认的响应结果，需要自己手动处理，如：
   * const res = _.map(resArr, (item) => {
   *          return item.data
   *        })
   * 取出每个交易的响应内容
   * @returns {Promise<any>}
   */
  ajaxAll(ajaxArr = [], {
    showLoading = _defShowLoading,
    loadingHintText = '加载中...'
  } = {}) {
    return new Promise((resolve, reject) => {
      if (ajaxArr.length <= 0) {
        reject(new Error(`${PLUGIN_CONSOLE_LOG_FLAG} 需要进行并发的请求函数ajaxArr参数${ajaxArr}不正确! `))
      }
      const iterable = []
      ajaxArr.forEach((p) => {
        const mode = p.mode || POST
        if (mode === POST) {
          iterable.push(_post(p))
        } else if (mode === GET) {
          iterable.push(_get(p))
        }
      })
      if (iterable.length <= 0) {
        reject(new Error(`${PLUGIN_CONSOLE_LOG_FLAG} 需要进行并发的请求函数ajaxArr参数${ajaxArr}解析错误! `))
      }
      if (showLoading) {
        this::callFunc(_loading, loadingHintText)
      }
      resolve(axios.all(iterable))
    })
  },
  /**
   * ajaxMixin(url[, config])
   * 支持普通的Ajax GET/POST(默认)请求 和 客户端桥接访问
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数，支持method【'GET'| 'POST'| 'NATIVE', 'PUT'】
   * @param {Object} [axiosOptions={}] axios options
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @param {Boolean} [needHandlerErr=true] 是否需要进行默认的错误处理，方便某些**零星交易**不需要进行统一业务逻辑处理的时候，绕过插件提供的业务处理逻辑，此外也可以通过配置`$vp#onSendAjaxRespErr`来进行统一业务处理的**应用统一前置处理**
   * @param {String} [mode='POST'] 请求的method【'GET'| 'POST'| 'NATIVE'】，默认使用初始化配置时候传递的`utilHttpInstall#mode = POST`参数赋初值
   * @returns {Promise}
   */
  ajaxMixin(url, {
    params = {},
    axiosOptions = {},
    showLoading = _defShowLoading,
    loadingHintText = '加载中...',
    needHandlerErr = true,
    mode = _defMode
  } = {}) {
    if (!url) {
      return Promise.reject(new Error(`${PLUGIN_CONSOLE_LOG_FLAG} 请求url链接不正确! `))
    }
    this::_hLoading(showLoading)
    if (showLoading) {
      this::callFunc(_loading, loadingHintText)
    }
    info(`请求[${mode}]后台的url: ${url} params: ${JSON.stringify(params)}`)
    if (mode === NATIVE) {
      return new Promise((resolve, reject) => {
        if (_.isFunction(_onSendAjaxParamsHandle)) {
          params = this::_onSendAjaxParamsHandle(url, params, mode)
        }
        const that = this
        const listenerName = `__listener__${new Date().getTime() + (Math.random() * 10).toFixed(5).toString().replace('.', '')}`
        window[listenerName] = function (data) {
          this::_hLoading(showLoading)
          try {
            if (_.isFunction(_onSendAjaxRespHandle)) {
              data = _onSendAjaxRespHandle(data)
            }
            const response = JSON.parse(data)
            // 需要对是否为服务端业务状态进行判断
            const isErr = _parseServerResp(response)
            if (isErr) {
              that::_handlerErr(needHandlerErr, response)
              reject(response)
            } else {
              resolve(_getResData(response))
            }
          } catch (e) {
            reject(new Error(`解析客户端返回的请求数据出错[${e.message}]`))
          }
        }
        const command = {
          event: _eventName,
          action: _actionName,
          listener: listenerName,
          params: {
            transcode: url,
            timeout: _.has(axiosOptions, 'timeout') ? axiosOptions.timeout : _timeout,
            params,
            axiosOptions
          }
        }
        this.fireEvent(command).then(response => {
          warn(`发送[${url}]请求，客户端已经接收，[${JSON.stringify(response)}]`)
        }).catch(err => {
          this::_hLoading(showLoading)
          this::_handlerErr(needHandlerErr, err)
          reject(err)
        }).finally(this::_hLoading(showLoading))
      })
    } else {
      // return _req(url, params, axiosOptions, showLoading, needHandlerErr, mode)
      return new Promise((resolve, reject) => {
        let reqP
        if (_.isFunction(_onSendAjaxParamsHandle)) {
          params = _onSendAjaxParamsHandle(url, params, mode)
        } else {
          switch (mode) {
            case POST:
              params = qs.stringify(params)
              reqP = _instance.post(url, params, axiosOptions)
              break
            case POST_JSON:
              reqP = _instance.post(url, params, axiosOptions)
              break
            case PUT:
              reqP = _instance.put(url, params, axiosOptions)
              break
            case DELETE:
              // https://blog.csdn.net/qq383366204/article/details/80268007
              // https://cloud.tencent.com/developer/article/1147735
              reqP = _instance.delete(url, {data: params}, axiosOptions)
              break
            default:
              reqP = _instance.get(url, params, axiosOptions)
          }
        }
        reqP
          .then((response) => {
            resolve(_getResData(response))
          })
          .catch((err) => {
            this::_handlerErr(needHandlerErr, err)
            reject(err)
          })
          .finally(this::_hLoading(showLoading))
      })
    }
  },
  /**
   * 发送GET请求
   * <p>
   * 底层交由`$vp#ajaxMixin`处理
   *
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数，支持method【'GET'| 'POST'| 'NATIVE'】
   * @param {Object} [axiosOptions={}] axios options
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @param {Boolean} [needHandlerErr=true] 是否需要进行默认的错误处理，方便某些**零星交易**不需要进行统一业务逻辑处理的时候，绕过插件提供的业务处理逻辑，此外也可以通过配置`$vp#onSendAjaxRespErr`来进行统一业务处理的**应用统一前置处理**
   * @returns {Promise}
   */
  ajaxGet(url, {
    params = {},
    axiosOptions = {},
    showLoading = _defShowLoading,
    loadingHintText = '加载中...',
    needHandlerErr = true
  } = {}) {
    return this.ajaxMixin(url, {params, axiosOptions, showLoading, loadingHintText, needHandlerErr, mode: GET})
  },
  /**
   * 发送POST请求
   * <p>
   * 底层交由`$vp#ajaxMixin`处理
   *
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数
   * @param {Object} [axiosOptions={}] axios options
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @param {Boolean} [needHandlerErr=true] 是否需要进行默认的错误处理，方便某些**零星交易**不需要进行统一业务逻辑处理的时候，绕过插件提供的业务处理逻辑，此外也可以通过配置`$vp#onSendAjaxRespErr`来进行统一业务处理的**应用统一前置处理**
   * @returns {*|Promise}
   */
  ajaxPost(url, {
    params = {},
    axiosOptions = {},
    showLoading = _defShowLoading,
    loadingHintText = '加载中...',
    needHandlerErr = true
  } = {}) {
    axiosOptions = {...{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, ...axiosOptions}
    return this.ajaxMixin(url, {params, axiosOptions, showLoading, needHandlerErr, mode: POST})
  },
  /**
   * 发送POST请求
   * <p>
   * 参数为json对象
   *
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数
   * @param {Object} [axiosOptions={}] axios options
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @param {Boolean} [needHandlerErr=true] 是否需要进行默认的错误处理，方便某些**零星交易**不需要进行统一业务逻辑处理的时候，绕过插件提供的业务处理逻辑，此外也可以通过配置`$vp#onSendAjaxRespErr`来进行统一业务处理的**应用统一前置处理**
   * @returns {*|Promise}
   */
  ajaxPostJson(url, {
    params = {},
    axiosOptions = {},
    showLoading = _defShowLoading,
    loadingHintText = '加载中...',
    needHandlerErr = true
  } = {}) {
    axiosOptions = {...{headers: {'Content-Type': 'application/json'}}, ...axiosOptions}
    return this.ajaxMixin(url, {params, axiosOptions, showLoading, needHandlerErr, mode: POST_JSON})
  },
  /**
   * 发送`PUT`请求
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数
   * @param {Object} [axiosOptions={}] axios options
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @param {Boolean} [needHandlerErr=true] 是否需要进行默认的错误处理，方便某些**零星交易**不需要进行统一业务逻辑处理的时候，绕过插件提供的业务处理逻辑，此外也可以通过配置`$vp#onSendAjaxRespErr`来进行统一业务处理的**应用统一前置处理**
   * @returns {*|Promise}
   */
  ajaxPut(url, {
    params = {},
    axiosOptions = {},
    showLoading = _defShowLoading,
    loadingHintText = '加载中...',
    needHandlerErr = true
  } = {}) {
    return this.ajaxMixin(url, {params, axiosOptions, showLoading, needHandlerErr, mode: PUT})
  },
  /**
   * 发送`DELETE`请求
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数
   * @param {Object} [axiosOptions={}] axios options
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @param {Boolean} [needHandlerErr=true] 是否需要进行默认的错误处理，方便某些**零星交易**不需要进行统一业务逻辑处理的时候，绕过插件提供的业务处理逻辑，此外也可以通过配置`$vp#onSendAjaxRespErr`来进行统一业务处理的**应用统一前置处理**
   * @returns {*|Promise}
   */
  ajaxDel(url, {
    params = {},
    axiosOptions = {},
    showLoading = _defShowLoading,
    loadingHintText = '加载中...',
    needHandlerErr = true
  } = {}) {
    return this.ajaxMixin(url, {params, axiosOptions, showLoading, needHandlerErr, mode: DELETE})
  },
  /**
   * 通过`window.location.href`进行页面跳转
   * <p>
   * 跳转前会通知`utilHttpInstall#onPageHref(url)`钩子函数，如果配置
   * @param url
   * @returns {$vp}
   */
  pageHref(url) {
    if (!_.isRegExp('/^((https|http|ftp|rtsp|mms)?://)\' +\n' +
      '        "?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?" +\n' +
      '        \'(([0-9]{1,3}\\.){3}[0-9]{1,3}\' +\n' +
      '        \'|\' +\n' +
      '        "([0-9a-z_!~*\'()-]+\\.)*" +\n' +
      '        \'([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\.\' +\n' +
      '        \'[a-z]{2,6})\' +\n' +
      '        \'(:[0-9]{1,4})?\' +\n' +
      '        \'((/?)|\' +\n' +
      '        "(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$/')) {
      assert(`url: ${url}格式错误！`)
    }
    this::callFunc(_onPageHref, url)
    window.location.href = url
    return this
  },
  /**
   * n个页面回退(基于Router)
   * <p>
   * 跳转前会通知`utilHttpInstall#onPageTo(n, router)`钩子函数，如果配置
   * @returns {$vp}
   */
  pageTo(n = -1) {
    this::callFunc(_onPageTo, n, _router)
    if (_router) {
      _router.go(n)
    } else {
      assert(`router配置参数未传递，导航无法执行！`)
    }
    return this
  },
  /**
   * 单个页面回退(基于Router)
   * <p>
   * 跳转前会通知`utilHttpInstall#onPageGoBack(router)`钩子函数，如果配置
   * @returns {$vp}
   */
  pageGoBack() {
    this::callFunc(_onPageGoBack, _router)
    if (_router) {
      _router.go(-1)
    } else {
      assert(`router配置参数未传递，导航无法执行！`)
    }
    return this
  },
  /**
   * 页面导航(基于Router)
   * <p>
   * 跳转前会通知`utilHttpInstall#onPageNext(location, router)`钩子函数，如果配置
   * @param location
   * @returns {plugin}
   */
  pageNext(location = {path: '/'}) {
    this::callFunc(_onPageNext, location, _router)
    if (_.isString(location)) {
      location = {path: location}
    }
    if (!(_.has(location, 'path')) && !(_.has(location, 'name'))) {
      assert(`路由地址有误! ${location}`)
    } else {
      if (_router) {
        _router.push(location)
      } else {
        assert(`router配置参数未传递，导航无法执行！`)
      }
      return this
    }
  },
  /**
   * 页面导航(基于Router)，移除上一个页面
   * <p>
   * 跳转前会通知`utilHttpInstall#onPageReplace(location, router)`钩子函数，如果配置
   * @param location
   * @returns {plugin}
   */
  pageReplace(location = {path: '/'}) {
    this::callFunc(_onPageReplace, location, _router)
    if (_router) {
      _router.replace(location)
    } else {
      assert(`router配置参数未传递，导航无法执行！`)
    }
    return this
  }
}

export default plugin

export const install = function (Vue, {
  debug = false,
  router,
  utilHttp: {
    /**
     * 【可选】当前模块安装完毕之后会被回调一次
     */
    installed = null,
    /**
     * 【可选】`timeout` 指定请求超时的毫秒数(0 表示无超时时间), 如果请求话费了超过 `timeout` 的时间，请求将被中断
     * <p>
     * [axios#config.timeout](https://github.com/axios/axios#request-config)
     */
    timeout = 6000,
    /**
     * 表示跨域请求时是否需要使用凭证
     * <p>
     * [axios#config.timeout](https://github.com/axios/axios#request-config)
     */
    withCredentials = false,
    /**
     * 【可选】默认请求的method【'GET'| 'POST'| 'NATIVE'】
     *  <p>
     *  提示：如果整个应用的大部分交易都需要使用**客户端代理转发请求（涉及到前端和客户端的交互，也就是JSBridge交互，我们已经有了一套android-viewplus 一个安卓混合客户端开发库，来解决JSBridge客户端交互流程）**，
     *  那么这里需要配置为'NATIVE'，这样基本上所有交易（调用$vp#ajaxMixin）都会走代理，如果某一个交易需要使用**ajax**，则在调用的时候手动设置`$vp#ajaxMixin.mode`参数进行覆盖
     */
    mode = 'POST',
    /**
     * 【可选】`$vp#onSendAjaxParamsHandle(url, params, mode)=>{}`
     * 配置发请求之前的参数处理回调函数，在每一次发送请求前调用，返回的对象作为发送请求的参数
     * <p>
     * 如果配置该函数，则表示不需要插件做处理(目前插件只对POST方式的请求做`qs.stringify(params)`处理)
     */
    onSendAjaxParamsHandle = null,
    /**
     * 服务端返回的数据中标识当前此次请求是否是业务层面的成功的**业务状态**的key
     * 如果配置了`UtilHttp#onParseServerResp`则无需配置该选项
     * <p>
     * 如服务端返回：{code:[1|0]}，用code返回业务状态，这里就配置为`code`
     */
    statusCodeKey = 'code',
    /**
     * 服务端返回的数据中标识当前此次请求是否是业务层面的成功的**业务状态**的值
     * 如果配置了`UtilHttp#onParseServerResp`则无需配置该选项
     * <p>
     * 如服务端返回：{code:[1|0]}，用code返回业务状态，其中1标识为**成功**，这里就配置为`1`
     */
    statusCode = '1',
    /**
     * 【可选】`$vp#onSendAjaxRespHandle(response)=>{}`服务器返回的数据处理，如果配置该函数，则会第一时间将后台返回数据先交给该函数进行预处理
     * <p>
     * 返回的**预处理响应结果对象**之后，才会再进行统一业务判断等后续处理逻辑
     */
    onSendAjaxRespHandle = null,
    /**
     * 【可选】`$vp#onParseServerResp(response)=>[true|false]`
     * 应用手动进行业务逻辑成功与否的判断回调函数，如果配置了该回调函数，则无需配置`UtilHttp#statusCode && UtilHttp#statusCodeKey`
     * <p>
     * return true标识请求成功|false标识请求出错，插件将会查找返回响应数据中该`UtilHttp#[msgKey|errMsgKey]`对应的消息，调用`UtilHttp#errDialog`反馈给用户
     */
    onParseServerResp = null,
    /**
     * 【可选】`$vp#onSendAjaxRespErr(response)`
     * 当发生业务级错误时候被调用,如果该函数返回true则表示应用已经处理了本次请求的错误，否则交给插件进行处理，插件就会查找返回响应数据中该`UtilHttp#[msgKey|errMsgKey]`对应的消息，调用`UtilHttp#errDialog`反馈给用户
     */
    onSendAjaxRespErr = null,
    /**
     * 【可选】服务端返回的数据中错误码的key（可选，看对应的后端是否存在，有些应用直接通过`UtilHttp#statusCode`来替代）
     * <p>
     * 如服务端返回：{code:[1|0],err_code:'auth_err'}，用err_code返回错误码，这里就配置为`err_code`,没有的话插件会读取`code`作为错误码，**然后根据错误码做[会话超时|权限不足|无效弹出错误dialog]的判断**
     */
    errCodeKey = '',
    /**
     * 【可选】当发生业务级错误时候不需要插件弹出错误消息的规则集合（使用数组格式），配置响应后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码
     *  <p>
     *  如服务端返回：{code:[1|0],err_code:'auth_err'}，`auth_err`就可以作为这里的配置项：['auth_err']，当插件检测到当前错误码在这个集合中，就不会弹出错误消息
     */
    noNeedDialogHandlerErr = null,
    /**
     * 访问控制规则
     */
    accessRules: {
      /**
       * 【可选】会话超时规则集合（使用数组格式），当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码与之匹配
       *  <p>
       *  如服务端返回：{code:[1|0],err_code:'session_time_out'}，`session_time_out`就可以作为这里的配置项：['session_time_out']，用于标识这个是一个会话过期的错误，当插件检测到当前错误码在这个集合中，
       *  就会调用`UtilHttp#onSessionTimeOut`回调函数，通知应用，以便应用进行重新登录等提示，因为检测会话是否超时，一般是在请求到后台需要进行身份认证的接口才会触发；其次，插件会调用`loginStateCheckInstall.modifyLoginState`
       *  清除插件主动维护的登录状态和持久化登录信息，详见`login-state-check.js`模块对应接口
       */
      sessionTimeOut = null,
      /**
       * 【可选】$vp#onSessionTimeOut(response)
       * 当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码判断为会话超时的时候被回调
       */
      onSessionTimeOut = null,
      /**
       * 【可选】权限不足规则集合（使用数组格式），当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码与之匹配
       *  <p>
       *  如服务端返回：{code:[1|0],err_code:'auth_fail'}，`auth_fail`就可以作为这里的配置项：['auth_fail']，用于标识这个是一个权限不足的错误，当插件检测到当前错误码在这个集合中，
       *  就会调用`UtilHttp#onUnauthorized`回调函数，通知应用，以便应用进行提示或弹出页面等操作
       */
      unauthorized = null,
      /**
       * 【可选】$vp#onUnauthorized(response)
       * 当发生业务级错误时候，当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码与之匹配
       */
      onUnauthorized = null
    } = {},
    /**
     * 【可选】服务端返回的json对象存储了【业务状态码、错误消息、实际需要返回给前端的数据的】对象的key，有些后台接口有，有些没有
     * <p>
     * 如服务端返回：{code:[1|0], rdata:{}}，用rdata返回实际的交易数据，这里就配置为`rdata`,否则不用配置
     * <p>
     * 如果存在该配置，那么在请求成功之后，返回的`Promise#resolve`中获得的将是[服务器响应结果.dataKey]的值，而`Promise#reject`中获得的将会根据`UtilHttp#errInfoOutDataObj`配置的值来进行区别筛选
     */
    dataKey = 'data',
    /**
     * 服务端返回的数据中错误消息的key，在判断为业务级别错误的时候，会查找返回响应数据中该key对应的消息，调用`UtilHttp#errDialog`反馈给用户
     * <p>
     * 如服务端返回：{code:[1|0], msg:'您无权访问该接口'}，用msg返回实际的交易数据中错误消息，这里就配置为`msg`
     */
    msgKey = 'msg',
    /**
     * 【可选】服务端返回的数据中错误消息的key（可选，看对应的后端是否存在，有些应用直接通过`UtilHttp#msgKey`来替代）
     * <p>
     * 如服务端返回：{code:[1|0], errmsg:'您无权访问该接口'}，用errmsg返回实际的交易数据中错误消息，这里就配置为`errmsg`,否则不用配置，**插件会试图查找`UtilHttp#msgKey`**
     */
    errMsgKey = '',
    /**
     * `UtilHttp#errDialog(errMsg)`
     * 当发[请求出错|生业务级]错误时候被调用，这样就方便应用适配符合自己的UI组件
     */
    errDialog = window.alert,
    /**
     * 【可选】服务端返回的数据中错误消息是否不在`UtilHttp#dataKey`对应的对象中
     * <p>
     * 如服务端返回：{code:[1|0], rdata:{msg:'您无权访问该接口'}}，用rdata返回实际的交易数据，msg标识错误提示消息，这里就配置为`false`
     * <p>
     * 如服务端返回：{code:[1|0], rdata:{}, msg:'您无权访问该接口'}，用rdata返回实际的交易数据，msg标识错误提示消息，这里就配置为`true`
     */
    errInfoOutDataObj = false,
    /**
     * 【可选】`UtilHttp#onReqErrParseMsg(response)=>{string}`
     * 当发生业务级错误时候被调用，用于给应用提供转意或者解析错误消息的机会，如果返回的字符串为空，否显示默认解析到的错误结果。
     * <p>
     * 回调返回非空字符，视为应用处理了本次错误消息，否显示默认解析到的错误结果。
     */
    onReqErrParseMsg = null,
    /**
     * 【可选】`UtilHttp#onReqErrParseHttpStatus(status, response)`
     * 当解析到请求出错，如（401...），该函数将会被回调，用于给应用提供处理特殊`http status code`的机会
     */
    onReqErrParseHttpStatusCode = null,
    /**
     * 【可选】配置是否在发送请求的时候显示loading
     *  <p>
     *  建议修改为true，ajax的loading ui需要在配置的时候自行实现`utilHttpInstall#loading和UtilHttp#hideLoading`两个接口，这样就方便应用适配符合自己的UI组件
     */
    defShowLoading = false,
    /**
     *【可选】UtilHttp#loading(hintText)
     * <p>
     * 当发送请求的时候，会被调用，并传递发送请求时候传递的[@param loadingHintText 当需要显示loading时候，需要显示在loading上面的文字]，用于应用自己实现loading ui，这样就方便应用适配符合自己的UI组件
     */
    loading = null,
    /**
     *【可选】$vp#hideLoading()
     * <p>
     * 当发送请求出现错误或者完成请求处理的时候被调用，用来关闭loading ui组件，注意因为某些原因这里可能为出现当前请求没有需要loading，但是这个方法也会被触发
     */
    hideLoading = null,
    /**
     * JsBridge代理请求配置
     */
    ajaxMixin: {
      /**
       * 发送JSBridge请求时候`command`的事件名称，参考`js-bridge-context.js`模块关于和客户端交互的command配置
       */
      eventName = 'AjaxEvent',
      /**
       * 发送JSBridge请求时候`command`的活动名称，参考`js-bridge-context.js`模块关于和客户端交互的command配置
       */
      actionName = 'sendOriginalRequest'
    } = {},
    /**
     * 【可选】调用`$vp#pageTo(n)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageTo = null,
    /**
     * 【可选】调用`$vp#pageReplace(location)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageReplace = null,
    /**
     * 【可选】调用`$vp#pageNext(location)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageNext = null,
    /**
     * 【可选】调用`$vp#pageGoBack()`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageGoBack = null,
    /**
     * 【可选】调用`$vp#pageHref(url)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageHref = null
  } = {}
} = {}) {
  if (!router) {
    emitErr(new Error(`${modelName}模块：router未配置，将导致某些接口不可用`), null, true)
  }
  let pluginCanUse = true
  if (!_.isFunction(onParseServerResp)) {
    if (_.isEmpty(statusCode)) {
      emitErr(new Error(`${modelName}模块：业务状态码statusCode和onParseServerResp配置错误，需要二选一进行，以便于进行业务逻辑错误的判断`), null, true)
      pluginCanUse = false
    }
    if (_.isEmpty(statusCodeKey)) {
      emitErr(new Error(`${modelName}模块：业务状态码statusCode和onParseServerResp配置错误，需要二选一进行，以便于进行业务逻辑错误的判断`), null, true)
      pluginCanUse = false
    }
  }
  if (!_.isFunction(errDialog)) {
    emitErr(new Error(`${modelName}模块：建议配置errDialog，来处理统一错误的UI提示`), null, true)
  }
  if (!_.isFunction(loading) || !_.isFunction(hideLoading)) {
    warn(new Error(`${modelName}模块：建议配置loading和hideLoading，在发送请求的时候统一弹出和取消loading UI组件`), null, true)
  }
  if (pluginCanUse) {
    _debug = debug
    _Vue = Vue
    _router = router
    _errDialog = errDialog
    _loading = loading
    _hideLoading = hideLoading
    _timeout = timeout
    _withCredentials = withCredentials
    _defMode = mode
    _defShowLoading = defShowLoading
    _onPageTo = onPageTo
    _onPageReplace = onPageReplace
    _onPageNext = onPageNext
    _onPageGoBack = onPageGoBack
    _onPageHref = onPageHref
    _onSendAjaxRespErr = onSendAjaxRespErr
    _onSendAjaxParamsHandle = onSendAjaxParamsHandle
    _onSendAjaxRespHandle = onSendAjaxRespHandle
    _onReqErrParseMsg = onReqErrParseMsg
    _onReqErrParseHttpStatusCode = onReqErrParseHttpStatusCode
    _sessionTimeOut = sessionTimeOut
    _onSessionTimeOut = onSessionTimeOut
    _noNeedDialogHandlerErr = noNeedDialogHandlerErr
    _unauthorized = unauthorized
    _onUnauthorized = onUnauthorized
    _dataKey = dataKey
    _errMsgKey = errMsgKey
    _msgKey = msgKey
    _errInfoOutDataObj = errInfoOutDataObj
    _statusCodeKey = statusCodeKey
    _statusCode = statusCode
    _errCodeKey = errCodeKey
    _eventName = eventName
    _actionName = actionName
    _onParseServerResp = onParseServerResp
    // axios需要的参数给方法自身去解析
    _createAxiosInstance(arguments[1])
    _installed = installed
    MixinPlugin.mixin(Vue, plugin, modelName)
  }
}
