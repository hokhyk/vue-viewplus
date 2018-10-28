<template>
<group title="堆栈-第二页" label-width="15em">
  <box gap="10px 10px">
    <h2 v-if="this.$vp.utilObjHasVal(params)">初始化页面参数【params】: {{ params}}</h2>
    <h2 v-if="this.$vp.utilObjHasVal(backParams)">是个页面回传的参数【backParams】: {{backParams}}</h2>
    <x-button @click.native="next()">传递参数{{dataParams}}到下一个页面</x-button>
    <x-button @click.native="bck()">返回Page1页面并回传参数</x-button>
  </box>
  <cell-box>
    <pre v-highlightjs><code class="javascript">
import {
paramsStack
} from 'vue-viewplus'

  export default {
  mixins: [paramsStack],
  components: {
    Group,
    XButton,
    Box
  },
  data() {
    return {
      dataParams: {
        from: 'Page2'
      }
    }
  },
  methods: {
    next() {
      // 不推荐
      // this.setParams(this.dataParams)
      // this.$vp.pageNext('/Demo/PageStack/Page3')
      // 推荐
      this.$vp.psPageNext('/Demo/PageStack/Page3', {params: this.dataParams})
    },
    bck() {
      this.$vp.psGoBack({
        backParams: {
          from: '这个参数是Page2模拟拦截返回事件设置返回给Page1使用的'
        }
      })
    }
  }
}
    </code></pre>
  </cell-box>
</group>
</template>

<script type="text/ecmascript-6">
import {
  Group,
  XButton,
  Box,
  CellBox
} from 'vux'
import {
  paramsStack
} from 'vue-viewplus'

export default {
  mixins: [paramsStack],
  components: {
    Group,
    XButton,
    Box,
    CellBox
  },
  data() {
    return {
      dataParams: {
        from: 'Page2'
      }
    }
  },
  methods: {
    next() {
      // 不推荐
      // this.setParams(this.dataParams)
      // this.$vp.pageNext('/Demo/PageStack/Page3')
      // 推荐
      this.$vp.psPageNext('/Demo/PageStack/Page3', {params: this.dataParams})
    },
    bck() {
      this.$vp.psGoBack({
        backParams: {
          from: '这个参数是Page2模拟拦截返回事件设置返回给Page1使用的'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
