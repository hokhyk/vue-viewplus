# 全局API

### mixin [*]

`ViewPlus.mixin(Vue, {[install, installed, customFunc...]})`

添加自定义模块 ：）

当前库有一个宗旨就是“统一开发人员的编码风格”，当然这里做的很简单，就是把所有模块的方法都定义到`Vue.prototype.$vp`下面。

那么如果我们提供的模块不满足你的需求的情况下，你可以：

+ 直接通过当前函数覆盖掉默认提供的方法，当然这种是少数
+ 如果你有新的idea，也觉得这种**风格统一**是值得的，那么你可以把你自己的自定义模块，通过当前函数混合到`Vue.prototype.$vp`下面，如下面混合了一个自定义Toast模块：

```js
 try {
          ViewPlus.mixin(Vue, {
            install(Vue, options) {
              Vue.use(ToastPlugin)
              console.log(`混合的插件版本 ${options.version}`, options)
            },
            toast(msg = '默认消息！', {position = 'bottom', time = 2000, width = '7.6em', type = 'text'} = {}) {
              Vue.$vux.toast.show({
                text: msg,
                time,
                position,
                width,
                type
              })
              return this
            },
            installed() {
              console.log(`sayHi方法是否被混合成功：${_.isFunction(Vue.prototype.$vp.toast)}`, Vue.prototype.$vp)
              Vue.prototype.$vp.toast('hi 自定义混合完成')
            }
          }, {
            moduleName: '示例模块',
            version: '1.0'
          })
        } catch (e) {
          this.$vp.uiDialog(`自定义混合出错 ${e.message}`)
        }
      }
```

**注意**：如果需要在插件默认模块中，使用自定义模块的接口，必须在初始化本插件时候先混合自定义插件，比如:

```js
utilHttp: {
    loading(loadingHintText) {
      this.uiLoading(loadingHintText)
    },
    hideLoading() {
      this.uiHideLoading()
    },
```

如我们需要在默认的`util-http.js`模块回调接口中使用`this`调用自定义模块，就必须确保自定义接口优先被混合了，不然找不到对应接口。
如果不用`this`，也可以直接通过`import`方式导入接口使用即可；

### bus

插件将会向`Vue.prototype.$vp`下面挂一个`$bus`实例，用来提供一个**集中式的事件中间件**参考：[Vue 组件通信之 Bus](https://juejin.im/post/5a4353766fb9a044fb080927)

简单示例：

```js

describe('event-bus 测试套件', () => {
  it('安装测试测试', () => {
    Vue.use(EventBus, {
      eventBus: {
        installed() {
          const bus = Vue.prototype.$bus
          expect(!!bus).toBe(true)
          spyOn(bus, '$on')
          bus.$on('id-selected', function (id) {
            console.log(`slected ${id}`)
          })
          expect(bus.$on).toHaveBeenCalled()
          spyOn(bus, '$emit')
          bus.$emit('id-selected', 1)
          expect(bus.$emit).toHaveBeenCalled()
        }
      }
    })
  })
})

```
