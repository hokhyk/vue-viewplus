<template>
<group title="堆栈-第三页" label-width="15em">
  <box gap="10px 10px">
    <h2>当前state中的params: {{null === params ? '没有参数': params}}</h2> <br>
    <x-button @click.native="next()">返回Page2，因为Page3是以replace的方式进入当前页面</x-button>
    <x-button @click.native="next(-2)">返回Page1，因为Page3是以replace的方式进入当前页面</x-button>
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
    Box,
    CellBox
  },
  data() {
    return {
      dataParams: {
        from: 'Page4'
      }
    }
  },
  methods: {
    next(bckNumbs = -1) {
      this.$vp.psGoBack({
        backPopPageNumbs: bckNumbs
      })
    }
  },
  created() {
    // 推荐使用this.$vp.psGoBack写法
    // this.bckNumbs = -2 // -> page1
    // this.bckNumbs = -1 // -> page2
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
        from: 'Page4'
      }
    }
  },
  methods: {
    next(bckNumbs = -1) {
      this.$vp.psGoBack({
        backPopPageNumbs: bckNumbs
      })
    }
  },
  created() {
    // 推荐使用this.$vp.psGoBack写法
    // this.bckNumbs = -2 // -> page1
    // this.bckNumbs = -1 // -> page2
  }
}
</script>

<style lang="less" scoped>
</style>
