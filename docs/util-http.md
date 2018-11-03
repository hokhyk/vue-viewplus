# util-http.js

util-http.js 针对axios进行了二次封装的ajax模块。

模块对axios进行了一次封装，目的是为了减少开发人员的工作量，简化和服务器端、客户端（JSBridge 代理请求）的交互，配合`login-state-check.js`模块进行身份认证权限控制。

为什么我们需要再封装axios，因为我们在想要做这个插件的时候已经经历了几个项目，不管是否是前后台分离或者是否服务端是RESTFull类型服务，在发送请求和处理请求的时候，对于一个企业级（或者简单应用）都会存在或多或少的样板代码，那我们在实践的过程中就一步一步把这些样本代码抽离了业务，使得开发人员更容易关注于业务本身，这样就提高了开发效率，避免了一些不必要的错误，而这个模块提供了一下几点抽象：

+ 帮我们处理了大部分**业务级错误**。何为业务级错误？因为很多的后端返回的数据都非严格意义上的RESTFull格式的结果，这里我们关注的是很多服务都不是以http规范上的状态码**非200**来标识请求出错，而是会有一些**自定义的错误码**，这就提供给了我们进行**统一业务错误处理的冲动**，当然要在此基础上添加对规范形式的统一错误判断也就容易了
+ 帮助我们进行特殊的**请求代理**，因为**加了一层**，我们就可以做很多事情，这里我们就可以让Ajax编程非Ajax，即在移动应用开发的时候，由于**跨域和WebView Ajax发送请求很难对数据进行SSL加密证书配置**两个需求，我们可以让请求发送到客户端，然后由客户端代理前端完成请求的发送，这就涉及到前端和客户端的交互，也就是JSBridge交互，我们已经有了一套[android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)，来解决JSBridge客户端交互流程，那么我们这里就能很简单的在中间加的这一层很简单的完成上面的两个需求
+ 关于配合`login-state-check.js`模块进行身份认证权限控制，可以查看当前模块的`accessRules.sessionTimeOut`和`accessRules.onSessionTimeOut`，因为会话的真正控制一般是在后台，那么如果后台的session或token失效之后，服务端肯定会返回响应的错误，那么当前模块通过上面两个`accessRules`的配置，得以使应用拦截到这一时机，并在通知应用前，清理了插件login-state-check.js模块维护的登录状态：`loginStateCheckInstall.modifyLoginState(false)`

下面的接口可能会涉及到服务端返回数据的描述，这里我们先假定一下基本的服务端响应数据格式。

由于要服务端数据需要描述业务是否成功和业务失败的原因，因此我们来约定一下服务端返回数据的结构。

在任何情况下，服务器返回的`body`中的JSON数据必须是一个对象，用`code`返回业务状态，用`data`返回客户端要请求的实际数据，用`message`返回业务失败后的提示信息；其中`code`值为1时表示业务成功，`code`值为其它时表示业务失败；其中`data`可以是`{}|[]`。**需要特别注意**的是有些服务端会把`httpCode`同时作为业务状态码，这也是完全正确的，封装原理与本文相同。

服务端返回的数据的结构应该是：

```json
{
    "code": [1| "其他字符串，如：session_timeout_err"],
    "data": [{}|[]],
    "message": "错误提示信息|正确提示信息"
}
```

## 示例

