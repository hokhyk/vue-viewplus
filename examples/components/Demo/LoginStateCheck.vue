<template>
  <div id="LoginStateCheck">

    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">login-state-check.js 身份认证权限控制模块。</p>
        <p class="hint-a"><a href="https://github.com/Jiiiiiin/vue-viewplus/blob/9861d0139e39fccb29c1d0a856e0e28d003ca716/examples/components/Demo/LoginStateCheck.vue">源码</a> | <a href="http://jiiiiiin.cn/vue-viewplus/#/login-state-check">文档</a></p>
        <ul class="hint-msg">
          <li>1. 这个状态建议配合UtilHttp#accessRules.sessionTimeOut和UtilHttp#accessRules.onSessionTimeOut，来使用，也就是一般应用都是后台来控制登录状态或者说会话的时长，你需要在sessionTimeOut中配置后台会话超时返回的错误码，这样插件就会自动将当期模块的vplus#loginState设置为false，这样就帮我们管理了这个不可控状态；</li>
          <li>2. 如果没有配置在改列表里面的都被视为公共交易，即不需要身份认证就可以访问；</li>
        </ul>
      </box>
    </group>

    <group title="模拟一个简单的身份认证权限控制流程" label-width="15em" class="bottom-group">
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
      <cell-box>
        <pre v-highlightjs><code class="javascript">
methods: {
  doLogin() {
    this.$vp.ajaxMixin('LOGIN').then(data => {
      this.doLoginBtnState = false
      this.$vp.modifyLoginState(true)
      console.log(`登录后状态为： ${this.$vp.isLogin()}`)
      this.$vp.toast('模拟登录成功')
    })
  },
  doLogout() {
    console.log(`登出前状态为： ${this.$vp.isLogin()}`)
    this.$vp.modifyLoginState(false)
    console.log(`登录后状态为： ${this.$vp.isLogin()}`)
    this.$vp.toast('退出登录完成')
  },
  doForcedWithdrawal() {
    this.$vp
      .ajaxMixin('FORCEDWITHDRAWAL', {
        mode: 'GET'
      })
      .catch(resp => {
        console.error(`模拟强制签退完成：${resp}`)
        this.$vp.toast('模拟强制签退完成')
      })
  }
},
created() {
  console.log(
    `登录前状态为： ${this.$vp.isLogin()}`
  )
}
    </code></pre>
      </cell-box>
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
          this.$vp.toast('模拟登录成功')
        })
      },
      doLogout() {
        console.log(`登出前状态为： ${this.$vp.isLogin()}`)
        this.$vp.modifyLoginState(false)
        console.log(`登录后状态为： ${this.$vp.isLogin()}`)
        this.$vp.toast('退出登录完成')
      },
      doForcedWithdrawal() {
        this.$vp
          .ajaxMixin('FORCEDWITHDRAWAL', {
            mode: 'GET'
          })
          .catch(resp => {
            console.error(`模拟强制签退完成：${resp}`)
            this.$vp.toast('模拟强制签退完成')
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
