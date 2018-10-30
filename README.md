<p align="center">
  <a href="http://vux.li">
    <img src="https://ws3.sinaimg.cn/large/006tNbRwgy1fwq8xk9nh9j305k05kdfs.jpg" width="175">
  </a>
</p>

<p align="center">vue-viewplus <small>0.9.1</small></p>
<p align="center">一个简化Vue应用构建的工具库</p>

做这个插件的目的是为了：
+ 针对大多数应用都会用到的功能进行二次封装，减少样板代码，让开发人员更关注于业务本身
+ 用**一种方式解决一个问题**，在开发时候解决问题可以有多种方式，但是我们只需要一种

# 特性
+ util-http.js 针对axios进行了二次封装的ajax模块。
+ login-state-check.js 身份认证控制模块。
+ params-stack.js 参数栈模块。
+ js-bridge-context.js JSBridge桥接模块，用于简化前端和客户端（Android && IOS）直接的交互，配合[Jiiiiiin/android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)可以让hybrid开发易如反掌 ：）
+ util-cache.js 缓存模块。
+ cache-userinfo.js 缓存用户（登录用户）信息模块。
+ 支持[自定义模块混合](http://jiiiiiin.cn/vue-viewplus/#/global_api?id=mixin-)

# 文档
[点击查看文档](http://jiiiiiin.cn/vue-viewplus/)

# 例子

```bash
├── examples 插件demo
├── mock 插件demo mock服务器接口
├── src 插件源码
```

可启动项目里的`examples`示例应用，就可以了解插件的各个模块的演示；
如果需要测试`util-http.js模块`需要启动项目里的`examples`一个简单的本地mock server；

```bash
# 首先启动mock server，使得本地提供一个express的简单返回测试json数据的服务
npm run mock
# 启动examples
npm run dev
```

# 案例

+ [云南农信手机银行](http://sj.qq.com/myapp/detail.htm?apkName=com.csii.mobilebank)

# 模块简介

[更多模块详见文档](http://jiiiiiin.cn/vue-viewplus/#/)

## util-http.js

util-http.js 针对axios进行了二次封装的ajax模块。

模块对axios进行了一次封装，目的是为了减少开发人员的工作量，简化和服务器端、客户端（JSBridge 代理请求）的交互，配合`login-state-check.js`模块进行身份认证控制。

为什么我们需要再封装axios，因为我们在想要做这个插件的时候已经经历了几个项目，不管是否是前后台分离或者是否服务端是RESTFull类型服务，在发送请求和处理请求的时候，对于一个企业级（或者简单应用）都会存在或多或少的样板代码，那我们在实践的过程中就一步一步把这些样本代码抽离了业务，使得开发人员更容易关注于业务本身，这样就提高了开发效率，避免了一些不必要的错误，而这个模块提供了一下几点抽象：

+ 帮我们处理了大部分**业务级错误**。何为业务级错误？因为很多的后端返回的数据都非严格意义上的RESTFull格式的结果，这里我们关注的是很多服务都不是以http规范上的状态码**非200**来标识请求出错，而是会有一些**自定义的错误码**，这就提供给了我们进行**统一业务错误处理的冲动**，当然要在此基础上添加对规范形式的统一错误判断也就容易了
+ 帮助我们进行特殊的**请求代理**，因为**加了一层**，我们就可以做很多事情，这里我们就可以让Ajax编程非Ajax，即在移动应用开发的时候，由于**跨域和WebView Ajax发送请求很难对数据进行SSL加密证书配置**两个需求，我们可以让请求发送到客户端，然后由客户端代理前端完成请求的发送，这就涉及到前端和客户端的交互，也就是JSBridge交互，我们已经有了一套[android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)，来解决JSBridge客户端交互流程，那么我们这里就能很简单的在中间加的这一层很简单的完成上面的两个需求
+ 关于配合`login-state-check.js`模块进行身份认证控制，可以查看当前模块的`accessRules.sessionTimeOut`和`accessRules.onSessionTimeOut`，因为会话的真正控制一般是在后台，那么如果后台的session或token失效之后，服务端肯定会返回响应的错误，那么当前模块通过上面两个`accessRules`的配置，得以使应用拦截到这一时机，并在通知应用前，清理了插件login-state-check.js模块维护的登录状态：`loginStateCheckInstall.modifyLoginState(false)`

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

### 示例

+ ajax所发接口返回数据请查看，[源码mock目录对应json数据](https://github.com/Jiiiiiin/vue-viewplus/tree/master/mock/data)

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


## params-stack.js

params-stack.js 参数栈模块。

vue router给我们提供了两种页面间传递参数的方式:
+ [动态路由匹配](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)
+ [编程式的导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)

```js
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

而当前模块也为`$vp`提供了自己的页面参数方式：

```js
// 跳转页面，并传递参数
this.$vp.psPageNext('/Demo/PageStack/Page2', {
  params: {
    phoneNumb: '15111111111'
  }
})
```

这一点和vue router给我们提供的传递方式类似，并且目前还不支持`query: { plan: 'private' }`传递url参数，但是我们为什么还要做这个模块：

+ 提供一个**栈**来管理栈内所有页面的参数，方便页面在回退的时候，拿到对应页面的**缓存参数**；即一般我们使用vue router的时候每个页面的参数（除了使用url参数），在做统一返回键处理的时候，都不太方便进行页面状态恢复，而如果我们提供了一个栈，在页面入栈的时候，将当前页面的参数存储，在下一个页面点击返回按钮回到当前页面的时候我们再从参数栈恢复参数，这样就能实现客户端开发中具有的这一特性；
+ 该参数栈也支持缓存->自动恢复，vuex state和session storage两级存储保证参数栈不会被页面刷新而导致页面参数丢失
+ 也为了统一编程方式

并且，当前模块提供的参数传递方式，和vue router给我们提供了两种页面间传递参数的方式，**并不冲突**，可以互补使用。

只不过目前插件的参数栈并没有管理vue router帮我们传递的参数；

vuex state 参数栈存储示例：

![image-20181030213140848](https://ws4.sinaimg.cn/large/006tNbRwgy1fwqkos2ekdj30lu0jgwgk.jpg)

session storage 参数栈二级存储示例：

![image-20181030213007933](https://ws1.sinaimg.cn/large/006tNbRwgy1fwqkn5kcp8j31k20b8jwx.jpg)

### 示例

#### 模拟一个简单表单提交流程

![image-20181030180125629](https://ws1.sinaimg.cn/large/006tNbRwgy1fwqem1fyr9j31kw0w715u.jpg)
图 详见源码example项目中当前模块示例

+ 表单录入页面(简称：Page1)

```html
<template>
  <group title="模拟手机号充值 - 堆栈底-第一页" label-width="5em" class="bottom-group">
    <box gap="10px 10px">
      <x-input title="手机号" v-model="dataParams.phoneNumb"></x-input>
    </box>
    <box gap="10px 10px">
      <x-button plain @click.native="submit()">点击充值</x-button>
      <x-button plain @click.native="modify()">修改参数栈内参数对象</x-button>
    </box>
  </group>
</template>

<script type="text/ecmascript-6">
import demoMixin from '../demo-mixin'
import { XInput } from 'vux'
// 1.参数栈模块提供的一个**混入**组件，方便页面组件简化参数栈的api操作和开发，详见下面的`paramsStack mixin`说明
import { paramsStack } from 'vue-viewplus'

export default {
	// 2.使用`paramsStack mixin`
  mixins: [paramsStack, demoMixin],
  components: {
    XInput
  },
  data() {
    return {
      // 3.`paramsStack mixin`中定义的`data`属性，声明当前页面组件是参数栈的栈底，当当前页面被点击返回弹出的时候，插件会检测这个属性，如果为true，就清空参数栈
      isStackBottom: true,
      // 4.自定义需要传递到下一个页面的参数
      dataParams: {
        phoneNumb: ''
      }
    }
  },
  methods: {
    submit() {
      this.$vp.psPageNext('/Demo/PageStack/Page2', {
        params: this.dataParams
      })
    }
  },
  created() {
    // 类似第三部
    // this.isStackBottom = true
    // 5.解析回传参数
    if (!_.isEmpty(this.backParams)) {
	    this.dataParams.phoneNumb = this.backParams.phoneNumb
    	this.$vp.toast(`通过 backParams.phoneNumb 预填写页面`)
    }
  }
}
</script>
```

+ 表单确认页面(简称：Page2)

```html
<template>
  <group label-width="15em" class="bottom-group">
    <form-preview header-label="请确认订单信息" :body-items="list" ></form-preview>
    <x-input title="请输出充值金额" v-model="dataParams.amount" style="margin-top: 10px"></x-input>
    <box gap="10px 10px">
      <flexbox>
        <flexbox-item>
          <x-button type="default" @click.native="replace()">确认</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="default" @click.native="bck()">返回(回传参数)</x-button>
        </flexbox-item>
      </flexbox>
    </box>
  </group>
</template>

<script type="text/ecmascript-6">
import demoMixin from '../demo-mixin'
import { paramsStack } from 'vue-viewplus'
import { XInput, FormPreview, Flexbox, FlexboxItem } from 'vux'

export default {
  mixins: [paramsStack, demoMixin],
  components: {
    FormPreview,
    Flexbox,
    FlexboxItem,
    XInput
  },
  data() {
    return {
    // 1. 回显上一个页面录入的手机号
      list: [
        {
          label: '手机号',
          value: ''
        }
      ],
      // 2. 自定义需要传递到下一个页面的参数
      dataParams: {
        phoneNumb: '',
        amount: '50元'
      }
    }
  },
  methods: {
    /**
     * 4.提交表单方式1
     * 如果需要下一个页面点击返回，任然要回显当前页面，就调用该方法
     * /
    next() {
      this.$vp.psPageNext('/Demo/PageStack/Page4', { params: this.dataParams })
    },
    /**
     * 4.提交表单方式2
     * 一般确认页面都无需被“保留”，故这里使用`this.$vp.psPageReplace`接口完成跳转，底层将会使用
     * `router.replace({location})`完成跳转
     */
    replace() {
      this.$vp.psPageReplace('/Demo/PageStack/Page4', {params: this.dataParams})
    },
    bck() {
      this.$vp.psPageGoBack({
      	// 3.设置回传参数
        backParams: {
          phoneNumb: '13222222222'
        }
      })
    }
  },
  created() {
    this.list[0].value = this.params.phoneNumb
    this.dataParams.phoneNumb = this.params.phoneNumb
  }
}
</script>
```

+ 表单结果页面(简称：Page4)

```html
<template>
  <div>
    <msg title="操作成功" :description="description" :buttons="buttons"></msg>
    <group title="堆栈-第三页" label-width="15em">
      <form-preview header-label="参数栈回显" :body-items="stackList" ></form-preview>
      <cell-box>
    <pre v-highlightjs><code class="javascript">
import demoMixin from '../demo-mixin'
import { paramsStack } from 'vue-viewplus'
import { FormPreview, Msg } from 'vux'

export default {
  mixins: [paramsStack, demoMixin],
  components: {
    FormPreview,
    Msg
  },
  data() {
    return {
      stackList: [
        {
          label: 'params',
          value: {}
        },
        {
          label: 'backParams',
          value: {}
        }
      ],
      description: '',
      buttons: [{
        type: 'primary',
        text: '在做一笔',
        onClick: ((that) => {
          return () => {
            that.next()
          }
        })(this)
      }, {
        type: 'default',
        text: '完成',
        onClick: ((that) => {
          return () => {
            // 返回指定页面，并清空参数栈
            // that.$vp.psPageGoBack({
            //   backPopPageNumbs: -2,
            //   clearParamsStack: true
            // })
            that.$vp.psPageNext('/Demo', {
              clearParamsStack: true,
              backState: true
            })
          }
        })(this)
      }]
    }
  },
  methods: {
    showStackList() {
      this.stackList[0].value = this.params
      this.stackList[1].value = this.backParams
    },
    /**
     * 返回栈顶页面
     */
    next(backPopPageNumbs = -1) {
      this.$vp.psPageGoBack({
        backPopPageNumbs,
        backParams: {
          phoneNumb: '13444444444'
        }
      })
    }
  },
  created() {
    this.showStackList()
    this.description = `${this.params.phoneNumb} 成功充值 ${this.params.amount}`
  }
}
    </code></pre>
      </cell-box>
    </group>
  </div>

</template>

<script type="text/ecmascript-6">
  import demoMixin from '../demo-mixin'
  import { paramsStack } from 'vue-viewplus'
  import { FormPreview, Msg } from 'vux'

  export default {
    mixins: [paramsStack, demoMixin],
    components: {
      FormPreview,
      Msg
    },
    data() {
      return {
        // 2.自定义页面提示信息字段
        description: '',
        // 3.自定义结果页面点击按钮
        buttons: [{
          type: 'primary',
          text: '在做一笔',
          onClick: ((that) => {
            return () => {
              // 返回栈顶页面(Page1)
              this.$vp.psPageGoBack()
            }
          })(this)
        }, {
          type: 'default',
          text: '完成',
          onClick: ((that) => {
            return () => {
              // 返回指定页面，并清空参数栈
              // that.$vp.psPageGoBack({
              //   backPopPageNumbs: -2,
              //   clearParamsStack: true
              // })
              that.$vp.psPageNext('/Demo', {
                clearParamsStack: true,
                backState: true
              })
            }
          })(this)
        }]
      }
    },
    created() {
      // 1.设置充值成功的提示信息
      this.description = `${this.params.phoneNumb} 成功充值 ${this.params.amount}`
    }
  }
</script>
```

以上3个页面都集成了`paramsStack mixin`，定义如下：

```js

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
```

## login-state-check.js

login-state-check.js 身份认证控制模块。

使用该模块可以让应用使用一个包含正则表达式的数组`LoginStateCheck#checkPaths`，来定义需要进行身份认证（登录）才能访问的页面资源（路由的path），这样做的好处就在于，我们不用向很多应用那些去修改路由组件中的mate字段来确认哪一个路由组件需要进行身份认证控制。

一般的应用在权限控制这一块，一般有两种需求，一种是基于`RBAC`权限模型的管理端应用，而大多数应用只需要控制那些页面需要用户登录才能访问；当前模块默认认为所有页面都是`公共资源`，如果要进行身份认证控制，可以这样定义：

```js
loginStateCheck: {
    checkPaths: [
      /User\/Manage/
    ],
    ...
```
这样所有用户管理资源就都需要登录才能进行访问了。

匹配规则：**如果在`LoginStateCheck#checkPaths`需要身份认证规则集中，那么就需要查看用户是否登录，如果没有登录就拒绝访问；**
当然插件内部还是依赖`router`的导航守卫来进行拦截控制；

注：

+ 该模块维护了一个vuex state `vplus#loginState`，来持有用户登录状态，在页面刷新的时候也通过缓存数据来对其进行恢复；
+ 这个状态建议配合`UtilHttp#accessRules.sessionTimeOut`和`UtilHttp#accessRules.onSessionTimeOut`，来使用，也就是一般应用都是后台来控制登录状态或者说会话的时长，你需要在`sessionTimeOut`中配置后台会话超时返回的错误码，这样插件就会自动将当期模块的`vplus#loginState`设置为false，这样就帮我们管理了这个**不可控**状态；
+ 如果没有配置在改列表里面的都被视为**公共交易**，即不需要身份认证就可以访问；

### 示例

#### 模拟一个身份认证访问控制例子

个人管理页面`/Demo/Manage/User`是一个需要进行身份认证才能访问的router页面，需要首先登陆才能进行访问，如果后台返回强制签退的结果，那么登陆状态将会被设置为`false`，接着要访问之前可以进入的个人管理页面也会被自动拦截；

示例代码：

```html
<template>
  <div id="LoginStateCheck">
    <group title="模拟一个简单的身份认证控制流程" label-width="15em" class="bottom-group">
      <box gap="10px 10px">
        <cell title="点击测试访问一个需要登录之后才能访问的页面" link="/Demo/Manage/User"></cell>
      </box>
      <box gap="10px 10px">
        <x-button @click.native="doLogin">登录</x-button>
      </box>
      <box gap="10px 10px">
        <x-button @click.native="doLogout">退出登录</x-button>
      </box>
      <box gap="10px 10px">
        <x-button @click.native="doForcedWithdrawal">模拟强制签退</x-button>
      </box>
    </group>
  </div>
</template>


<script type="text/ecmascript-6">
  import demoMixin from './demo-mixin'
  import { Cell } from 'vux'

  export default {
    mixins: [demoMixin],
    components: {
      Cell
    },
    methods: {
      doLogin() {
        this.$vp.ajaxMixin('LOGIN').then(data => {
          this.doLoginBtnState = false
          this.$vp.modifyLoginState(true)
          console.log(`登录后状态为： ${this.$vp.isLogin()}`)
          this.$vp.uiToast('模拟登录成功')
        })
      },
      doLogout() {
        console.log(`登出前状态为： ${this.$vp.isLogin()}`)
        this.$vp.modifyLoginState(false)
        console.log(`登录后状态为： ${this.$vp.isLogin()}`)
        this.$vp.uiToast('退出登录完成')
      },
      doForcedWithdrawal() {
        this.$vp
          .ajaxMixin('FORCEDWITHDRAWAL', {
            mode: 'GET'
          })
          .catch(resp => {
            console.error(`模拟强制签退完成：${resp}`)
            this.$vp.uiToast('模拟强制签退完成')
          })
      }
    },
    created() {
      console.log(
        `登录前状态为： ${this.$vp.isLogin()}`
      )
    }
  }
</script>
```

示例所需配置：
```js

Vue.use(ViewPlus, {
  // ...
  loginStateCheck: {
    checkPaths: [
      /Manage/
    ],
    onLoginStateCheckFail(to, from, next) {
      this.dialog(`onLoginStateCheckFail被回调：待访问资源【${to.path}】是需要登录才能访问，请先登录`, {
        action() {
          next(false)
        }
      })
      // 更新状态进度条
      store.commit('updateLoadingStatus', false)
    }
  }
})
```

## js-bridge-context.js

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



### 示例

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

