<template>
  <div id="PageStack">

    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">params-stack.js 参数栈模块。</p>
        <p class="hint-a"><a href="https://github.com/Jiiiiiin/vue-viewplus/blob/9861d0139e39fccb29c1d0a856e0e28d003ca716/examples/components/Demo/PageStack.vue">源码</a> | <a href="http://jiiiiiin.cn/vue-viewplus/#/params-stack">文档</a></p>
        <ul class="hint-msg">
          <li>当前模块提供的参数传递方式，和vue router给我们提供了两种页面间传递参数的方式，**并不冲突**，可以互补使用；</li>
        </ul>
      </box>
    </group>

    <group title="模拟一个简单表单提交流程" label-width="15em" class="bottom-group">
      <box gap="10px 10px">
        <cell title="点击 手机充值" @click.native="next()" link="/Demo/PageStack/Page1" style="color: #af7f00"></cell>
      </box>
    </group>
    <group title="模拟多页面之间的参数传递" label-width="15em" class="bottom-group">
      <box gap="10px 10px">
        <cell title="模拟多页面" link="" @click.native="goMultipage" style="color: #af7f00"></cell>
      </box>
    </group>

  </div>
</template>

<script type="text/ecmascript-6">
  import demoMixin from './demo-mixin'
  import { Cell } from 'vux'
  import { mapMutations } from 'vuex'
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
      },
      ...mapMutations(['updateActivePages']),
      goMultipage() {
        this.updateActivePages(['Trans1-Page1', 'Trans2-Page1'])
        this.$vp.psPageNext('/Demo/PageStack/Multipage/Trans1-Page1')
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
