<template>
  <div id="PageStack">

    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title"><a href="http://jiiiiiin.cn/vue-viewplus/#/params-stack">params-stack.js 参数栈模块。</a></p>
        <span class="hint-title">注意：</span>
        <ul class="hint-msg">
          <li>1. 目前插件的参数栈并没有管理vue router帮我们传递的参数；</li>
          <li>2. 当前模块提供的参数传递方式，和vue router给我们提供了两种页面间传递参数的方式，**并不冲突**，可以互补使用；</li>
        </ul>
      </box>
    </group>

    <group title="模拟一个简单表单提交流程" label-width="15em" class="bottom-group">
      <box gap="10px 10px">
        <cell title="点击 手机充值" @click.native="next()" link="/Demo/PageStack/Page1" style="color: #af7f00"></cell>
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
    data() {
      return {
        isStackBottom: true
      }
    },
    methods: {
      next() {
        this.$vp.psPageNext('/Demo/PageStack/Page1', {params: {phoneNumb: 13111111111}})
      }
    },
    created() {
      console.log(
        `登录前状态为： ${this.$vp.isLogin()}`
      )
    }
  }
</script>

<style lang="less" scoped>
</style>
