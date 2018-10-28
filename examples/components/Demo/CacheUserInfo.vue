<template>
  <div id="CacheUserInfo">
    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">cache-userinfo.js 缓存用户（登录用户）信息模块</p>
        <span class="hint-msg">一般应用都需要在前端缓存登录用户的信息，以便在开发过程中使用，当前模块目前提供了一组将用户缓存到【localStorage|sessionStorage】的独立接口</span>
        <br>
        <span class="hint-title">注意：</span>
        <ul class="hint-msg">
          <li>1. 提供了缓存用户的一系列接口，可以在缓存用户时候设置缓存的超时时间，通过`CacheUserInfo#cacheSaveSignUserInfo.exp`</li>
          <li>2. 在初始化插件的时候，如用户可能已经在原生客户端登录完毕，可以通过配置`CacheUserInfo#userInfo`来初始化用户状态相关信息；</li>
          <li>3. 因为某些应用对用户信息需要更安全的控制，故建议将缓存设置到sessionStorage，而某些应用对此有自己的一套加密或防御措施，有需要长期保持用户信息，就可以防止到localStorage，如需要做记住用户名这样的需求，放置到localStorage就是较好的选择</li>
          <li>4. 后期将会把RBAC所需的“角色”和“用户拥有的资源列表”也放在该模块控制，将会在下一个版本支持</li>
        </ul>
      </box>
    </group>

    <group title="使用$vp#cacheSaveUserInfo将用户信息存储到中：" label-width="15em">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doCacheSaveUserInfo() {
  this.$vp.cacheSaveUserInfo(
    { name: 'admin' }
  )
  const user = this.$vp.cacheLoadUserInfo()
  this.$vp.uiDialog(user, { title: '查询缓存用户信息', showCode: true })
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheSaveUserInfo" class="fl-right">运行</x-button>
      </box>
    </group>

    <group title="使用$vp#doCacheClearUserInfo 清除缓存用户信息：" label-width="15em">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doCacheClearUserInfo() {
  this.$vp.cacheLoadUserInfo()
  const user = this.$vp.cacheLoadUserInfo()
  this.$vp.uiDialog(user, { title: '查询缓存用户信息', showCode: true })
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheClearUserInfo" class="fl-right">运行</x-button>
      </box>
    </group>


    <group title="使用$vp#doIsCachedUserInfoState 查询缓存用户信息状态：" label-width="15em" class="bottom-group">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doIsCachedUserInfoState() {
  const state = this.$vp.isCachedUserInfoState()
  this.$vp.uiDialog(state)
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheClearUserInfo" class="fl-right">运行</x-button>
      </box>
    </group>


  </div>
</template>

<script type="text/ecmascript-6">
  import demoMixin from './demo-mixin'

  export default {
    mixins: [demoMixin],
    methods: {
      doCacheSaveUserInfo() {
        this.$vp.cacheSaveUserInfo(
          { name: 'admin' }
        )
        const user = this.$vp.cacheLoadUserInfo()
        this.$vp.uiDialog(user, { title: '查询缓存用户信息', showCode: true })
      },
      doCacheClearUserInfo() {
        this.$vp.cacheLoadUserInfo()
        const user = this.$vp.cacheLoadUserInfo()
        this.$vp.uiDialog(user, { title: '查询缓存用户信息', showCode: true })
      },
      doIsCachedUserInfoState() {
        const state = this.$vp.isCachedUserInfoState()
        this.$vp.uiDialog(state)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
