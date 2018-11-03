<template>
  <div id="UtilHttp">
    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">util-http.js 针对axios进行了二次封装的ajax模块。</p>
        <p class="hint-a"><a href="https://github.com/Jiiiiiin/vue-viewplus/blob/master/examples/components/Demo/UtilHttp.vue">源码</a> | <a href="http://jiiiiiin.cn/vue-viewplus/#/util-http">文档</a></p>
        <ul class="hint-msg">
          <li>1. 在进行一下测试前请先阅读<a href="https://github.com/Jiiiiiin/vue-viewplus/blob/9861d0139e39fccb29c1d0a856e0e28d003ca716/examples/main.js#L86">示例项目对util-http.js模块的配置</a></li>
          <li>2. 约定服务器端响应的数据结构（测试）
            <pre v-highlightjs><code class="json">{
  "code": [1| "其他字符串，如：session_timeout_err"],
  "data": [{}|[]],
  "message": "错误提示信息|正确提示信息"
}</code></pre>
          </li>
        </ul>
      </box>
    </group>

    <group title="ajaxMixin - GET请求" label-width="15em">
      <box gap="10px 10px">
        <x-button @click.native="doGet" :disabled="doGetBtnState">使用$vp#ajaxMixin发送GET请求</x-button>
      </box>
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doGet() {
  this.doGetBtnState = true
  this.$vp
    .ajaxMixin('TIMESTAMP', {
      mode: 'GET'
    })
    .then(data => {
      this.doGetBtnState = false
      this.$vp.dialog(
        data,
        {
          title: '请求成功，响应结果',
          showCode: true
        }
      )
    })
    .catch(resp => {
      console.log(resp)
      this.doGetBtnState = false
    })
}
      </code></pre>
      </cell-box>
    </group>

    <group title="ajaxMixin - POST请求" label-width="15em">
      <box gap="10px 10px">
        <x-button @click.native="doPost" :disabled="doPostBtnState">使用$vp#ajaxMixin发送POST请求</x-button>
      </box>
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doPost() {
  this.doPostBtnState = true
  this.$vp
    .ajaxMixin('LOGIN')
    .then(data => {
      this.doPostBtnState = false
      this.$vp.dialog(
        data,
        {
          title: '请求成功，响应结果',
          showCode: true
        }
      )
    })
    .catch(resp => {
      this.doPostBtnState = false
    })
}
      </code></pre>
      </cell-box>
    </group>

    <group title="模拟后端返回“业务级错误”" label-width="15em">
      <box gap="10px 10px">
        <x-button @click.native="doForcedWithdrawal">测试自动处理错误，并清除登录状态</x-button>
      </box>
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
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
      </code></pre>
      </cell-box>
    </group>

    <group title="ajaxAll请求" label-width="15em">

      <box gap="10px 10px">
        <p class="hint-msg">针对这个方法插件没有帮应用进行业务成功与否的判断，但是应用可以调用`$vp#$vp.onParseServerResp(response)`来调用统一业务级别错误接口来根据自己的需求对判断进行后续处理</p>
        <x-button @click.native.stop="doAjaxAll" :disabled="ajaxAllBtnState">使用$vp#ajaxAll发送请求</x-button>
      </box>
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doAjaxAll() {
  this.ajaxAllBtnState = true
  this.$vp
    .ajaxAll([
      {
        url: 'ALL1',
        mode: 'GET'
      }, {
        url: 'ALL2',
        mode: 'GET'
      }
    ])
    .then(resArr => {
      this.ajaxAllBtnState = false
      // 这里需要应用手动把axios的data属性解析掉
      const res = _.map(resArr, (item) => {
        return item.data
      })
      this.$vp.dialog(res, {
        title: '请求成功，响应结果',
        showCode: true
      })
    })
}
      </code></pre>
      </cell-box>
    </group>
    <group title="ajaxMixin - NATIVE请求" label-width="15em">
      <box gap="10px 10px">
        <span class="hint-msg">JSBridge交互，我们已经有了一套<a href="https://github.com/Jiiiiiin/android-viewplus"><strong>android-viewplus</strong></a>一个安卓混合客户端开发库，如果需要进行Hybrid开发进查看</span>
        <span class="hint-msg-warn">该功能需要客户端JsBridge能力，如没有修改，请别点了 ；）</span><br/>
        <x-button @click.native="doHttpNative" :disabled="doHttpNativeBtnState">原生请求测试</x-button>
      </box>
      <cell-box>
        <pre v-highlightjs><code class="javascript">
