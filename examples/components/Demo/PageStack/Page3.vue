<template>
<group title="堆栈-第三页" label-width="15em">
  <box gap="10px 10px">
    <h2 v-if="this.$vp.utilObjHasVal(params)">初始化页面参数【params】: {{ params}}</h2>
    <h2 v-if="this.$vp.utilObjHasVal(backParams)">是个页面回传的参数【backParams】: {{backParams}}</h2>
    <x-button @click.native="next()">传递参数{{dataParams}}到下一个页面，使用psPageReplace导航</x-button>
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
        from: 'Page3'
      }
    }
  },
  methods: {
    next() {
      // this.setParams(this.dataParams)
      // this.$vp.pageReplace('/Demo/PageStack/Page4')
      this.$vp.psPageReplace('/Demo/PageStack/Page4', {params: this.dataParams})
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
        from: 'Page3'
      }
    }
  },
  methods: {
    next() {
      // this.setParams(this.dataParams)
      // this.$vp.pageReplace('/Demo/PageStack/Page4')
      this.$vp.psPageReplace('/Demo/PageStack/Page4', {params: this.dataParams})
    }
  }
}
</script>

<style lang="less" scoped>
</style>
