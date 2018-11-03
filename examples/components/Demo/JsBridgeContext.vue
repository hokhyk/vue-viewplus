<template>
  <div id="JsBridgeContext">
    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title"><a href="http://jiiiiiin.cn/vue-viewplus/#/js-bridge-context">js-bridge-context.js JSBridge桥接模块。</a></p>
        <span class="hint-title">注意：</span>
        <ul class="hint-msg">
          <li>1. 这个页面的交互依赖于客户端提供的`JsBridge Context`能力，详细请参考文档，如果没有提供这组能力，运行将会报错!</li>
        </ul>
      </box>
    </group>

    <group title="使用$vp#fireEvent请求客户端弹出一个toast：" label-width="15em" class="bottom-group">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doFireEvent() {
  this.$vp.fireEvent({
    event: 'UIEvent',
    action: 'toast',
    params: {
      msg: 'hello vplus'
    }
  }).then(res => {
    this.$vp.dialog(res, {
      title: '桥接调用成功',
      showCode: true
    })
  }).catch(err => {
    this.$vp.dialog(`桥接调用失败 ${err.message}`)
  })
}
      </code></pre>
      </cell-box>
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
            this.$vp.dialog(res, {
              title: '桥接调用成功',
              showCode: true
            })
          }).catch(err => {
            this.$vp.dialog(`桥接调用失败 ${err.message}`)
          })
        } catch (e) {
          this.$vp.dialog(`桥接调用失败 ${e.message}`)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
