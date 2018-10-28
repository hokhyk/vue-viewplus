<template>
  <div id="JsBridgeContext">
    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">一个JSBridge桥接模块，用于简化前端和客户端（Android && IOS）直接的交互。</p>
        <span class="hint-msg-warn">这个页面的交互依赖于客户端提供的`JsBridge Context`能力，详细请参考文档，如果没有提供这组能力，运行将会报错!</span>
        <br>
        <span class="hint-title">注意：</span>
        <ul class="hint-msg">
          <li>1. 客户端只需要暴露一个`上下文对象`、一个`接口`，因为模块再调用客户端时候会约定一个数据传输对象，来满足客户端的内容分发</li>
          <li>2. 可能你需要了解一下这个：<a href="https://github.com/Jiiiiiin/android-viewplus">android-viewplus一个安卓混合客户端开发库</a></li>
          <li>3. 测试的时候别忘了把`$vp.runNative`配置修改为true，并且**运行在自定义客户端环境**，模块安装的时候回检测当前运行环境中是否存在`JsBridgeContext#name`对应的上下文对象</li>
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
    this.$vp.uiDialog(res, {
      title: '桥接调用成功',
      showCode: true
    })
  }).catch(err => {
    this.$vp.uiDialog(`桥接调用失败 ${err.message}`)
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

<style lang="less" scoped>
</style>
