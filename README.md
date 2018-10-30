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
