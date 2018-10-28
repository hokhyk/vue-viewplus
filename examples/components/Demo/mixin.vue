<template>
  <div id="Mixin">
    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">添加自定义模块 ：）</p>
        <span class="hint-msg">当前库有一个终止就是“统一开发人员的编码风格”，当然这里做的很简单，就是把所有模块的方法都定义到Vue.prototype.$vp下面。</span>
      </box>
    </group>

    <group title="演示为$vp混合一个自定义Toast模块" label-width="15em" class="bottom-group">
      <span>111</span>
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doMixin() {
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
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doMixin" class="fl-right">运行</x-button>
      </box>
    </group>

  </div>
</template>

<script type="text/ecmascript-6">
  import demoMixin from './demo-mixin'
  import ViewPlus from 'vue-viewplus'
  import Vue from 'vue'
  import _ from 'lodash'
  import { ToastPlugin } from 'vux'

  export default {
    mixins: [demoMixin],
    methods: {
      doMixin() {
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
    }
  }
</script>

<style lang="less" scoped>
</style>