doHttpNative() {
  this.doHttpNativeBtnState = true
  this.$vp
    .ajaxMixin('TIMESTAMP', { mode: 'NATIVE' })
    .then(res => {
      this.$vp.dialog(res, {
        title: '请求成功，响应结果',
        showCode: true
      })
      this.doHttpNativeBtnState = false
    })
    .catch((err) => {
      this.$vp.dialog(err, {
        title: '请求失败，响应结果',
        showCode: true
      })
      this.doHttpNativeBtnState = false
    })
}
      </code></pre>
      </cell-box>
    </group>

    <group title="CORS test" label-width="15em" class="bottom-group">
      <box gap="10px 10px 25px 10px">
        <span class="hint-msg-warn">该功能需要后台配合测试，如没有修改，请别点了 ；）</span>
        <x-button @click.native="doCORS" :disabled="doCORSBtnState">CORS测试</x-button>
      </box>
      <cell-box>
        <pre v-highlightjs><code class="javascript">
// 这里的关键是配置`httpUtil#withCredentials`
doCORS() {
  this.doCORSBtnState = true
  this.$vp
    .ajaxMixin('TIMESTAMP', { mode: 'GET' })
    .then(res => {
      this.$vp.dialog(res, {
        title: '请求成功，响应结果',
        showCode: true
      })
      this.doCORSBtnState = false
    })
    .catch(() => {
      this.doCORSBtnState = false
    })
}
      </code></pre>
      </cell-box>
    </group>

  </div>
</template>

<script type="text/ecmascript-6">
import demoMixin from './demo-mixin'
import _ from 'lodash'

export default {
  mixins: [demoMixin],
  data() {
    return {
      ajaxAllBtnState: false,
      doGetBtnState: false,
      doPostBtnState: false,
      doCORSBtnState: false,
      doHttpNativeBtnState: false
    }
  },
  methods: {
    doGet() {
      this.doGetBtnState = true
      this.$vp
        .ajaxMixin('TIMESTAMP', {
        // .ajaxMixin('https://www.easy-mock.com/mock/5abc903ff5c35b191f472d79/example/TIMESTAMP', {
          mode: 'GET'
        })
        .then(data => {
          this.doGetBtnState = false
          this.$vp.dialog(
            data,
            {
              title: '请求成功，响应结果',
              showCode: true
            }
          )
        })
        .catch(resp => {
          console.log(resp)
          this.doGetBtnState = false
        })
    },
    doPost() {
      this.doPostBtnState = true
      this.$vp
        .ajaxMixin('LOGIN')
        .then(data => {
          this.doPostBtnState = false
          this.$vp.dialog(
            data,
            {
              title: '请求成功，响应结果',
              showCode: true
            }
          )
        })
        .catch(resp => {
          this.doPostBtnState = false
        })
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
    },
    doAjaxAll() {
      this.ajaxAllBtnState = true
      this.$vp
        .ajaxAll([
          {
            url: 'ALL1',
            mode: 'GET'
          }, {
            url: 'ALL2',
            mode: 'GET'
          }
        ])
        .then(resArr => {
          this.ajaxAllBtnState = false
          // 这里需要应用手动把axios的data属性解析掉
          const res = _.map(resArr, (item) => {
            return item.data
          })
          this.$vp.dialog(res, {
            title: '请求成功，响应结果',
            showCode: true
          })
        })
    },
    doHttpNative() {
      this.doHttpNativeBtnState = true
      this.$vp
        .ajaxMixin('TIMESTAMP', { mode: 'NATIVE' })
        .then(res => {
          this.$vp.dialog(res, {
            title: '请求成功，响应结果',
            showCode: true
          })
          this.doHttpNativeBtnState = false
        })
        .catch((err) => {
          this.$vp.dialog(err, {
            title: '请求失败，响应结果',
            showCode: true
          })
          this.doHttpNativeBtnState = false
        })
    },
    doCORS() {
      this.doCORSBtnState = true
      this.$vp
        .ajaxMixin('TIMESTAMP', { mode: 'GET' })
        .then(res => {
          this.$vp.dialog(res, {
            title: '请求成功，响应结果',
            showCode: true
          })
          this.doCORSBtnState = false
        })
        .catch(() => {
          this.doCORSBtnState = false
        })
    }
  }
}
</script>

<style scoped>
</style>
