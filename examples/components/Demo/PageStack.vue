<template>
  <div id="PageStack">

    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">params-stack.js 参数栈模块</p>
        <span class="hint-msg">提供一个**栈**来管理栈内所有页面的参数，方便页面在回退的时候，拿到对应页面的**缓存参数**；即一般我们使用vue router的时候每个页面的参数（除了使用url参数），在做统一返回键处理的时候，都不太方便进行页面状态恢复，而如果我们提供了一个栈，在页面入栈的时候，将当前页面的参数存储，在下一个页面点击返回按钮回到当前页面的时候我们再从参数栈恢复参数，这样就能实现客户端开发中具有的这一特性；</span>
        <span class="hint-msg">并且，当前模块提供的参数传递方式，和vue router给我们提供了两种页面间传递参数的方式，**并不冲突**，可以互补使用。</span>
        <br>
        <span class="hint-title">注意：</span>
        <ul class="hint-msg">
          <li>1. 目前插件的参数栈并没有管理vue router帮我们传递的参数；</li>
        </ul>
      </box>
    </group>

    <group title="模拟一个简单表单提交流程" label-width="15em" class="bottom-group">
      <box gap="10px 10px">
        <cell title="点击 手机充值" @click.native="next()" link="/Demo/PageStack/Page1"></cell>
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