[浏览线上示例](http://vue_viewplus_demo.jiiiiiin.cn/Demo/UtilHttp)

```html
<template>
  <div id="UtilHttp">
    <group title="ajaxMixin - GET请求" label-width="15em">
      <box gap="10px 10px">
        <x-button @click.native="doGet" :disabled="doGetBtnState">使用$vp#ajaxMixin发送GET请求</x-button>
      </box>
    </group>

    <group title="ajaxMixin - POST请求" label-width="15em">
      <box gap="10px 10px">
        <x-button @click.native="doPost" :disabled="doPostBtnState">使用$vp#ajaxMixin发送POST请求</x-button>
      </box>
    </group>

    <group title="ajaxAll请求" label-width="15em">
      <box gap="10px 10px">
        <p class="hint-msg">针对这个方法插件没有帮应用进行业务成功与否的判断，但是应用可以调用`$vp#$vp.onParseServerResp(response)`来调用统一业务级别错误接口来根据自己的需求对判断进行后续处理</p>
        <x-button @click.native.stop="doAjaxAll" :disabled="ajaxAllBtnState">使用$vp#ajaxAll发送请求</x-button>
      </box>
    </group>

    <group title="ajaxMixin - NATIVE请求" label-width="15em">
      <box gap="10px 10px">
        <span class="hint-msg-warn">该功能需要客户端JsBridge能力，如没有修改，请别点了 ；）</span><br/>
        <x-button @click.native="doHttpNative" :disabled="doHttpNativeBtnState">原生请求测试</x-button>
      </box>
    </group>

  </div>
</template>

<script type="text/ecmascript-6">
import demoMixin from './demo-mixin'
import _ from 'lodash'

export default {
  mixins: [demoMixin],
  data() {
    return {
      ajaxAllBtnState: false,
      doGetBtnState: false,
      doPostBtnState: false,
      doCORSBtnState: false,
      doHttpNativeBtnState: false
    }
  },
  methods: {
    doGet() {
      this.doGetBtnState = true
      this.$vp
        .ajaxMixin('TIMESTAMP', {
          mode: 'GET'
        })
        .then(data => {
          this.doGetBtnState = false
          this.$vp.uiDialog(
            data,
            {
              title: '请求成功，响应结果',
              showCode: true
            }
          )
        })
        .catch(resp => {
          console.log(resp)
          this.doGetBtnState = false
        })
    },
    doPost() {
      this.doPostBtnState = true
      this.$vp
        .ajaxMixin('LOGIN')
        .then(data => {
          this.doPostBtnState = false
          this.$vp.uiDialog(
            data,
            {
              title: '请求成功，响应结果',
              showCode: true
            }
          )
        })
        .catch(resp => {
          this.doPostBtnState = false
        })
    },
    doAjaxAll() {
      this.ajaxAllBtnState = true
      this.$vp
        .ajaxAll([
          {
            url: 'ALL1',
            mode: 'GET'
          }, {
            url: 'ALL2',
            mode: 'GET'
          }
        ])
        .then(resArr => {
          this.ajaxAllBtnState = false
          // 这里需要应用手动把axios的data属性解析掉
          const res = _.map(resArr, (item) => {
            return item.data
          })
          this.$vp.uiDialog(res, {
            title: '请求成功，响应结果',
            showCode: true
          })
        })
    },
    doHttpNative() {
      this.doHttpNativeBtnState = true
      this.$vp
        .ajaxMixin('TIMESTAMP', { mode: 'NATIVE' })
        .then(res => {
          this.$vp.uiDialog(res, {
            title: '请求成功，响应结果',
            showCode: true
          })
          this.doHttpNativeBtnState = false
        })
        .catch((err) => {
          this.$vp.uiDialog(err, {
            title: '请求失败，响应结果',
            showCode: true
          })
          this.doHttpNativeBtnState = false
        })
    }
}
</script>
```

示例所需配置：

```js
Vue.use(ViewPlus, {
  //...
  utilHttp: {
    baseURL: 'http://localhost:7000',
    // 这里的data key，请查看mock server的jsonp输出配置
    dataKey: 'data',
    statusCodeKey: 'code',
    statusCode: '1',
    msgKey: 'msg',
    needBase64DecodeMsg: false,
    loading(loadingHintText) {
      this.uiLoading(loadingHintText)
    },
    hideLoading() {
      this.uiHideLoading()
    },
    errDialog(content = '错误消息未定义') {
      this.dialog(content)
      return this
    },
    accessRules: {
      sessionTimeOut: ['role.invalid_user', 'validation.user.force.logout.exception'],
      onSessionTimeOut(response) {
        this.dialog(`onSessionTimeOut回调：${response.msg}`, {
          title: '回调通知'
        })
      },
      unauthorized: ['core_error_unauthorized'],
      onUnauthorized(response) {
        this.dialog(`onUnauthorized回调应用处理：${response.msg}`, {
          title: '回调通知'
        })
      }
    }
  }
})
```

## 配置

*关于axios的配置，可以参考[axios#config.timeout](https://github.com/axios/axios#request-config)*，一般标识`[axios#config.timeout](https://github.com/axios/axios#request-config)`都属于axios的配置

### baseURL *

```js
    /**
     * 【可选】`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
     * <p>
     * [axios#config.timeout](https://github.com/axios/axios#request-config)
     */
    baseURL = {String}
```

### timeout

```js
    /**
     * 【可选】`timeout` 指定请求超时的毫秒数(0 表示无超时时间), 如果请求话费了超过 `timeout` 的时间，请求将被中断
     * <p>
     * [axios#config.timeout](https://github.com/axios/axios#request-config)
     */
    timeout = 6000
```
### params

```js
    /**
     * 【可选】`params` 是即将与请求一起发送的 URL 参数必须是一个无格式对象(plain object)或 URLSearchParams 对象
     * <p>
     * [axios#config.timeout](https://github.com/axios/axios#request-config)
     */
    params = null
```

### headers

```js
    /**
     * 【可选】`headers` 是即将被发送的自定义请求头
     * <p>
     * [axios#config.timeout](https://github.com/axios/axios#request-config)
     */
    headers = null
```

### withCredentials

```js
    /**
     * 表示跨域请求时是否需要使用凭证
     * <p>
     * [axios#config.timeout](https://github.com/axios/axios#request-config)
     */
    withCredentials = false
```

### mode

```js
    /**
     * 【可选】默认请求的method【'GET'| 'POST'| 'NATIVE'】
     *  <p>
     *  提示：如果整个应用的大部分交易都需要使用**客户端代理转发请求（涉及到前端和客户端的交互，也就是JSBridge交互，我们已经有了一套android-viewplus 一个安卓混合客户端开发库，来解决JSBridge客户端交互流程）**，
     *  那么这里需要配置为'NATIVE'，这样基本上所有交易（调用$vp#ajaxMixin）都会走代理，如果某一个交易需要使用**ajax**，则在调用的时候手动设置`$vp#ajaxMixin.mode`参数进行覆盖
     */
    mode = 'POST'
```

### onSendAjaxParamsHandle

```js
    /**
     * 【可选】`$vp#onSendAjaxParamsHandle(url, params, mode)=>{}`
     * 配置发请求之前的参数处理回调函数，在每一次发送请求前调用，返回的对象作为发送请求的参数
     * <p>
     * 如果配置该函数，则表示不需要插件做处理(目前插件只对POST方式的请求做`qs.stringify(params)`处理)
     */
    onSendAjaxParamsHandle = null
```

### statusCodeKey [*]

```js
    /**
     * 服务端返回的数据中标识当前此次请求是否是业务层面的成功的**业务状态**的key
     * 如果配置了`UtilHttp#onParseServerResp`则无需配置该选项
     * <p>
     * 如服务端返回：{code:[1|0]}，用code返回业务状态，这里就配置为`code`
     */
    statusCodeKey = 'code'
```

### statusCode [*]

```js
    /**
     * 服务端返回的数据中标识当前此次请求是否是业务层面的成功的**业务状态**的值
     * 如果配置了`httpUtil#onParseServerResp`则无需配置该选项
     * <p>
     * 如服务端返回：{code:[1|0]}，用code返回业务状态，其中1标识为**成功**，这里就配置为`1`
     */
    statusCode = '1'
```

### onSendAjaxRespHandle

```js
    /**
     * 【可选】`$vp#onSendAjaxRespHandle(response)=>{}`服务器返回的数据处理，如果配置该函数，则会第一时间将后台返回数据先交给该函数进行预处理
     * <p>
     * 返回的**预处理响应结果对象**之后，才会再进行统一业务判断等后续处理逻辑
     */
    onSendAjaxRespHandle = null
```

### onParseServerResp [*]

```js
    /**
     * 【可选】`$vp#onParseServerResp(response)=>[true|false]`
     * 应用手动进行业务逻辑成功与否的判断回调函数，如果配置了该回调函数，则无需配置`UtilHttp#statusCode && UtilHttp#statusCodeKey`
     * <p>
     * return true标识请求成功|false标识请求出错，插件将会查找返回响应数据中该`UtilHttp#[msgKey|errMsgKey]`对应的消息，调用`UtilHttp#errDialog`反馈给用户
     */
    onParseServerResp = null
```

### onSendAjaxRespErr

```js
    /**
     * 【可选】`$vp#onSendAjaxRespErr(response)`
     * 当发生业务级错误时候被调用,如果该函数返回true则表示应用已经处理了本次请求的错误，否则交给插件进行处理，插件就会查找返回响应数据中该`UtilHttp#[msgKey|errMsgKey]`对应的消息，调用`UtilHttp#errDialog`反馈给用户
     */
    onSendAjaxRespErr = null
```

### errCodeKey

```js
    /**
     * 【可选】服务端返回的数据中错误码的key（可选，看对应的后端是否存在，有些应用直接通过`UtilHttp#statusCode`来替代）
     * <p>
     * 如服务端返回：{code:[1|0],err_code:'auth_err'}，用err_code返回错误码，这里就配置为`err_code`,没有的话插件会读取`code`作为错误码，**然后根据错误码做[会话超时|权限不足|无效弹出错误dialog]的判断**
     */
    errCodeKey = ''
```

### noNeedDialogHandlerErr

```js
    /**
     * 【可选】当发生业务级错误时候不需要插件弹出错误消息的规则集合（使用数组格式），配置响应后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码
     *  <p>
     *  如服务端返回：{code:[1|0],err_code:'auth_err'}，`auth_err`就可以作为这里的配置项：['auth_err']，当插件检测到当前错误码在这个集合中，就不会弹出错误消息
     */
    noNeedDialogHandlerErr = null
```

### accessRules

```js
    /**
     * 访问控制规则
     */
    accessRules: {
```

#### accessRules.sessionTimeOut

```js
      /**
       * 【可选】会话超时规则集合（使用数组格式），当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码与之匹配
       *  <p>
       *  如服务端返回：{code:[1|0],err_code:'session_time_out'}，`session_time_out`就可以作为这里的配置项：['session_time_out']，用于标识这个是一个会话过期的错误，当插件检测到当前错误码在这个集合中，
       *  就会调用`UtilHttp#onSessionTimeOut`回调函数，通知应用，以便应用进行重新登录等提示，因为检测会话是否超时，一般是在请求到后台需要进行身份认证的接口才会触发；其次，插件会调用`loginStateCheck.modifyLoginState`
       *  清除插件主动维护的登录状态和持久化登录信息，详见`login-state-check.js`模块对应接口
       */
      sessionTimeOut = null
```

#### accessRules.onSessionTimeOut

```js
      /**
       * 【可选】$vp#onSessionTimeOut(response)
       * 当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码判断为会话超时的时候被回调
       */
      onSessionTimeOut = null
```

#### accessRules.unauthorized

```js
      /**
       * 【可选】权限不足规则集合（使用数组格式），当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码与之匹配
       *  <p>
       *  如服务端返回：{code:[1|0],err_code:'auth_fail'}，`auth_fail`就可以作为这里的配置项：['auth_fail']，用于标识这个是一个权限不足的错误，当插件检测到当前错误码在这个集合中，
       *  就会调用`UtilHttp#onUnauthorized`回调函数，通知应用，以便应用进行提示或弹出页面等操作
       */
      unauthorized = null
```

#### accessRules.onUnauthorized

```js
      /**
       * 【可选】$vp#onUnauthorized(response)
       * 当发生业务级错误时候，当发生业务级错误时候，针对**会话超时**时候后台返回的`UtilHttp#[errCodeKey|statusCode]`对应错误码与之匹配
       */
      onUnauthorized = null
```

### dataKey

```js
    /**
     * 【可选】服务端返回的json对象存储了【业务状态码、错误消息、实际需要返回给前端的数据的】对象的key，有些后台接口有，有些没有
     * {String}
     * <p>
     * 如服务端返回：{code:[1|0], rdata:{}}，用rdata返回实际的交易数据，这里就配置为`rdata`,否则不用配置
     * <p>
     * 如果存在该配置，那么在请求成功之后，返回的`Promise#resolve`中获得的将是[服务器响应结果.dataKey]的值，而`Promise#reject`中获得的将会根据`UtilHttp#errInfoOutDataObj`配置的值来进行区别筛选
     */
    dataKey = 'data'
```

### msgKey

```js
    /**
     * 服务端返回的数据中错误消息的key，在判断为业务级别错误的时候，会查找返回响应数据中该key对应的消息，调用`UtilHttp#errDialog`反馈给用户
     * {String}
     * <p>
     * 如服务端返回：{code:[1|0], msg:'您无权访问该接口'}，用msg返回实际的交易数据中错误消息，这里就配置为`msg`
     */
    msgKey = 'msg'
```

### errMsgKey

```js
    /**
     * 【可选】服务端返回的数据中错误消息的key（可选，看对应的后端是否存在，有些应用直接通过`UtilHttp#msgKey`来替代）
     * <p>
     * 如服务端返回：{code:[1|0], errmsg:'您无权访问该接口'}，用errmsg返回实际的交易数据中错误消息，这里就配置为`errmsg`,否则不用配置，**插件会试图查找`UtilHttp#msgKey`**
     */
    errMsgKey = 'errmsg'
```

### errDialog [*]

```js
    /**
     * `UtilHttp#errDialog(errMsg)`
     * 当发[请求出错|生业务级]错误时候被调用，这样就方便应用适配符合自己的UI组件
     */
    errDialog = window.alert
```

### errInfoOutDataObj

```js
    /**
     * 【可选】服务端返回的数据中错误消息是否不在`UtilHttp#dataKey`对应的对象中
     * <p>
     * 如服务端返回：{code:[1|0], rdata:{msg:'您无权访问该接口'}}，用rdata返回实际的交易数据，msg标识错误提示消息，这里就配置为`false`
     * <p>
     * 如服务端返回：{code:[1|0], rdata:{}, msg:'您无权访问该接口'}，用rdata返回实际的交易数据，msg标识错误提示消息，这里就配置为`true`
     */
    errInfoOutDataObj = false
```

### onReqErrPaserMsg

```js
    /**
     * 【可选】`UtilHttp#onReqErrPaserMsg(response)=>{string}`
     * 当发生业务级错误时候被调用，用于给应用提供转意或者解析错误消息的机会，如果返回的字符串为空，否显示默认解析到的错误结果。
     * <p>
     * 回调返回非空字符，视为应用处理了本次错误消息，否显示默认解析到的错误结果。
     */
    onReqErrPaserMsg = null
```

### defShowLoading [*]

```js
    /**
     * 【可选】配置是否在发送请求的时候显示loading
     *  <p>
     *  建议修改为true，ajax的loading ui需要在配置的时候自行实现`utilHttp#loading和utilHttp#hideLoading`两个接口，这样就方便应用适配符合自己的UI组件
     */
    defShowLoading = false
```

### loading [*]

```js
    /**
     *【可选】$vp#loading(hintText)
     * <p>
     * 当发送请求的时候，会被调用，并传递发送请求时候传递的[@param loadingHintText 当需要显示loading时候，需要显示在loading上面的文字]，用于应用自己实现loading ui，这样就方便应用适配符合自己的UI组件
     */
    loading = null
```

### hideLoading [*]

```js
    /**
     *【可选】$vp#hideLoading()
     * <p>
     * 当发送请求出现错误或者完成请求处理的时候被调用，用来关闭loading ui组件，注意因为某些原因这里可能为出现当前请求没有需要loading，但是这个方法也会被触发
     */
    hideLoading = null
```

### ajaxMixin

```js
    /**
     * JsBridge代理请求配置
     */
    ajaxMixin: {
```

#### ajaxMixin.eventName

```js
      /**
       * 发送JSBridge请求时候`command`的事件名称，参考`js-bridge-context.js`模块关于和客户端交互的command配置
       */
      eventName = 'AjaxEvent',
```

#### ajaxMixin.actionName

```js
      /**
       * 发送JSBridge请求时候`command`的活动名称，参考`js-bridge-context.js`模块关于和客户端交互的command配置
       */
      actionName = 'sendOriginalRequest'
```

### onPageTo

```js
    /**
     * 【可选】调用`$vp#pageTo(n)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageTo = null
```

### onPageReplace

```js
    /**
     * 【可选】调用`$vp#pageReplace(location)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageReplace = null
```

### onPageNext

```js
    /**
     * 【可选】调用`$vp#pageNext(location)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageNext = null
```

### onPageGoBack

```js
    /**
     * 【可选】调用`$vp#pageGoBack()`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageGoBack = null
```

### onPageHref

```js
    /**
     * 【可选】调用`$vp#pageHref(url)`时，跳转前会通知当前钩子函数，如果配置
     */
    onPageHref = null
```

## API接口

### getAjaxInstance

```js
  /**
   * 获取插件配置的axios实例对象
   * @returns {*}
   */
  getAjaxInstance()
```

### ajaxUpdateInstance

```js
  /**
   * 通过自定义axios options配置，重新创建axios实例对象
   * @param options
   */
  ajaxUpdateInstance(options)
```

### onParseServerResp

```js
  /**
   * $vp.onParseServerResp(response)
   * 统一业务级别错误接口
   * <p>
   * 方便应用自己调用该方法判断业务级别错误，如在`$vp#ajaxAll`时候，插件没有帮应用进行业务成功与否的判断，应用可以调用`$vp#$vp.onParseServerResp(response)`来调用统一业务级别错误接口来根据自己的需求对判断进行后续处理
   * @returns {Boolean} true 标识业务级别成功，否则为失败
   */
  onParseServerResp(response)
```

### ajaxAll

```js
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
  } = {})
```

### ajaxMixin
```js
   /**
   * ajaxMixin(url[, config])
   * 支持普通的Ajax GET/POST(默认)请求 和 客户端桥接访问
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数，支持method【'GET'| 'POST'| 'NATIVE'】
   * @param {Object} [axiosOptions={}] axios options
   * @param {Boolean} [showLoading=false] 是否显示loading ui，将会调用`UtilHttp#loading(loadingHintText)`配置，默认为`UtilHttp#defShowLoading`配置（true）
   * @param {String} [loadingHintText='加载中...'] 当需要显示loading时候，需要显示在loading上面的文字
   * @param {Boolean} [needHandlerErr=true] 是否需要进行默认的错误处理，方便某些**零星交易**不需要进行统一业务逻辑处理的时候，绕过插件提供的业务处理逻辑，此外也可以通过配置`$vp#onSendAjaxRespErr`来进行统一业务处理的**应用统一前置处理**
   * @param {String} [mode='POST'] 请求的method【'GET'| 'POST'| 'NATIVE'】，默认使用初始化配置时候传递的`utilHttp#mode = POST`参数赋初值
   * @returns {Promise}
   */
  ajaxMixin(url, {
    params = {},
    axiosOptions = {},
    showLoading = _defShowLoading,
    loadingHintText = '加载中...',
    needHandlerErr = true,
    mode = _defMode
  } = {})

```

### ajaxGet
```js
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
  } = {})
```

### ajaxPost
```js
  /**
   * 发送POST请求
   * <p>
   * 底层交由`$vp#ajaxMixin`处理
   *
   * @param {String} [url=undefined] 交易码|完整请求url
   * @param {Object} [params={}] 请求参数，支持method【'GET'| 'POST'| 'NATIVE'】
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
  } = {})
```

### pageHref
```js
  /**
   * 通过`window.location.href`进行页面跳转
   * <p>
   * 跳转前会通知`utilHttp#onPageHref(url)`钩子函数，如果配置
   * @param url
   * @returns {$vp}
   */
  pageHref(url)
```

### pageTo(n = -1)
```js
  /**
   * n个页面回退(基于Router)
   * <p>
   * 跳转前会通知`utilHttp#onPageTo(n, router)`钩子函数，如果配置
   * @returns {$vp}
   */
  pageTo(n)
```

### pageGoBack()
```js
  /**
   * 单个页面回退(基于Router)
   * <p>
   * 跳转前会通知`utilHttp#onPageGoBack(router)`钩子函数，如果配置
   * @returns {$vp}
   */
  pageGoBack()
```

### pageNext(location = {path: '/'})
```js
  /**
   * 页面导航(基于Router)
   * <p>
   * 跳转前会通知`utilHttp#onPageNext(location, router)`钩子函数，如果配置
   * @param location
   * @returns {plugin}
   */
  pageNext(location)
```

### pageNext
```js
  /**
   * 页面导航(基于Router)，移除上一个页面
   * <p>
   * 跳转前会通知`utilHttp#onPageReplace(location, router)`钩子函数，如果配置
   * @param location
   * @returns {plugin}
   */
  pageReplace(location = {path: '/'})
```
