# js-bridge-context.js

js-bridge-context.js JSBridge桥接模块，用于简化前端和客户端（Android && IOS）直接的交互，配合[Jiiiiiin/android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)可以让hybrid开发易如反掌 ：）

这个模块需要和客户端配合使用，有以下一些约束和条件：
+ 客户端只需要暴露一个`上下文对象`、一个`接口`，因为模块再调用客户端时候会约定一个数据传输对象，来满足客户端的内容分发，如：
android那边可能是这样的：
```java
 mWebView.addJavascriptInterface(new Object(){
    @JavascriptInterface
    public String event(String params) {
        final JSONObject jsonObj = JSONObject.parseObject(params);
        String event = jsonObj.getString("event");
        String action = jsonObj.getString("action");
        String callback = jsonObj.getString("callback");
        String listener = jsonObj.getString("listener");
        JSONObject rparams = jsonObj.getJSONObject("params");
        switch (action) {
            case "toast":
                ToastUtils.showLong(rparams.getString("msg"));
                // 模拟异步执行其他事情
                new Thread(() -> {
                    // 异步通知前端，即java调用前端js
                    HANDLER.post(() -> mWebView.evaluateJavascript(listener + "('" + params + "');", null));
                }).start();
                // 同步返回标识请求成功或失败
                HANDLER.post(() -> mWebView.evaluateJavascript(callback + "('seccuess');", null));
                break;
            default:
        }
        return params;
    }
}, "ViewPlus");
```
上面简单来说就是，安卓客户端向浏览器暴露了一个`window.ViewPlus#event(command)`，这样一个接口，然后通过解析`command`这个字符串类型的json对象，来判断前端希望客户端做什么，做完之后怎么处理；

那么当前模块就是为了简化和客户端的交互，让每一次请求，就行完成一个`ajax`操作一样，如：
```js
this.$vp.fireEvent({
  event: 'UIEvent',
  action: 'toast',
  params: {
    msg: 'hello world'
  }
}).then(res => {
  console.log('请求成功，客户端返回的同步请求结果', res)
}).catch(err => {
  console.log('请求出错，客户端返回的同步错误信息', res)
})
```

使用模块提供的`$vp.fireEvent`方法，我们只需要通过传递一条command指令就可以得到一个`{Promise}`，这里和`util-http.js`模块的请求方法一样；
command的含义：
```js
{
  // [*] event用来标识请求那个客户端的模块，方便客户端根据业务组织“内部JSBridge接口”
  event: 'UIEvent',
  // action标识请求对应模块的那个方法或者说交易，客户端据此去调用该方法
  action: 'toast',
  // 【可选】params用来传递对应action需要的参数
  params: {
    msg: 'hello world'
  }
  // 【可选】listener用来告诉客户端执行完（一般而言是异步操作）方法只会需要回调该方法通知前端
  listener: ([客户端传递]) => {}
}
```

至于同步消息的处理，因为ios和android的处理不同，插件已经帮你磨平了，客户端程序员需要注意的是command中针对ios一定会有一个`callback`参数，
标识action方法处理完成需要“马上”调用反馈给前端，当前请求是否处理完成，而android则没有这个参数，是因为`public String event(String params)`
这个暴露的接口的返回值，就完成了这个需求；

还需要客户端程序员注意的是：
ios，模块调用的是`global.webkit.messageHandlers[name].postMessage(JSON.stringify(command))`来调用，这里的name是当前模块的`context.name`配置项；
android,模块调用的是`global[name].event(JSON.stringify(command))`，这里的event是写死的！！！

所以这里推荐一个安卓类库，专门为当前插件而订制，帮大家完成了这一系列工作:[android-viewplus一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus#%E7%A4%BA%E4%BE%8B)

哈哈哈，强行安利一波；



## 示例

模拟前端调用客户端`toast`打印一个`'hello vplus'`

```html
<template>
  <div id="JsBridgeContext">

    <group title="使用$vp#fireEvent请求客户端弹出一个toast：" label-width="15em" class="bottom-group">
      <box gap="10px 10px">
        <x-button mini plain @click.native="doFireEvent" class="fl-right">运行</x-button>
      </box>
    </group>

  </div>
</template>

<script type="text/ecmascript-6">
  import demoMixin from './demo-mixin'

  export default {
    mixins: [demoMixin],
    methods: {
      doFireEvent() {
        try {
          this.$vp.fireEvent({
            event: 'UIEvent',
            action: 'toast',
            params: {
              msg: 'hello vplus'
            }
          }).then(res => {
            this.$vp.uiDialog(res, {
              title: '桥接调用成功',
              showCode: true
            })
          }).catch(err => {
            this.$vp.uiDialog(`桥接调用失败 ${err.message}`)
          })
        } catch (e) {
          this.$vp.uiDialog(`桥接调用失败 ${e.message}`)
        }
      }
    }
  }
</script>
```



## 配置

### onParseClientResp[*]

```js
   /**
     * [*] `$vp#onParseClientResp(res)`
     * 当客户端返回结果之后会回调该钩子，应用可以通过该函数来判断客户端返回的消息是否正确，意思就和`util-http.js`模块一样，这里的是否正确，
     * 是业务级别的；
     * return true 标识业务级别成功，否则为失败，这里的判断直接影响`$vp#fireEvent`返回的Promise是调用失败还是成功处理流程，如果不定义该配置项，那么`$vp#fireEvent`将会直接返回成功
     */
    onParseClientResp
```

### name[*]

```js
   /**
     * 客户端暴露给前端的全局对象名称
     * [*] {String}
     * <p>
     * 模块安装的时候回检测当前运行环境中是否存在这样一个名称的上下文对象
     */
    name = 'ViewPlus'
```

### enable

```js
  /**
     * 标识是否启用当前模块
     * [可选] {Boolean}
     * <p>
     * + 有一种情况，应用希望手动设置`$vp.runNative`标识，以便程序可以方便知道自己的运行环境，但是又不想使用当前模块，这种情况，就可以单独把这里配置为false
     * 当然如果`$vp.runNative`已经被设置为false，那么还需要这个模块干嘛呢？
     */
    enable = runNative
```


## API接口

### onParseClientResp

```js
 /**
   * $vp.onParseClientResp()
   * 方便应用调用该方法判断`command#listener`的返回结果，直接代理到`js-bridge-context`配置项`onParseClientResp`
   * @returns {Boolean} true 标识业务级别成功，否则为失败
   */
  onParseClientResp() {
    if (_.isFunction(_onParseClientResp)) {
      return this::_onParseClientResp()
    } else {
      emitErr(new Error('on_parse_client_resp_func_not_config'))
    }
  }
```

###  fireEvent

```js
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
  fireEvent(command = null)
```
