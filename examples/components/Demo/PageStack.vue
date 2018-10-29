<template>
  <div id="PageStack">

    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">params-stack.js 身份认证控制模块</p>
        <span class="hint-msg">使用该模块可以让应用使用一个包含正则表达式的数组`LoginStateCheck#checkPaths`</span>
        <br>
        <span class="hint-title">注意：</span>
        <ul class="hint-msg">
          <li>1. 该模块维护了一个vuex state `vplus#loginState`，来持有用户登录状态，在页面刷新的时候也通过缓存数据来对其进行恢复；</li>
        </ul>
      </box>
    </group>

    <group title="模拟一个简单表单提交流程" label-width="15em" class="bottom-group">
      <box gap="10px 10px">
        <cell title="点击" link="/Demo/PageStack/Page1"></cell>
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

<style lang="less" scoped>
</style>
